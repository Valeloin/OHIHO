import Reveal from "@/components/motion/Reveal";
import AnimatedGlow from "@/components/motion/AnimatedGlow";

const COVERAGE = [
  "Sites vitrines",
  "Applications web sur mesure",
  "Refonte de sites existants",
  "Maintenance & évolutions",
];

export default function Expertise() {
  return (
    <section id="expertise" className="relative overflow-hidden border-t border-border">
      <AnimatedGlow variant="subtle" />
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-emerald">
              Notre approche
            </h2>
            <p className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Un travail soigné, une communication claire, du début à la fin
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Chaque projet est développé avec une stack moderne et un code
              pensé pour durer — pas de solution générique, pas de boîte
              noire. Vous savez toujours où en est votre projet.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Une fois votre site ou application en ligne,
              l&apos;accompagnement continue : les demandes
              d&apos;évolution ou de correction se font simplement par
              email, jusqu&apos;à leur résolution.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="card-surface rounded-2xl p-8">
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}
