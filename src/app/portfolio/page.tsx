import type { Metadata } from "next";
import Link from "next/link";
import ProjectMockup from "@/components/portfolio/ProjectMockup";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import AnimatedGlow from "@/components/motion/AnimatedGlow";

export const metadata: Metadata = {
  title: "Portfolio — OHIHO",
  description:
    "Les sites et applications web réalisés par OHIHO.",
};

const PROJECTS = [
  {
    title: "Cadance Coaching",
    category: "Site vitrine",
    description:
      "Site vitrine pour une salle de sport, avec un espace admin permettant au client de modifier lui-même les textes, la galerie, le planning des cours et les tarifs, sans toucher au code.",
    href: null,
    accent: "red" as const,
  },
  {
    title: "Application web — Exemple",
    category: "Application web",
    description:
      "Espace client avec compte, tableau de bord et suivi de demandes — sur le même principe que l'espace client d'OHIHO.",
    href: "#",
    accent: "violet" as const,
  },
  {
    title: "Plateforme sur mesure — Exemple",
    category: "Plateforme sur mesure",
    description:
      "Outil interne ou plateforme métier adaptée à un besoin spécifique, de la conception au déploiement.",
    href: "#",
    accent: "emerald" as const,
  },
];

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
            Mon portfolio
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            Cadance Coaching est un projet réel, en cours de finalisation
            avant mise en ligne. Les deux cards suivantes sont des exemples
            génériques illustrant d&apos;autres formats de projet, en
            attendant d&apos;autres réalisations.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => {
            const content = (
              <>
                <div className="aspect-[400/260] w-full border-b border-border">
                  <ProjectMockup
                    accent={project.accent}
                    label={`Aperçu du site ${project.title}`}
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

            return (
              <RevealItem key={project.title} hover>
                {project.href ? (
                  <Link href={project.href} className={className}>
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
            href="/#contact"
            className="mt-6 inline-flex rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Discuter de mon projet
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
