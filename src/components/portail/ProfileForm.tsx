"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateProfile } from "@/app/portail/profil/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50"
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
    <form action={formAction} className="card-surface rounded-2xl p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="text-xs font-medium text-muted">
            Prénom
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            defaultValue={firstName ?? ""}
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
            placeholder="Jean"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="text-xs font-medium text-muted">
            Nom
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            defaultValue={lastName ?? ""}
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
            placeholder="Dupont"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-muted">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="mt-2 w-full cursor-not-allowed rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-muted outline-none"
          />
          <p className="mt-1.5 text-xs text-muted">
            L&apos;email ne peut pas être modifié ici.
          </p>
        </div>

        <div>
          <label htmlFor="phone" className="text-xs font-medium text-muted">
            Téléphone (optionnel)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={phone ?? ""}
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
            placeholder="06 00 00 00 00"
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
            autoComplete="organization"
            defaultValue={company ?? ""}
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
            placeholder="Nom de votre entreprise"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="address" className="text-xs font-medium text-muted">
            Adresse (optionnel)
          </label>
          <input
            id="address"
            name="address"
            type="text"
            autoComplete="street-address"
            defaultValue={address ?? ""}
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
            placeholder="12 rue de l'Exemple, 75000 Paris"
          />
        </div>
      </div>

      {state?.error && (
        <p className="mt-4 text-sm text-red-400">{state.error}</p>
      )}
      {state?.success && (
        <p className="mt-4 text-sm text-accent-emerald">
          Profil mis à jour avec succès.
        </p>
      )}

      <div className="mt-6">
        <SubmitButton />
      </div>
    </form>
  );
}
