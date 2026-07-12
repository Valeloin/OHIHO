import type { Metadata } from "next";
import Link from "next/link";
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
    <main className="bg-grid">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <Link
          href="/portail"
          className="text-sm font-medium text-accent-cyan hover:underline"
        >
          ← Mon espace
        </Link>

        <p className="mt-6 text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
          Espace client
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Mon profil
        </h1>
        <p className="mt-3 text-sm text-muted">
          Modifiez votre nom et votre entreprise.
        </p>

        <div className="mt-8">
          <ProfileForm
            email={profile?.email ?? user?.email ?? ""}
            fullName={profile?.full_name ?? null}
            company={profile?.company ?? null}
          />
        </div>
      </div>
    </main>
  );
}
