"use client";

import { useFormState, useFormStatus } from "react-dom";
import { replyToTicket } from "@/app/portail/tickets/actions";
import type { BugTrackMessage } from "@/lib/bugtrack";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-accent px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
    >
      {pending ? "Envoi..." : "Répondre"}
    </button>
  );
}

export default function TicketThread({
  ticketId,
  messages,
}: {
  ticketId: string;
  messages: BugTrackMessage[];
}) {
  const [state, formAction] = useFormState(replyToTicket, null);

  return (
    <div>
      <div className="grid gap-4">
        {messages.map((message) => {
          const isStaff = message.author_type === "admin";
          return (
            <div
              key={message.id}
              className={`card-surface p-5 ${!isStaff ? "border-accent-cyan/30" : ""}`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-cyan">
                  {isStaff ? "OHIHO" : message.author_name}
                </p>
                <p className="text-xs text-muted">
                  {new Date(message.created_at).toLocaleString("fr-FR")}
                </p>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">
                {message.message}
              </p>
            </div>
          );
        })}
      </div>

      <form action={formAction} className="card-surface mt-6 p-6">
        <input type="hidden" name="ticketId" value={ticketId} />
        <label htmlFor="message" className="field-label">
          Répondre
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          maxLength={5000}
          className="field resize-none"
          placeholder="Votre message..."
        />

        {state?.error && (
          <p className="mt-3 rounded-xl border-l-2 border-red-400/60 bg-red-400/10 px-4 py-3 text-sm text-red-400">
            {state.error}
          </p>
        )}

        <div className="mt-4">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
