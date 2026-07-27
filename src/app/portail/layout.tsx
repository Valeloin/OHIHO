import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/supabase/actions";
import PortailTabs from "@/components/portail/PortailTabs";
import { listTickets } from "@/lib/bugtrack";
import { ticketNeedsAction } from "@/lib/portail/status";

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

  // Best-effort : un souci BugTrack ne doit jamais empêcher l'accès au
  // reste de l'espace client, juste faire disparaître le badge.
  let pendingTicketCount = 0;
  try {
    const tickets = await listTickets(user.id);
    pendingTicketCount = tickets.filter((t) => ticketNeedsAction(t.status)).length;
  } catch {
    // silencieux : le badge reste simplement à 0
  }

  return (
    <main>
      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* Panneau profond de la DA « Banderole » : un aplat de nuit plus
            sombre que le fond, cerné d'un filet d'1px, aux angles adoucis et
            posé d'une ombre douce. Le point vert du kicker est la seule
            touche de couleur. */}
        <div className="card-dark px-6 py-6 sm:px-9 sm:py-8">
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
          <PortailTabs pendingTicketCount={pendingTicketCount} />
        </div>

        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}
