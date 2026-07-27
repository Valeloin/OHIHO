import type { Metadata } from "next";
import Link from "next/link";
import { requireProfile } from "@/lib/supabase/session";
import StatusBadge from "@/components/portail/StatusBadge";
import {
  BUGTRACK_STATUS_LABEL,
  BUGTRACK_STATUS_TONE,
  BUGTRACK_PRIORITY_LABEL,
  BUGTRACK_PRIORITY_TONE,
  ticketNeedsAction,
} from "@/lib/portail/status";
import { BugTrackError, listTickets } from "@/lib/bugtrack";

export const metadata: Metadata = {
  title: "Support · OHIHO",
  robots: { index: false, follow: false },
};

export default async function PortailTicketsPage() {
  const { user } = await requireProfile();

  let tickets: Awaited<ReturnType<typeof listTickets>> = [];
  let loadError: string | null = null;

  try {
    tickets = await listTickets(user.id);
  } catch (err) {
    loadError =
      err instanceof BugTrackError
        ? err.message
        : "Impossible de charger vos tickets pour le moment.";
  }

  const sorted = [...tickets].sort((a, b) => {
    const aNeeds = ticketNeedsAction(a.status) ? 0 : 1;
    const bNeeds = ticketNeedsAction(b.status) ? 0 : 1;
    if (aNeeds !== bNeeds) return aNeeds - bNeeds;
    return (
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
  });

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

      {loadError && (
        <div className="card-surface mb-4 p-6 sm:p-8">
          <p className="text-sm text-red-400">{loadError}</p>
        </div>
      )}

      {!loadError && sorted.length === 0 && (
        <div className="card-surface p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-muted">
            Un problème, une question ? Créez un ticket et nous vous
            répondrons directement ici.
          </p>
        </div>
      )}

      <div className="grid gap-4">
        {sorted.map((ticket) => (
          <Link
            key={ticket.id}
            href={`/portail/tickets/${ticket.id}`}
            className="card-surface flex flex-wrap items-center justify-between gap-3 p-5 transition-colors hover:border-accent-cyan/40"
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {ticket.number}
              </p>
              <p className="mt-1 font-semibold">{ticket.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge
                label={BUGTRACK_PRIORITY_LABEL[ticket.priority]}
                tone={BUGTRACK_PRIORITY_TONE[ticket.priority]}
              />
              <StatusBadge
                label={BUGTRACK_STATUS_LABEL[ticket.status]}
                tone={BUGTRACK_STATUS_TONE[ticket.status]}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
