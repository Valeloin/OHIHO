import Reveal from "@/components/motion/Reveal";
import AnimatedGlow from "@/components/motion/AnimatedGlow";
import type { ExpertiseContent } from "@/lib/content/types";

export default function Expertise({ data }: { data: ExpertiseContent }) {
  return (
    <section id="expertise" className="relative overflow-hidden border-t border-border">
      <AnimatedGlow variant="subtle" />
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-emerald">
              {data.kicker}
            </h2>
            <p className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {data.title}
            </p>
            <p className="mt-4 leading-relaxed text-muted">{data.paragraph1}</p>
            <p className="mt-4 leading-relaxed text-muted">{data.paragraph2}</p>
          </Reveal>

          <Reveal delay={0.15} className="card-surface rounded-2xl p-8">
            <h3 className="text-sm font-semibold text-foreground">
              {data.panelTitle}
            </h3>
            <ul className="mt-5 grid gap-3">
              {data.coverage.map((item) => (
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
