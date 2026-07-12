"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signUp } from "@/app/inscription/actions";

const NEEDS = [
  "Support informatique",
  "Formation d'équipe",
  "Transformation digitale",
  "Autre demande",
];

const COMPANY_SIZES = [
  "1 à 10 employés",
  "11 à 50 employés",
  "51 à 200 employés",
  "Plus de 200 employés",
];

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
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
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
        <div className="sm:col-span-1">
          <label htmlFor="company" className="text-xs font-medium text-muted">
            Entreprise
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
            placeholder="Nom de votre entreprise"
          />
        </div>
        <div className="sm:col-span-1">
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
        <div className="sm:col-span-1">
          <label htmlFor="phone" className="text-xs font-medium text-muted">
            Téléphone (optionnel)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
            placeholder="06 00 00 00 00"
          />
        </div>
        <div className="sm:col-span-1">
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
        <div className="sm:col-span-1">
          <label htmlFor="companySize" className="text-xs font-medium text-muted">
            Taille de l&apos;entreprise
          </label>
          <select
            id="companySize"
            name="companySize"
            defaultValue={COMPANY_SIZES[0]}
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
          >
            {COMPANY_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="need" className="text-xs font-medium text-muted">
            Type de besoin
          </label>
          <select
            id="need"
            name="need"
            defaultValue={NEEDS[0]}
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
          >
            {NEEDS.map((need) => (
              <option key={need} value={need}>
                {need}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-xs font-medium text-muted">
            Votre besoin en quelques mots (optionnel)
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
            placeholder="Décrivez brièvement votre besoin..."
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
