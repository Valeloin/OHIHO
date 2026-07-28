import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import SectionLabel from "@/components/SectionLabel";
import type { WhyUsContent } from "@/lib/content/types";

export default function WhyUs({ data }: { data: WhyUsContent }) {
  return (
    // Fond par défaut (et non `bg-surface`) : le halo et les lucioles
    // s'y lisent comme sur le hero — sur le panneau plus clair de
    // `bg-surface`, ils s'effaçaient presque.
    <section id="a-propos" className="section-screen relative overflow-hidden border-t border-border">
      <SectionBackdrop />
            <SectionLabel>{data.kicker}</SectionLabel>

<div className="relative mx-auto w-full max-w-7xl px-6 py-12 my-auto">
        <Reveal>
          <p className="section-lead max-w-4xl">{data.title}</p>
        </Reveal>
        <div className="mt-6 h-px rule-fade" />

        {/* Quatre cartes 2×2, resserrées : la section respire davantage et
            laisse la place à celle qui suit (l'espace de suivi). */}
        <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2">
          {data.values.map((value, i) => (
            <RevealItem
              key={i}
              hover
              className="card-surface h-full p-5 transition-colors hover:border-accent-cyan/50"
            >
              {/* Même halo que les icônes du hero (pastille teal tenue) :
                  cohérence de traitement d'une section à l'autre. */}
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal/10 font-mono text-xs tracking-[0.1em] text-brand-teal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-display">
                {value.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                {value.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
