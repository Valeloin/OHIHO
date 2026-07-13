const SERVICES = [
  {
    title: "Formations en ligne",
    description:
      "Des modules vidéo sur le RGPD et l'intelligence artificielle, pensés pour des équipes non-techniques. À suivre à son rythme, avec des exemples concrets tirés de secteurs à forte exigence de conformité.",
    points: [
      "Modules RGPD",
      "Modules intelligence artificielle",
      "À suivre à son rythme",
    ],
  },
  {
    title: "Interventions en présentiel",
    description:
      "Une demi-journée ou une journée dans vos locaux, pour former vos équipes en direct : obligations RGPD, usages responsables de l'IA, bonnes pratiques adaptées à votre secteur.",
    points: [
      "Format demi-journée ou journée",
      "Sur site, dans vos locaux",
      "Adapté à votre secteur",
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
            Deux formats, un seul objectif : rendre le RGPD et l&apos;IA
            accessibles à vos équipes
          </p>
          <p className="mt-4 text-muted">
            Que vous préfériez un format autonome ou une session animée en
            direct, chaque formation est pensée pour des équipes
            non-techniques, dans des secteurs qui ne peuvent pas se permettre
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
