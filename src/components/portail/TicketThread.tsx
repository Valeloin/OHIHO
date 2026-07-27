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
      className="btn-accent px-5 py-2.5 font-semibold disabled:opacity-50"
    >
      {pending ? "Envoi..." : "Envoyer"}
    </button>
  );
}

function formatMoment(value: string) {
  return new Date(value).toLocaleString("fr-FR", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
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
      {/* Fil de discussion : OHIHO à gauche, vous à droite, du plus ancien au
          plus récent. Pas d'avatar ni de cadre — l'alignement et le fond de
          la bulle suffisent à dire qui parle. */}
      <div className="flex flex-col gap-6">
        {messages.map((message) => {
          const isStaff = message.author_type === "admin";

          return (
            <div
              key={message.id}
              className={`flex flex-col ${isStaff ? "items-start" : "items-end"}`}
            >
              <div
                className={`max-w-[90%] rounded-2xl px-5 py-4 sm:max-w-[80%] ${
                  isStaff
                    ? "rounded-bl-md border border-border bg-surface"
                    : "rounded-br-md bg-surface-2"
                }`}
              >
                <p className="whitespace-pre-wrap break-words leading-relaxed">
                  {message.message}
                </p>
              </div>
              <p className="mt-2 px-1 text-[13px] text-muted">
                {isStaff ? "OHIHO" : "Vous"} · {formatMoment(message.created_at)}
              </p>
            </div>
          );
        })}
      </div>

      <form action={formAction} className="mt-10">
        <input type="hidden" name="ticketId" value={ticketId} />
        <label htmlFor="message" className="field-label">
          Votre réponse
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          maxLength={5000}
          className="field resize-none"
          placeholder="Écrivez votre message..."
        />

        {state?.error && (
          <p className="mt-3 rounded-xl bg-red-400/10 px-4 py-3 text-red-400">
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
