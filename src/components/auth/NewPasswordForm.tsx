"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updatePassword } from "@/app/nouveau-mot-de-passe/actions";
import PasswordField from "./PasswordField";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-accent w-full px-6 py-3 text-sm font-semibold disabled:opacity-50"
    >
      {pending ? "Enregistrement..." : "Définir mon nouveau mot de passe"}
    </button>
  );
}

export default function NewPasswordForm() {
  const [state, formAction] = useFormState(updatePassword, null);

  return (
    <form action={formAction} className="card-surface p-6 sm:p-8">
      <div className="grid gap-5">
        <PasswordField
          id="password"
          name="password"
          label="Nouveau mot de passe"
          autoComplete="new-password"
          placeholder="8 caractères minimum"
        />
        <PasswordField
          id="confirm"
          name="confirm"
          label="Confirmer le mot de passe"
          autoComplete="new-password"
          placeholder="Retapez le mot de passe"
        />
      </div>

      {state?.error && (
        <p className="mt-4 rounded-xl border-l-2 border-red-400/60 bg-red-400/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </p>
      )}

      <div className="mt-6">
        <SubmitButton />
      </div>
    </form>
  );
}
