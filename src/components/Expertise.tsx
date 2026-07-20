import Reveal from "@/components/motion/Reveal";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import type { ExpertiseContent } from "@/lib/content/types";

export default function Expertise({ data }: { data: ExpertiseContent }) {
  return (
    <section id="expertise" className="relative overflow-hidden border-t border-border">
      <SectionBackdrop />
      <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          {/* Colonne éditoriale : libellé, titre, filet, prose */}
          <Reveal>
            <span className="kicker">{data.kicker}</span>
            <h2 className="mt-6 max-w-xl text-3xl font-semibold tracking-display text-balance sm:text-5xl">
              {data.title}
            </h2>
            <div className="mt-10 h-px rule-fade" />
            <p className="mt-8 leading-relaxed text-muted">{data.paragraph1}</p>
            <p className="mt-5 leading-relaxed text-muted">{data.paragraph2}</p>
          </Reveal>

          {/* Panneau de couverture : carte arrondie, lignes séparées par des
              filets. `overflow-hidden` recoupe le filet d'en-tête et les
              séparateurs de liste sur l'arrondi de la carte. */}
          <Reveal delay={0.15} className="card-surface overflow-hidden">
            <h3 className="border-b border-border px-6 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
              {data.panelTitle}
            </h3>
            <ul className="divide-y divide-border">
              {data.coverage.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 px-6 py-4 text-sm"
                >
                  {/* Point rond vert lumineux, aligné sur la première ligne */}
                  <span
                    aria-hidden="true"
                    className="mt-[0.4rem] h-[6px] w-[6px] shrink-0 rounded-full bg-brand-emerald shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                  />
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
