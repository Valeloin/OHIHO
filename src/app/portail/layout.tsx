import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/supabase/actions";
import PortailTabs from "@/components/portail/PortailTabs";

export default async function PortailLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/connexion");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, company")
    .eq("id", user.id)
    .single();

  return (
    <main className="bg-grid">
      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* Panneau bleu nuit aux couleurs du site : l'accent cyan y est très
            lisible (il était noyé sur le fond clair) et l'espace client reprend
            l'identité de l'en-tête du site public. card-dark inverse les tokens
            foreground/muted/border, donc le contenu passe en clair tout seul. */}
        <div className="card-dark rounded-3xl px-7 py-7 sm:px-9 sm:py-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-sm font-medium uppercase tracking-wider text-accent-cyan">
                Espace client
              </p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
                Bienvenue{profile?.full_name ? `, ${profile.full_name}` : ""}
              </h1>
              <p className="mt-3 text-sm text-muted">
                Connecté avec {user?.email}
                {profile?.company ? ` — ${profile.company}` : ""}.
              </p>
            </div>

            <form action={signOut}>
              <button
                type="submit"
                className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent-cyan/60 hover:bg-white/10"
              >
                Se déconnecter
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8">
          <PortailTabs />
        </div>

        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}
