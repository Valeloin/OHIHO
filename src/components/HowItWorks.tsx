import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import type { MethodContent } from "@/lib/content/types";

export default function HowItWorks({ data }: { data: MethodContent }) {
  return (
    <section className="relative overflow-hidden border-t border-border bg-surface">
      <SectionBackdrop />
      <div className="relative mx-auto max-w-6xl px-6 py-28 sm:py-32">
        <Reveal>
          <span className="kicker">{data.kicker}</span>
          <h2 className="mt-6 max-w-3xl text-3xl font-semibold tracking-display text-balance sm:text-5xl">
            {data.title}
          </h2>
        </Reveal>
        <div className="mt-12 h-px rule-fade" />

        {/* Timeline : filet continu horizontal en desktop, filet vertical à
            gauche en mobile. Le filet porteur prend le dégradé de marque
            (bleu ciel → teal → émeraude), seul filet dégradé du site, et
            chaque étape est jalonnée d'un point rond vert lumineux. */}
        <RevealGroup className="relative mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Le filet porteur de la timeline (desktop uniquement) */}
          <div
            aria-hidden="true"
            className="rule-brand absolute inset-x-0 top-0 hidden h-px lg:block"
          />

          {data.steps.map((item, i) => (
            <RevealItem key={i} className="relative pl-6 lg:pl-0 lg:pt-10">
              {/* Filet porteur en colonne (mobile / tablette) */}
              <div
                aria-hidden="true"
                className="rule-brand-y absolute left-0 top-0 h-full w-px lg:hidden"
              />
              {/* Jalon : point rond vert lumineux posé sur le filet */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-2 h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-brand-emerald shadow-[0_0_10px_rgba(52,211,153,0.8)] lg:top-0 lg:translate-x-0 lg:-translate-y-1/2"
              />

              <span className="text-gradient font-mono text-3xl font-semibold tracking-display">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-display">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
