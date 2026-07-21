import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import { PROJECTS } from "@/lib/projects";
import type { PortfolioContent } from "@/lib/content/types";

export default function Portfolio({ data }: { data: PortfolioContent }) {
  // Fond par défaut : la section est entre deux sections sur --surface
  // (Pourquoi OHIHO et Votre projet), l'alternance reste lisible.
  return (
    <section
      id="portfolio"
      className="relative overflow-hidden border-t border-border"
    >
      <SectionBackdrop />
      {/* Rythme resserré : comme Services, cette section porte beaucoup de
          contenu (3 cartes + encart) et doit tenir sur un écran. */}
      <div className="relative mx-auto max-w-7xl px-6 py-12 sm:py-16">
        {/* En-tête éditorial : libellé mono, titre large à gauche, filet. */}
        <Reveal>
          <span className="kicker">{data.kicker}</span>
          <h2 className="mt-6 max-w-3xl text-3xl font-semibold tracking-display text-balance sm:text-5xl">
            {data.title}
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted">
            {data.subtitle}
          </p>
        </Reveal>
        <div className="mt-8 h-px rule-fade" />

        {/* Les réalisations se lisent d'abord par leur MARQUE : une grande
            tuile portant le favicon du site, cliquable vers le site en ligne.
            Les favicons sont servies depuis /public — aucun appel externe
            depuis le navigateur du visiteur.
            Les projets à venir gardent une tuile en pointillés, non cliquable
            et sans icône : on n'invente pas de favicon pour un site qui
            n'existe pas. */}
        <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {PROJECTS.map((project) => {
            const isExternal = project.href?.startsWith("http");
            const enLigne = Boolean(project.href);

            const content = (
              <>
                {/* Tuile d'icône en grand format, carrée. */}
                <div className="flex items-center gap-4">
                  {project.icon ? (
                    <span
                      className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl"
                      style={{ background: project.iconBg }}
                    >
                      <Image
                        src={project.icon}
                        alt=""
                        width={80}
                        height={80}
                        className="h-20 w-20"
                      />
                    </span>
                  ) : (
                    /* Emplacement à venir : pointillés, aucune icône. */
                    <span
                      aria-hidden="true"
                      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-dashed border-border text-2xl text-muted/50"
                    >
                      ·
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-teal">
                      {project.category}
                    </p>
                    {/* `truncate` seulement à partir de `sm` : en une seule
                        colonne, la tuile est assez large pour laisser le
                        titre passer à la ligne, et un nom coupé par une
                        ellipse sur mobile se lit mal. L'ellipse ne sert que
                        dans les grilles à 2 et 3 colonnes, où les tuiles
                        doivent rester de même hauteur. */}
                    <h3 className="mt-2 text-lg font-semibold tracking-display sm:truncate">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                {/* mt-auto : l'action reste collée en bas, les tuiles étant
                    à hauteur égale sur la rangée. */}
                {enLigne ? (
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-accent-cyan">
                    Voir le site
                    <span aria-hidden="true">→</span>
                  </span>
                ) : (
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-muted">
                    {project.note ?? "Bientôt en ligne"}
                  </span>
                )}
              </>
            );

            // Trois états distincts, et non deux : un projet peut être bien
            // réel (donc avec son icône) sans être encore accessible en
            // ligne. Seules les tuiles SANS icône sont de vrais emplacements
            // vides, et elles seules prennent les pointillés et l'atténuation.
            // Un vrai projet (avec icône) prend le DÉGRADÉ DE MARQUE, comme
            // les cartes du hero mais dans l'ORDRE INVERSE — émeraude → teal
            // → bleu ciel au lieu de bleu → teal → émeraude : même palette,
            // sens de lecture opposé, pour que les deux jeux de cartes se
            // répondent sans se copier. Seuls les emplacements vides (sans
            // icône) gardent la carte sombre à pointillés.
            const hasGradient = Boolean(project.icon);

            // Carte intérieure : fond nuit `card-dark` (#071522) teinté du
            // dégradé de marque, coins arrondis, sans bordure (c'est
            // l'enveloppe qui la porte).
            const innerClass =
              "relative flex h-full flex-col overflow-hidden rounded-[15px] p-6";
            const innerStyle = {
              background:
                "linear-gradient(135deg, rgba(52,211,153,0.16) 0%, rgba(34,211,196,0.05) 48%, rgba(56,189,248,0.16) 100%), #071522",
            };

            return (
              // `min-w-0` : une cellule de grille refuse par défaut de
              // descendre sous la largeur minimale de son contenu. Le titre
              // étant en `truncate` (donc insécable), la tuile réclamait
              // 301 px et débordait de sa colonne de 272 sur un écran de
              // 320. Avec `min-w-0`, elle se plie à sa colonne et c'est
              // l'ellipse du titre qui absorbe le manque.
              <RevealItem
                key={project.title}
                hover={enLigne}
                className="h-full min-w-0"
              >
                {hasGradient ? (
                  // Enveloppe au dégradé = la bordure ; `p-px` en fait le
                  // liseré. Elle s'intensifie au survol.
                  <div className="group h-full rounded-2xl bg-gradient-to-br from-brand-emerald/55 via-brand-teal/45 to-brand-sky/55 p-px shadow-[var(--card-shadow)] transition-all duration-300 hover:from-brand-emerald hover:via-brand-teal hover:to-brand-sky">
                    {project.href ? (
                      <Link
                        href={project.href}
                        className={innerClass}
                        style={innerStyle}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                      >
                        {content}
                      </Link>
                    ) : (
                      <div className={innerClass} style={innerStyle}>
                        {content}
                      </div>
                    )}
                  </div>
                ) : (
                  // Emplacement vide : pas de dégradé, carte sombre à
                  // pointillés, atténuée.
                  <div className="card-dark group flex h-full flex-col border-dashed p-6 opacity-70">
                    {content}
                  </div>
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal>
          {/* Encart de fin en carte : texte à gauche, bouton à droite ;
              empilé sous sm. */}
          <div className="card-surface mt-8 flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              {data.ctaText}
            </p>
            <Link
              href="/portail/devis/nouveau"
              className="btn-accent inline-flex shrink-0 px-6 py-3 text-sm"
            >
              {data.ctaButton}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
