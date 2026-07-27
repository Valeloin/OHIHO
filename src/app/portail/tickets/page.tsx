import type { Metadata } from "next";
import Link from "next/link";
import { requireProfile } from "@/lib/supabase/session";
import StatusBadge from "@/components/portail/StatusBadge";
import PageHeader from "@/components/portail/PageHeader";
import EmptyState from "@/components/portail/EmptyState";
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

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
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

  const pendingCount = sorted.filter((t) => ticketNeedsAction(t.status)).length;

  return (
    <div>
      <PageHeader
        title="Support"
        subtitle="Vos demandes en cours et leur suivi, du signalement à la résolution."
        action={
          <Link
            href="/portail/tickets/nouveau"
            className="btn-accent inline-flex px-5 py-2.5 text-sm font-semibold"
          >
            Nouveau ticket
          </Link>
        }
      />

      {loadError && (
        <div className="card-surface mb-5 border-l-2 border-l-red-400/60 p-5 sm:p-6">
          <p className="text-sm text-red-400">{loadError}</p>
        </div>
      )}

      {!loadError && sorted.length === 0 && (
        <EmptyState
          title="Aucun ticket"
          description="Un bug, une question, une modification à demander ? Ouvrez un ticket : vous suivrez chaque réponse directement ici."
          action={
            <Link
              href="/portail/tickets/nouveau"
              className="btn-accent inline-flex px-6 py-2.5 text-sm font-semibold"
            >
              Ouvrir un ticket
            </Link>
          }
        />
      )}

      {sorted.length > 0 && (
        <>
          {pendingCount > 0 && (
            <p className="mb-5 flex items-center gap-2.5 text-sm text-amber-400">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]"
              />
              {pendingCount} ticket{pendingCount > 1 ? "s" : ""} attend
              {pendingCount > 1 ? "ent" : ""} une réponse de votre part.
            </p>
          )}

          <div className="grid gap-4">
            {sorted.map((ticket) => {
              const needsAction = ticketNeedsAction(ticket.status);
              return (
                <Link
                  key={ticket.id}
                  href={`/portail/tickets/${ticket.id}`}
                  className={`card-surface block p-5 transition-colors hover:border-accent-cyan/40 sm:p-6 ${
                    needsAction ? "border-l-2 border-l-amber-400/60" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-cyan">
                        {ticket.number}
                      </p>
                      <p className="mt-2 font-semibold">{ticket.title}</p>
                      <p className="mt-1.5 text-xs text-muted">
                        Mis à jour le {formatDate(ticket.updated_at)}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      <StatusBadge
                        label={BUGTRACK_PRIORITY_LABEL[ticket.priority]}
                        tone={BUGTRACK_PRIORITY_TONE[ticket.priority]}
                      />
                      <StatusBadge
                        label={BUGTRACK_STATUS_LABEL[ticket.status]}
                        tone={BUGTRACK_STATUS_TONE[ticket.status]}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
