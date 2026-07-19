import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import type { MethodContent } from "@/lib/content/types";

export default function HowItWorks({ data }: { data: MethodContent }) {
  return (
    // Fond par défaut (et non `bg-surface`) : le halo teal et les lucioles
    // se lisent alors exactement comme sur le hero. Sur le panneau plus clair
    // de `bg-surface`, les lucioles s'effaçaient presque.
    <section className="relative overflow-hidden border-t border-border">
      <SectionBackdrop />
      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
        {/* En-tête sur deux colonnes : le titre à gauche, et à droite une
            carte qui récapitule le déroulé. Elle donne à la section la
            hauteur des autres et sert de légende à la frise — ses jalons
            s'allument sur la MÊME horloge que le trait qui se remplit. */}
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <span className="kicker">{data.kicker}</span>
            <h2 className="mt-6 max-w-2xl text-3xl font-semibold tracking-display text-balance sm:text-5xl">
              {data.title}
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <div
              aria-hidden="true"
              className="card-surface w-full p-5 lg:w-[18rem]"
            >
              {/* Libellé calculé sur les données : rien n'est écrit en dur,
                  si une étape est ajoutée dans l'admin le compte suit. */}
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {data.steps.length} étapes
              </p>
              <ul className="mt-4 space-y-3.5">
                {data.steps.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span
                      className={`frise-dot-${i + 1} h-1.5 w-1.5 shrink-0 rounded-full bg-brand-emerald`}
                    />
                    <span className="truncate text-sm text-muted">
                      {item.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 h-px rule-fade" />

        {/* Frise : un rail sombre porte tout le tracé, et le dégradé de marque
            s'y remplit de gauche à droite. Chaque jalon s'allume au passage
            du remplissage. En mobile, la frise passe à la verticale. */}
        <RevealGroup className="relative mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Rail + remplissage, en desktop */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 hidden h-px bg-border lg:block"
          >
            <div className="frise-fill rule-brand h-full w-full" />
          </div>

          {data.steps.map((item, i) => (
            <RevealItem key={i} className="relative pl-6 lg:pl-0 lg:pt-10">
              {/* Rail + remplissage, en mobile / tablette */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-px bg-border lg:hidden"
              >
                <div className="frise-fill-y rule-brand-y h-full w-full" />
              </div>
              {/* Jalon : il s'allume quand le remplissage l'atteint */}
              <div
                aria-hidden="true"
                className={`frise-dot-${i + 1} absolute left-0 top-2 h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-brand-emerald lg:top-0 lg:translate-x-0 lg:-translate-y-1/2`}
              />

              {/* Au passage de la frise : le numéro grossit d'un coup, le
                  texte se déhanche. Déclenché par les mêmes horloges que le
                  jalon, donc parfaitement synchrone. */}
              <span
                className={`frise-num-${i + 1} text-gradient font-mono text-3xl font-semibold tracking-display`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={`frise-txt-${i + 1}`}>
                <h3 className="mt-4 text-lg font-semibold tracking-display">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
