import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import type { WhyUsContent } from "@/lib/content/types";

export default function WhyUs({ data }: { data: WhyUsContent }) {
  return (
    // Fond par défaut (et non `bg-surface`) : le halo et les lucioles
    // s'y lisent comme sur le hero — sur le panneau plus clair de
    // `bg-surface`, ils s'effaçaient presque.
    <section id="a-propos" className="section-screen relative overflow-hidden border-t border-border">
      <SectionBackdrop />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-16">
        <Reveal>
          <span className="kicker">{data.kicker}</span>
          <h2 className="section-title mt-5 max-w-3xl">
            {data.title}
          </h2>
        </Reveal>
        <div className="mt-8 h-px rule-fade" />

        {/* Quatre cartes 2×2, resserrées : la section respire davantage et
            laisse la place à celle qui suit (l'espace de suivi). */}
        <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2">
          {data.values.map((value, i) => (
            <RevealItem
              key={i}
              hover
              className="card-surface h-full p-6 transition-colors hover:border-accent-cyan/50"
            >
              <span className="font-mono text-xs tracking-[0.18em] text-brand-teal">
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
