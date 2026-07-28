import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceScene from "@/components/motion/ServiceScene";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import Reveal from "@/components/motion/Reveal";
import { getContent } from "@/lib/content";
import { SERVICE_PAGES, serviceHref, serviceTypeBySlug } from "@/lib/services";

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const type = serviceTypeBySlug(params.slug);
  if (!type) return {};

  const content = await getContent();
  const offer = content.services.offers[type];
  return {
    title: `${offer.label} · OHIHO`,
    description: offer.description,
    alternates: { canonical: serviceHref(type) },
  };
}

export default async function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const type = serviceTypeBySlug(params.slug);
  if (!type) notFound();

  const content = await getContent();
  const offer = content.services.offers[type];
  const others = SERVICE_PAGES.filter((s) => s.type !== type);

  return (
    <main className="relative overflow-hidden">
      <SectionBackdrop />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-16">
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <span aria-hidden="true">←</span> Tous les services
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <span className="kicker">{offer.tagline}</span>
            <h1 className="section-title mt-5">{offer.label}</h1>
            {/* `pageIntro` et non la description de la vitrine : chaque page
                porte son propre texte long — quatre pages qui répétaient
                leurs trois lignes d'accueil se lisaient comme « quatre fois
                la même page ». */}
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {offer.pageIntro}
            </p>

            <div className="mt-10 h-px rule-fade" />

            <Link
              href="/#contact"
              className="btn-accent mt-8 inline-flex px-7 py-3.5 text-sm"
            >
              Nous contacter
            </Link>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="aspect-[400/240] w-full overflow-hidden rounded-xl ring-1 ring-border">
              <ServiceScene type={type} />
            </div>
          </Reveal>
        </div>

        {/* Le contenu PROPRE à la formule : ce qu'elle inclut, et pour qui
            elle est faite. C'est ce qui différencie réellement les quatre
            pages. */}
        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="card-surface h-full overflow-hidden">
              <h2 className="border-b border-border px-6 py-4 font-semibold tracking-display">
                Ce qui est inclus
              </h2>
              <ul className="divide-y divide-border">
                {offer.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 px-6 py-3.5 text-sm leading-relaxed"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-emerald shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-surface h-full overflow-hidden">
              <h2 className="border-b border-border px-6 py-4 font-semibold tracking-display">
                Pour qui ?
              </h2>
              <ul className="divide-y divide-border">
                {offer.useCases.map((useCase) => (
                  <li
                    key={useCase}
                    className="flex items-start gap-3 px-6 py-3.5 text-sm leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-sky/70"
                    />
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Les trois autres formules, pour comparer sans repasser par
            l'accueil. */}
        <div className="mt-20">
          <div className="h-px rule-fade" />
          <p className="mt-8 text-sm text-muted">Les autres formules</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {others.map((other) => {
              const o = content.services.offers[other.type];
              return (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="card-surface group p-5 transition-colors hover:border-accent-cyan/40"
                >
                  <p className="font-semibold tracking-display transition-colors group-hover:text-accent-cyan">
                    {o.label}
                  </p>
                  <p className="mt-1.5 text-sm text-muted">{o.tagline}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
