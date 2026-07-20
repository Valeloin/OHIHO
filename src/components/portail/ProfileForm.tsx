"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateProfile } from "@/app/portail/profil/actions";

// Même patron de champ / libellé que les formulaires d'authentification.
const FIELD = "field";
const LABEL = "field-label";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-accent px-6 py-3 text-sm font-semibold disabled:opacity-50"
    >
      {pending ? "Enregistrement..." : "Enregistrer"}
    </button>
  );
}

export default function ProfileForm({
  email,
  firstName,
  lastName,
  phone,
  address,
  company,
}: {
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  address: string | null;
  company: string | null;
}) {
  const [state, formAction] = useFormState(updateProfile, null);

  return (
    <form action={formAction} className="card-surface p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={LABEL}>
            Prénom
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            defaultValue={firstName ?? ""}
            className={FIELD}
            placeholder="Jean"
          />
        </div>
        <div>
          <label htmlFor="lastName" className={LABEL}>
            Nom
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            defaultValue={lastName ?? ""}
            className={FIELD}
            placeholder="Dupont"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email-readonly" className={LABEL}>
            Email
          </label>
          <input
            id="email-readonly"
            type="email"
            value={email}
            disabled
            className={`${FIELD} cursor-not-allowed bg-surface-2 text-muted`}
          />
          <p className="mt-2 text-xs text-muted">
            L&apos;email ne peut pas être modifié ici.
          </p>
        </div>

        <div>
          <label htmlFor="phone" className={LABEL}>
            Téléphone (optionnel)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={phone ?? ""}
            className={FIELD}
            placeholder="06 00 00 00 00"
          />
        </div>
        <div>
          <label htmlFor="company" className={LABEL}>
            Entreprise (optionnel)
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            defaultValue={company ?? ""}
            className={FIELD}
            placeholder="Nom de votre entreprise"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="address" className={LABEL}>
            Adresse (optionnel)
          </label>
          <input
            id="address"
            name="address"
            type="text"
            autoComplete="street-address"
            defaultValue={address ?? ""}
            className={FIELD}
            placeholder="12 rue de l'Exemple, 75000 Paris"
          />
        </div>
      </div>

      {state?.error && (
        <p className="mt-4 rounded-xl border-l-2 border-red-400/60 bg-red-400/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p className="mt-4 rounded-xl border-l-2 border-accent-cyan bg-accent-cyan/10 px-4 py-3 text-sm text-accent-cyan">
          Profil mis à jour avec succès.
        </p>
      )}

      <div className="mt-6">
        <SubmitButton />
      </div>
    </form>
  );
}
