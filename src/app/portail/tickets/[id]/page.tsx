import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireProfile } from "@/lib/supabase/session";
import StatusBadge from "@/components/portail/StatusBadge";
import TicketThread from "@/components/portail/TicketThread";
import TicketActions from "@/components/portail/TicketActions";
import {
  BUGTRACK_STATUS_LABEL,
  BUGTRACK_STATUS_TONE,
  BUGTRACK_PRIORITY_LABEL,
  BUGTRACK_PRIORITY_TONE,
} from "@/lib/portail/status";
import { listTickets, getThread } from "@/lib/bugtrack";

export const metadata: Metadata = {
  title: "Ticket · OHIHO",
  robots: { index: false, follow: false },
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PortailTicketDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { user } = await requireProfile();

  // Pas d'endpoint "un seul ticket" côté BugTrack : on retrouve les
  // métadonnées dans la liste de l'utilisateur, ce qui sert aussi de
  // vérification d'appartenance (listTickets ne renvoie jamais les
  // tickets d'un autre utilisateur).
  const [tickets, messages] = await Promise.all([
    listTickets(user.id),
    getThread(params.id, user.id),
  ]);

  const ticket = tickets.find((t) => t.id === params.id);
  if (!ticket) notFound();

  // Tri explicite : ne pas dépendre de l'ordre renvoyé par l'API BugTrack,
  // un chat se lit du plus ancien (en haut) au plus récent (en bas).
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  return (
    <div>
      <Link
        href="/portail/tickets"
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
      >
        <span aria-hidden="true">←</span> Retour au support
      </Link>

      <div className="card-dark mt-5 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-cyan">
              {ticket.number}
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-display">
              {ticket.title}
            </h1>
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

        <div className="mt-6 h-px rule-fade" />

        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-xs text-muted">
          <span>Ouvert le {formatDate(ticket.created_at)}</span>
          <span>Dernière activité le {formatDate(ticket.updated_at)}</span>
          <span>
            {sortedMessages.length} message
            {sortedMessages.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <TicketActions ticketId={ticket.id} status={ticket.status} />

      <div className="mt-6">
        <TicketThread ticketId={ticket.id} messages={sortedMessages} />
      </div>
    </div>
  );
}
