"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { closeTicket, reopenTicket } from "@/app/portail/tickets/actions";
import type { BugTrackStatus } from "@/lib/bugtrack";

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-accent px-5 py-2.5 font-semibold disabled:opacity-50"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

function CloseForm({ ticketId }: { ticketId: string }) {
  const [state, formAction] = useFormState(closeTicket, null);
  return (
    <form action={formAction} className="card-surface mt-8 flex flex-wrap items-center justify-between gap-4 p-6">
      <p className="text-muted">
        Le correctif a été livré. Confirmez-vous que c&apos;est réglé ?
      </p>
      <input type="hidden" name="ticketId" value={ticketId} />
      <div>
        <SubmitButton label="Clôturer le ticket" pendingLabel="Clôture..." />
        {state?.error && (
          <p className="mt-2 text-red-400">{state.error}</p>
        )}
      </div>
    </form>
  );
}

function ReopenForm({ ticketId }: { ticketId: string }) {
  const [state, formAction] = useFormState(reopenTicket, null);
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <div className="card-surface mt-8 flex flex-wrap items-center justify-between gap-4 p-6">
        <p className="text-muted">
          Le problème persiste ? Vous pouvez rouvrir ce ticket.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="btn-outline px-5 py-2.5 font-semibold"
        >
          Réouvrir le ticket
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="card-surface mt-8 p-6">
      <input type="hidden" name="ticketId" value={ticketId} />
      <label htmlFor="reason" className="field-label">
        Pourquoi rouvrir ce ticket ?{" "}
        <span className="font-normal text-muted">(facultatif)</span>
      </label>
      <textarea
        id="reason"
        name="reason"
        rows={3}
        className="field resize-none"
        placeholder="Ex : le problème est revenu après la mise à jour..."
      />
      {state?.error && (
        <p className="mt-2 text-red-400">{state.error}</p>
      )}
      <div className="mt-4">
        <SubmitButton label="Confirmer la réouverture" pendingLabel="Envoi..." />
      </div>
    </form>
  );
}

export default function TicketActions({
  ticketId,
  status,
}: {
  ticketId: string;
  status: BugTrackStatus;
}) {
  if (status === "Livré") return <CloseForm ticketId={ticketId} />;
  if (status === "Clos") return <ReopenForm ticketId={ticketId} />;
  return null;
}
