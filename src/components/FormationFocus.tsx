const TOPICS = [
  "Bureautique & outils collaboratifs",
  "Cybersécurité au quotidien",
  "Intelligence artificielle générative",
  "Cloud & stockage en ligne",
  "Bonnes pratiques de gestion de données",
  "Prise en main de nouveaux logiciels",
];

export default function FormationFocus() {
  return (
    <section id="formation" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-emerald">
              Pédagogie
            </h2>
            <p className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              La technologie n&apos;est utile que si vos équipes savent s&apos;en
              servir
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Beaucoup d&apos;outils sont sous-utilisés, non pas par manque de
              qualité, mais par manque d&apos;explication. Nos formations sont
              conçues pour des équipes non-techniques : sans jargon, avec des
              exemples concrets tirés de votre activité.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Formats courts en présentiel ou à distance, supports remis à
              chaque participant, et un accompagnement après la formation pour
              répondre aux questions qui arrivent une fois les outils en main.
            </p>
          </div>

          <div className="card-surface rounded-2xl p-8">
            <h3 className="text-sm font-semibold text-foreground">
              Thèmes fréquemment abordés
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {TOPICS.map((topic) => (
                <li
                  key={topic}
                  className="flex items-start gap-2 rounded-xl border border-border bg-background/40 px-3 py-3 text-sm"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-emerald" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
