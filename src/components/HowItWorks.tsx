const STEPS = [
  {
    step: "01",
    title: "Diagnostic",
    description:
      "Un échange pour comprendre vos outils actuels, vos irritants et le niveau à l'aise de vos équipes avec la technologie.",
  },
  {
    step: "02",
    title: "Plan d'action",
    description:
      "Nous proposons des recommandations concrètes et priorisées, avec un budget et un calendrier réalistes.",
  },
  {
    step: "03",
    title: "Déploiement & formation",
    description:
      "Mise en place des solutions retenues, accompagnée d'ateliers pour que vos équipes soient autonomes rapidement.",
  },
  {
    step: "04",
    title: "Suivi continu",
    description:
      "Un support disponible dans la durée, pour ajuster, dépanner et faire évoluer vos outils au fil de votre croissance.",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <h2 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-violet">
            Méthode
          </h2>
          <p className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Comment nous travaillons ensemble
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item, i) => (
            <div key={item.step} className="relative pl-6">
              <div className="absolute left-0 top-1 h-full w-px bg-border sm:hidden" />
              <span className="font-mono text-2xl font-semibold text-accent-cyan/70">
                {item.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
              {i < STEPS.length - 1 && (
                <div className="mt-6 hidden h-px w-full bg-gradient-to-r from-border to-transparent lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
