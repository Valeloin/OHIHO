import type { Metadata } from "next";
import Link from "next/link";
import { requireProfile } from "@/lib/supabase/session";
import StatusBadge from "@/components/portail/StatusBadge";
import {
  TICKET_STATUS_LABEL,
  TICKET_STATUS_TONE,
  TICKET_PRIORITY_LABEL,
  TICKET_PRIORITY_TONE,
} from "@/lib/portail/status";
import type { Ticket } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Support · OHIHO",
  robots: { index: false, follow: false },
};

export default async function PortailTicketsPage() {
  const { supabase, user } = await requireProfile();

  const { data: tickets } = await supabase
    .from("tickets")
    .select("*")
    .eq("client_id", user.id)
    .order("updated_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <Link
          href="/portail/tickets/nouveau"
          className="btn-accent px-5 py-2.5 text-sm font-semibold"
        >
          + Nouveau ticket
        </Link>
      </div>

      {(!tickets || tickets.length === 0) && (
        <div className="card-surface p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-muted">
            Un problème, une question ? Créez un ticket et nous vous
            répondrons directement ici.
          </p>
        </div>
      )}

      <div className="grid gap-4">
        {(tickets as Ticket[] | null)?.map((ticket) => (
          <Link
            key={ticket.id}
            href={`/portail/tickets/${ticket.id}`}
            className="card-surface flex flex-wrap items-center justify-between gap-3 p-5 transition-colors hover:border-accent-cyan/40"
          >
            <p className="font-semibold">{ticket.subject}</p>
            <div className="flex items-center gap-2">
              <StatusBadge
                label={TICKET_PRIORITY_LABEL[ticket.priority]}
                tone={TICKET_PRIORITY_TONE[ticket.priority]}
              />
              <StatusBadge
                label={TICKET_STATUS_LABEL[ticket.status]}
                tone={TICKET_STATUS_TONE[ticket.status]}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
