"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateProfile } from "@/app/portail/profil/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-accent px-6 py-2.5 font-semibold disabled:opacity-50"
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
    // Même anatomie que les panneaux du portail : bandeau de titre, corps,
    // pied qui porte l'action — le bouton reste au même endroit d'un
    // formulaire à l'autre.
    <form action={formAction} className="card-surface overflow-hidden">
      <div className="border-b border-border px-6 py-3.5">
        <h2 className="font-medium">Informations</h2>
      </div>

      <div className="grid gap-6 p-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="field-label">
            Prénom
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            defaultValue={firstName ?? ""}
            className="field"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="field-label">
            Nom
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            defaultValue={lastName ?? ""}
            className="field"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email-readonly" className="field-label">
            Email
          </label>
          <input
            id="email-readonly"
            type="email"
            value={email}
            disabled
            className="field cursor-not-allowed bg-surface-2 text-muted"
          />
          <p className="mt-2 text-[13px] text-muted">
            L&apos;email ne peut pas être modifié ici.
          </p>
        </div>

        <div>
          <label htmlFor="phone" className="field-label">
            Téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={phone ?? ""}
            className="field"
          />
        </div>
        <div>
          <label htmlFor="company" className="field-label">
            Entreprise
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            defaultValue={company ?? ""}
            className="field"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="address" className="field-label">
            Adresse
          </label>
          <input
            id="address"
            name="address"
            type="text"
            autoComplete="street-address"
            defaultValue={address ?? ""}
            className="field"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border bg-[var(--header-bg)] px-6 py-4">
        {state?.error ? (
          <p className="text-[14px] text-red-400">{state.error}</p>
        ) : state?.success ? (
          <p className="text-[14px] text-brand-emerald">Profil mis à jour.</p>
        ) : (
          <span />
        )}
        <SubmitButton />
      </div>
    </form>
  );
}
