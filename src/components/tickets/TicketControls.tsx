"use client";

import { useTransition } from "react";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "@/lib/tickets/constants";
import type { TicketPriority, TicketStatus } from "@/lib/supabase/types";
import { updateTicket } from "@/app/admin/tickets/[id]/actions";

type StaffOption = { id: string; full_name: string | null; email: string };

export default function TicketControls({
  ticketId,
  status,
  priority,
  assignedTo,
  staff,
}: {
  ticketId: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignedTo: string | null;
  staff: StaffOption[];
}) {
  const [isPending, startTransition] = useTransition();

  function handleChange(field: "status" | "priority" | "assignedTo", value: string) {
    startTransition(() => {
      updateTicket({
        ticketId,
        status: field === "status" ? (value as TicketStatus) : undefined,
        priority: field === "priority" ? (value as TicketPriority) : undefined,
        assignedTo: field === "assignedTo" ? (value || null) : undefined,
      });
    });
  }

  return (
    <div className="card-surface grid gap-4 rounded-2xl p-6 sm:grid-cols-3">
      <div>
        <label className="text-xs font-medium text-muted">Statut</label>
        <select
          defaultValue={status}
          disabled={isPending}
          onChange={(e) => handleChange("status", e.target.value)}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent-cyan"
        >
          {STATUS_OPTIONS.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-muted">Priorité</label>
        <select
          defaultValue={priority}
          disabled={isPending}
          onChange={(e) => handleChange("priority", e.target.value)}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent-cyan"
        >
          {PRIORITY_OPTIONS.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-muted">Assigné à</label>
        <select
          defaultValue={assignedTo ?? ""}
          disabled={isPending}
          onChange={(e) => handleChange("assignedTo", e.target.value)}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent-cyan"
        >
          <option value="">Non assigné</option>
          {staff.map((person) => (
            <option key={person.id} value={person.id}>
              {person.full_name || person.email}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
