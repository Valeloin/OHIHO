"use client";

import { useFormState, useFormStatus } from "react-dom";
import { requestPasswordReset } from "@/app/connexion/mot-de-passe-oublie/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {pending ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
    </button>
  );
}

export default function ResetRequestForm() {
  const [state, formAction] = useFormState(requestPasswordReset, null);

  if (state?.success) {
    return (
      <div className="card-surface rounded-2xl p-8 text-center">
        <h3 className="text-lg font-semibold">Vérifiez votre boîte mail</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Si un compte est associé à cette adresse, vous recevrez un email avec
          un lien pour réinitialiser votre mot de passe.
        </p>
        <a
          href="/connexion"
          className="mt-6 inline-block text-sm font-medium text-accent-cyan hover:underline"
        >
          Retour à la connexion
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="card-surface rounded-2xl p-8">
      <div>
        <label htmlFor="email" className="text-xs font-medium text-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
          placeholder="vous@entreprise.fr"
        />
      </div>

      {state?.error && (
        <p className="mt-4 text-sm text-red-400">{state.error}</p>
      )}

      <div className="mt-6">
        <SubmitButton />
      </div>

      <p className="mt-5 text-center text-sm text-muted">
        <a href="/connexion" className="text-accent-cyan hover:underline">
          Retour à la connexion
        </a>
      </p>
    </form>
  );
}
