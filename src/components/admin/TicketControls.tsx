"use client";

import { useTransition } from "react";
import { updateTicketStatus, updateTicketPriority } from "@/app/admin/tickets/actions";
import {
  TICKET_STATUS_LABEL,
  TICKET_PRIORITY_LABEL,
} from "@/lib/portail/status";
import type { TicketPriority, TicketStatus } from "@/lib/supabase/types";

const STATUS_OPTIONS = Object.keys(TICKET_STATUS_LABEL) as TicketStatus[];
const PRIORITY_OPTIONS = Object.keys(TICKET_PRIORITY_LABEL) as TicketPriority[];

export default function TicketControls({
  ticketId,
  status,
  priority,
}: {
  ticketId: string;
  status: TicketStatus;
  priority: TicketPriority;
}) {
  const [, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap gap-4">
      <div>
        <label className="field-label">Statut</label>
        <select
          defaultValue={status}
          onChange={(e) =>
            startTransition(() => {
              updateTicketStatus(ticketId, e.target.value as TicketStatus);
            })
          }
          className="field"
        >
          {STATUS_OPTIONS.map((value) => (
            <option key={value} value={value}>
              {TICKET_STATUS_LABEL[value]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="field-label">Priorité</label>
        <select
          defaultValue={priority}
          onChange={(e) =>
            startTransition(() => {
              updateTicketPriority(ticketId, e.target.value as TicketPriority);
            })
          }
          className="field"
        >
          {PRIORITY_OPTIONS.map((value) => (
            <option key={value} value={value}>
              {TICKET_PRIORITY_LABEL[value]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
