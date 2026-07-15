"use client";

import { useState } from "react";
import Link from "next/link";
import type { QuoteProjectType } from "@/lib/supabase/types";
import {
  FORMULAS,
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
  formulaLabel,
} from "@/lib/quotes";
import { submitQuoteRequest } from "@/app/portail/devis/actions";
import FormulaPreview from "@/components/portail/FormulaPreview";

type Status = "idle" | "submitting" | "error";

const STEPS = ["Formule", "Détails", "Récapitulatif"] as const;

export default function DevisWizard({
  defaultCompany,
}: {
  defaultCompany: string;
}) {
  const [step, setStep] = useState(0);
  const [type, setType] = useState<QuoteProjectType | null>(null);
  const [company, setCompany] = useState(defaultCompany);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  const selectedFormula = FORMULAS.find((f) => f.type === type) ?? null;

  function toggleOption(opt: string) {
    setOptions((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  }

  function chooseType(next: QuoteProjectType) {
    // Changer de formule réinitialise les options (elles diffèrent par formule).
    if (next !== type) setOptions([]);
    setType(next);
  }

  async function handleSubmit() {
    setStatus("submitting");
    setError("");
    const result = await submitQuoteRequest({
      projectType: type!,
      company,
      budgetRange: budget,
      timeline,
      description,
      options,
    });
    if (result.ok) {
      setReference(result.reference);
    } else {
      setStatus("error");
      setError(result.error);
    }
  }

  // ---- Écran de confirmation ----
  if (reference) {
    return (
      <div className="card-surface rounded-2xl p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-emerald/15 text-accent-emerald">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mt-5 text-xl font-semibold">Demande envoyée</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Votre demande de devis <span className="font-mono text-foreground">{reference}</span>{" "}
          a bien été enregistrée. Nous revenons vers vous rapidement pour
          en discuter.
        </p>
        <Link
          href="/portail/devis"
          className="mt-6 inline-flex rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          Voir mes devis
        </Link>
      </div>
    );
  }

  const canContinue =
    (step === 0 && type !== null) ||
    (step === 1 && description.trim().length >= 10) ||
    step === 2;

  return (
    <div>
      {/* Fil d'étapes */}
      <ol className="mb-8 flex items-center gap-3 text-xs font-medium">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-3">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full border text-[11px] ${
                i === step
                  ? "border-accent-cyan bg-accent-cyan/10 text-accent-cyan"
                  : i < step
                    ? "border-accent-emerald/60 bg-accent-emerald/10 text-accent-emerald"
                    : "border-border text-muted"
              }`}
            >
              {i + 1}
            </span>
            <span className={i === step ? "text-foreground" : "text-muted"}>
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <span className="h-px w-6 bg-border" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>

      {/* Étape 1 — Formule */}
      {step === 0 && (
        <div>
          <h2 className="text-lg font-semibold">Quel type de projet ?</h2>
          <p className="mt-1 text-sm text-muted">
            Choisissez la formule la plus proche de votre besoin — on affinera
            ensemble.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {FORMULAS.map((f) => {
              const active = f.type === type;
              return (
                <button
                  key={f.type}
                  type="button"
                  onClick={() => chooseType(f.type)}
                  className={`card-surface rounded-2xl p-6 text-left transition-colors ${
                    active
                      ? "border-accent-cyan ring-1 ring-accent-cyan"
                      : "hover:border-accent-cyan/40"
                  }`}
                >
                  <div className="mb-4 aspect-[400/220] overflow-hidden rounded-xl border border-border/50">
                    <FormulaPreview type={f.type} />
                  </div>
                  <p className="text-xs font-mono uppercase tracking-wider text-accent-cyan">
                    {f.tagline}
                  </p>
                  <h3 className="mt-2 font-semibold">{f.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {f.description}
                  </p>
                  <p className="mt-3 text-xs italic text-muted">{f.examples}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Étape 2 — Détails */}
      {step === 1 && selectedFormula && (
        <div>
          <h2 className="text-lg font-semibold">
            Votre projet : {selectedFormula.label}
          </h2>
          <p className="mt-1 text-sm text-muted">
            Quelques précisions pour préparer un devis au plus juste.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="devis-company" className="text-xs font-medium text-muted">
                Entreprise
              </label>
              <input
                id="devis-company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
                placeholder="Nom de votre entreprise"
              />
            </div>

            <div>
              <label htmlFor="devis-budget" className="text-xs font-medium text-muted">
                Budget envisagé
              </label>
              <select
                id="devis-budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
              >
                <option value="">— À préciser —</option>
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="devis-timeline" className="text-xs font-medium text-muted">
                Délai souhaité
              </label>
              <select
                id="devis-timeline"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
              >
                <option value="">— À préciser —</option>
                {TIMELINE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {selectedFormula.options.length > 0 && (
              <div className="sm:col-span-2">
                <p className="text-xs font-medium text-muted">
                  Options souhaitées (facultatif)
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedFormula.options.map((opt) => {
                    const active = options.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleOption(opt)}
                        className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                          active
                            ? "border-accent-cyan bg-accent-cyan/10 text-accent-cyan"
                            : "border-border text-muted hover:border-accent-cyan/40"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="sm:col-span-2">
              <label htmlFor="devis-description" className="text-xs font-medium text-muted">
                Décrivez votre projet
              </label>
              <textarea
                id="devis-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
                placeholder="Votre activité, vos objectifs, ce que le site ou l'outil devra permettre..."
              />
              <p className="mt-1.5 text-xs text-muted">
                {description.trim().length < 10
                  ? "Quelques mots suffisent pour commencer (10 caractères minimum)."
                  : "Parfait."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Étape 3 — Récapitulatif */}
      {step === 2 && selectedFormula && (
        <div>
          <h2 className="text-lg font-semibold">Récapitulatif</h2>
          <p className="mt-1 text-sm text-muted">
            Vérifiez votre demande avant de l&apos;envoyer.
          </p>

          <dl className="card-surface mt-6 divide-y divide-border rounded-2xl">
            <RecapRow label="Formule" value={formulaLabel(selectedFormula.type)} />
            <RecapRow label="Entreprise" value={company || "—"} />
            <RecapRow label="Budget" value={budget || "—"} />
            <RecapRow label="Délai" value={timeline || "—"} />
            <RecapRow
              label="Options"
              value={options.length ? options.join(", ") : "—"}
            />
            <RecapRow label="Description" value={description} />
          </dl>

          {status === "error" && (
            <p className="mt-4 text-sm text-red-500">{error}</p>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            disabled={status === "submitting"}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent-cyan/60 hover:bg-surface disabled:opacity-50"
          >
            ← Retour
          </button>
        ) : (
          <Link
            href="/portail/devis"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent-cyan/60 hover:bg-surface"
          >
            Annuler
          </Link>
        )}

        {step < 2 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canContinue}
            className="rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            Continuer →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={status === "submitting"}
            className="rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background shadow-[0_0_0_0_rgba(56,189,248,0)] transition-all hover:opacity-90 hover:shadow-[0_0_24px_4px_rgba(56,189,248,0.35)] disabled:opacity-50"
          >
            {status === "submitting" ? "Envoi en cours..." : "Envoyer ma demande"}
          </button>
        )}
      </div>
    </div>
  );
}

function RecapRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:gap-4">
      <dt className="w-32 shrink-0 text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </dt>
      <dd className="text-sm text-foreground whitespace-pre-wrap">{value}</dd>
    </div>
  );
}
