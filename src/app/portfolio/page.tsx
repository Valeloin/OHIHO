import type { Metadata } from "next";
import Link from "next/link";
import ProjectVisual from "@/components/portfolio/ProjectVisual";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import AnimatedGlow from "@/components/motion/AnimatedGlow";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Réalisations — OHIHO",
  description:
    "Les sites et applications web réalisés par OHIHO.",
};

export default function PortfolioPage() {
  return (
    <main className="relative overflow-hidden bg-grid">
      <AnimatedGlow variant="subtle" />
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
            Réalisations
          </p>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Mes réalisations
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            Cadance Coaching est un projet réel, en ligne. Les deux cards
            suivantes sont des exemples génériques illustrant d&apos;autres
            formats de projet, en attendant d&apos;autres réalisations.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-3">
          {PROJECTS.map((project) => {
            const content = (
              <>
                <div className="aspect-[400/260] w-full overflow-hidden border-b border-border">
                  <ProjectVisual
                    href={project.href}
                    accent={project.accent}
                    title={project.title}
                  />
                </div>
                <div className="p-6">
                  <p className="font-mono text-xs uppercase tracking-wide text-muted">
                    {project.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                  {project.href ? (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan">
                      Voir le site
                      <span aria-hidden="true">→</span>
                    </span>
                  ) : (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted">
                      Bientôt en ligne
                    </span>
                  )}
                </div>
              </>
            );

            const className =
              "card-surface group block overflow-hidden rounded-2xl transition-colors hover:border-accent-cyan/40 hover:shadow-[0_12px_32px_-8px_rgba(56,189,248,0.25)]";

            const isExternal = project.href?.startsWith("http");

            return (
              <RevealItem key={project.title} hover>
                {project.href ? (
                  <Link
                    href={project.href}
                    className={className}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  >
                    {content}
                  </Link>
                ) : (
                  <div className={className}>{content}</div>
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>

        <div className="card-surface mt-10 rounded-2xl p-8 text-center">
          <p className="text-sm text-muted">
            Vous avez un projet de site ou d&apos;application en tête ?
          </p>
          <Link
            href="/portail/devis/nouveau"
            className="mt-6 inline-flex rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Demander un devis
          </Link>
        </div>

        <Link
          href="/#services"
          className="mt-10 inline-flex text-sm font-medium text-accent-cyan hover:underline"
        >
          ← Retour aux services
        </Link>
      </div>
    </main>
  );
}
