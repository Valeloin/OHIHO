import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
// Les vignettes du site public utilisent les scènes en CSS pur (plus abouties
// et sans JavaScript). `FormulaPreview`, piloté par les 3 couleurs éditables
// du CMS, reste en service dans le tunnel de devis et l'aperçu de l'admin.
import ServiceScene from "@/components/motion/ServiceScene";
import { formulasFrom } from "@/lib/quotes";
import type { ServicesContent, QuotesContent } from "@/lib/content/types";

// Les cartes reprennent les 4 formules du parcours de devis (mêmes vignettes
// animées, mêmes textes — édités dans l'admin sous « Devis — formules ») :
// ce que le site vend = ce que le devis propose. Chaque carte mène au
// parcours de devis (ou à l'inscription si le visiteur n'est pas connecté).
export default function Services({
  data,
  quotes,
  devisHref,
}: {
  data: ServicesContent;
  quotes: QuotesContent;
  devisHref: string;
}) {
  const formulas = formulasFrom(quotes);

  return (
    <section id="services" className="relative overflow-hidden border-t border-border">
      <SectionBackdrop />
      <div className="relative mx-auto max-w-6xl px-6 py-28 sm:py-32">
        {/* En-tête au patron commun : libellé mono + filet, titre à chasse
            serrée aligné à gauche, sous-titre à largeur de lecture. */}
        <Reveal>
          <span className="kicker">{data.kicker}</span>
          <h2 className="mt-6 max-w-3xl text-3xl font-semibold tracking-display text-balance sm:text-5xl">
            {data.title}
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted">
            {data.subtitle}
          </p>
        </Reveal>
        <div className="mt-12 h-px rule-fade" />

        {/* Les 4 formules alignées sur une seule rangée (dès lg). Les vignettes
            animées occupent toute la largeur de la carte (pleine largeur, sans
            marge intérieure) pour rester bien lisibles malgré les 4 colonnes ;
            `overflow-hidden` les recoupe sur l'arrondi des coins hauts. */}
        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {formulas.map((formula, i) => (
            <RevealItem key={formula.type} hover className="h-full">
              <Link
                href={devisHref}
                className="card-surface flex h-full flex-col overflow-hidden transition-colors hover:border-accent-cyan/50"
              >
                <div className="aspect-[400/220] w-full">
                  <ServiceScene type={formula.type} />
                </div>
                <div className="flex flex-1 flex-col border-t border-border p-5">
                  {/* Index de formule en mono teal de marque : repère éditorial. */}
                  <span className="font-mono text-xs text-brand-teal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                    {formula.tagline}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-display">
                    {formula.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {formula.description}
                  </p>
                  {/* Exemple détaché par un filet, en bas de carte. */}
                  <p className="mt-auto border-t border-border pt-4 text-xs leading-relaxed text-muted">
                    {formula.examples}
                  </p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
