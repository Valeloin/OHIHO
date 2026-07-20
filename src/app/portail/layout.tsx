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
    <main>
      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* Panneau profond de la DA « Banderole » : un aplat de nuit plus
            sombre que le fond, cerné d'un filet d'1px, aux angles adoucis et
            posé d'une ombre douce. Le point vert du kicker est la seule
            touche de couleur. */}
        <div className="card-dark px-7 py-7 sm:px-9 sm:py-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="kicker">Espace client</p>
              <h1 className="mt-5 text-3xl font-semibold tracking-display text-foreground">
                Bienvenue{profile?.full_name ? `, ${profile.full_name}` : ""}
              </h1>
              <p className="mt-3 text-sm text-muted">
                Connecté avec {user?.email}
                {profile?.company ? ` · ${profile.company}` : ""}.
              </p>
            </div>

            <form action={signOut}>
              <button
                type="submit"
                className="btn-outline px-5 py-2 font-mono text-[11px] uppercase tracking-[0.16em]"
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
