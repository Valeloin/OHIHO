"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createTicket } from "@/app/portail/tickets/actions";
import { BUGTRACK_PRIORITY_LABEL } from "@/lib/portail/status";
import type { BugTrackPriority } from "@/lib/bugtrack";

const PRIORITY_OPTIONS: BugTrackPriority[] = [
  "faible",
  "moyen",
  "élevé",
  "bloquant",
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-accent px-6 py-2.5 font-semibold disabled:opacity-50"
    >
      {pending ? "Envoi..." : "Créer le ticket"}
    </button>
  );
}

export default function NewTicketForm() {
  const [state, formAction] = useFormState(createTicket, null);

  return (
    <form action={formAction} className="card-surface overflow-hidden">
      <div className="border-b border-border px-6 py-3.5">
        <h2 className="font-medium">Votre demande</h2>
      </div>

      <div className="grid gap-6 p-6">
        <div>
          <label htmlFor="title" className="field-label">
            Titre
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            minLength={5}
            maxLength={255}
            className="field"
            placeholder="Problème de connexion à mon espace"
          />
        </div>

        <div>
          <label htmlFor="description" className="field-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            minLength={10}
            rows={6}
            className="field resize-none"
            placeholder="Ce qui se passe, à quel moment, et ce que vous attendiez."
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label htmlFor="software" className="field-label">
              Page ou module concerné
            </label>
            <input
              id="software"
              name="software"
              type="text"
              required
              className="field"
              placeholder="Espace client"
            />
          </div>
          <div>
            <label htmlFor="priority" className="field-label">
              Priorité
            </label>
            <select
              id="priority"
              name="priority"
              defaultValue="moyen"
              className="field"
            >
              {PRIORITY_OPTIONS.map((value) => (
                <option key={value} value={value}>
                  {BUGTRACK_PRIORITY_LABEL[value]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="version" className="field-label">
            Version <span className="font-normal text-muted">(facultatif)</span>
          </label>
          <input
            id="version"
            name="version"
            type="text"
            className="field"
            placeholder="1.2"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border bg-[var(--header-bg)] px-6 py-4">
        {state?.error ? (
          <p className="text-[14px] text-red-400">{state.error}</p>
        ) : (
          <span />
        )}
        <SubmitButton />
      </div>
    </form>
  );
}
