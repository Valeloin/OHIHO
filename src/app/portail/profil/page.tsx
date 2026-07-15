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
    .select("first_name, last_name, phone, address, company, email")
    .eq("id", user!.id)
    .single();

  return (
    <ProfileForm
      email={profile?.email ?? user?.email ?? ""}
      firstName={profile?.first_name ?? null}
      lastName={profile?.last_name ?? null}
      phone={profile?.phone ?? null}
      address={profile?.address ?? null}
      company={profile?.company ?? null}
    />
  );
}
