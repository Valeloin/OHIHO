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
delete from storage.buckets where id = 'ticket-attachments';

-- DROP TABLE entraîne automatiquement ses triggers/policies/index : pas
-- besoin de les retirer un par un avant.
drop table if exists ticket_attachments;
drop table if exists ticket_messages;
drop table if exists tickets;
drop table if exists quote_requests;

-- Plus aucun trigger ne l'utilise une fois les deux tables ci-dessus parties.
drop function if exists public.set_updated_at();

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

-- ============================================================
-- 4) TRIGGERS
-- ============================================================

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

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

-- ============================================================
-- Pour donner les droits admin à un compte (remplacer l'email) :
--   update public.profiles set role = 'admin'
--   where email = 'v.condamy@gmail.com';
-- ============================================================
