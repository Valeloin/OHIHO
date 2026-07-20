import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import type { WhyUsContent } from "@/lib/content/types";

export default function WhyUs({ data }: { data: WhyUsContent }) {
  return (
    <section id="a-propos" className="relative overflow-hidden border-t border-border bg-surface">
      <SectionBackdrop />
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <Reveal>
          <span className="kicker">{data.kicker}</span>
          <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-display text-balance sm:text-4xl">
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
