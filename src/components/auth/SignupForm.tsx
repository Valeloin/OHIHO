"use client";

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

// Style commun des champs : plus grands, focus visible, placeholders discrets.
const FIELD =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/50 focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20";

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
    <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
      {children}
      {optional && (
        <span className="ml-1.5 text-xs font-normal text-muted">
          (facultatif)
        </span>
      )}
    </label>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-accent w-full rounded-full px-6 py-3.5 text-sm font-semibold disabled:opacity-50"
    >
      {pending ? "Création en cours..." : "Créer mon compte"}
    </button>
  );
}

export default function SignupForm() {
  const [state, formAction] = useFormState(signUp, null);

  return (
    <form action={formAction} className="card-surface rounded-3xl p-8 sm:p-10">
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
        <div className="sm:col-span-2">
          <Label htmlFor="password">Mot de passe</Label>
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
      </div>

      {/* Le projet : tout est facultatif, clairement annoncé */}
      <div className="mt-9 border-t border-border pt-7">
        <p className="text-sm font-semibold">
          Votre projet{" "}
          <span className="font-normal text-muted">— tout est facultatif</span>
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
        <p className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </p>
      )}

      <div className="mt-7">
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
