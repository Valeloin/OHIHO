const SERVICES = [
  {
    title: "Module protection des données",
    description:
      "Comprendre vos obligations légales de protection des données (RGPD), sans jargon juridique. Cas concrets tirés de secteurs à forte exigence de conformité.",
    points: [
      "Vidéos à suivre à son rythme",
      "Exemples sectoriels concrets",
      "Mises à jour réglementaires",
    ],
  },
  {
    title: "Module intelligence artificielle",
    description:
      "Utiliser l'IA de façon responsable et conforme au quotidien : risques, limites et bonnes pratiques expliqués simplement à des équipes non-techniques.",
    points: [
      "Vidéos à suivre à son rythme",
      "Risques & bonnes pratiques",
      "Cas d'usage concrets",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <h2 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
            Nos formations
          </h2>
          <p className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Deux modules, un seul objectif : rendre la protection des données
            et l&apos;IA accessibles à vos équipes
          </p>
          <p className="mt-4 text-muted">
            Des formations en ligne pensées pour des équipes non-techniques,
            dans des secteurs qui ne peuvent pas se permettre
            l&apos;approximation.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              className="card-surface group relative overflow-hidden rounded-2xl p-8 transition-colors hover:border-accent-cyan/40"
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
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-cyan/0 transition-colors group-hover:bg-accent-cyan/5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
