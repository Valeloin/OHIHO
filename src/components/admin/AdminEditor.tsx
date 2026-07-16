"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/content/types";
import { saveContent } from "@/lib/content/actions";
import { defaultContent } from "@/lib/content/defaults";

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
  | "footer";

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
  const cls =
    "mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan";
  return (
    <div>
      <label className="text-xs font-medium text-muted">{label}</label>
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
      <label className="text-xs font-medium text-muted">
        {label} <span className="opacity-70">(une ligne par point)</span>
      </label>
      <textarea
        value={value.join("\n")}
        onChange={(e) => onChange(e.target.value.split("\n"))}
        rows={Math.max(3, value.length)}
        className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
      />
    </div>
  );
}

// Sélecteur de couleur : pastille + code hex + retour à la couleur d'origine.
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
        aria-label={`${label} — sélecteur`}
        className="h-10 w-14 shrink-0 cursor-pointer rounded-lg border border-border bg-background p-1"
      />
      <div className="min-w-0 flex-1">
        <label className="text-xs font-medium text-muted">
          {label}
          {hint && <span className="opacity-70"> — {hint}</span>}
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className={`mt-2 w-full rounded-lg border bg-background px-4 py-2 font-mono text-sm outline-none focus:border-accent-cyan ${
            valid ? "border-border" : "border-red-400"
          }`}
        />
      </div>
      <button
        type="button"
        onClick={() => onChange(defaultValue)}
        disabled={!changed}
        className="shrink-0 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted transition-colors hover:text-foreground disabled:opacity-40"
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
    <section className="card-surface rounded-2xl p-6">
      <h2 className="text-base font-semibold">{title}</h2>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
      <div className="mt-5 grid gap-5">{children}</div>
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
      services: {
        ...content.services,
        items: content.services.items.map((it) => ({
          ...it,
          points: cleanList(it.points),
        })),
      },
      expertise: {
        ...content.expertise,
        coverage: cleanList(content.expertise.coverage),
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

  const { theme, hero, portfolio, services, method, expertise, whyUs, contact, footer } =
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
            className={`shrink-0 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
              active === item.id
                ? "bg-accent-cyan/10 text-accent-cyan"
                : "text-muted hover:bg-surface-2 hover:text-foreground"
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
            hint="Chaque couleur peut revenir à sa valeur d'origine avec « Réinitialiser ». Le dégradé du grand titre et les halos suivent automatiquement la couleur d'accent."
          >
            <ColorField
              label="Couleur d'accent"
              hint="boutons, liens, badges (les deux modes)"
              value={theme.accent}
              defaultValue={dTheme.accent}
              onChange={(v) => set("theme", { accent: v })}
            />
            <ColorField
              label="Fond du site"
              hint="mode clair"
              value={theme.background}
              defaultValue={dTheme.background}
              onChange={(v) => set("theme", { background: v })}
            />
            <ColorField
              label="Fond des cartes"
              hint="mode clair"
              value={theme.surface}
              defaultValue={dTheme.surface}
              onChange={(v) => set("theme", { surface: v })}
            />
            <ColorField
              label="Bandeau du header"
              hint="les deux modes"
              value={theme.headerBg}
              defaultValue={dTheme.headerBg}
              onChange={(v) => set("theme", { headerBg: v })}
            />
            <ColorField
              label="Cartes navy"
              hint="réalisations, panneau de l'espace client"
              value={theme.cardDark}
              defaultValue={dTheme.cardDark}
              onChange={(v) => set("theme", { cardDark: v })}
            />
            <ColorField
              label="Fond du site"
              hint="mode sombre"
              value={theme.darkBackground}
              defaultValue={dTheme.darkBackground}
              onChange={(v) => set("theme", { darkBackground: v })}
            />
            <ColorField
              label="Fond des cartes"
              hint="mode sombre"
              value={theme.darkSurface}
              defaultValue={dTheme.darkSurface}
              onChange={(v) => set("theme", { darkSurface: v })}
            />
          </Section>
        )}

        {active === "hero" && (
          <Section
            title="Section d'accueil (Hero)"
            hint="Le grand bandeau en haut de la page d'accueil."
          >
            <Field
              label="Badge (petite pastille au-dessus du titre)"
              value={hero.badge}
              onChange={(v) => set("hero", { badge: v })}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Titre — début"
                value={hero.titleLead}
                onChange={(v) => set("hero", { titleLead: v })}
              />
              <Field
                label="Titre — partie en bleu"
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
              <p className="text-xs font-medium text-muted">
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
                      className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
                    />
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) =>
                        setItem("hero", "stats", i, { label: e.target.value })
                      }
                      placeholder="Libellé (ex. Approche)"
                      className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
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
          <Section title="Nos services" hint="L'en-tête et les 3 cartes de services.">
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
            {services.items.map((item, i) => (
              <div key={i} className="rounded-xl border border-border p-4">
                <p className="text-xs font-semibold text-muted">Carte {i + 1}</p>
                <div className="mt-3 grid gap-4">
                  <Field
                    label="Titre"
                    value={item.title}
                    onChange={(v) => setItem("services", "items", i, { title: v })}
                  />
                  <Field
                    label="Description"
                    value={item.description}
                    onChange={(v) =>
                      setItem("services", "items", i, { description: v })
                    }
                    textarea
                  />
                  <ListField
                    label="Points"
                    value={item.points}
                    onChange={(v) => setItem("services", "items", i, { points: v })}
                  />
                </div>
              </div>
            ))}
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
              <div key={i} className="rounded-xl border border-border p-4">
                <p className="text-xs font-semibold text-muted">
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
              <div key={i} className="rounded-xl border border-border p-4">
                <p className="text-xs font-semibold text-muted">Carte {i + 1}</p>
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
            className="shrink-0 rounded-full bg-accent-cyan px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {status === "saving" ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}
