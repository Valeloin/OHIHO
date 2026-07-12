const SERVICES = [
  {
    title: "Support informatique",
    description:
      "Dépannage, maintenance et infogérance de votre parc informatique. Une équipe disponible pour résoudre les problèmes du quotidien, à distance ou sur site.",
    points: ["Assistance à distance", "Maintenance préventive", "Gestion du parc"],
  },
  {
    title: "Solutions sur-mesure",
    description:
      "Chaque entreprise a ses contraintes. Nous concevons des solutions adaptées à votre taille, votre budget et votre niveau de maturité numérique.",
    points: ["Cahier des charges", "Choix des outils", "Intégration accompagnée"],
  },
  {
    title: "Transformation digitale",
    description:
      "Un diagnostic de vos usages actuels et un plan d'action concret pour moderniser vos outils sans rupture dans votre activité.",
    points: ["Audit des outils existants", "Feuille de route", "Mise en œuvre progressive"],
  },
  {
    title: "Formation & pédagogie",
    description:
      "Des ateliers clairs, sans jargon, pour que vos équipes comprennent et utilisent les outils numériques et l'IA en toute confiance.",
    points: ["Ateliers sur-mesure", "Supports pédagogiques", "Accompagnement continu"],
  },
];

export default function Services() {
  return (
    <section id="services" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <h2 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
            Nos services
          </h2>
          <p className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Un support informatique adapté à la réalité de votre entreprise
          </p>
          <p className="mt-4 text-muted">
            Que vous ayez besoin d&apos;un dépannage rapide ou d&apos;un
            accompagnement plus global, nous adaptons nos solutions à votre
            taille, votre budget et vos contraintes.
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
