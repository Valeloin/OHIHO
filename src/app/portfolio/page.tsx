import type { Metadata } from "next";
import Link from "next/link";
import ProjectMockup from "@/components/portfolio/ProjectMockup";

export const metadata: Metadata = {
  title: "Portfolio — OHIHO",
  description:
    "Les sites et applications web réalisés par OHIHO — portfolio en cours de construction.",
};

const PLACEHOLDER_PROJECTS = [
  {
    title: "Site vitrine — Exemple",
    category: "Site vitrine",
    description:
      "Présentation d'activité, mise en avant des services et prise de contact — pensé pour convertir les visiteurs en clients.",
    href: "#",
    accent: "cyan" as const,
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
    <main className="bg-grid">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
          Réalisations
        </p>
        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Mon portfolio
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          Aperçu du type de projets que je réalise. Les captures et liens
          définitifs de mes propres sites arrivent bientôt — en attendant,
          voici des exemples génériques pour illustrer le rendu.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDER_PROJECTS.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="card-surface group overflow-hidden rounded-2xl transition-colors hover:border-accent-cyan/40"
            >
              <div className="aspect-[400/260] w-full border-b border-border">
                <ProjectMockup accent={project.accent} />
              </div>
              <div className="p-6">
                <p className="font-mono text-xs uppercase tracking-wide text-muted">
                  {project.category}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan">
                  Voir le site
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

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
