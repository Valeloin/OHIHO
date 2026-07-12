-- OHIHO — Migration 002 : modification du profil utilisateur
-- À exécuter dans Supabase : Project → SQL Editor → New query → coller ce fichier entier → Run

-- Fonction dédiée plutôt qu'une politique RLS "update" large sur la table :
-- ça garantit qu'un utilisateur ne peut modifier que son nom et son
-- entreprise, jamais son rôle (empêche l'auto-promotion en technicien).

create or replace function public.update_own_profile(
  p_full_name text,
  p_company text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update profiles
  set full_name = p_full_name,
      company = p_company
  where id = auth.uid();
end;
$$;

grant execute on function public.update_own_profile(text, text) to authenticated;
