const COVERAGE = [
  "Postes de travail (Windows, Mac)",
  "Logiciels et outils métier du quotidien",
  "Comptes, accès et mots de passe",
  "Bonnes pratiques numériques",
];

export default function Expertise() {
  return (
    <section id="expertise" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-emerald">
              Notre approche
            </h2>
            <p className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Un accompagnement qui combine dépannage immédiat et montée en
              compétence
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Beaucoup de supports informatiques se contentent de résoudre le
              problème du jour. Chez OHIHO, chaque intervention à distance
              est aussi l&apos;occasion d&apos;expliquer ce qui s&apos;est
              passé, pour que vos équipes comprennent et gagnent en
              autonomie.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Les demandes restent suivies via un ticket jusqu&apos;à leur
              résolution, et les sujets qui reviennent souvent deviennent des
              modules de formation à suivre en ligne.
            </p>
          </div>

          <div className="card-surface rounded-2xl p-8">
            <h3 className="text-sm font-semibold text-foreground">
              Ce qu&apos;on couvre
            </h3>
            <ul className="mt-5 grid gap-3">
              {COVERAGE.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 rounded-xl border border-border bg-background/40 px-3 py-3 text-sm"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-emerald" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
