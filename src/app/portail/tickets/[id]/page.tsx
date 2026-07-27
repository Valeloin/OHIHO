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
        className="inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground"
      >
        <span aria-hidden="true">←</span> Retour au support
      </Link>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="portail-title">{ticket.title}</h1>
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

      <p className="mt-2 text-[14px] text-muted">
        {ticket.number} · ouvert le {formatDate(ticket.created_at)}
      </p>

      <TicketActions ticketId={ticket.id} status={ticket.status} />

      <div className="mt-8">
        <TicketThread ticketId={ticket.id} messages={sortedMessages} />
      </div>
    </div>
  );
}
