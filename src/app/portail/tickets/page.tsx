import type { Metadata } from "next";
import Link from "next/link";
import { requireProfile } from "@/lib/supabase/session";
import StatusBadge from "@/components/portail/StatusBadge";
import PageHeader from "@/components/portail/PageHeader";
import EmptyState from "@/components/portail/EmptyState";
import Panel from "@/components/portail/Panel";
import { IconChevron } from "@/components/portail/icons";
import {
  BUGTRACK_STATUS_LABEL,
  BUGTRACK_STATUS_TONE,
  ticketNeedsAction,
} from "@/lib/portail/status";
import { BugTrackError, listTickets } from "@/lib/bugtrack";

export const metadata: Metadata = {
  title: "Support · OHIHO",
  robots: { index: false, follow: false },
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

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
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  return (
    <div>
      <PageHeader
        title="Support"
        action={
          <Link
            href="/portail/tickets/nouveau"
            className="btn-accent inline-flex px-5 py-2.5 font-semibold"
          >
            Nouveau ticket
          </Link>
        }
      />

      {loadError && (
        <div className="card-surface mb-6 p-6">
          <p className="text-red-400">{loadError}</p>
        </div>
      )}

      {!loadError && sorted.length === 0 && (
        <EmptyState
          title="Aucun ticket"
          description="Un bug, une question, une modification à demander ? Ouvrez un ticket et suivez chaque réponse ici."
          action={
            <Link
              href="/portail/tickets/nouveau"
              className="btn-accent inline-flex px-6 py-2.5 font-semibold"
            >
              Ouvrir un ticket
            </Link>
          }
        />
      )}

      {sorted.length > 0 && (
        <Panel
          title="Vos tickets"
          action={
            <span className="text-[14px] text-muted">
              {sorted.length} au total
            </span>
          }
          flush
        >
          <div className="divide-y divide-border">
            {sorted.map((ticket) => (
              <Link
                key={ticket.id}
                href={`/portail/tickets/${ticket.id}`}
                className="group flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-4 transition-colors hover:bg-surface-2/40"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{ticket.title}</p>
                  <p className="mt-1 text-[13px] text-muted">
                    {ticket.number} · mis à jour le{" "}
                    {formatDate(ticket.updated_at)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <StatusBadge
                    label={BUGTRACK_STATUS_LABEL[ticket.status]}
                    tone={BUGTRACK_STATUS_TONE[ticket.status]}
                  />
                  <IconChevron className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </Panel>
      )}
    </div>
  );
}
