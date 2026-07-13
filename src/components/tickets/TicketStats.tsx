import { STATUS_LABELS } from "@/lib/tickets/constants";
import type { TicketStatus } from "@/lib/supabase/types";

export default function TicketStats({
  total,
  counts,
}: {
  total: number;
  counts: Record<TicketStatus, number>;
}) {
  const cards: { label: string; value: number; accent: string }[] = [
    { label: "Total", value: total, accent: "text-foreground" },
    { label: STATUS_LABELS.open, value: counts.open, accent: "text-accent-cyan" },
    { label: STATUS_LABELS.in_progress, value: counts.in_progress, accent: "text-accent-violet" },
    { label: STATUS_LABELS.waiting_customer, value: counts.waiting_customer, accent: "text-muted" },
    { label: STATUS_LABELS.resolved, value: counts.resolved, accent: "text-accent-emerald" },
    { label: STATUS_LABELS.closed, value: counts.closed, accent: "text-muted" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {cards.map((card) => (
        <div key={card.label} className="card-surface rounded-2xl p-4">
          <p className={`text-2xl font-semibold tracking-tight ${card.accent}`}>
            {card.value}
          </p>
          <p className="mt-1 text-xs text-muted">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
