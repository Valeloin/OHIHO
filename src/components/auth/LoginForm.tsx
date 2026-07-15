"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signIn } from "@/app/connexion/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {pending ? "Connexion en cours..." : "Se connecter"}
    </button>
  );
}

export default function LoginForm({ next }: { next?: string }) {
  const [state, formAction] = useFormState(signIn, null);

  return (
    <form action={formAction} className="card-surface rounded-2xl p-8">
      {next && <input type="hidden" name="next" value={next} />}
      <div className="grid gap-5">
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
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
            placeholder="Votre mot de passe"
          />
        </div>
      </div>

      {state?.error && (
        <p className="mt-4 text-sm text-red-400">{state.error}</p>
      )}

      <div className="mt-4 text-right">
        <a
          href="/connexion/mot-de-passe-oublie"
          className="text-xs text-muted hover:text-accent-cyan hover:underline"
        >
          Mot de passe oublié ?
        </a>
      </div>

      <div className="mt-4">
        <SubmitButton />
      </div>

      <p className="mt-5 text-center text-sm text-muted">
        Pas encore de compte ?{" "}
        <a href="/inscription" className="text-accent-cyan hover:underline">
          Créer un compte
        </a>
      </p>
    </form>
  );
}
