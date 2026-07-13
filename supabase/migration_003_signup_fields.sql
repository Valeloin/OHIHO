-- OHIHO — Migration 003 : champs d'inscription enrichis
-- À exécuter dans Supabase : Project → SQL Editor → New query → coller ce fichier entier → Run

alter table profiles
  add column if not exists phone text,
  add column if not exists company_size text,
  add column if not exists need text,
  add column if not exists signup_message text;

-- Le trigger de création de profil doit maintenant capturer ces
-- nouveaux champs, envoyés via options.data au moment de l'inscription.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id, email, full_name, company, phone, company_size, need, signup_message
  )
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'company',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'company_size',
    new.raw_user_meta_data->>'need',
    new.raw_user_meta_data->>'signup_message'
  );
  return new;
end;
$$;
