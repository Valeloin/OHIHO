import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import AnimatedGlow from "@/components/motion/AnimatedGlow";
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
      <AnimatedGlow variant="subtle" />
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

        {/* 2×2 : cartes larges, les maquettes animées restent bien visibles
            (en 4 colonnes elles devenaient trop petites). */}
        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2">
          {formulas.map((formula, i) => (
            <RevealItem key={formula.type} hover className="h-full">
              <Link
                href={devisHref}
                className="card-surface flex h-full flex-col rounded-2xl p-6 transition-colors hover:border-accent-cyan/40"
              >
                <div className="mb-4 aspect-[400/220] overflow-hidden rounded-xl border border-border/50">
                  <FormulaPreview type={formula.type} />
                </div>
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
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
