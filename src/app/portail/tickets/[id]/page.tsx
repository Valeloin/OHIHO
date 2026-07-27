import type { Metadata } from "next";
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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            {ticket.number}
          </p>
          <h1 className="mt-1 text-xl font-semibold tracking-display">
            {ticket.title}
          </h1>
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
      </div>

      <TicketActions ticketId={ticket.id} status={ticket.status} />

      <div className="mt-6">
        <TicketThread ticketId={ticket.id} messages={sortedMessages} />
      </div>
    </div>
  );
}
