import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 bg-glow-radial" />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 sm:pt-28">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald" />
            Support informatique & formation en ligne
          </span>

          <h1 className="mt-8 max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Support informatique{" "}
            <span className="text-gradient">sur mesure</span> pour
            entreprises et particuliers
          </h1>

          <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted">
            Prise en main à distance pour résoudre vos problèmes rapidement,
            et formations en ligne pour gagner en autonomie et en
            productivité.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/#contact"
              className="rounded-full bg-foreground px-7 py-3 text-sm font-semibold text-background transition-transform hover:scale-105"
            >
              Nous contacter
            </Link>
            <Link
              href="/#services"
              className="rounded-full border border-border px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent-cyan/60 hover:bg-surface"
            >
              Voir nos services
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { label: "Délai de réponse", value: "< 24h" },
            { label: "Intervention", value: "À distance" },
            { label: "Formation", value: "Vidéo, à son rythme" },
            { label: "Pédagogie", value: "Sans jargon" },
          ].map((item) => (
            <div
              key={item.label}
              className="card-surface rounded-2xl px-4 py-5 text-center"
            >
              <p className="font-mono text-sm font-semibold text-accent-cyan">
                {item.value}
              </p>
              <p className="mt-1 text-xs text-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
