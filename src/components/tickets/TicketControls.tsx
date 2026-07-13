"use client";

import { useState, useTransition } from "react";
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
  const [localStatus, setLocalStatus] = useState<TicketStatus>(status);
  const [localPriority, setLocalPriority] = useState<TicketPriority>(priority);
  const [localAssignedTo, setLocalAssignedTo] = useState(assignedTo ?? "");
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(false);
    startTransition(async () => {
      await updateTicket({
        ticketId,
        status: localStatus,
        priority: localPriority,
        assignedTo: localAssignedTo || null,
      });
      setSaved(true);
    });
  }

  return (
    <div className="card-surface rounded-2xl p-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-xs font-medium text-muted">Statut</label>
          <select
            value={localStatus}
            onChange={(e) => {
              setLocalStatus(e.target.value as TicketStatus);
              setSaved(false);
            }}
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
            value={localPriority}
            onChange={(e) => {
              setLocalPriority(e.target.value as TicketPriority);
              setSaved(false);
            }}
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
            value={localAssignedTo}
            onChange={(e) => {
              setLocalAssignedTo(e.target.value);
              setSaved(false);
            }}
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

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? "Enregistrement..." : "Enregistrer"}
        </button>
        {saved && !isPending && (
          <span className="text-sm text-accent-emerald">Enregistré</span>
        )}
      </div>
    </div>
  );
}
