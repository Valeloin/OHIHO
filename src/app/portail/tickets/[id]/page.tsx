import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireProfile } from "@/lib/supabase/session";
import StatusBadge from "@/components/portail/StatusBadge";
import TicketThread from "@/components/portail/TicketThread";
import {
  TICKET_STATUS_LABEL,
  TICKET_STATUS_TONE,
  TICKET_PRIORITY_LABEL,
  TICKET_PRIORITY_TONE,
} from "@/lib/portail/status";
import type { TicketMessage } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Ticket · OHIHO",
  robots: { index: false, follow: false },
};

export default async function PortailTicketDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { supabase, user } = await requireProfile();

  const { data: ticket } = await supabase
    .from("tickets")
    .select("*")
    .eq("id", params.id)
    .eq("client_id", user.id)
    .single();

  if (!ticket) notFound();

  const { data: messages } = await supabase
    .from("ticket_messages")
    .select("*")
    .eq("ticket_id", ticket.id)
    .order("created_at", { ascending: true });

  const authorIds = Array.from(
    new Set((messages ?? []).map((m) => m.author_id))
  );
  const { data: authors } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .in("id", authorIds.length > 0 ? authorIds : [user.id]);

  const authorMap = new Map(
    (authors ?? []).map((a) => [a.id, a] as const)
  );

  function authorLabel(authorId: string) {
    if (authorId === user.id) return "Vous";
    const author = authorMap.get(authorId);
    if (author?.role === "admin" || author?.role === "technician") {
      return "OHIHO";
    }
    return author?.full_name || "Client";
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold tracking-display">
          {ticket.subject}
        </h1>
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
      </div>

      <TicketThread
        ticketId={ticket.id}
        messages={(messages as TicketMessage[]) ?? []}
        currentUserId={user.id}
        authorLabel={authorLabel}
      />
    </div>
  );
}
