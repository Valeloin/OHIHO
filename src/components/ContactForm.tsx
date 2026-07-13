"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const NEEDS = [
  "Prise en main à distance",
  "Formation en ligne",
  "Autre demande",
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Une erreur est survenue, veuillez réessayer.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Une erreur est survenue."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="card-surface rounded-2xl p-10 text-center">
        <h3 className="text-xl font-semibold">Demande envoyée</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Merci pour votre message. Nous revenons vers vous sous 24h ouvrées
          pour échanger sur votre besoin.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-accent-cyan hover:underline"
        >
          Envoyer une nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface rounded-2xl p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className="text-xs font-medium text-muted">
            Nom complet
          </label>
          <input
            id="name"
            name="name"
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
            Votre message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
            placeholder="Décrivez brièvement votre besoin..."
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-400">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
      >
        {status === "submitting" ? "Envoi en cours..." : "Envoyer la demande"}
      </button>
    </form>
  );
}
