-- OHIHO — Migration 005 : profil enrichi (prénom / nom séparés + adresse)
-- À exécuter dans Supabase : Project → SQL Editor → New query → coller ce fichier entier → Run
-- Prérequis : migrations 002 et 003 déjà exécutées.

-- ============================================================
-- Nouvelles colonnes (phone existe déjà via migration 003)
-- ============================================================

alter table profiles
  add column if not exists first_name text,
  add column if not exists last_name text,
  add column if not exists address text;

-- Backfill : découpe le full_name existant en prénom / nom pour les comptes déjà créés.
update profiles
set
  first_name = coalesce(first_name, nullif(split_part(full_name, ' ', 1), '')),
  last_name = coalesce(
    last_name,
    nullif(trim(substr(full_name, length(split_part(full_name, ' ', 1)) + 1)), '')
  )
where full_name is not null
  and (first_name is null or last_name is null);

-- ============================================================
-- Le trigger de création de profil capte prénom / nom / adresse.
-- full_name reste maintenu (dérivé) pour l'affichage (Navbar, portail).
-- ============================================================

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

-- ============================================================
-- Mise à jour du profil : nouvelle signature.
-- On remplace l'ancienne fonction (p_full_name, p_company).
-- full_name est recalculé à partir du prénom + nom.
-- ============================================================

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
