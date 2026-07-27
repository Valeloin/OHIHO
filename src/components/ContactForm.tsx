"use client";

import { useFormState, useFormStatus } from "react-dom";
import { sendContactMessage } from "@/lib/actions";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-accent w-full px-8 py-3 text-sm disabled:opacity-50"
    >
      {pending ? "Envoi..." : label}
    </button>
  );
}

export default function ContactForm({ ctaLabel }: { ctaLabel: string }) {
  const [state, formAction] = useFormState(sendContactMessage, null);

  if (state?.success) {
    return (
      <div className="flex items-center gap-3 rounded-xl border-l-2 border-brand-emerald/60 bg-brand-emerald/10 px-4 py-4 text-sm">
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-emerald shadow-[0_0_8px_rgba(52,211,153,0.8)]"
          aria-hidden="true"
        />
        Merci, votre message a bien été envoyé. Nous vous répondons sous 24h
        ouvrées.
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="field-label">
            Nom
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            className="field"
            placeholder="Jean Dupont"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="field-label">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className="field"
            placeholder="vous@entreprise.fr"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="field-label">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          className="field resize-none"
          placeholder="Décrivez votre projet ou votre question..."
        />
      </div>

      {state?.error && (
        <p className="rounded-xl border-l-2 border-red-400/60 bg-red-400/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </p>
      )}

      <SubmitButton label={ctaLabel} />
    </form>
  );
}
