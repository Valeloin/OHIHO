import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PortailSidebar from "@/components/portail/PortailSidebar";
import { listTickets } from "@/lib/bugtrack";
import { ticketNeedsAction } from "@/lib/portail/status";

function initialsOf(
  firstName: string | null,
  lastName: string | null,
  email: string
) {
  const first = firstName?.trim()?.[0];
  const last = lastName?.trim()?.[0];
  if (first || last) return `${first ?? ""}${last ?? ""}`.toUpperCase();
  return email[0]?.toUpperCase() ?? "?";
}

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
    .select("first_name, last_name, full_name")
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

  const email = user.email ?? "";

  return (
    <main className="portail">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-14">
          <PortailSidebar
            name={profile?.full_name || email}
            email={email}
            initials={initialsOf(
              profile?.first_name ?? null,
              profile?.last_name ?? null,
              email
            )}
            pendingTicketCount={pendingTicketCount}
          />

          {/* `min-w-0` : sans lui, une ligne longue (email, tableau) force la
              colonne à s'élargir et déborde de la grille. */}
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </main>
  );
}
