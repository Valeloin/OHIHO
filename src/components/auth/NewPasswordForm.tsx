"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updatePassword } from "@/app/nouveau-mot-de-passe/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {pending ? "Enregistrement..." : "Définir mon nouveau mot de passe"}
    </button>
  );
}

export default function NewPasswordForm() {
  const [state, formAction] = useFormState(updatePassword, null);

  return (
    <form action={formAction} className="card-surface rounded-2xl p-8">
      <div className="grid gap-5">
        <div>
          <label htmlFor="password" className="text-xs font-medium text-muted">
            Nouveau mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
            placeholder="8 caractères minimum"
          />
        </div>
        <div>
          <label htmlFor="confirm" className="text-xs font-medium text-muted">
            Confirmer le mot de passe
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
            placeholder="Retapez le mot de passe"
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
