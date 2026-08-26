import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { OFFRES, offreHref } from "@/lib/offres";

// Les quatre offres, en cartes détaillées.
//
// Le tableau comparatif qui les remplaçait était juste mais froid : on lisait
// une grille, pas une offre. Ici chaque formule montre ce qu'elle contient —
// trois points concrets tirés de `inclus`, plus son délai — et une carte est
// mise en avant, comme sur une grille tarifaire. C'est la section qui vend :
// c'est celle qui a le droit d'être dense.
//
// « Site vitrine » porte la mise en avant : c'est la formule la plus large,
// celle qui convient au plus grand nombre de visiteurs.
const MISE_EN_AVANT = "site-vitrine";

export default function Offres() {
  return (
    <section id="offres" className="section">
      <div className="shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="kicker">Nos offres</p>
          <h2 className="h-section mt-4">De l&apos;idée au site en ligne</h2>
          <p className="lede mx-auto mt-5 text-center">
            Quatre formules, selon ce que votre activité demande aujourd&apos;hui.
            Chacune a sa page : ce qui est inclus, pour qui, en combien de temps.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {OFFRES.map((offre, index) => {
            const enAvant = offre.slug === MISE_EN_AVANT;

            return (
              <li key={offre.slug}>
                <Reveal delay={index * 70} className="h-full">
                  <article
                    className="card relative flex h-full flex-col p-7"
                    style={
                      enAvant
                        ? {
                            borderColor: "var(--accent)",
                            borderWidth: "2px",
                          }
                        : undefined
                    }
                  >
                    {enAvant ? (
                      <span
                        className="absolute -top-3 left-7 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em]"
                        style={{
                          background: "var(--accent-grad)",
                          color: "var(--on-accent)",
                        }}
                      >
                        Le plus demandé
                      </span>
                    ) : null}

                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                      {offre.tagline}
                    </p>
                    <h3 className="h-card mt-2 text-2xl">{offre.label}</h3>

                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                      {offre.description}
                    </p>

                    <ul className="mt-6 flex-1 space-y-2.5">
                      {offre.inclus.slice(0, 3).map((point) => (
                        <li key={point} className="flex gap-2.5 text-[13px] leading-relaxed">
                          <svg
                            viewBox="0 0 20 20"
                            width="15"
                            height="15"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mt-[3px] shrink-0"
                            style={{ color: "var(--accent-text)" }}
                            aria-hidden
                          >
                            <path d="m4 10.5 4 4 8-9" />
                          </svg>
                          {point}
                        </li>
                      ))}
                    </ul>

                    <div
                      className="mt-6 border-t pt-4"
                      style={{ borderColor: "var(--line)" }}
                    >
                      {/* « Délai selon le projet » se suffit à lui-même :
                          le préfixe « En ligne en » ne marche que devant une
                          vraie durée. */}
                      <p className="text-[13px] text-ink-muted">
                        {offre.delai.startsWith("Délai") ? null : "En ligne en "}
                        <span className="font-semibold text-ink">
                          {offre.delai.startsWith("Délai")
                            ? offre.delai
                            : offre.delai.toLowerCase()}
                        </span>
                      </p>
                      <Link
                        href={offreHref(offre.slug)}
                        className={`btn mt-4 w-full ${
                          enAvant ? "btn-primary" : "btn-outline"
                        }`}
                      >
                        Voir le détail
                      </Link>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
