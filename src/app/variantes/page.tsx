import type { Metadata } from "next";
import Link from "next/link";
import { OFFRES, offreHref } from "@/lib/offres";
import { SITE } from "@/lib/site";

// PAGE TEMPORAIRE — deux variantes du hero, à comparer à taille réelle.
//
// Elle utilise les vrais tokens et les vraies données : ce qu'on voit ici est
// exactement ce que donnerait le site. À SUPPRIMER une fois le choix fait,
// avec son entrée dans robots.ts.
export const metadata: Metadata = {
  title: "Variantes du hero",
  robots: { index: false, follow: false },
};

const ICONES: Record<string, string> = {
  "landing-page": "M4 5h16v14H4zM8 9h8M8 13h4",
  "site-vitrine": "M8 3h12v12M4 8h12v12H4z",
  refonte: "M20 12a8 8 0 1 1-2.3-5.6M20 4v4h-4",
  "application-web": "M4 4h7v7H4zM13 4h7v4h-7zM13 11h7v9h-7zM4 14h7v6H4z",
  defaut: "M4 5h16v14H4z",
};

function Icone({ slug, taille = 19 }: { slug: string; taille?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={taille}
      height={taille}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={ICONES[slug] ?? ICONES.defaut} />
    </svg>
  );
}

function Etiquette({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-y py-3" style={{ borderColor: "var(--line)" }}>
      <p className="shell font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
        {children}
      </p>
    </div>
  );
}

// ---------- Variante 2 : centrée, offres en cartes compactes ----------
function VarianteCentree() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[1000px] max-w-full -translate-x-1/2 opacity-[0.16]"
        style={{
          background: "radial-gradient(closest-side, #22d3c4, transparent 76%)",
        }}
      />
      <div className="shell relative py-16 text-center sm:py-24">
        <p className="pill mx-auto">{SITE.responseNote}</p>

        <h1 className="h-display mx-auto mt-6 max-w-[16ch]">
          Votre savoir-faire mérite mieux qu&apos;un{" "}
          <span className="accent-text">site modèle.</span>
        </h1>

        <p className="lede mx-auto mt-6 max-w-[54ch] text-center">
          Sites vitrines, refontes et applications web, écrits sur mesure pour
          votre activité — jamais achetés sur étagère.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="#" className="btn btn-primary">
            Demander un devis
          </Link>
          <Link href="#" className="btn btn-outline">
            Voir les réalisations
          </Link>
        </div>

        <ul className="mt-14 grid gap-4 text-left sm:grid-cols-2 xl:grid-cols-4">
          {OFFRES.map((offre) => (
            <li key={offre.slug}>
              <Link
                href={offreHref(offre.slug)}
                className="card group flex h-full flex-col p-5"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{
                    background:
                      "color-mix(in srgb, var(--accent) 14%, transparent)",
                    color: "var(--accent-text)",
                  }}
                >
                  <Icone slug={offre.slug} />
                </span>
                <span className="mt-4 text-[15px] font-semibold">
                  {offre.label}
                </span>
                <span className="mt-1 flex-1 text-[13px] text-ink-muted">
                  {offre.tagline}
                </span>
                <span
                  className="mt-4 flex items-center justify-between border-t pt-3 text-[13px]"
                  style={{ borderColor: "var(--line)" }}
                >
                  <span className="font-semibold">{offre.delai}</span>
                  <span
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                    style={{ color: "var(--accent-text)" }}
                    aria-hidden
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------- Variante 3 : texte large, offres en frise sous un filet ----------
function VarianteEditoriale() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-[520px] w-[760px] opacity-[0.16]"
        style={{
          background: "radial-gradient(closest-side, #38bdf8, transparent 76%)",
        }}
      />
      <div className="shell relative py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="pill">{SITE.responseNote}</p>
            <h1 className="h-display mt-6 max-w-[14ch]">
              Votre savoir-faire mérite mieux qu&apos;un{" "}
              <span className="accent-text">site modèle.</span>
            </h1>
          </div>
          <div>
            <p className="lede">
              Sites vitrines, refontes et applications web, écrits sur mesure
              pour votre activité — jamais achetés sur étagère.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="#" className="btn btn-primary">
                Demander un devis
              </Link>
              <Link href="#" className="btn btn-outline">
                Voir les réalisations
              </Link>
            </div>
          </div>
        </div>

        <ul
          className="mt-16 grid border-t sm:grid-cols-2 xl:grid-cols-4"
          style={{ borderColor: "var(--line)" }}
        >
          {OFFRES.map((offre) => (
            <li key={offre.slug}>
              <Link
                href={offreHref(offre.slug)}
                className="group flex h-full flex-col py-7 pr-6 transition-transform duration-200 hover:-translate-y-1"
              >
                <span style={{ color: "var(--accent-text)" }}>
                  <Icone slug={offre.slug} taille={22} />
                </span>
                <span className="mt-4 text-[17px] font-semibold">
                  {offre.label}
                </span>
                <span className="mt-1 flex-1 text-[13px] text-ink-muted">
                  {offre.tagline}
                </span>
                <span className="mt-4 text-[13px] font-semibold">
                  {offre.delai}{" "}
                  <span
                    className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                    style={{ color: "var(--accent-text)" }}
                    aria-hidden
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Variantes() {
  return (
    <main>
      <Etiquette>
        Variante 2 — centrée, offres en cartes
      </Etiquette>
      <VarianteCentree />

      <Etiquette>
        Variante 3 — éditoriale, offres en frise sous un filet
      </Etiquette>
      <VarianteEditoriale />

      <Etiquette>
        Variante 1 — celle en ligne : voir la page d&apos;accueil
      </Etiquette>
      <div className="shell py-10">
        <Link href="/" className="btn btn-outline">
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
