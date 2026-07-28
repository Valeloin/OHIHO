"use client";

import { useState } from "react";
import type { SiteContent, ServiceOfferContent } from "@/lib/content/types";
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

// Clés techniques des 4 offres de services (ordre d'affichage).
const OFFER_KEYS = [
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
];

function Field({
  label,
  value,
  onChange,
  textarea = false,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  hint?: string;
}) {
  // Champ commun à tout le site (voir `.field` dans globals.css) : il passe
  // notamment à 16 px sur mobile pour ne pas déclencher le zoom de Safari iOS.
  const cls = "field";
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
      {hint && <p className="mt-2 text-xs text-muted">{hint}</p>}
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
        className="h-12 w-12 shrink-0 cursor-pointer rounded-xl border border-border bg-background p-1"
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
          className={`field font-mono ${valid ? "" : "!border-red-400"}`}
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

  // Patch d'une des 4 offres de services.
  function setOffer(
    key: (typeof OFFER_KEYS)[number],
    patch: Partial<ServiceOfferContent>
  ) {
    setContent((c) => ({
      ...c,
      services: {
        ...c.services,
        offers: {
          ...c.services.offers,
          [key]: { ...c.services.offers[key], ...patch },
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
      services: {
        ...content.services,
        offers: {
          landing: cleanOffer(content.services.offers.landing),
          intermediaire: cleanOffer(content.services.offers.intermediaire),
          refonte: cleanOffer(content.services.offers.refonte),
          application: cleanOffer(content.services.offers.application),
        },
      },
      method: {
        ...content.method,
        steps: content.method.steps.map((step) => ({
          ...step,
          points: cleanList(step.points),
        })),
      },
      expertise: {
        ...content.expertise,
        coverage: cleanList(content.expertise.coverage),
      },
    };

    function cleanOffer(offer: ServiceOfferContent): ServiceOfferContent {
      return {
        ...offer,
        features: cleanList(offer.features),
        useCases: cleanList(offer.useCases),
      };
    }
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
        /* `top` calé sur la hauteur RÉELLE du bandeau (--header-h), et non sur
           un 57 px codé en dur qui laissait la rangée passer sous le header. */
        className="sticky top-[var(--header-h)] z-30 -mx-6 mb-6 flex gap-2 overflow-x-auto border-b border-border bg-background px-6 py-3
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
            hint="L'en-tête de la section et l'encart d'inscription en bas. Les cartes projets restent gérées dans le code."
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
                label="Phrase de l'encart"
                value={portfolio.ctaText}
                onChange={(v) => set("portfolio", { ctaText: v })}
              />
              <Field
                label="Bouton de l'encart"
                value={portfolio.ctaButton}
                onChange={(v) => set("portfolio", { ctaButton: v })}
              />
            </div>
          </Section>
        )}

        {active === "services" && (
          <Section
            title="Nos services"
            hint="L'en-tête de la section, puis les 4 cartes (mêmes vignettes animées, textes indépendants)."
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
            {OFFER_KEYS.map((key) => {
              const offer = services.offers[key];
              return (
                <div key={key} className="rounded-xl border border-border bg-surface-2/40 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-cyan">{offer.label}</p>
                  <div className="mt-3 grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        label="Nom de l'offre"
                        value={offer.label}
                        onChange={(v) => setOffer(key, { label: v })}
                      />
                      <Field
                        label="Accroche (petit titre en accent)"
                        value={offer.tagline}
                        onChange={(v) => setOffer(key, { tagline: v })}
                      />
                    </div>
                    <Field
                      label="Description"
                      value={offer.description}
                      onChange={(v) => setOffer(key, { description: v })}
                      textarea
                    />
                    <Field
                      label="Introduction de la page dédiée"
                      value={offer.pageIntro}
                      onChange={(v) => setOffer(key, { pageIntro: v })}
                      textarea
                      hint={`Le paragraphe d'ouverture de /services/… — propre à chaque formule.`}
                    />
                    <ListField
                      label="Ce qui est inclus"
                      value={offer.features}
                      onChange={(v) => setOffer(key, { features: v })}
                    />
                    <ListField
                      label="Pour qui ?"
                      value={offer.useCases}
                      onChange={(v) => setOffer(key, { useCases: v })}
                    />
                  </div>
                </div>
              );
            })}
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
                  <Field
                    label="Introduction de la page dédiée"
                    value={step.pageIntro}
                    onChange={(v) =>
                      setItem("method", "steps", i, { pageIntro: v })
                    }
                    textarea
                    hint="Le paragraphe d'ouverture de /methode/… — propre à chaque étape."
                  />
                  <ListField
                    label="Concrètement"
                    value={step.points}
                    onChange={(v) => setItem("method", "steps", i, { points: v })}
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
            <Field
              label="Lien LinkedIn (URL complète)"
              value={contact.linkedinUrl}
              onChange={(v) => set("contact", { linkedinUrl: v })}
              hint="Le QR code de la section se régénère automatiquement. Vide = carte LinkedIn masquée."
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Votre nom"
                value={contact.personName}
                onChange={(v) => set("contact", { personName: v })}
                hint="Vide = toute l'identité est masquée sur la carte."
              />
              <Field
                label="Ville / région"
                value={contact.personLocation}
                onChange={(v) => set("contact", { personLocation: v })}
              />
            </div>
            <Field
              label="Votre accroche (sous le nom)"
              value={contact.personRole}
              onChange={(v) => set("contact", { personRole: v })}
              textarea
            />
            <Field
              label="Photo"
              value={contact.personPhoto}
              onChange={(v) => set("contact", { personPhoto: v })}
              hint="Chemin du fichier déposé dans /public, par exemple /valentin.jpg. Vide = vos initiales s'affichent à la place."
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
            className="btn-accent shrink-0 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.14em] disabled:opacity-50"
          >
            {status === "saving" ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}
