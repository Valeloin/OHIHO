-- OHIHO — Migration 006 : contenu éditable du site (CMS admin)
-- À exécuter dans Supabase : Project → SQL Editor → New query → coller ce fichier entier → Run
-- Prérequis : migration.sql (fonction current_role() + table profiles) déjà exécutée.

-- Tout le contenu modifiable du site tient dans une seule ligne JSON.
create table if not exists public.site_content (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

-- Lecture publique (le site est public).
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
-- Pour te donner les droits admin (remplace l'email si besoin) :
--   update public.profiles set role = 'admin'
--   where email = 'v.condamy@gmail.com';
-- ============================================================
