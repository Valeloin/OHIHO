const SECTORS = [
  "Ministère de la Justice",
  "Établissement français du sang (données de santé)",
  "Notaires (données sensibles, conformité stricte)",
  "Secteur public & organisations réglementées",
];

export default function Expertise() {
  return (
    <section id="expertise" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-emerald">
              Notre expérience
            </h2>
            <p className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              7-8 ans à former des équipes non-techniques dans les secteurs
              les plus exigeants
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Avant de créer OHIHO, j&apos;ai passé 7 à 8 ans en support
              informatique au sein de structures où l&apos;erreur
              n&apos;est pas permise : le Ministère de la Justice,
              l&apos;Établissement français du sang, et des études
              notariales.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Ce terrain m&apos;a appris une chose : la conformité ne sert à
              rien si les équipes qui l&apos;appliquent au quotidien ne la
              comprennent pas. Mon rôle a toujours été de former des
              collaborateurs non-techniques à utiliser l&apos;informatique
              correctement et à respecter leurs obligations réglementaires —
              sans jargon, avec des exemples concrets.
            </p>
          </div>

          <div className="card-surface rounded-2xl p-8">
            <h3 className="text-sm font-semibold text-foreground">
              Secteurs formés
            </h3>
            <ul className="mt-5 grid gap-3">
              {SECTORS.map((sector) => (
                <li
                  key={sector}
                  className="flex items-start gap-2 rounded-xl border border-border bg-background/40 px-3 py-3 text-sm"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-emerald" />
                  {sector}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
