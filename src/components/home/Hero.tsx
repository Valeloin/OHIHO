import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { OFFRES, offreHref } from "@/lib/offres";
import { SITE } from "@/lib/site";

// Hero refait en entier le 2026-08-26, sur deux colonnes et SANS BANDEAU.
//
// Les quatre versions précédentes posaient toutes le hero sur un aplat coloré
// pleine largeur, et c'est cet aplat qui a été rejeté à chaque fois, quelle
// que soit sa teinte : bleu profond (« orageux »), bleu-cyan vif, dégradé des
// boutons, ciel pâle. Le problème n'était donc pas la couleur mais le
// bandeau. Il n'y en a plus.
//
// Le hero vit maintenant sur le fond du site. La couleur de marque revient
// par touches — halos diffus, bouton principal, filets — au lieu d'occuper
// tout l'écran.
//
// Composition : la promesse à gauche, ce qu'on vend à droite. Le visiteur qui
// ne verra que cet écran a les deux.

// Un glyphe par formule. Quatre icônes ne justifient pas d'embarquer une
// bibliothèque : un tracé prend la couleur du texte et reste net partout.
const ICONES: Record<string, string> = {
  "landing-page": "M4 5h16v14H4zM8 9h8M8 13h4",
  "site-vitrine": "M8 3h12v12M4 8h12v12H4z",
  refonte: "M20 12a8 8 0 1 1-2.3-5.6M20 4v4h-4",
  "application-web": "M4 4h7v7H4zM13 4h7v4h-7zM13 11h7v9h-7zM4 14h7v6H4z",
  defaut: "M4 5h16v14H4z",
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Halos de marque, très diffus : c'est ce qui remplace le bandeau. Ils
          teintent le fond sans imposer de couleur au texte. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[560px] w-[900px] max-w-full opacity-[0.18]"
        style={{
          background: "radial-gradient(closest-side, #22d3c4, transparent 78%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-24 h-[420px] w-[620px] opacity-[0.14]"
        style={{
          background: "radial-gradient(closest-side, #38bdf8, transparent 76%)",
        }}
      />

      <div className="shell relative grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:py-24">
        <Reveal>
          <p className="pill">{SITE.responseNote}</p>

          <h1 className="h-display mt-6 max-w-[15ch]">
            Votre savoir-faire mérite mieux qu&apos;un{" "}
            <span className="accent-text">site modèle.</span>
          </h1>

          <p className="lede mt-6">
            Sites vitrines, refontes et applications web, écrits sur mesure pour
            votre activité — jamais achetés sur étagère.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="#contact" className="btn btn-primary">
              Demander un devis
            </Link>
            <Link href="#realisations" className="btn btn-outline">
              Voir les réalisations
            </Link>
          </div>
        </Reveal>

        <Reveal delay={120}>
          {/* Ce qu'on vend, en LISTE plutôt qu'en grille : quatre lignes se
              parcourent d'un regard, là où quatre cartes demandent quatre
              arrêts. */}
          <div
            className="overflow-hidden rounded-xl border"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <div
              className="flex items-center justify-between border-b px-5 py-3.5"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-alt)",
              }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                Ce qu&apos;on fait
              </span>
              <Link
                href="#offres"
                className="text-[13px] font-semibold"
                style={{ color: "var(--accent-text)" }}
              >
                Tout voir
              </Link>
            </div>

            <ul>
              {OFFRES.map((offre, index) => (
                <li key={offre.slug}>
                  <Link
                    href={offreHref(offre.slug)}
                    className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-alt"
                    style={
                      index > 0
                        ? { borderTop: "1px solid var(--line)" }
                        : undefined
                    }
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        background:
                          "color-mix(in srgb, var(--accent) 14%, transparent)",
                        color: "var(--accent-text)",
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="19"
                        height="19"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d={ICONES[offre.slug] ?? ICONES.defaut} />
                      </svg>
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold">
                        {offre.label}
                      </span>
                      <span className="block text-[13px] text-ink-muted">
                        {offre.tagline}
                      </span>
                    </span>

                    <span className="shrink-0 text-right">
                      <span className="block text-[13px] font-semibold">
                        {offre.delai}
                      </span>
                      <span
                        className="block text-[12px] transition-transform duration-200 group-hover:translate-x-0.5"
                        style={{ color: "var(--accent-text)" }}
                      >
                        Le détail →
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
