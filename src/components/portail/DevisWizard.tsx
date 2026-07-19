"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { QuoteProjectType } from "@/lib/supabase/types";
import type { QuotesContent } from "@/lib/content/types";
import { defaultContent } from "@/lib/content/defaults";
import { formulasFrom } from "@/lib/quotes";
import { submitQuoteRequest } from "@/app/portail/devis/actions";
import FormulaPreview from "@/components/portail/FormulaPreview";

type Status = "idle" | "submitting" | "error";

const STEPS = ["Formule", "Détails", "Récapitulatif"] as const;

// Mêmes patrons de champ / libellé que les autres formulaires connectés.
const FIELD =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/50 focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/25";
const LABEL = "font-mono text-[11px] uppercase tracking-[0.16em] text-muted";

const HEX = /^#[0-9a-fA-F]{6}$/;

function hexChannels(hex: string): string {
  return [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)]
    .map((c) => parseInt(c, 16))
    .join(" ");
}

// Variables CSS locales au formulaire, issues des couleurs éditées dans
// l'admin. On n'écrase QUE ce qui diffère des défauts : tant que rien n'est
// personnalisé, le thème global s'applique.
function quoteStyleVars(quotes: QuotesContent): React.CSSProperties {
  const c = quotes.colors;
  const d = defaultContent.quotes.colors;
  const vars: Record<string, string> = {};
  const changed = (v: string, dv: string) =>
    HEX.test(v) && v.toLowerCase() !== dv.toLowerCase();
  if (changed(c.cardBg, d.cardBg)) vars["--surface"] = c.cardBg;
  if (changed(c.text, d.text)) vars["--foreground"] = c.text;
  if (changed(c.textMuted, d.textMuted)) vars["--muted"] = c.textMuted;
  if (changed(c.accent, d.accent)) vars["--accent"] = hexChannels(c.accent);
  return vars as React.CSSProperties;
}

