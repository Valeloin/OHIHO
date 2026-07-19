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
      <div className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">
        {/* En-tête au patron commun : libellé mono + filet, titre à chasse
            serrée aligné à gauche, sous-titre à largeur de lecture. */}
        <Reveal>
          <span className="kicker">{data.kicker}</span>
          <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-display text-balance sm:text-4xl">
            {data.title}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            {data.subtitle}
          </p>
        </Reveal>
        <div className="mt-8 h-px rule-fade" />

        {/* Grille 2×2 en cartes PAYSAGE : animation à gauche, texte à droite.
            Contrainte du site : chaque section doit tenir sur un écran. Avec
            les vignettes empilées au-dessus du texte, la section faisait 1,6
            écran ; en les posant à côté, la hauteur de carte est dictée par le
            texte seul et la section repasse sous la barre — sans rien couper
            du contenu éditable et en gardant les vignettes nettement plus
            grandes qu'en 4 colonnes. En mobile, la carte se replie à la
            verticale (animation en haut, pleine largeur). */}
        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2">
          {formulas.map((formula, i) => (
            <RevealItem key={formula.type} hover className="h-full">
              <Link
                href={devisHref}
                className="card-surface flex h-full flex-col overflow-hidden transition-colors hover:border-accent-cyan/50 sm:flex-row"
              >
                {/* 55 % de la carte pour l'animation : elle reste bien plus
                    large qu'en 4 colonnes, et `self-center` la garde centrée
                    quand le texte rend la carte plus haute qu'elle. */}
                <div className="aspect-[400/220] w-full shrink-0 sm:w-1/2 sm:self-center">
                  <ServiceScene type={formula.type} />
                </div>
                <div className="flex flex-1 flex-col border-t border-border p-5 sm:border-l sm:border-t-0">
                  {/* La carte étant large, l'index et la sur-titre tiennent
                      sur une seule ligne : le bloc de texte reste compact et
                      laisse la vedette à l'animation. */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-brand-teal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden="true" className="h-px w-5 bg-border" />
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                      {formula.tagline}
                    </p>
                  </div>
                  <h3 className="mt-2.5 text-lg font-semibold tracking-display">
                    {formula.label}
                  </h3>
                  {/* Interlignage resserré : la colonne de texte est étroite,
                      chaque ligne gagnée compte pour tenir sur un écran. */}
                  <p className="mt-2.5 text-[0.8125rem] leading-[1.5] text-muted">
                    {formula.description}
                  </p>
                  {/* Exemple détaché par un filet, en bas de carte. */}
                  <p className="mt-auto border-t border-border pt-3 text-xs leading-[1.45] text-muted">
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
