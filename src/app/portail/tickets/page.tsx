import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import TicketCard from "@/components/tickets/TicketCard";
import type { Ticket } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Mes tickets — OHIHO",
};

export default async function TicketsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: tickets } = await supabase
    .from("tickets")
    .select("*")
    .eq("created_by", user!.id)
    .order("updated_at", { ascending: false });

  const list = (tickets ?? []) as Ticket[];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Mes tickets
          </h2>
          <p className="mt-1 text-sm text-muted">
            Suivez vos demandes de support.
          </p>
        </div>
        <Link
          href="/portail/tickets/nouveau"
          className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          Nouveau ticket
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {list.length === 0 && (
          <div className="card-surface rounded-2xl p-8 text-center">
            <p className="text-sm text-muted">
              Vous n&apos;avez pas encore de ticket. Créez-en un si vous avez
              une question.
            </p>
          </div>
        )}
        {list.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            href={`/portail/tickets/${ticket.id}`}
          />
        ))}
      </div>
    </div>
  );
}
