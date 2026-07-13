const VALUES = [
  {
    title: "Réactivité",
    description:
      "Une intervention à distance dès que le problème survient, sans attendre un rendez-vous.",
  },
  {
    title: "Langage clair",
    description:
      "Pas de jargon technique. On explique ce qu'on fait et pourquoi, avec des mots simples.",
  },
  {
    title: "On explique, pas seulement on répare",
    description:
      "Chaque intervention est l'occasion de comprendre ce qui s'est passé, pour que ça ne se reproduise plus.",
  },
  {
    title: "À votre rythme",
    description:
      "Formations et support disponibles quand vos équipes en ont besoin, sans contrainte d'agenda.",
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
            Un support pensé pour les équipes non-techniques
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
