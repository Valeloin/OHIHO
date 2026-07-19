"use client";

import { useFormState, useFormStatus } from "react-dom";
import { requestPasswordReset } from "@/app/connexion/mot-de-passe-oublie/actions";

// Même patron de champ / libellé que les autres formulaires connectés.
const FIELD =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/50 focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/25";
const LABEL = "font-mono text-[11px] uppercase tracking-[0.16em] text-muted";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-accent w-full px-6 py-3 text-sm font-semibold disabled:opacity-50"
    >
      {pending ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
    </button>
  );
}

export default function ResetRequestForm() {
  const [state, formAction] = useFormState(requestPasswordReset, null);

  if (state?.success) {
    return (
      <div className="card-surface p-8">
        <h3 className="text-lg font-semibold tracking-display">
          Vérifiez votre boîte mail
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Si un compte est associé à cette adresse, vous recevrez un email avec
          un lien pour réinitialiser votre mot de passe.
        </p>
        <a
          href="/connexion"
          className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.16em] text-accent-cyan hover:underline"
        >
          Retour à la connexion
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="card-surface p-8">
      <div>
        <label htmlFor="email" className={LABEL}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={FIELD}
          placeholder="vous@entreprise.fr"
        />
      </div>

      {state?.error && (
        <p className="mt-4 rounded-xl border-l-2 border-red-400/60 bg-red-400/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </p>
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
