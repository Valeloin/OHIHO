import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getContent } from "@/lib/content";
import DevisWizard from "@/components/portail/DevisWizard";

export const metadata: Metadata = {
  title: "Demander un devis · OHIHO",
};

export default async function NouveauDevisPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("company")
    .eq("id", user!.id)
    .single();

  const content = await getContent();

  return (
    <DevisWizard
      defaultCompany={profile?.company ?? ""}
      quotes={content.quotes}
    />
  );
}
