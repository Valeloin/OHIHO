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
  fullName,
  company,
}: {
  email: string;
  fullName: string | null;
  company: string | null;
}) {
  const [state, formAction] = useFormState(updateProfile, null);

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
            defaultValue={fullName ?? ""}
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
            placeholder="Jean Dupont"
          />
        </div>
        <div>
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
          <label htmlFor="company" className="text-xs font-medium text-muted">
            Entreprise (optionnel)
          </label>
          <input
            id="company"
            name="company"
            type="text"
            defaultValue={company ?? ""}
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
            placeholder="Nom de votre entreprise"
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
