-- OHIHO — Schéma de référence (remplace toutes les migrations précédentes)
-- À exécuter dans Supabase : Project → SQL Editor → New query → coller ce fichier entier → Run
--
-- Fichier UNIQUE et REJOUABLE SANS RISQUE : il nettoie d'abord ce qui reste
-- des fonctionnalités retirées (tickets, devis), puis (re)crée exactement
-- l'état de base attendu par le code actuel. Peut être lancé sur une base
-- déjà à jour (tout est idempotent) ou sur une base neuve pour tout créer
-- d'un coup.
--
-- Historique : remplace migration.sql, migration_002 à migration_008.
-- Ces anciens fichiers ont été retirés du dépôt — ce fichier est la seule
-- source de vérité désormais.

-- ============================================================
-- 0) NETTOYAGE — objets orphelins des fonctionnalités retirées
--    (système de tickets retiré le 2026-07-13, devis le 2026-07-25 :
--    plus aucun code ne les appelle, mais les tables/policies restaient
--    en base).
-- ============================================================

drop policy if exists storage_ticket_attachments_select on storage.objects;
drop policy if exists storage_ticket_attachments_insert on storage.objects;
-- Supabase bloque la suppression directe de storage.buckets par SQL brut
-- (trigger de protection storage.protect_delete()) : le bucket
-- "ticket-attachments" doit être supprimé à la main si besoin, via
-- Dashboard → Storage → (menu du bucket) → Delete bucket. Inoffensif de le
-- laisser : plus aucun code n'y écrit ni n'y lit.

-- DROP TABLE entraîne automatiquement ses triggers/policies/index : pas
-- besoin de les retirer un par un avant.
drop table if exists ticket_attachments;
drop table if exists ticket_messages;
drop table if exists tickets;
drop table if exists quote_requests;

drop type if exists ticket_status;
drop type if exists ticket_priority;
drop type if exists ticket_category;
drop type if exists quote_project_type;
drop type if exists quote_status;

-- ============================================================
-- 1) ENUMS
-- ============================================================

do $$ begin
  create type user_role as enum ('client', 'technician', 'admin');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type project_status as enum ('nouveau', 'en_cours', 'en_revision', 'livre');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type invoice_status as enum ('brouillon', 'envoyee', 'payee');
exception when duplicate_object then null;
end $$;

-- ============================================================
-- 2) TABLES
-- ============================================================

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  first_name text,
  last_name text,
  company text,
  phone text,
  address text,
  company_size text,
  need text,
  signup_message text,
  role user_role not null default 'client',
  created_at timestamptz not null default now()
);

alter table profiles
  add column if not exists first_name text,
  add column if not exists last_name text,
  add column if not exists company text,
  add column if not exists phone text,
  add column if not exists address text,
  add column if not exists company_size text,
  add column if not exists need text,
  add column if not exists signup_message text;

-- Tout le contenu modifiable du site (thème, hero, services, etc.) tient
-- dans une seule ligne JSON (id = 'main').
create table if not exists public.site_content (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- Suivi de projet client : statut + liste d'étapes (jsonb, pas de table à
-- part — très peu d'étapes par projet, pas besoin de plus).
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  status project_status not null default 'nouveau',
  steps jsonb not null default '[]'::jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Facturation manuelle (pas de passerelle de paiement) : Valentin crée et
-- met à jour le statut lui-même. Le statut "en retard" n'est pas stocké,
-- il se déduit de due_date à l'affichage.
create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  number text not null,
  description text not null,
  amount_cents integer not null check (amount_cents >= 0),
  status invoice_status not null default 'brouillon',
  issue_date date not null default current_date,
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_client_id_idx on public.projects(client_id);
create index if not exists invoices_client_id_idx on public.invoices(client_id);

-- ============================================================
-- 3) FONCTIONS
-- ============================================================

-- Rôle de l'utilisateur courant (security definer pour éviter la
-- récursion RLS sur profiles).
create or replace function public.current_role()
returns user_role
language sql
security definer
stable
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

-- Crée automatiquement un profil à l'inscription, à partir des métadonnées
-- envoyées par le formulaire (options.data côté supabase.auth.signUp).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id, email, full_name, first_name, last_name,
    company, phone, address, company_size, need, signup_message
  )
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'company',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'address',
    new.raw_user_meta_data->>'company_size',
    new.raw_user_meta_data->>'need',
    new.raw_user_meta_data->>'signup_message'
  );
  return new;
end;
$$;

-- Mise à jour du profil par son propriétaire (jamais le rôle : empêche
-- l'auto-promotion en technicien/admin).
drop function if exists public.update_own_profile(text, text);

create or replace function public.update_own_profile(
  p_first_name text,
  p_last_name text,
  p_phone text,
  p_address text,
  p_company text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update profiles
  set first_name = p_first_name,
      last_name = p_last_name,
      full_name = trim(coalesce(p_first_name, '') || ' ' || coalesce(p_last_name, '')),
      phone = p_phone,
      address = p_address,
      company = p_company
  where id = auth.uid();
end;
$$;

grant execute on function public.update_own_profile(text, text, text, text, text) to authenticated;

-- Rafraîchit updated_at à chaque modification (projects, invoices).
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- 4) TRIGGERS
-- ============================================================

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

drop trigger if exists invoices_set_updated_at on public.invoices;
create trigger invoices_set_updated_at
  before update on public.invoices
  for each row execute function public.set_updated_at();

-- ============================================================
-- 5) ROW LEVEL SECURITY
-- ============================================================

alter table profiles enable row level security;
alter table public.site_content enable row level security;

drop policy if exists profiles_select on profiles;
create policy profiles_select on profiles
  for select
  using (id = auth.uid() or public.current_role() in ('technician', 'admin'));

-- Lecture publique du contenu du site (le site est public).
drop policy if exists site_content_read on public.site_content;
create policy site_content_read
  on public.site_content for select
  using (true);

-- Écriture réservée au rôle admin.
drop policy if exists site_content_write on public.site_content;
create policy site_content_write
  on public.site_content for all
  to authenticated
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

alter table public.projects enable row level security;
alter table public.invoices enable row level security;

drop policy if exists projects_select on public.projects;
create policy projects_select on public.projects
  for select
  using (client_id = auth.uid() or public.current_role() in ('technician', 'admin'));

drop policy if exists projects_staff_write on public.projects;
create policy projects_staff_write on public.projects
  for all
  to authenticated
  using (public.current_role() in ('technician', 'admin'))
  with check (public.current_role() in ('technician', 'admin'));

drop policy if exists invoices_select on public.invoices;
create policy invoices_select on public.invoices
  for select
  using (client_id = auth.uid() or public.current_role() in ('technician', 'admin'));

drop policy if exists invoices_staff_write on public.invoices;
create policy invoices_staff_write on public.invoices
  for all
  to authenticated
  using (public.current_role() in ('technician', 'admin'))
  with check (public.current_role() in ('technician', 'admin'));

-- ============================================================
-- Pour donner les droits admin à un compte (remplacer l'email) :
--   update public.profiles set role = 'admin'
--   where email = 'v.condamy@gmail.com';
-- ============================================================
