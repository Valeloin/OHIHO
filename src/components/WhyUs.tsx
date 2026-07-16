import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import type { WhyUsContent } from "@/lib/content/types";

export default function WhyUs({ data }: { data: WhyUsContent }) {
  return (
    <section id="a-propos" className="relative overflow-hidden border-t border-border bg-surface">
      <SectionBackdrop />
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <Reveal className="max-w-2xl">
          <h2 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
            {data.kicker}
          </h2>
          <p className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {data.title}
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.values.map((value, i) => (
            <RevealItem
              key={i}
              hover
              className="card-surface rounded-2xl p-6 transition-colors hover:border-accent-cyan/40"
            >
              <h3 className="text-base font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {value.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
