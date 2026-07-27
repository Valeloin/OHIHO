import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { listTickets } from "@/lib/bugtrack";
import { ticketNeedsAction } from "@/lib/portail/status";

// Petite route interne pour le header (composant client) : le décompte de
// tickets BugTrack en attente ne peut pas être calculé côté navigateur, la
// clé de site doit rester côté serveur. Ne renvoie qu'un nombre, jamais
// les tickets eux-mêmes.
export async function GET() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ count: 0 });

  try {
    const tickets = await listTickets(user.id);
    const count = tickets.filter((t) => ticketNeedsAction(t.status)).length;
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
