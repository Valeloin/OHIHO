import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/Reveal";
import { OFFRES, offreBySlug, offreHref } from "@/lib/offres";
import { SITE } from "@/lib/site";

type Params = { params: { slug: string } };

// Les quatre pages sont connues à l'avance : elles sont générées au build,
// servies en statique, et le sitemap les reprend depuis la même liste.
export function generateStaticParams() {
  return OFFRES.map((offre) => ({ slug: offre.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const offre = offreBySlug(params.slug);
  if (!offre) return {};

  return {
    title: offre.meta.title,
    description: offre.meta.description,
    alternates: { canonical: offreHref(offre.slug) },
    openGraph: {
      title: `${offre.meta.title} · OHIHO`,
      description: offre.meta.description,
      url: `${SITE.url}${offreHref(offre.slug)}`,
    },
  };
}

export default function OffrePage({ params }: Params) {
  const offre = offreBySlug(params.slug);
  if (!offre) notFound();

  const autres = OFFRES.filter((o) => o.slug !== offre.slug);

  return (
    <main>
      <section className="pb-14 pt-14 sm:pb-20 sm:pt-20">
        <div className="shell">
          <Reveal>
            <nav aria-label="Fil d'Ariane" className="text-fine">
              <Link href="/" className="hover:text-ink">
                Accueil
              </Link>
              <span aria-hidden> / </span>
              <Link href="/#offres" className="hover:text-ink">
                Offres
              </Link>
              <span aria-hidden> / </span>
              <span>{offre.label}</span>
            </nav>

            <p className="kicker mt-8">{offre.tagline}</p>
            <h1 className="h-display mt-5 max-w-3xl">
              {offre.label}{" "}
              <span className="gradient-text">sur mesure.</span>
            </h1>
            <p className="lede mt-6">{offre.intro}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/#contact" className="btn btn-primary">
                Demander un devis
              </Link>
              <span className="btn btn-outline pointer-events-none">
                Délai : {offre.delai}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="shell grid gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="card h-full p-7">
              <h2 className="h-card">Ce qui est inclus</h2>
              <ul className="mt-5 space-y-3.5">
                {offre.inclus.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed">
                    <span
                      className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full"
                      style={{ background: "rgb(var(--brand-emerald))" }}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={90} className="h-full">
            <div className="card-deep h-full p-7">
              <h2 className="h-card">Pour qui</h2>
              <ul className="mt-5 space-y-3.5">
                {offre.pourQui.map((cas) => (
                  <li key={cas} className="flex gap-3 text-sm leading-relaxed">
                    <span
                      className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full"
                      style={{ background: "rgb(var(--brand-teal))" }}
                    />
                    {cas}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface-alt)" }}>
        <div className="shell">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div>
                <h2 className="h-section">Ce format vous correspond ?</h2>
                <p className="lede mt-4">
                  Décrivez votre projet en quelques lignes : vous aurez un avis
                  honnête et un devis sous 24 h ouvrées.
                </p>
              </div>
              <Link href="/#contact" className="btn btn-primary">
                Demander un devis
              </Link>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-14">
              <p className="kicker">Les autres offres</p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                {autres.map((autre) => (
                  <li key={autre.slug}>
                    <Link
                      href={offreHref(autre.slug)}
                      className="card group flex h-full flex-col p-6 transition-transform duration-200 hover:-translate-y-1"
                    >
                      <span className="h-card">{autre.label}</span>
                      <span className="mt-2 flex-1 text-sm text-ink-muted">
                        {autre.tagline}
                      </span>
                      <span className="mt-4 text-sm font-medium">
                        Voir{" "}
                        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Données structurées : une offre de service rattachée à OHIHO. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: offre.meta.title,
            description: offre.meta.description,
            serviceType: offre.label,
            url: `${SITE.url}${offreHref(offre.slug)}`,
            areaServed: "France",
            provider: {
              "@type": "ProfessionalService",
              name: SITE.name,
              url: SITE.url,
            },
          }),
        }}
      />
    </main>
  );
}
