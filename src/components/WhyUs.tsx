const VALUES = [
  {
    title: "Expérience terrain",
    description:
      "Sept à huit ans passés dans des structures où la conformité n'est pas une option — justice, santé, notariat.",
  },
  {
    title: "Langage clair",
    description:
      "Pas de jargon juridique ou technique. Nous expliquons le RGPD et l'IA avec les mots de votre métier.",
  },
  {
    title: "Conformité concrète",
    description:
      "Pas de check-list générique. Des exemples et des cas réels adaptés à votre secteur d'activité.",
  },
  {
    title: "Formats flexibles",
    description:
      "En ligne à votre rythme, ou en présentiel pour une session animée — selon ce qui convient à vos équipes.",
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
            Une pédagogie forgée sur le terrain, pas en salle de classe
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
