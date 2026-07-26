"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { signUp } from "@/app/inscription/actions";

const NEEDS = [
  "Site vitrine",
  "Application web sur mesure",
  "Refonte de site existant",
  "Autre demande",
];

const COMPANY_SIZES = [
  "1 à 10 employés",
  "11 à 50 employés",
  "51 à 200 employés",
  "Plus de 200 employés",
];

// Style commun des champs, défini une seule fois dans globals.css (.field).
const FIELD = "field";

function Label({
  htmlFor,
  children,
  optional = false,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    // Libellé en mono capitales : dans la nouvelle DA, le mono porte les
    // libellés et les chiffres, le sans-serif le texte courant.
    <label
      htmlFor={htmlFor}
      className="field-label"
    >
      {children}
      {optional && (
        <span className="ml-1.5 normal-case tracking-normal text-muted/70">
          (facultatif)
        </span>
      )}
    </label>
  );
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-7-11-7a20.4 20.4 0 0 1 4.22-5.06M9.9 4.24A10.6 10.6 0 0 1 12 4c7 0 11 7 11 7a20.5 20.5 0 0 1-2.47 3.36M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function PasswordField({
  id,
  name,
  label,
  placeholder,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  autoComplete: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          required
          minLength={8}
          autoComplete={autoComplete}
          className={`${FIELD} pr-11`}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={
            visible ? "Masquer le mot de passe" : "Afficher le mot de passe"
          }
          className="absolute inset-y-0 right-0 flex items-center px-3.5 text-muted transition-colors hover:text-foreground"
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-accent w-full px-6 py-3.5 text-sm font-semibold disabled:opacity-50"
    >
      {pending ? "Création en cours..." : "Créer mon compte"}
    </button>
  );
}

export default function SignupForm() {
  const [state, formAction] = useFormState(signUp, null);

  return (
    <form action={formAction} className="card-surface p-6 sm:p-10">
      {/* L'essentiel : 4 champs seulement */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="firstName">Prénom</Label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className={FIELD}
            placeholder="Jean"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Nom</Label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            className={FIELD}
            placeholder="Dupont"
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="email">Email</Label>
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
        <div>
          <PasswordField
            id="password"
            name="password"
            label="Mot de passe"
            autoComplete="new-password"
            placeholder="8 car. min., 1 maj., 1 min., 1 chiffre"
          />
        </div>
        <div>
          <PasswordField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirmer le mot de passe"
            autoComplete="new-password"
            placeholder="Retapez le mot de passe"
          />
        </div>
      </div>

      {/* Le projet : tout est facultatif, clairement annoncé */}
      <div className="mt-9 border-t border-border pt-7">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-cyan">
          Votre projet{" "}
          <span className="normal-case tracking-normal text-muted">
            (tout est facultatif)
          </span>
        </p>
        <p className="mt-1 text-xs text-muted">
          Ces informations nous aident simplement à préparer notre premier
          échange.
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="company" optional>
              Entreprise
            </Label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              className={FIELD}
              placeholder="Nom de votre entreprise"
            />
          </div>
          <div>
            <Label htmlFor="phone" optional>
              Téléphone
            </Label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className={FIELD}
              placeholder="06 00 00 00 00"
            />
          </div>
          <div>
            <Label htmlFor="companySize">Taille de l&apos;entreprise</Label>
            <select
              id="companySize"
              name="companySize"
              defaultValue={COMPANY_SIZES[0]}
              className={FIELD}
            >
              {COMPANY_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="need">Type de besoin</Label>
            <select
              id="need"
              name="need"
              defaultValue={NEEDS[0]}
              className={FIELD}
            >
              {NEEDS.map((need) => (
                <option key={need} value={need}>
                  {need}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="message" optional>
              Votre besoin en quelques mots
            </Label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className={`${FIELD} resize-none`}
              placeholder="Décrivez brièvement votre besoin..."
            />
          </div>
        </div>
      </div>

      {state?.error && (
        <p className="mt-5 rounded-xl border-l-2 border-red-400/60 bg-red-400/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </p>
      )}

      <div className="mt-7">
        <SubmitButton />
      </div>

      <p className="mt-5 text-center text-sm text-muted">
        Déjà un compte ?{" "}
        <a href="/connexion" className="inline-flex min-h-[44px] items-center text-accent-cyan hover:underline">
          Se connecter
        </a>
      </p>
    </form>
  );
}
