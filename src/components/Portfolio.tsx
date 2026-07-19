import Link from "next/link";
import ProjectVisual from "@/components/portfolio/ProjectVisual";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import { PROJECTS } from "@/lib/projects";
import type { PortfolioContent } from "@/lib/content/types";

export default function Portfolio({ data }: { data: PortfolioContent }) {
  // Fond par défaut : la section est entre deux sections sur --surface
  // (Pourquoi OHIHO et Votre projet), l'alternance reste lisible.
  return (
    <section
      id="portfolio"
      className="relative overflow-hidden border-t border-border"
    >
      <SectionBackdrop />
      <div className="relative mx-auto max-w-6xl px-6 py-28 sm:py-32">
        {/* En-tête éditorial : libellé mono, titre large à gauche, filet. */}
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

        {/* 3 colonnes dès 768px : les cartes restent alignées horizontalement
            au maximum (une carte seule pleine largeur devient géante). */}
        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
          {PROJECTS.map((project) => {
            const isExternal = project.href?.startsWith("http");
            const content = (
              <>
                <div className="aspect-[400/260] w-full overflow-hidden border-b border-border">
                  <ProjectVisual
                    href={project.href}
                    accent={project.accent}
                    title={project.title}
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-teal">
                    {project.category}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold tracking-display">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                  {/* mt-auto : le lien reste collé en bas quelle que soit la
                      longueur du texte, les cartes étant à hauteur égale. */}
                  {project.href ? (
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-accent-cyan">
                      Voir le site
                      <span aria-hidden="true">→</span>
                    </span>
                  ) : (
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-muted">
                      Bientôt en ligne
                    </span>
                  )}
                </div>
              </>
            );

            // h-full + flex-col : les trois cartes s'alignent sur la hauteur
            // de la rangée (la plus grande), quel que soit leur volume de texte.
            // Survol : le filet passe au teal interactif (l'élévation vient de RevealItem).
            const cardClass =
              "card-dark group flex h-full flex-col overflow-hidden transition-colors hover:border-accent-cyan/50";

            return (
              <RevealItem key={project.title} hover className="h-full">
                {project.href ? (
                  <Link
                    href={project.href}
                    className={cardClass}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  >
                    {content}
                  </Link>
                ) : (
                  <div className={cardClass}>{content}</div>
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal>
          {/* Encart de fin en carte : texte à gauche, bouton à droite ;
              empilé sous sm. */}
          <div className="card-surface mt-20 flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              {data.ctaText}
            </p>
            <Link
              href="/portail/devis/nouveau"
              className="btn-accent inline-flex shrink-0 px-6 py-3 text-sm"
            >
              {data.ctaButton}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
