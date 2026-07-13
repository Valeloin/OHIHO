import Link from "next/link";
import type { Ticket } from "@/lib/supabase/types";
import { CATEGORY_LABELS } from "@/lib/tickets/constants";
import { formatDate } from "@/lib/formatDate";
import StatusBadge from "@/components/ui/StatusBadge";
import PriorityBadge from "@/components/ui/PriorityBadge";

export default function TicketCard({
  ticket,
  href,
}: {
  ticket: Ticket;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="card-surface flex flex-col gap-2 rounded-2xl p-5 transition-colors hover:border-accent-cyan/40 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p className="font-mono text-xs text-muted">{ticket.reference}</p>
        <h3 className="mt-1 text-sm font-semibold text-foreground">
          {ticket.title}
        </h3>
        <p className="mt-1 text-xs text-muted">
          {CATEGORY_LABELS[ticket.category]} · Mis à jour le{" "}
          {formatDate(ticket.updated_at)}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <PriorityBadge priority={ticket.priority} />
        <StatusBadge status={ticket.status} />
      </div>
    </Link>
  );
}
