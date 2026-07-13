import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import ProfileForm from "@/components/portail/ProfileForm";

export const metadata: Metadata = {
  title: "Mon profil — OHIHO",
};

export default async function ProfilPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, company, email")
    .eq("id", user!.id)
    .single();

  return (
    <ProfileForm
      email={profile?.email ?? user?.email ?? ""}
      fullName={profile?.full_name ?? null}
      company={profile?.company ?? null}
    />
  );
}
