"use client";

import { useState, type FormEvent } from "react";
import { contactSchema, SUJETS } from "@/lib/contact";

type Erreurs = Partial<Record<"nom" | "email" | "sujet" | "message", string>>;

export default function ContactForm() {
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [envoi, setEnvoi] = useState(false);
  const [echec, setEchec] = useState<string | null>(null);
  const [envoye, setEnvoye] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEchec(null);

    const data = Object.fromEntries(new FormData(event.currentTarget));
    const resultat = contactSchema.safeParse(data);

    if (!resultat.success) {
      // Un message par champ : le premier problème rencontré suffit.
      const prochaines: Erreurs = {};
      for (const probleme of resultat.error.issues) {
        const champ = probleme.path[0] as keyof Erreurs;
        if (champ && !prochaines[champ]) prochaines[champ] = probleme.message;
      }
      setErreurs(prochaines);
      return;
    }

    setErreurs({});
    setEnvoi(true);
    try {
      const reponse = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resultat.data),
      });
      const corps = await reponse.json().catch(() => ({}));
      if (!reponse.ok) throw new Error(corps.erreur ?? "L'envoi a échoué.");
      setEnvoye(true);
    } catch (erreur) {
      setEchec(
        erreur instanceof Error
          ? erreur.message
          : "L'envoi a échoué. Réessayez dans un instant."
      );
    } finally {
      setEnvoi(false);
    }
  }

  if (envoye) {
    return (
      <div className="card p-7" role="status">
        <p className="h-card">Message envoyé.</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Nous revenons vers vous sous 24 h ouvrées, à l&apos;adresse que vous
          avez indiquée.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <Champ
          nom="nom"
          label="Votre nom"
          erreur={erreurs.nom}
          onEdit={() => setErreurs((e) => ({ ...e, nom: undefined }))}
        >
          <input
            id="nom"
            name="nom"
            type="text"
            autoComplete="name"
            placeholder="Camille Durand"
            className={`field ${erreurs.nom ? "field-error" : ""}`}
          />
        </Champ>

        <Champ
          nom="email"
          label="Votre email"
          erreur={erreurs.email}
          onEdit={() => setErreurs((e) => ({ ...e, email: undefined }))}
        >
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="camille@entreprise.fr"
            className={`field ${erreurs.email ? "field-error" : ""}`}
          />
        </Champ>
      </div>

      <div className="mt-5">
        <Champ
          nom="sujet"
          label="Votre projet"
          erreur={erreurs.sujet}
          onEdit={() => setErreurs((e) => ({ ...e, sujet: undefined }))}
        >
          <select
            id="sujet"
            name="sujet"
            defaultValue={SUJETS[0].value}
            className={`field ${erreurs.sujet ? "field-error" : ""}`}
          >
            {SUJETS.map((sujet) => (
              <option key={sujet.value} value={sujet.value}>
                {sujet.label}
              </option>
            ))}
          </select>
        </Champ>
      </div>

      <div className="mt-5">
        <Champ
          nom="message"
          label="Votre message"
          erreur={erreurs.message}
          onEdit={() => setErreurs((e) => ({ ...e, message: undefined }))}
        >
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Votre activité, ce que le site doit permettre, votre échéance si vous en avez une."
            className={`field ${erreurs.message ? "field-error" : ""}`}
          />
        </Champ>
      </div>

      {/* Champ piège anti-robot : hors flux, hors tabulation, hors lecteurs
          d'écran. Un humain ne le voit ni ne le remplit jamais. */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="societe">Société</label>
        <input id="societe" name="societe" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {echec ? (
        <p className="mt-5 text-[13px]" style={{ color: "#c0392b" }} role="alert">
          {echec}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={envoi}
        className="btn btn-primary mt-6 w-full sm:w-auto"
      >
        {envoi ? "Envoi en cours…" : "Envoyer le message"}
      </button>

      <p className="text-fine mt-4">
        Vos informations servent uniquement à vous répondre. Elles ne sont ni
        revendues ni utilisées pour de la prospection.
      </p>
    </form>
  );
}

function Champ({
  nom,
  label,
  erreur,
  onEdit,
  children,
}: {
  nom: string;
  label: string;
  erreur?: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div onInput={onEdit}>
      <label htmlFor={nom} className="mb-2 block text-[13px] font-medium">
        {label}
      </label>
      {children}
      {erreur ? (
        <p className="mt-2 text-[13px]" style={{ color: "#c0392b" }}>
          {erreur}
        </p>
      ) : null}
    </div>
  );
}
