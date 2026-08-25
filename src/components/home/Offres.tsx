import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { OFFRES, offreHref } from "@/lib/offres";

export default function Offres() {
  return (
    <section id="offres" className="section">
      <div className="shell">
        <SectionHead
          kicker="Nos offres"
          title="De l'idée au site en ligne"
          lede="Quatre façons de travailler ensemble, selon ce que votre activité demande aujourd'hui. Chacune a sa page : ce qui est inclus, pour qui, et en combien de temps."
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {OFFRES.map((offre, index) => {
            // Une carte sur fond bleu nuit pour casser la grille blanche. En
            // haut à droite plutôt qu'en dernier : en dernier, elle toucherait
            // le bandeau bleu nuit de la section Méthode juste en dessous.
            const deep = index === 1;

            return (
              <li key={offre.slug}>
                <Reveal delay={index * 80} className="h-full">
                  <Link
                    href={offreHref(offre.slug)}
                    className={`group flex h-full flex-col ${
                      deep ? "card-deep" : "card"
                    } p-7 transition-transform duration-200 hover:-translate-y-1`}
                  >
                    <span
                      className="block h-[3px] w-7 rounded-full"
                      style={{ background: "var(--gradient)" }}
                    />

                    <span
                      className={`mt-5 block font-mono text-[11px] uppercase tracking-[0.16em] ${
                        deep ? "text-on-deep-muted" : "text-ink-muted"
                      }`}
                    >
                      {offre.tagline}
                    </span>

                    <span className="h-card mt-2 block text-2xl">
                      {offre.label}
                    </span>

                    <span
                      className={`mt-3 block flex-1 text-sm leading-relaxed ${
                        deep ? "text-on-deep-muted" : "text-ink-muted"
                      }`}
                    >
                      {offre.description}
                    </span>

                    <span
                      className={`mt-6 flex items-center justify-between border-t pt-4 text-sm ${
                        deep ? "border-white/20" : ""
                      }`}
                      style={deep ? undefined : { borderColor: "var(--line)" }}
                    >
                      <span
                        className={deep ? "text-on-deep-muted" : "text-ink-muted"}
                      >
                        {offre.delai}
                      </span>
                      <span className="font-medium">
                        En savoir plus{" "}
                        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
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
