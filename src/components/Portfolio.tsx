import Link from "next/link";
import ProjectVisual from "@/components/portfolio/ProjectVisual";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import AnimatedGlow from "@/components/motion/AnimatedGlow";
import { PROJECTS } from "@/lib/projects";

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative overflow-hidden border-t border-border"
    >
      <AnimatedGlow variant="subtle" />
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <Reveal className="max-w-2xl">
          <h2 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
            Réalisations
          </h2>
          <p className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Des projets concrets, en ligne
          </p>
          <p className="mt-4 text-muted">
            Cadance Coaching est un projet réel, livré et utilisé par un
            client. Un aperçu de ce que nous pouvons construire pour vous.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-3">
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
                <div className="p-6">
                  <p className="font-mono text-xs uppercase tracking-wide text-muted">
                    {project.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">
                    {project.title}
                  </h3>
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

            const cardClass =
              "card-surface group block overflow-hidden rounded-2xl transition-colors hover:border-accent-cyan/40 hover:shadow-[0_12px_32px_-8px_rgba(56,189,248,0.25)]";

            return (
              <RevealItem key={project.title} hover>
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
          <Link
            href="/portfolio"
            className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan hover:underline"
          >
            Voir toutes nos réalisations
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
