"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updatePassword } from "@/app/nouveau-mot-de-passe/actions";

// Même patron de champ / libellé que les autres formulaires connectés.
const FIELD = "field";
const LABEL = "field-label";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-accent w-full px-6 py-3 text-sm font-semibold disabled:opacity-50"
    >
      {pending ? "Enregistrement..." : "Définir mon nouveau mot de passe"}
    </button>
  );
}

export default function NewPasswordForm() {
  const [state, formAction] = useFormState(updatePassword, null);

  return (
    <form action={formAction} className="card-surface p-6 sm:p-8">
      <div className="grid gap-5">
        <div>
          <label htmlFor="password" className={LABEL}>
            Nouveau mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className={FIELD}
            placeholder="8 caractères minimum"
          />
        </div>
        <div>
          <label htmlFor="confirm" className={LABEL}>
            Confirmer le mot de passe
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className={FIELD}
            placeholder="Retapez le mot de passe"
          />
        </div>
      </div>

      {state?.error && (
        <p className="mt-4 rounded-xl border-l-2 border-red-400/60 bg-red-400/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </p>
      )}

      <div className="mt-6">
        <SubmitButton />
      </div>
    </form>
  );
}
