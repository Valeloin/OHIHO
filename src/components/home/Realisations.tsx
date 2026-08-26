import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { REALISATIONS } from "@/lib/realisations";

// PLEINE LARGEUR, une réalisation par ligne (2026-08-26) : à deux projets,
// une grille de deux cartes laissait la page vide et rendait chaque projet
// minuscule. En bandeau, chacun a la place de se raconter.
export default function Realisations() {
  return (
    <section id="realisations" className="section">
      <div className="shell">
        <Reveal className="text-center">
          <p className="kicker">Réalisations</p>
          <h2 className="h-section mt-4">Livré, en service</h2>
        </Reveal>

        <div className="mt-12">
          {REALISATIONS.map((projet, index) => (
            <Reveal key={projet.title} delay={index * 80}>
              <article
                className="grid gap-6 border-t py-10 md:grid-cols-[220px_1fr] md:gap-12"
                style={{ borderColor: "var(--line)" }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: projet.iconBg }}
                  >
                    <Image
                      src={projet.icon}
                      alt=""
                      width={32}
                      height={32}
                      className="h-8 w-8"
                    />
                  </span>
                  <div>
                    <h3 className="h-card text-xl">{projet.title}</h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                      {projet.category}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-base leading-relaxed text-ink-muted">
                    {projet.description}
                  </p>
                  <p className="mt-4 flex gap-3 text-[15px] font-medium">
                    <span
                      className="mt-2 h-[6px] w-[6px] shrink-0 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                    {projet.resultat}
                  </p>
                  <div className="mt-5">
                    {projet.href ? (
                      <a
                        href={projet.href}
                        target="_blank"
                        rel="noreferrer"
                        className="link-brand"
                      >
                        Voir le site <span aria-hidden>↗</span>
                      </a>
                    ) : (
                      <p className="text-fine">{projet.note}</p>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
