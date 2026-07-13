import { PRIORITY_LABELS, PRIORITY_COLORS } from "@/lib/tickets/constants";
import type { TicketPriority } from "@/lib/supabase/types";

export default function PriorityBadge({ priority }: { priority: TicketPriority }) {
  return (
    <span
      className={`font-mono text-xs font-semibold uppercase tracking-wide ${PRIORITY_COLORS[priority]}`}
    >
      {PRIORITY_LABELS[priority]}
    </span>
  );
}
