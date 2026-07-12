import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/supabase/actions";

export const metadata: Metadata = {
  title: "Espace client — OHIHO",
};

export default async function PortailPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, company, role")
    .eq("id", user!.id)
    .single();

  return (
    <main className="bg-grid">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <p className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
          Espace client
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Bienvenue{profile?.full_name ? `, ${profile.full_name}` : ""}
        </h1>
        <p className="mt-3 text-sm text-muted">
          Connecté avec {user?.email}
          {profile?.company ? ` — ${profile.company}` : ""}.
        </p>

        <div className="mt-8 card-surface rounded-2xl p-8">
          <p className="text-sm text-muted">
            Le suivi de vos tickets arrive très prochainement dans cet
            espace. Pour l&apos;instant, cette page confirme simplement que
            votre compte fonctionne.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/portail/profil"
              className="rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Mon profil
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent-cyan/60 hover:bg-surface"
              >
                Se déconnecter
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
