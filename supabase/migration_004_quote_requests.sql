-- OHIHO — Migration 004 : demandes de devis (parcours de devis en ligne)
-- À exécuter dans Supabase : Project → SQL Editor → New query → coller ce fichier entier → Run
-- Prérequis : migration.sql (fonctions current_role() et set_updated_at(), table profiles) déjà exécutée.

-- ============================================================
-- ENUMS
-- ============================================================

create type quote_project_type as enum ('landing', 'intermediaire', 'refonte', 'application');
create type quote_status as enum ('received', 'in_review', 'quoted', 'closed');

-- ============================================================
-- TABLE
-- ============================================================

create table quote_requests (
  id uuid primary key default gen_random_uuid(),
  request_number bigint generated always as identity,
  reference text generated always as ('DEVIS-' || lpad(request_number::text, 6, '0')) stored,
  created_by uuid not null references profiles(id) on delete cascade,
  project_type quote_project_type not null,
  company text,
  budget_range text,
  timeline text,
  description text not null,
  options text[] not null default '{}',
  status quote_status not null default 'received',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index quote_requests_created_by_idx on quote_requests(created_by);
create index quote_requests_status_idx on quote_requests(status);

-- ============================================================
-- updated_at auto-refresh (réutilise la fonction de migration.sql)
-- ============================================================

create trigger quote_requests_set_updated_at
  before update on quote_requests
  for each row execute function public.set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table quote_requests enable row level security;

-- Le client voit ses propres devis ; le staff (admin) voit tout.
create policy quote_requests_select on quote_requests
  for select
  using (created_by = auth.uid() or public.current_role() in ('technician', 'admin'));

-- Un utilisateur ne peut créer un devis que pour lui-même.
create policy quote_requests_insert on quote_requests
  for insert
  with check (created_by = auth.uid());

-- Seul le staff peut faire évoluer le statut d'un devis.
create policy quote_requests_update_staff on quote_requests
  for update
  using (public.current_role() in ('technician', 'admin'))
  with check (public.current_role() in ('technician', 'admin'));
