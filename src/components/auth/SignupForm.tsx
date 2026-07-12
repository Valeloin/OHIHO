"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signUp } from "@/app/inscription/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {pending ? "Création en cours..." : "Créer mon compte"}
    </button>
  );
}

export default function SignupForm() {
  const [state, formAction] = useFormState(signUp, null);

  return (
    <form action={formAction} className="card-surface rounded-2xl p-8">
      <div className="grid gap-5">
        <div>
          <label htmlFor="fullName" className="text-xs font-medium text-muted">
            Nom complet
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
            placeholder="Jean Dupont"
          />
        </div>
        <div>
          <label htmlFor="company" className="text-xs font-medium text-muted">
            Entreprise (optionnel)
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
            placeholder="Nom de votre entreprise"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-xs font-medium text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
            placeholder="vous@entreprise.fr"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-xs font-medium text-muted">
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
            placeholder="8 caractères minimum"
          />
        </div>
      </div>

      {state?.error && (
        <p className="mt-4 text-sm text-red-400">{state.error}</p>
      )}

      <div className="mt-6">
        <SubmitButton />
      </div>

      <p className="mt-5 text-center text-sm text-muted">
        Déjà un compte ?{" "}
        <a href="/connexion" className="text-accent-cyan hover:underline">
          Se connecter
        </a>
      </p>
    </form>
  );
}
