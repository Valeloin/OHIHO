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
      className="btn-accent px-6 py-3 text-sm font-semibold disabled:opacity-50"
    >
      {pending ? "Envoi..." : "Créer le ticket"}
    </button>
  );
}

export default function NewTicketForm() {
  const [state, formAction] = useFormState(createTicket, null);

  return (
    <form action={formAction} className="card-surface p-6 sm:p-8">
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
        placeholder="Ex : problème de connexion à mon espace"
      />

      <label htmlFor="description" className="field-label mt-5 block">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        required
        minLength={10}
        rows={5}
        className="field resize-none"
        placeholder="Expliquez-nous ce qui se passe..."
      />

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="software" className="field-label">
            Logiciel / module concerné
          </label>
          <input
            id="software"
            name="software"
            type="text"
            required
            className="field"
            placeholder="Ex : Espace client"
          />
        </div>
        <div>
          <label htmlFor="version" className="field-label">
            Version{" "}
            <span className="normal-case tracking-normal text-muted/70">
              (facultatif)
            </span>
          </label>
          <input
            id="version"
            name="version"
            type="text"
            className="field"
            placeholder="Ex : 1.2"
          />
        </div>
      </div>

      <label htmlFor="priority" className="field-label mt-5 block">
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

      {state?.error && (
        <p className="mt-4 rounded-xl border-l-2 border-red-400/60 bg-red-400/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </p>
      )}

      <div className="mt-5">
        <SubmitButton />
      </div>
    </form>
  );
}
