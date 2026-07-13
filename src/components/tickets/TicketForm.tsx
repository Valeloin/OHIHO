"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createTicket } from "@/app/portail/tickets/nouveau/actions";
import { CATEGORY_OPTIONS, PRIORITY_OPTIONS } from "@/lib/tickets/constants";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
    >
      {pending ? "Création..." : "Créer le ticket"}
    </button>
  );
}

export default function TicketForm() {
  const [state, formAction] = useFormState(createTicket, null);

  return (
    <form action={formAction} className="card-surface rounded-2xl p-8">
      <div className="grid gap-5">
        <div>
          <label htmlFor="title" className="text-xs font-medium text-muted">
            Titre
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
            placeholder="Résumez votre demande en quelques mots"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className="text-xs font-medium text-muted">
              Catégorie
            </label>
            <select
              id="category"
              name="category"
              defaultValue={CATEGORY_OPTIONS[0][0]}
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
            >
              {CATEGORY_OPTIONS.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="priority" className="text-xs font-medium text-muted">
              Priorité
            </label>
            <select
              id="priority"
              name="priority"
              defaultValue="medium"
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
            >
              {PRIORITY_OPTIONS.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="text-xs font-medium text-muted">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={5}
            className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
            placeholder="Décrivez votre demande en détail..."
          />
        </div>
      </div>

      {state?.error && (
        <p className="mt-4 text-sm text-red-400">{state.error}</p>
      )}

      <div className="mt-6">
        <SubmitButton />
      </div>
    </form>
  );
}
