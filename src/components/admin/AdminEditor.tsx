"use client";

import { useState } from "react";
import type { SiteContent, QuoteFormulaContent } from "@/lib/content/types";
import { saveContent } from "@/lib/content/actions";
import { defaultContent } from "@/lib/content/defaults";
import FormulaPreview from "@/components/portail/FormulaPreview";

type Status = "idle" | "saving" | "saved" | "error";

const HEX = /^#[0-9a-fA-F]{6}$/;

// Menu latéral : une entrée par section éditable.
type SectionId =
  | "theme"
  | "hero"
  | "portfolio"
  | "services"
  | "method"
  | "expertise"
  | "whyUs"
  | "contact"
  | "footer"
  | "quotesFormulas"
  | "quotesForm";

// Clés techniques des 4 formules de devis (ordre d'affichage).
const FORMULA_KEYS = [
  "landing",
  "intermediaire",
  "refonte",
  "application",
] as const;

const MENU: { id: SectionId; label: string }[] = [
  { id: "theme", label: "Couleurs du site" },
  { id: "hero", label: "Accueil (Hero)" },
  { id: "portfolio", label: "Réalisations" },
  { id: "services", label: "Nos services" },
  { id: "method", label: "Méthode" },
  { id: "expertise", label: "Notre approche" },
  { id: "whyUs", label: "Pourquoi OHIHO" },
  { id: "contact", label: "Votre projet" },
  { id: "footer", label: "Footer" },
  { id: "quotesFormulas", label: "Devis · formules" },
  { id: "quotesForm", label: "Devis · formulaire" },
];

