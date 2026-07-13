"use client";

import { useFormState, useFormStatus } from "react-dom";

type ActionState = { error: string } | null;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {pending ? "Envoi..." : "Envoyer la réponse"}
    </button>
  );
}

export default function ReplyForm({
  action,
  showInternalNote = false,
}: {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  showInternalNote?: boolean;
}) {
  const [state, formAction] = useFormState(action, null);

  return (
    <form action={formAction} className="card-surface mt-6 rounded-2xl p-6">
      <label htmlFor="body" className="text-xs font-medium text-muted">
        Votre réponse
      </label>
      <textarea
        id="body"
        name="body"
        required
        rows={4}
        className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
        placeholder="Écrivez votre message..."
      />

      {showInternalNote && (
        <label className="mt-3 flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            name="isInternalNote"
            value="true"
            className="rounded border-border"
          />
          Note interne (non visible par le client)
        </label>
      )}

      {state?.error && (
        <p className="mt-3 text-sm text-red-400">{state.error}</p>
      )}

      <div className="mt-4">
        <SubmitButton />
      </div>
    </form>
  );
}
