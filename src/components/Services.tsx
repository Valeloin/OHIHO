const SERVICES = [
  {
    title: "Prise en main à distance",
    description:
      "Un problème sur un poste, un logiciel ou un compte ? On se connecte à distance pour diagnostiquer et résoudre rapidement, sans déplacement.",
    points: [
      "Intervention rapide",
      "Suivi via ticket",
      "Sans déplacement",
    ],
  },
  {
    title: "Formation en ligne",
    description:
      "Des modules vidéo pour comprendre les usages informatiques du quotidien et gagner en autonomie, à votre rythme.",
    points: [
      "Vidéos à suivre à son rythme",
      "Cas concrets",
      "Accès depuis votre espace client",
    ],
  },
  {
    title: "Création de sites web & applications",
    description:
      "Un site vitrine, une application web sur mesure ? Je conçois et développe votre projet de A à Z, adapté à votre besoin.",
    points: [
      "Sites vitrines & applications",
      "Sur mesure, de A à Z",
      "Accompagnement dans la durée",
    ],
    portfolioLink: true,
  },
];

import Link from "next/link";

export default function Services() {
  return (
    <section id="services" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <h2 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
            Nos services
          </h2>
          <p className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Trois façons de vous accompagner : dépanner, former et créer
          </p>
          <p className="mt-4 text-muted">
            Un support informatique réactif à distance, des formations en
            ligne pour gagner en autonomie, et la création de votre site ou
            application — pour les entreprises comme pour les particuliers.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              className="card-surface group relative flex flex-col overflow-hidden rounded-2xl p-8 transition-colors hover:border-accent-cyan/40"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
