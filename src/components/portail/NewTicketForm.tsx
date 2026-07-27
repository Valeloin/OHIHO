"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createTicket } from "@/app/portail/tickets/actions";

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
      <label htmlFor="subject" className="field-label">
        Objet
      </label>
      <input
        id="subject"
        name="subject"
        type="text"
        required
        className="field"
        placeholder="Ex : problème de connexion à mon espace"
      />

      <label htmlFor="body" className="field-label mt-5 block">
        Décrivez votre problème
      </label>
      <textarea
        id="body"
        name="body"
        required
        rows={5}
        className="field resize-none"
        placeholder="Expliquez-nous ce qui se passe..."
      />

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
