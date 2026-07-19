import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import type { WhyUsContent } from "@/lib/content/types";

export default function WhyUs({ data }: { data: WhyUsContent }) {
  return (
    <section id="a-propos" className="relative overflow-hidden border-t border-border bg-surface">
      <SectionBackdrop />
      <div className="relative mx-auto max-w-6xl px-6 py-28 sm:py-32">
        <Reveal>
          <span className="kicker">{data.kicker}</span>
          <h2 className="mt-6 max-w-3xl text-3xl font-semibold tracking-display text-balance sm:text-5xl">
            {data.title}
          </h2>
        </Reveal>
        <div className="mt-12 h-px rule-fade" />

        {/* Quatre cartes 2×2 : aplat, filet, arrondi et ombre douce, avec une
            gouttière régulière entre elles. Le filet passe au teal au survol. */}
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
          {data.values.map((value, i) => (
            <RevealItem
              key={i}
              hover
              className="card-surface h-full p-8 transition-colors hover:border-accent-cyan/50"
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
