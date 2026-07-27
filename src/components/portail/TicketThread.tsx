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

function formatMoment(value: string) {
  return new Date(value).toLocaleString("fr-FR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function initials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "?"
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
      {/* Fil de discussion : OHIHO à gauche, le client à droite, comme une
          messagerie — le plus ancien en haut. */}
      <div className="flex flex-col gap-5">
        {messages.map((message) => {
          const isStaff = message.author_type === "admin";
          const label = isStaff ? "OHIHO" : message.author_name;

          return (
            <div
              key={message.id}
              className={`flex items-end gap-3 ${isStaff ? "" : "flex-row-reverse"}`}
            >
              <span
                aria-hidden="true"
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                  isStaff
                    ? "bg-gradient-to-br from-brand-sky via-brand-teal to-brand-emerald text-background"
                    : "border border-border bg-surface-2 text-muted"
                }`}
              >
                {isStaff ? "OH" : initials(message.author_name)}
              </span>

              <div
                className={`min-w-0 max-w-[85%] rounded-2xl border px-5 py-4 sm:max-w-[75%] ${
                  isStaff
                    ? "rounded-bl-md border-accent-cyan/30 bg-surface"
                    : "rounded-br-md border-border bg-surface-2"
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p
                    className={`font-mono text-[11px] uppercase tracking-[0.16em] ${
                      isStaff ? "text-accent-cyan" : "text-muted"
                    }`}
                  >
                    {label}
                  </p>
                  <p className="text-[11px] text-muted">
                    {formatMoment(message.created_at)}
                  </p>
                </div>
                <p className="mt-2.5 whitespace-pre-wrap break-words text-sm leading-relaxed">
                  {message.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <form action={formAction} className="card-surface mt-8 p-6">
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
