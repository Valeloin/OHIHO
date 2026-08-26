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
                <div>
                  <span
                    className="flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{ background: projet.iconBg }}
                  >
                    <Image
                      src={projet.icon}
                      alt=""
                      width={36}
                      height={36}
                      className="h-9 w-9"
                    />
                  </span>
                  <h3 className="h-card mt-5 text-2xl">{projet.title}</h3>
                  <p
                    className="mt-2 inline-flex rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
                    style={{
                      background:
                        "color-mix(in srgb, var(--accent) 12%, transparent)",
                      color: "var(--accent-text)",
                    }}
                  >
                    {projet.category}
                  </p>
                </div>

                <div>
                  <p className="text-base leading-relaxed text-ink-muted">
                    {projet.description}
                  </p>
                  {/* Le résultat est ce qui intéresse un prospect, plus que la
                      description : il a droit à la taille au-dessus. */}
                  <p className="mt-5 text-lg font-semibold leading-snug">
                    <span style={{ color: "var(--accent-text)" }}>&#8250; </span>
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