export default function DevisWizard({
  defaultCompany,
  quotes,
}: {
  defaultCompany: string;
  quotes: QuotesContent;
}) {
  const [step, setStep] = useState(0);

  // Les étapes s'inscrivent dans l'historique du navigateur : le bouton
  // Précédent revient à l'étape d'avant au lieu de quitter la page.
  // On fusionne avec l'état existant pour ne pas casser celui du routeur Next.
  useEffect(() => {
    window.history.replaceState(
      { ...window.history.state, devisStep: 0 },
      ""
    );
    function onPopState(e: PopStateEvent) {
      const s =
        typeof e.state?.devisStep === "number" ? e.state.devisStep : 0;
      setStep(Math.min(Math.max(s, 0), 2));
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function goToStep(next: number) {
    window.history.pushState(
      { ...window.history.state, devisStep: next },
      ""
    );
    setStep(next);
  }

  const [type, setType] = useState<QuoteProjectType | null>(null);
  const [company, setCompany] = useState(defaultCompany);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  const formulas = formulasFrom(quotes);
  const selectedFormula = formulas.find((f) => f.type === type) ?? null;
  const styleVars = quoteStyleVars(quotes);
  const previewColors = {
    screen: quotes.colors.previewScreen,
    blocks: quotes.colors.previewBlocks,
    accent: quotes.colors.previewAccent,
  };

  function toggleOption(opt: string) {
    setOptions((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  }

  function chooseType(next: QuoteProjectType) {
    // Changer de formule réinitialise les options (elles diffèrent par formule).
    if (next !== type) setOptions([]);
    setType(next);
    // Cliquer sur une carte enregistre la formule ET passe aux détails :
    // pas besoin d'un second clic sur « Continuer ».
    goToStep(1);
  }

  async function handleSubmit() {
    setStatus("submitting");
    setError("");
    try {
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
    } catch {
      setStatus("error");
      setError("Une erreur est survenue, veuillez réessayer.");
    }
  }

  // ---- Écran de confirmation ----
  if (reference) {
    return (
      // Confirmation : coche dans une pilule ronde cernée d'un filet d'1px,
      // dans le teal interactif.
      <div className="card-surface p-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-cyan text-accent-cyan">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mt-5 text-xl font-semibold tracking-display">
          Demande envoyée
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Votre demande de devis <span className="font-mono text-foreground">{reference}</span>{" "}
          a bien été enregistrée. Nous revenons vers vous rapidement pour
          en discuter.
        </p>
        <Link
          href="/portail/devis"
          className="btn-accent mt-6 inline-flex px-6 py-2.5 text-sm font-semibold"
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
    // text-foreground : fait repartir l'héritage de couleur depuis ce wrapper,
    // pour que les titres sans classe de couleur suivent aussi la variable locale.
    <div style={styleVars} className="text-foreground">
      {/* Fil d'étapes */}
      {/* Fil d'étapes : chiffres en pilules rondes et libellés en mono, filets
          d'1px entre les étapes. Le teal ne marque que l'étape courante ; les
          étapes passées sont en texte plein, les suivantes en gris bleuté. */}
      <ol className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em]">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-3">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                i === step
                  ? "border-accent-cyan text-accent-cyan"
                  : i < step
                    ? "border-foreground/40 text-foreground"
                    : "border-border text-muted"
              }`}
            >
              {i + 1}
            </span>
            <span
              className={
                i === step
                  ? "text-accent-cyan"
                  : i < step
                    ? "text-foreground"
                    : "text-muted"
              }
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <span className="h-px w-8 bg-border" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>

      {/* Étape 1 — Formule */}
      {step === 0 && (
        <div>
          <h2 className="text-lg font-semibold tracking-display">
            {quotes.step1Title}
          </h2>
          <p className="mt-1 text-sm text-muted">{quotes.step1Subtitle}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {formulas.map((f) => {
              const active = f.type === type;
              return (
                <button
                  key={f.type}
                  type="button"
                  onClick={() => chooseType(f.type)}
                  className={`card-surface p-6 text-left transition-colors ${
                    active
                      ? "border-accent-cyan"
                      : "hover:border-accent-cyan/40"
                  }`}
                >
                  <div className="mb-4 aspect-[400/220] overflow-hidden rounded-xl border border-border">
                    <FormulaPreview type={f.type} colors={previewColors} />
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-cyan">
                    {f.tagline}
                  </p>
                  <h3 className="mt-2 font-semibold tracking-display">
                    {f.label}
                  </h3>
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
          <h2 className="text-lg font-semibold tracking-display">
            Votre projet : {selectedFormula.label}
          </h2>
          <p className="mt-1 text-sm text-muted">{quotes.step2Subtitle}</p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="devis-company" className={LABEL}>
                Entreprise
              </label>
              <input
                id="devis-company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={FIELD}
                placeholder="Nom de votre entreprise"
              />
            </div>

            <div>
              <label htmlFor="devis-budget" className={LABEL}>
                Budget envisagé
              </label>
              <select
                id="devis-budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={FIELD}
              >
                <option value="">— À préciser —</option>
                {quotes.budgets.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="devis-timeline" className={LABEL}>
                Délai souhaité
              </label>
              <select
                id="devis-timeline"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className={FIELD}
              >
                <option value="">— À préciser —</option>
                {quotes.timelines.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {selectedFormula.options.length > 0 && (
              <div className="sm:col-span-2">
                <p className={LABEL}>Options souhaitées (facultatif)</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedFormula.options.map((opt) => {
                    const active = options.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleOption(opt)}
                        aria-pressed={active}
                        className={`rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
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
              <label htmlFor="devis-description" className={LABEL}>
                Décrivez votre projet
              </label>
              <textarea
                id="devis-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className={`${FIELD} resize-none`}
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
          <h2 className="text-lg font-semibold tracking-display">
            Récapitulatif
          </h2>
          <p className="mt-1 text-sm text-muted">
            Vérifiez votre demande avant de l&apos;envoyer.
          </p>

          <dl className="card-surface mt-6 divide-y divide-border">
            <RecapRow label="Formule" value={selectedFormula.label} />
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
            <p className="mt-4 rounded-xl border-l-2 border-red-400/60 bg-red-400/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}
        </div>
      )}

      {/* Navigation */}
      {/* Navigation : pilule à filet pour l'action secondaire, pilule au
          dégradé de marque pour l'action principale. */}
      <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => window.history.back()}
            disabled={status === "submitting"}
            className="btn-outline px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
          >
            ← Retour
          </button>
        ) : (
          <Link
            href="/portail/devis"
            className="btn-outline px-5 py-2.5 text-sm font-semibold"
          >
            Annuler
          </Link>
        )}

        {step < 2 ? (
          <button
            type="button"
            onClick={() => goToStep(step + 1)}
            disabled={!canContinue}
            className="btn-accent px-6 py-2.5 text-sm font-semibold disabled:opacity-40"
          >
            Continuer →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={status === "submitting"}
            className="btn-accent px-6 py-2.5 text-sm font-semibold disabled:opacity-50"
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
      <dt className="w-32 shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        {label}
      </dt>
      <dd className="text-sm text-foreground whitespace-pre-wrap">{value}</dd>
    </div>
  );
}
