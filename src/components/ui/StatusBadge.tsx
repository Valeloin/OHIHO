import { STATUS_LABELS, STATUS_COLORS } from "@/lib/tickets/constants";
import type { TicketStatus } from "@/lib/supabase/types";

export default function StatusBadge({ status }: { status: TicketStatus }) {
  return (
    <span
      className={`font-mono text-xs font-semibold uppercase tracking-wide ${STATUS_COLORS[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
