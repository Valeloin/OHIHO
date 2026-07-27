import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireProfile } from "@/lib/supabase/session";
import StatusBadge from "@/components/portail/StatusBadge";
import TicketThread from "@/components/portail/TicketThread";
import TicketActions from "@/components/portail/TicketActions";
import PageHeader from "@/components/portail/PageHeader";
import Panel from "@/components/portail/Panel";
import DetailGrid from "@/components/portail/DetailGrid";
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
        className="mb-5 inline-flex items-center gap-2 text-[14px] text-muted transition-colors hover:text-foreground"
      >
        <span aria-hidden="true">←</span> Retour au support
      </Link>

      <PageHeader
        title={ticket.title}
        action={
          <StatusBadge
            label={BUGTRACK_STATUS_LABEL[ticket.status]}
            tone={BUGTRACK_STATUS_TONE[ticket.status]}
          />
        }
      />

      <div className="grid gap-6">
        <Panel title="Détails">
          <DetailGrid
            items={[
              { label: "Numéro", value: ticket.number },
              {
                label: "Priorité",
                value: (
                  <StatusBadge
                    label={BUGTRACK_PRIORITY_LABEL[ticket.priority]}
                    tone={BUGTRACK_PRIORITY_TONE[ticket.priority]}
                  />
                ),
              },
              { label: "Ouvert le", value: formatDate(ticket.created_at) },
              {
                label: "Dernière activité",
                value: formatDate(ticket.updated_at),
              },
              {
                label: "Messages",
                value: String(sortedMessages.length),
              },
            ]}
          />
        </Panel>

        <TicketActions ticketId={ticket.id} status={ticket.status} />

        <Panel title="Discussion">
          <TicketThread ticketId={ticket.id} messages={sortedMessages} />
        </Panel>
      </div>
    </div>
  );
}