function Field({
  label,
  value,
  onChange,
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  // Champ rectangulaire à coins arrondis (rounded-xl = --radius), filet 1px,
  // focus souligné par le teal interactif.
  const cls =
    "mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/25";
  return (
    <div>
      <label className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={`${cls} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      )}
    </div>
  );
}

// Liste de puces éditée comme un textarea « une ligne = un point ».
function ListField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div>
      <label className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        {label} <span className="opacity-70">(une ligne par point)</span>
      </label>
      <textarea
        value={value.join("\n")}
        onChange={(e) => onChange(e.target.value.split("\n"))}
        rows={Math.max(3, value.length)}
        className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/25"
      />
    </div>
  );
}

// Sélecteur de couleur : nuancier + code hex + retour à la couleur d'origine.
function ColorField({
  label,
  hint,
  value,
  defaultValue,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string;
  defaultValue: string;
  onChange: (v: string) => void;
}) {
  const valid = HEX.test(value);
  const changed = value.toLowerCase() !== defaultValue.toLowerCase();
  return (
    <div className="flex items-end gap-3">
      <input
        type="color"
        value={valid ? value : defaultValue}
        onChange={(e) => onChange(e.target.value)}
        aria-label={`${label} · sélecteur`}
        className="h-10 w-10 shrink-0 cursor-pointer rounded-xl border border-border bg-background p-1"
      />
      <div className="min-w-0 flex-1">
        <label className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          {label}
          {hint && <span className="normal-case tracking-normal opacity-70"> · {hint}</span>}
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className={`mt-2 w-full rounded-xl border bg-background px-3 py-2 font-mono text-sm outline-none transition-colors focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/25 ${
            valid ? "border-border" : "border-red-400"
          }`}
        />
      </div>
      <button
        type="button"
        onClick={() => onChange(defaultValue)}
        disabled={!changed}
        className="btn-outline shrink-0 px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] disabled:opacity-40"
      >
        Réinitialiser
      </button>
    </div>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card-surface p-6">
      <h2 className="text-base font-semibold">{title}</h2>
      {hint && <p className="mt-1 text-xs leading-relaxed text-muted">{hint}</p>}
      {/* Filet 1px en guise de séparateur d'en-tête */}
      <div className="mt-5 border-t border-border pt-5 grid gap-5">{children}</div>
    </section>
  );
}

export default function AdminEditor({ initial }: { initial: SiteContent }) {
  const [content, setContent] = useState<SiteContent>(initial);
  const [active, setActive] = useState<SectionId>("theme");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  function openSection(id: SectionId) {
    setActive(id);
    window.scrollTo({ top: 0 });
  }

  // Patch générique d'une section du contenu.
  function set<K extends keyof SiteContent>(
    key: K,
    patch: Partial<SiteContent[K]>
  ) {
    setContent((c) => ({ ...c, [key]: { ...c[key], ...patch } }));
  }

  // Patch d'un élément dans un tableau d'une section (stats, items, steps…).
  function setItem<
    K extends keyof SiteContent,
    F extends keyof SiteContent[K],
  >(section: K, field: F, index: number, patch: object) {
    setContent((c) => {
      const list = c[section][field] as unknown as object[];
      return {
        ...c,
        [section]: {
          ...c[section],
          [field]: list.map((item, i) =>
            i === index ? { ...item, ...patch } : item
          ),
        },
      };
    });
  }

  // Patch d'une des 4 formules de devis.
  function setFormula(
    key: (typeof FORMULA_KEYS)[number],
    patch: Partial<QuoteFormulaContent>
  ) {
    setContent((c) => ({
      ...c,
      quotes: {
        ...c.quotes,
        formulas: {
          ...c.quotes.formulas,
          [key]: { ...c.quotes.formulas[key], ...patch },
        },
      },
    }));
  }

  async function handleSave() {
    setStatus("saving");
    setError("");
    // Nettoyage des listes « une ligne par point » (lignes vides en cours de
    // frappe) et des couleurs invalides (on retombe sur la valeur par défaut).
    const cleanList = (list: string[]) =>
      list.map((s) => s.trim()).filter(Boolean);
    const theme = { ...content.theme };
    (Object.keys(theme) as (keyof typeof theme)[]).forEach((k) => {
      if (!HEX.test(theme[k])) theme[k] = defaultContent.theme[k];
    });
    const cleaned: SiteContent = {
      ...content,
      theme,
      expertise: {
        ...content.expertise,
        coverage: cleanList(content.expertise.coverage),
      },
      quotes: {
        ...content.quotes,
        colors: (() => {
          const qc = { ...content.quotes.colors };
          (Object.keys(qc) as (keyof typeof qc)[]).forEach((k) => {
            if (!HEX.test(qc[k])) qc[k] = defaultContent.quotes.colors[k];
          });
          return qc;
        })(),
        budgets: cleanList(content.quotes.budgets),
        timelines: cleanList(content.quotes.timelines),
        formulas: {
          landing: {
            ...content.quotes.formulas.landing,
            options: cleanList(content.quotes.formulas.landing.options),
          },
          intermediaire: {
            ...content.quotes.formulas.intermediaire,
            options: cleanList(content.quotes.formulas.intermediaire.options),
          },
          refonte: {
            ...content.quotes.formulas.refonte,
            options: cleanList(content.quotes.formulas.refonte.options),
          },
          application: {
            ...content.quotes.formulas.application,
            options: cleanList(content.quotes.formulas.application.options),
          },
        },
      },
    };
    try {
      const result = await saveContent(cleaned);
      if (result.ok) {
        setContent(cleaned);
        setStatus("saved");
        window.setTimeout(() => setStatus("idle"), 2500);
      } else {
        setStatus("error");
        setError(result.error ?? "Enregistrement impossible.");
      }
    } catch {
      setStatus("error");
      setError("Une erreur est survenue, veuillez réessayer.");
    }
  }

  const { theme, hero, portfolio, services, method, expertise, whyUs, contact, footer, quotes } =
    content;
  const dTheme = defaultContent.theme;

  return (
    <div className="pb-24 lg:grid lg:grid-cols-[200px_1fr] lg:items-start lg:gap-8">
      {/* Menu des sections : colonne fixe à gauche sur grand écran,
          rangée déroulante au-dessus du contenu sur mobile. */}
      <nav
        className="sticky top-[57px] z-30 -mx-6 mb-6 flex gap-2 overflow-x-auto border-b border-border bg-background px-6 py-3
          lg:top-24 lg:z-auto lg:m-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0"
      >
        {MENU.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => openSection(item.id)}
            aria-current={active === item.id ? "true" : undefined}
            className={`shrink-0 border-b-2 px-3 py-2 text-left font-mono text-xs uppercase tracking-[0.14em] transition-colors lg:border-b-0 lg:border-l-2 ${
              active === item.id
                ? "border-accent-cyan text-accent-cyan"
                : "border-transparent text-muted hover:border-border hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="grid gap-6">
        {active === "theme" && (
          <Section
            title="Couleurs du site"
            hint="Le site utilise une palette de nuit bleu-teal et le trio de marque du logo (bleu ciel, teal, émeraude). Chaque couleur peut revenir à sa valeur d'origine avec « Réinitialiser »."
          >
            <ColorField
              label="Accent teal"
              hint="boutons, liens, filets actifs"
              value={theme.accent}
              defaultValue={dTheme.accent}
              onChange={(v) => set("theme", { accent: v })}
            />
            <ColorField
              label="Fond nuit"
              hint="le fond général du site"
              value={theme.darkBackground}
              defaultValue={dTheme.darkBackground}
              onChange={(v) => set("theme", { darkBackground: v })}
            />
            <ColorField
              label="Surface des panneaux"
              hint="cartes et blocs posés sur le fond"
              value={theme.darkSurface}
              defaultValue={dTheme.darkSurface}
              onChange={(v) => set("theme", { darkSurface: v })}
            />
            <ColorField
              label="Bandeau du header"
              value={theme.headerBg}
              defaultValue={dTheme.headerBg}
              onChange={(v) => set("theme", { headerBg: v })}
            />
            <ColorField
              label="Nuit profonde"
              hint="réalisations, panneau de l'espace client"
              value={theme.cardDark}
              defaultValue={dTheme.cardDark}
              onChange={(v) => set("theme", { cardDark: v })}
            />
          </Section>
        )}

        {active === "hero" && (
          <Section
            title="Section d'accueil (Hero)"
            hint="Le grand bandeau en haut de la page d'accueil."
          >
            <Field
              label="Badge (petite pilule au-dessus du titre)"
              value={hero.badge}
              onChange={(v) => set("hero", { badge: v })}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Titre · début"
                value={hero.titleLead}
                onChange={(v) => set("hero", { titleLead: v })}
              />
              <Field
                label="Titre · partie au dégradé de marque"
                value={hero.titleAccent}
                onChange={(v) => set("hero", { titleAccent: v })}
              />
            </div>
            <Field
              label="Sous-titre"
              value={hero.subtitle}
              onChange={(v) => set("hero", { subtitle: v })}
              textarea
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Bouton principal"
                value={hero.ctaPrimary}
                onChange={(v) => set("hero", { ctaPrimary: v })}
              />
              <Field
                label="Bouton secondaire"
                value={hero.ctaSecondary}
                onChange={(v) => set("hero", { ctaSecondary: v })}
              />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                Les 4 cartes de chiffres clés
              </p>
              <div className="mt-2 grid gap-3">
                {hero.stats.map((stat, i) => (
                  <div key={i} className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) =>
                        setItem("hero", "stats", i, { value: e.target.value })
                      }
                      placeholder="Valeur (ex. Sur mesure)"
                      aria-label={`Carte ${i + 1} · valeur`}
                      className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/25"
                    />
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) =>
                        setItem("hero", "stats", i, { label: e.target.value })
                      }
                      placeholder="Libellé (ex. Approche)"
                      aria-label={`Carte ${i + 1} · libellé`}
                      className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/25"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Section>
        )}

        {active === "portfolio" && (
          <Section
            title="Réalisations"
            hint="L'en-tête de la section et l'encart devis en bas. Les cartes projets restent gérées dans le code."
          >
            <Field
              label="Petit titre (kicker)"
              value={portfolio.kicker}
              onChange={(v) => set("portfolio", { kicker: v })}
            />
            <Field
              label="Titre"
              value={portfolio.title}
              onChange={(v) => set("portfolio", { title: v })}
            />
            <Field
              label="Sous-titre"
              value={portfolio.subtitle}
              onChange={(v) => set("portfolio", { subtitle: v })}
              textarea
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Phrase de l'encart devis"
                value={portfolio.ctaText}
                onChange={(v) => set("portfolio", { ctaText: v })}
              />
              <Field
                label="Bouton de l'encart devis"
                value={portfolio.ctaButton}
                onChange={(v) => set("portfolio", { ctaButton: v })}
              />
            </div>
          </Section>
        )}

        {active === "services" && (
          <Section
            title="Nos services"
            hint="L'en-tête de la section. Les 4 cartes reprennent automatiquement les formules du devis · modifiez-les dans « Devis · formules »."
          >
            <Field
              label="Petit titre (kicker)"
              value={services.kicker}
              onChange={(v) => set("services", { kicker: v })}
            />
            <Field
              label="Titre"
              value={services.title}
              onChange={(v) => set("services", { title: v })}
            />
            <Field
              label="Sous-titre"
              value={services.subtitle}
              onChange={(v) => set("services", { subtitle: v })}
              textarea
            />
            <button
              type="button"
              onClick={() => openSection("quotesFormulas")}
              className="btn-outline w-fit px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-accent-cyan"
            >
              Modifier les 4 formules →
            </button>
          </Section>
        )}

        {active === "method" && (
          <Section title="Méthode" hint="Les 4 étapes « Comment nous travaillons ensemble ».">
            <Field
              label="Petit titre (kicker)"
              value={method.kicker}
              onChange={(v) => set("method", { kicker: v })}
            />
            <Field
              label="Titre"
              value={method.title}
              onChange={(v) => set("method", { title: v })}
            />
            {method.steps.map((step, i) => (
              <div key={i} className="rounded-xl border border-border bg-surface-2/40 p-4">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-cyan">
                  Étape {String(i + 1).padStart(2, "0")}
                </p>
                <div className="mt-3 grid gap-4">
                  <Field
                    label="Titre"
                    value={step.title}
                    onChange={(v) => setItem("method", "steps", i, { title: v })}
                  />
                  <Field
                    label="Description"
                    value={step.description}
                    onChange={(v) =>
                      setItem("method", "steps", i, { description: v })
                    }
                    textarea
                  />
                </div>
              </div>
            ))}
          </Section>
        )}

        {active === "expertise" && (
          <Section title="Notre approche (Expertise)">
            <Field
              label="Petit titre (kicker)"
              value={expertise.kicker}
              onChange={(v) => set("expertise", { kicker: v })}
            />
            <Field
              label="Titre"
              value={expertise.title}
              onChange={(v) => set("expertise", { title: v })}
            />
            <Field
              label="Paragraphe 1"
              value={expertise.paragraph1}
              onChange={(v) => set("expertise", { paragraph1: v })}
              textarea
            />
            <Field
              label="Paragraphe 2"
              value={expertise.paragraph2}
              onChange={(v) => set("expertise", { paragraph2: v })}
              textarea
            />
            <Field
              label="Titre du panneau de droite"
              value={expertise.panelTitle}
              onChange={(v) => set("expertise", { panelTitle: v })}
            />
            <ListField
              label="Ce qu'on couvre"
              value={expertise.coverage}
              onChange={(v) => set("expertise", { coverage: v })}
            />
          </Section>
        )}

        {active === "whyUs" && (
          <Section title="Pourquoi OHIHO" hint="L'en-tête et les 4 cartes de valeurs.">
            <Field
              label="Petit titre (kicker)"
              value={whyUs.kicker}
              onChange={(v) => set("whyUs", { kicker: v })}
            />
            <Field
              label="Titre"
              value={whyUs.title}
              onChange={(v) => set("whyUs", { title: v })}
            />
            {whyUs.values.map((value, i) => (
              <div key={i} className="rounded-xl border border-border bg-surface-2/40 p-4">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-cyan">Carte {i + 1}</p>
                <div className="mt-3 grid gap-4">
                  <Field
                    label="Titre"
                    value={value.title}
                    onChange={(v) => setItem("whyUs", "values", i, { title: v })}
                  />
                  <Field
                    label="Description"
                    value={value.description}
                    onChange={(v) =>
                      setItem("whyUs", "values", i, { description: v })
                    }
                    textarea
                  />
                </div>
              </div>
            ))}
          </Section>
        )}

        {active === "contact" && (
          <Section
            title="Votre projet (bas de page d'accueil)"
            hint="La section d'appel à l'action avant le footer."
          >
            <Field
              label="Petit titre (kicker)"
              value={contact.kicker}
              onChange={(v) => set("contact", { kicker: v })}
            />
            <Field
              label="Titre"
              value={contact.title}
              onChange={(v) => set("contact", { title: v })}
            />
            <Field
              label="Sous-titre"
              value={contact.subtitle}
              onChange={(v) => set("contact", { subtitle: v })}
              textarea
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Email de contact"
                value={contact.email}
                onChange={(v) => set("contact", { email: v })}
              />
              <Field
                label="Note (délai de réponse)"
                value={contact.responseNote}
                onChange={(v) => set("contact", { responseNote: v })}
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Titre de la carte devis"
                value={contact.cardTitle}
                onChange={(v) => set("contact", { cardTitle: v })}
              />
              <Field
                label="Bouton de la carte devis"
                value={contact.cardCta}
                onChange={(v) => set("contact", { cardCta: v })}
              />
            </div>
            <Field
              label="Texte de la carte devis"
              value={contact.cardText}
              onChange={(v) => set("contact", { cardText: v })}
              textarea
            />
          </Section>
        )}

        {active === "footer" && (
          <Section title="Footer" hint="Le pied de page, présent sur tout le site.">
            <Field
              label="Phrase de présentation (sous le logo)"
              value={footer.tagline}
              onChange={(v) => set("footer", { tagline: v })}
              textarea
            />
            <Field
              label="Mention en bas à droite"
              value={footer.bottomNote}
              onChange={(v) => set("footer", { bottomNote: v })}
            />
          </Section>
        )}

        {active === "quotesFormulas" && (
          <Section
            title="Devis · les 4 formules"
            hint="Les cartes proposées à l'étape 1 de la demande de devis. Le nom de la formule apparaît aussi dans « Mes devis » et dans l'email de pré-devis."
          >
            {FORMULA_KEYS.map((key) => {
              const f = quotes.formulas[key];
              return (
                <div key={key} className="rounded-xl border border-border bg-surface-2/40 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-cyan">{f.label}</p>
                  <div className="mt-3 grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        label="Nom de la formule"
                        value={f.label}
                        onChange={(v) => setFormula(key, { label: v })}
                      />
                      <Field
                        label="Accroche (petit titre en accent)"
                        value={f.tagline}
                        onChange={(v) => setFormula(key, { tagline: v })}
                      />
                    </div>
                    <Field
                      label="Description"
                      value={f.description}
                      onChange={(v) => setFormula(key, { description: v })}
                      textarea
                    />
                    <Field
                      label="Exemples (ligne en italique)"
                      value={f.examples}
                      onChange={(v) => setFormula(key, { examples: v })}
                    />
                    <ListField
                      label="Options à cocher"
                      value={f.options}
                      onChange={(v) => setFormula(key, { options: v })}
                    />
                  </div>
                </div>
              );
            })}
          </Section>
        )}

        {active === "quotesForm" && (
          <Section
            title="Devis · formulaire et suivi"
            hint="Les textes et couleurs de l'assistant de demande de devis, et la page « Mes devis »."
          >
            <div className="rounded-xl border border-border bg-surface-2/40 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-cyan">
                Couleurs du formulaire (les deux étapes + récapitulatif)
              </p>
              <div className="mt-3 grid gap-4">
                <ColorField
                  label="Fond des cartes"
                  hint="cartes de formule et récapitulatif"
                  value={quotes.colors.cardBg}
                  defaultValue={defaultContent.quotes.colors.cardBg}
                  onChange={(v) =>
                    set("quotes", { colors: { ...quotes.colors, cardBg: v } })
                  }
                />
                <ColorField
                  label="Textes principaux"
                  hint="titres"
                  value={quotes.colors.text}
                  defaultValue={defaultContent.quotes.colors.text}
                  onChange={(v) =>
                    set("quotes", { colors: { ...quotes.colors, text: v } })
                  }
                />
                <ColorField
                  label="Textes secondaires"
                  hint="descriptions, libellés des champs"
                  value={quotes.colors.textMuted}
                  defaultValue={defaultContent.quotes.colors.textMuted}
                  onChange={(v) =>
                    set("quotes", { colors: { ...quotes.colors, textMuted: v } })
                  }
                />
                <ColorField
                  label="Couleur d'accent"
                  hint="accroche, carte sélectionnée, options cochées"
                  value={quotes.colors.accent}
                  defaultValue={defaultContent.quotes.colors.accent}
                  onChange={(v) =>
                    set("quotes", { colors: { ...quotes.colors, accent: v } })
                  }
                />
                <ColorField
                  label="Maquettes · fond d'écran"
                  value={quotes.colors.previewScreen}
                  defaultValue={defaultContent.quotes.colors.previewScreen}
                  onChange={(v) =>
                    set("quotes", {
                      colors: { ...quotes.colors, previewScreen: v },
                    })
                  }
                />
                <ColorField
                  label="Maquettes · blocs de contenu"
                  value={quotes.colors.previewBlocks}
                  defaultValue={defaultContent.quotes.colors.previewBlocks}
                  onChange={(v) =>
                    set("quotes", {
                      colors: { ...quotes.colors, previewBlocks: v },
                    })
                  }
                />
                <ColorField
                  label="Maquettes · éléments animés"
                  value={quotes.colors.previewAccent}
                  defaultValue={defaultContent.quotes.colors.previewAccent}
                  onChange={(v) =>
                    set("quotes", {
                      colors: { ...quotes.colors, previewAccent: v },
                    })
                  }
                />
                {/* Aperçu en direct de la maquette avec les couleurs choisies */}
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                    Aperçu en direct
                  </p>
                  <div className="mt-2 max-w-sm overflow-hidden rounded-xl border border-border">
                    <FormulaPreview
                      type="application"
                      colors={{
                        screen: quotes.colors.previewScreen,
                        blocks: quotes.colors.previewBlocks,
                        accent: quotes.colors.previewAccent,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Field
              label="Titre de l'étape 1"
              value={quotes.step1Title}
              onChange={(v) => set("quotes", { step1Title: v })}
            />
            <Field
              label="Sous-titre de l'étape 1"
              value={quotes.step1Subtitle}
              onChange={(v) => set("quotes", { step1Subtitle: v })}
            />
            <Field
              label="Sous-titre de l'étape 2 (détails)"
              value={quotes.step2Subtitle}
              onChange={(v) => set("quotes", { step2Subtitle: v })}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <ListField
                label="Choix de budget"
                value={quotes.budgets}
                onChange={(v) => set("quotes", { budgets: v })}
              />
              <ListField
                label="Choix de délai"
                value={quotes.timelines}
                onChange={(v) => set("quotes", { timelines: v })}
              />
            </div>
            <div className="rounded-xl border border-border bg-surface-2/40 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-cyan">
                Page « Mes devis »
              </p>
              <div className="mt-3 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Titre"
                    value={quotes.listTitle}
                    onChange={(v) => set("quotes", { listTitle: v })}
                  />
                  <Field
                    label="Sous-titre"
                    value={quotes.listSubtitle}
                    onChange={(v) => set("quotes", { listSubtitle: v })}
                  />
                </div>
                <Field
                  label="Message quand il n'y a aucun devis"
                  value={quotes.emptyText}
                  onChange={(v) => set("quotes", { emptyText: v })}
                  textarea
                />
              </div>
            </div>
            <div className="rounded-xl border border-border bg-surface-2/40 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-cyan">
                Libellés des statuts
              </p>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <Field
                  label="Demande reçue"
                  value={quotes.statusLabels.received}
                  onChange={(v) =>
                    set("quotes", {
                      statusLabels: { ...quotes.statusLabels, received: v },
                    })
                  }
                />
                <Field
                  label="En cours d'étude"
                  value={quotes.statusLabels.in_review}
                  onChange={(v) =>
                    set("quotes", {
                      statusLabels: { ...quotes.statusLabels, in_review: v },
                    })
                  }
                />
                <Field
                  label="Devis envoyé"
                  value={quotes.statusLabels.quoted}
                  onChange={(v) =>
                    set("quotes", {
                      statusLabels: { ...quotes.statusLabels, quoted: v },
                    })
                  }
                />
                <Field
                  label="Clôturé"
                  value={quotes.statusLabels.closed}
                  onChange={(v) =>
                    set("quotes", {
                      statusLabels: { ...quotes.statusLabels, closed: v },
                    })
                  }
                />
              </div>
            </div>
          </Section>
        )}
      </div>

      {/* Barre d'enregistrement fixe en bas */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-[var(--header-bg)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
          <p className="text-sm text-[var(--header-muted)]">
            {status === "saved" && "✓ Modifications enregistrées"}
            {status === "error" && <span className="text-red-400">{error}</span>}
            {(status === "idle" || status === "saving") &&
              "Les changements ne sont visibles qu'après enregistrement."}
          </p>
          <button
            type="button"
            onClick={handleSave}
            disabled={status === "saving"}
            className="btn-accent shrink-0 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.14em] disabled:opacity-50"
          >
            {status === "saving" ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}
