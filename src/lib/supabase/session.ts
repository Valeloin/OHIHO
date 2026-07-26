import { redirect } from "next/navigation";
import { createClient } from "./server";
import type { Profile } from "./types";

// Motif getUser() + profil répété dans layout/profil/admin ; centralisé ici
// une fois qu'on dépasse 2-3 pages qui en ont besoin.
export async function requireProfile(redirectTo = "/connexion") {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(redirectTo);

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  if (!profile) redirect(redirectTo);

  return { supabase, user, profile: profile as Profile };
}

export async function requireAdmin() {
  const result = await requireProfile();
  if (result.profile.role !== "admin") redirect("/portail");
  return result;
}
