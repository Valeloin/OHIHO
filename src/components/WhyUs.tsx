const VALUES = [
  {
    title: "Pédagogie avant tout",
    description:
      "Nous prenons le temps d'expliquer, pas seulement de résoudre. L'objectif est votre autonomie, pas votre dépendance.",
  },
  {
    title: "Langage clair",
    description:
      "Pas de jargon inutile. Nous parlons de vos outils avec les mots de votre métier, pas ceux de l'informatique.",
  },
  {
    title: "Solutions sur-mesure",
    description:
      "Chaque structure a ses contraintes de budget, de taille et de maturité numérique. Nous nous y adaptons, pas l'inverse.",
  },
  {
    title: "Accompagnement dans la durée",
    description:
      "Le support ne s'arrête pas à la mise en place. Nous restons disponibles pour ajuster et faire évoluer vos outils.",
  },
];

export default function WhyUs() {
  return (
    <section id="a-propos" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <h2 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
            Pourquoi OHIHO
          </h2>
          <p className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Une approche centrée sur les personnes, pas seulement sur les
            machines
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-border p-6"
            >
              <h3 className="text-base font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
