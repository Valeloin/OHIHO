import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import AnimatedGlow from "@/components/motion/AnimatedGlow";

const SERVICES = [
  {
    title: "Sites vitrines",
    description:
      "Un site clair et rapide pour présenter votre activité, vos services, et convertir vos visiteurs en clients.",
    points: [
      "Design sur mesure",
      "Pensé pour convertir",
      "Rapide et responsive",
    ],
  },
  {
    title: "Applications web sur mesure",
    description:
      "Espace client, tableau de bord, outil métier : je développe l'application qui correspond exactement à votre besoin.",
    points: [
      "Comptes & espaces client",
      "Logique métier sur mesure",
      "Architecture pensée pour durer",
    ],
    portfolioLink: true,
  },
  {
    title: "Maintenance & évolutions",
    description:
      "Après la mise en ligne, je reste disponible pour les corrections, mises à jour et nouvelles fonctionnalités.",
    points: [
      "Suivi par email",
      "Corrections rapides",
      "Nouvelles fonctionnalités",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden border-t border-border">
      <AnimatedGlow variant="subtle" />
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <Reveal className="max-w-2xl">
          <h2 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
            Nos services
          </h2>
          <p className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            De l&apos;idée au site en ligne
          </p>
          <p className="mt-4 text-muted">
            Conception, développement et suivi dans la durée — pour un site
            vitrine ou une application web sur mesure, pour les entreprises
            comme pour les particuliers.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <RevealItem
              key={service.title}
              hover
              className="card-surface group relative flex flex-col overflow-hidden rounded-2xl p-8 transition-colors hover:border-accent-cyan/40 hover:shadow-[0_12px_32px_-8px_rgba(56,189,248,0.25)]"
            >
              <span className="font-mono text-xs text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
              <ul className="mt-5 space-y-2">
                {service.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-sm text-foreground/90"
                  >
                    <span className="h-1 w-1 rounded-full bg-accent-cyan" />
                    {point}
                  </li>
                ))}
              </ul>
              {service.portfolioLink && (
                <Link
                  href="/portfolio"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan hover:underline"
                >
                  Voir mon portfolio
                  <span aria-hidden="true">→</span>
                </Link>
              )}
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-cyan/0 transition-colors group-hover:bg-accent-cyan/5" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
