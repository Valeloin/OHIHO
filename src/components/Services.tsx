import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import FormulaPreview from "@/components/portail/FormulaPreview";
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
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        {/* Pas de largeur max sur le titre : il tient sur une seule ligne sur
            desktop. Le sous-titre garde sa largeur de lecture. */}
        <Reveal>
          <h2 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
            {data.kicker}
          </h2>
          <p className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {data.title}
          </p>
          <p className="mt-4 max-w-2xl text-muted">{data.subtitle}</p>
        </Reveal>

        {/* Les 4 formules alignées sur une seule rangée (dès lg). Les vignettes
            animées occupent toute la largeur de la carte (pleine largeur, sans
            marge intérieure) pour rester bien lisibles malgré les 4 colonnes. */}
        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {formulas.map((formula, i) => (
            <RevealItem key={formula.type} hover className="h-full">
              <Link
                href={devisHref}
                className="card-surface flex h-full flex-col overflow-hidden rounded-2xl transition-colors hover:border-accent-cyan/40"
              >
                <div className="aspect-[400/220] w-full">
                  <FormulaPreview type={formula.type} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 font-mono text-xs uppercase tracking-wider text-accent-cyan">
                    {formula.tagline}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{formula.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {formula.description}
                  </p>
                  <p className="mt-auto pt-3 text-xs italic text-muted">
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
