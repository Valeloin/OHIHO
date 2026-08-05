import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
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

export default function Portfolio({ data }: { data: PortfolioContent }) {
  const featured = PROJECTS[0];
  const secondary = PROJECTS[1];

  return (
    <section
      id="portfolio"
      className="portfolio-editorial section-screen relative overflow-hidden border-t border-border"
    >
      <SectionBackdrop />

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

          {featured && (
            <Reveal delay={0.1}>
              <div className="portfolio-stage">
                <Link
                  {...projectLinkProps(featured.href)}
                  className="portfolio-browser group"
                  aria-label={`Découvrir ${featured.title}`}
                >
                  <div className="portfolio-browser-bar" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <i>cadance-coaching.fr</i>
                  </div>
                  <div className="portfolio-browser-body">
                    <div className="portfolio-browser-brand">
                      {featured.icon && (
                        <span style={{ background: featured.iconBg }}>
                          <Image
                            src={featured.icon}
                            alt=""
                            width={96}
                            height={96}
                          />
                        </span>
                      )}
                      <div>
                        <small>{featured.category}</small>
                        <strong>{featured.title}</strong>
                        <em>Identité, contenus et autonomie réunis.</em>
                      </div>
                    </div>
                    <div className="portfolio-browser-ui" aria-hidden="true">
                      <div className="portfolio-ui-title" />
                      <div className="portfolio-ui-line" />
                      <div className="portfolio-ui-line portfolio-ui-line--short" />
                      <div className="portfolio-ui-cards">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                </Link>

                {secondary && (
                  <Link
                    {...projectLinkProps(secondary.href)}
                    className="portfolio-float group"
                    aria-label={`Découvrir ${secondary.title}`}
                  >
                    {secondary.icon && (
                      <span className="portfolio-float-icon">
                        <Image
                          src={secondary.icon}
                          alt=""
                          width={64}
                          height={64}
                        />
                      </span>
                    )}
                    <span>
                      <small>{secondary.category}</small>
                      <strong>{secondary.title}</strong>
                    </span>
                    <b aria-hidden="true">↗</b>
                  </Link>
                )}
              </div>
            </Reveal>
          )}
        </div>

        <RevealGroup className="portfolio-project-rail">
          {PROJECTS.map((project, index) => (
            <RevealItem key={project.title} hover={Boolean(project.href)}>
              <Link
                {...projectLinkProps(project.href)}
                className="portfolio-project-card group"
              >
                <span className="portfolio-project-number">0{index + 1}</span>
                {project.icon && (
                  <span
                    className="portfolio-project-icon"
                    style={{ background: project.iconBg }}
                  >
                    <Image src={project.icon} alt="" width={48} height={48} />
                  </span>
                )}
                <span className="portfolio-project-meta">
                  <small>{project.category}</small>
                  <strong>{project.title}</strong>
                </span>
                <span className="portfolio-project-description">
                  {project.description}
                </span>
                <b aria-hidden="true">↗</b>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
