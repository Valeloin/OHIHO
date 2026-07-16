import Link from "next/link";
import ProjectVisual from "@/components/portfolio/ProjectVisual";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import AnimatedGlow from "@/components/motion/AnimatedGlow";
import { PROJECTS } from "@/lib/projects";
import type { PortfolioContent } from "@/lib/content/types";

export default function Portfolio({ data }: { data: PortfolioContent }) {
  return (
    <section
      id="portfolio"
      className="relative overflow-hidden border-t border-border bg-surface"
    >
      <AnimatedGlow variant="subtle" />
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <Reveal className="max-w-2xl">
          <h2 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
            {data.kicker}
          </h2>
          <p className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {data.title}
          </p>
          <p className="mt-4 text-muted">{data.subtitle}</p>
        </Reveal>

        {/* 3 colonnes dès 768px : les cartes restent alignées horizontalement
            au maximum (une carte seule pleine largeur devient géante). */}
        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
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
                  <p className="font-mono text-xs uppercase tracking-wide text-muted">
                    {project.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">
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
            const cardClass =
              "card-dark group flex h-full flex-col overflow-hidden rounded-2xl transition-colors hover:border-accent-cyan/40";

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
          {/* Encart compact : il épouse son contenu (w-fit) et se détache de
              la section avec un fond plus clair (surface-2), la section étant
              déjà sur --surface. */}
          <div className="mx-auto mt-14 w-fit max-w-full rounded-2xl border border-border bg-surface-2 px-8 py-6 text-center shadow-[var(--card-shadow)]">
            <p className="text-sm text-muted">{data.ctaText}</p>
            <Link
              href="/portail/devis/nouveau"
              className="btn-accent mt-4 inline-flex rounded-full px-6 py-2.5 text-sm font-semibold"
            >
              {data.ctaButton}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
