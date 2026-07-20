"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signIn } from "@/app/connexion/actions";

// Même patron de champ que SignupForm : aplat nuit, filet d'1px, coins arrondis
// (rounded-xl = --radius). Les champs restent rectangulaires : seuls les
// boutons et les puces passent en pilule.
const FIELD = "field";

// Libellé mono capitales, commun à tous les formulaires connectés.
const LABEL = "field-label";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-accent w-full px-6 py-3 text-sm font-semibold disabled:opacity-50"
    >
      {pending ? "Connexion en cours..." : "Se connecter"}
    </button>
  );
}

export default function LoginForm({ next }: { next?: string }) {
  const [state, formAction] = useFormState(signIn, null);

  return (
    <form action={formAction} className="card-surface p-6 sm:p-8">
      {next && <input type="hidden" name="next" value={next} />}
      <div className="grid gap-5">
        <div>
          <label htmlFor="email" className={LABEL}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={FIELD}
            placeholder="vous@entreprise.fr"
          />
        </div>
        <div>
          <label htmlFor="password" className={LABEL}>
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className={FIELD}
            placeholder="Votre mot de passe"
          />
        </div>
      </div>

      {state?.error && (
        <p className="mt-4 rounded-xl border-l-2 border-red-400/60 bg-red-400/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </p>
      )}

      <div className="mt-4 text-right">
        <a
          href="/connexion/mot-de-passe-oublie"
          className="inline-flex min-h-[44px] items-center text-xs text-muted hover:text-accent-cyan hover:underline"
        >
          Mot de passe oublié ?
        </a>
      </div>

      <div className="mt-4">
        <SubmitButton />
      </div>

      <p className="mt-5 text-center text-sm text-muted">
        Pas encore de compte ?{" "}
        <a href="/inscription" className="inline-flex min-h-[44px] items-center text-accent-cyan hover:underline">
          Créer un compte
        </a>
      </p>
    </form>
  );
}
