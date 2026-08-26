import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { OFFRES, offreHref } from "@/lib/offres";

// Les quatre offres, remontées juste sous le hero (2026-08-26) : sur un
// portable, elles sont visibles sans défiler. C'est le point de la page.
//
// Les cartes ne portent plus le paragraphe de description — il faisait
// descendre la rangée sous la ligne de flottaison. Nom, phrase courte,
// délai : le détail vit sur la page de l'offre.
export default function Offres() {
  return (
    <section id="offres" className="pb-20 pt-2 sm:pb-24">
      <div className="shell">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className="kicker">Ce qu&apos;on fait</p>
            <p className="text-fine">Cliquez une offre pour le détail</p>
          </div>
        </Reveal>

        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OFFRES.map((offre, index) => {
            // Une carte sur fond bleu nuit pour casser la grille blanche.
            const deep = index === 1;

            return (
              <li key={offre.slug}>
                <Reveal delay={index * 70} className="h-full">
                  <Link
                    href={offreHref(offre.slug)}
                    className={`group flex h-full flex-col ${
                      deep ? "card-deep" : "card"
                    } p-6 transition-transform duration-200 hover:-translate-y-1`}
                  >
                    <span
                      className="block h-[3px] w-7 rounded-full"
                      style={{ background: "var(--gradient)" }}
                    />

                    <span className="h-card mt-5 block text-xl">
                      {offre.label}
                    </span>

                    <span
                      className={`mt-2 block flex-1 text-sm leading-relaxed ${
                        deep ? "text-on-deep-muted" : "text-ink-muted"
                      }`}
                    >
                      {offre.tagline}
                    </span>

                    <span
                      className={`mt-5 flex items-center justify-between border-t pt-3.5 text-[13px] ${
                        deep ? "border-white/20" : ""
                      }`}
                      style={deep ? undefined : { borderColor: "var(--line)" }}
                    >
                      <span
                        className={deep ? "text-on-deep-muted" : "text-ink-muted"}
                      >
                        {offre.delai}
                      </span>
                      <span className="inline-block font-medium transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
