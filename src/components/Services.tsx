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
      {/* Rythme vertical resserré par rapport aux autres sections : c'est la
          plus chargée du site (4 cartes), et elle doit tenir sur un écran. */}
      {/* Conteneur plus large que les autres sections (7xl) : à 6xl, chaque
          cellule tombait à ~540 px et la colonne de texte devenait si étroite
          que le sur-titre se brisait sur trois lignes. */}
      <div className="relative mx-auto max-w-7xl px-6 py-7 sm:py-8">
        {/* En-tête au patron commun : libellé mono + filet, titre à chasse
            serrée aligné à gauche, sous-titre à largeur de lecture. */}
        <Reveal>
          <span className="kicker">{data.kicker}</span>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-display text-balance sm:text-4xl">
            {data.title}
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            {data.subtitle}
          </p>
        </Reveal>
        <div className="mt-5 h-px rule-fade" />

        {/* PLUS DE CARTE. L'ancienne version enfermait chaque formule dans un
            panneau `card-surface` (#102436) contre lequel l'animation posait
            son propre fond d'écran (#071522) : deux sombres différents collés
            l'un à l'autre, séparés par un filet dur — c'est ce bicolore qui
            rendait la grille lourde.
            Ici l'animation n'est plus « dans » une boîte : elle est l'objet,
            posée à même le fond de la page avec son seul cadre de navigateur,
            et le texte se tient à côté, sans cloison. La séparation se fait
            par le vide, plus par des bordures. */}
        <RevealGroup className="mt-5 grid gap-x-12 gap-y-5 lg:grid-cols-2">
          {formulas.map((formula, i) => (
            <RevealItem key={formula.type} hover className="h-full">
              <Link href={devisHref} className="group flex h-full flex-col">
                {/* L'animation et son texte, côte à côte. Les cartes de la
                    colonne de GAUCHE (indices pairs) sont inversées : leur
                    animation passe à droite. Les quatre animations se
                    rejoignent donc au centre de la grille. En mobile, tout se
                    réempile, animation d'abord. */}
                <div
                  className={`flex flex-1 flex-col gap-5 sm:items-center ${
                    i % 2 === 0 ? "sm:flex-row-reverse" : "sm:flex-row"
                  }`}
                >
                  <div className="aspect-[400/220] w-full shrink-0 overflow-hidden rounded-xl ring-1 ring-border transition duration-300 group-hover:ring-accent-cyan/60 sm:w-[56%]">
                    <ServiceScene type={formula.type} />
                  </div>

                  {/* Le titre vit DANS la colonne de texte, au-dessus de sa
                      description. Il suit donc l'inversion : à gauche quand
                      l'animation est à droite, à droite quand elle est à
                      gauche. En pleine largeur il se retrouvait au-dessus de
                      l'animation sur les cartes 02 et 04, sans rapport avec
                      le texte qu'il annonce. */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-sm text-brand-teal">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-px w-5 shrink-0 translate-y-[-0.3em] bg-border"
                      />
                      <p className="min-w-0 truncate font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                        {formula.tagline}
                      </p>
                    </div>
                    <h3 className="mt-1.5 text-2xl font-semibold tracking-display transition-colors group-hover:text-accent-cyan">
                      {formula.label}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      {formula.description}
                    </p>
                  </div>
                </div>

                {/* L'exemple ferme la carte, sur une seule ligne et SANS filet
                    au-dessus : ces barres claires hachaient la grille. */}
                <p className="mt-3 truncate text-xs text-muted/80">
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
