import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { PROJECTS } from "@/lib/projects";
import type { PortfolioContent } from "@/lib/content/types";

function projectLinkProps(href?: string) {
  const external = href?.startsWith("http");
  return {
    href: href ?? "/#contact",
    target: external ? "_blank" : undefined,
    rel: external ? "noopener noreferrer" : undefined,
  };
}

// ============================================================
// SECTION RÉALISATIONS — refonte du 2026-08-06 : même ligne éditoriale
// que Contact (fond dégradé vif, ondes, lucioles, noyau orbital), mais
// composition entièrement nouvelle plutôt qu'une simple reteinte de
// l'ancien mockup de navigateur. Deux projets réels seulement
// (lib/projects.ts) : plutôt qu'un rail qui les répète, ils sont mis en
// scène directement dans le noyau — le projet phare au centre, le
// second en satellite — sur le même principe que le noyau décoratif de
// Contact, mais ICI les deux cartes sont de vrais liens cliquables.
// ============================================================
export default function Portfolio({ data }: { data: PortfolioContent }) {
  const featured = PROJECTS[0];
  const satellite = PROJECTS[1];

  return (
    <section
      id="portfolio"
      className="portfolio-vivid section-screen relative overflow-hidden border-t border-border"
    >
      <div className="portfolio-waves" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="portfolio-flies" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className="portfolio-editorial-head site-shell">
        <p>Projets livrés</p>
        <h2 className="section-name">{data.kicker}</h2>
        <span>Conçus · développés · mis en ligne</span>
      </div>

      <div className="site-shell relative my-auto py-4">
        <div className="portfolio-editorial-main">
          <Reveal>
            <div className="portfolio-editorial-copy">
              <span>Du concret, pas des promesses.</span>
              <h3>{data.title}</h3>
              <p>{data.subtitle}</p>
              <Link href="/#contact" className="portfolio-editorial-cta">
                {data.ctaButton}
                <b aria-hidden="true">↗</b>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="portfolio-orbit">
              <span className="portfolio-orbit-ring" aria-hidden="true">
                <b />
              </span>

              {featured && (
                <Link
                  {...projectLinkProps(featured.href)}
                  className="portfolio-orbit-main group"
                  aria-label={`Découvrir ${featured.title}`}
                >
                  <span className="portfolio-orbit-bar" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="portfolio-orbit-body">
                    {featured.icon && (
                      <span
                        className="portfolio-orbit-icon"
                        style={{ background: featured.iconBg }}
                      >
                        <Image
                          src={featured.icon}
                          alt=""
                          width={64}
                          height={64}
                        />
                      </span>
                    )}
                    <span className="portfolio-orbit-info">
                      <small>{featured.category}</small>
                      <strong>{featured.title}</strong>
                      <em>{featured.description}</em>
                    </span>
                    <b aria-hidden="true">↗</b>
                  </span>
                </Link>
              )}

              {satellite && (
                <Link
                  {...projectLinkProps(satellite.href)}
                  className="portfolio-orbit-satellite group"
                  aria-label={`Découvrir ${satellite.title}`}
                >
                  {satellite.icon && (
                    <span
                      className="portfolio-orbit-satellite-icon"
                      style={{ background: satellite.iconBg }}
                    >
                      <Image
                        src={satellite.icon}
                        alt=""
                        width={48}
                        height={48}
                      />
                    </span>
                  )}
                  <span>
                    <small>{satellite.category}</small>
                    <strong>{satellite.title}</strong>
                  </span>
                  <b aria-hidden="true">↗</b>
                </Link>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="portfolio-vivid-footer">
            <p>
              <span>02</span>
              {PROJECTS.length} projets livrés, d&apos;autres en cours.
            </p>
            <div>
              {Array.from(new Set(PROJECTS.map((p) => p.category))).map(
                (category, i, arr) => (
                  <Fragment key={category}>
                    <span>{category}</span>
                    {i < arr.length - 1 && <i aria-hidden="true" />}
                  </Fragment>
                )
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
