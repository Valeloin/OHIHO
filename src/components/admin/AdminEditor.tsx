"use client";

import { useState } from "react";
import type { SiteContent, HeroContent } from "@/lib/content/types";
import { saveContent } from "@/lib/content/actions";

type Status = "idle" | "saving" | "saved" | "error";

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
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const hero = content.hero;
  function setHero(patch: Partial<HeroContent>) {
    setContent((c) => ({ ...c, hero: { ...c.hero, ...patch } }));
  }
  function setStat(index: number, patch: Partial<{ value: string; label: string }>) {
    setContent((c) => ({
      ...c,
      hero: {
        ...c.hero,
        stats: c.hero.stats.map((s, i) => (i === index ? { ...s, ...patch } : s)),
      },
    }));
  }

  async function handleSave() {
    setStatus("saving");
    setError("");
    try {
      const result = await saveContent(content);
      if (result.ok) {
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

  return (
    <div className="grid gap-6 pb-24">
      <Section
        title="Section d'accueil (Hero)"
        hint="Le grand bandeau en haut de la page d'accueil."
      >
        <Field
          label="Badge (petite pastille au-dessus du titre)"
          value={hero.badge}
          onChange={(v) => setHero({ badge: v })}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Titre — début"
            value={hero.titleLead}
            onChange={(v) => setHero({ titleLead: v })}
          />
          <Field
            label="Titre — partie en bleu"
            value={hero.titleAccent}
            onChange={(v) => setHero({ titleAccent: v })}
          />
        </div>
        <Field
          label="Sous-titre"
          value={hero.subtitle}
          onChange={(v) => setHero({ subtitle: v })}
          textarea
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Bouton principal"
            value={hero.ctaPrimary}
            onChange={(v) => setHero({ ctaPrimary: v })}
          />
          <Field
            label="Bouton secondaire"
            value={hero.ctaSecondary}
            onChange={(v) => setHero({ ctaSecondary: v })}
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
                  onChange={(e) => setStat(i, { value: e.target.value })}
                  placeholder="Valeur (ex. Sur mesure)"
                  className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
                />
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => setStat(i, { label: e.target.value })}
                  placeholder="Libellé (ex. Approche)"
                  className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent-cyan"
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Barre d'enregistrement fixe en bas */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-[var(--header-bg)]">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-3">
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
