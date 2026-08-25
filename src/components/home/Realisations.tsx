import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { REALISATIONS } from "@/lib/realisations";

export default function Realisations() {
  return (
    <section id="realisations" className="section">
      <div className="shell">
        <SectionHead
          kicker="Réalisations"
          title="Des projets livrés, en service"
          lede="Deux projets réels : un site vitrine que son client administre lui-même, et l'outil de suivi que nous utilisons avec nos clients."
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {REALISATIONS.map((projet, index) => (
            <li key={projet.title}>
              <Reveal delay={index * 80} className="h-full">
                <article className="card flex h-full flex-col p-7">
                  <div className="flex items-center gap-4">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: projet.iconBg }}
                    >
                      <Image
                        src={projet.icon}
                        alt=""
                        width={28}
                        height={28}
                        className="h-7 w-7"
                      />
                    </span>
                    <div>
                      <h3 className="h-card">{projet.title}</h3>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                        {projet.category}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 flex-1 text-sm leading-relaxed text-ink-muted">
                    {projet.description}
                  </p>

                  <p className="mt-5 flex gap-2.5 text-sm">
                    <span
                      className="mt-2 h-[6px] w-[6px] shrink-0 rounded-full"
                      style={{ background: "rgb(var(--brand-emerald))" }}
                    />
                    {projet.resultat}
                  </p>

                  <div
                    className="mt-6 border-t pt-4"
                    style={{ borderColor: "var(--line)" }}
                  >
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
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={160}>
          <div
            className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border p-7"
            style={{ borderColor: "var(--line)" }}
          >
            <p className="lede text-[15px]">
              Votre projet peut être le prochain. On en parle sans engagement.
            </p>
            <Link href="#contact" className="btn btn-ink">
              Demander un devis
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
