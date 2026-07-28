import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import Reveal from "@/components/motion/Reveal";
import { MethodSceneSingle } from "@/components/motion/MethodScenes";
import { getContent } from "@/lib/content";
import { METHOD_PAGES, methodHref, methodIndexBySlug } from "@/lib/method";

export function generateStaticParams() {
  return METHOD_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const index = methodIndexBySlug(params.slug);
  if (index === null) return {};

  const content = await getContent();
  const step = content.method.steps[index];
  if (!step) return {};
  return {
    title: `${step.title} · OHIHO`,
    description: step.description,
    alternates: { canonical: methodHref(index) },
  };
}

export default async function MethodStepPage({
  params,
}: {
  params: { slug: string };
}) {
  const index = methodIndexBySlug(params.slug);
  if (index === null) notFound();

  const content = await getContent();
  const step = content.method.steps[index];
  if (!step) notFound();

  const others = METHOD_PAGES.filter((p) => p.index !== index);

  return (
    <main className="relative overflow-hidden">
      <SectionBackdrop />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-16">
        <Link
          href="/#methode"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <span aria-hidden="true">←</span> Toute la méthode
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <span className="kicker">
              Étape {String(index + 1).padStart(2, "0")} sur{" "}
              {String(content.method.steps.length).padStart(2, "0")}
            </span>
            <h1 className="section-title mt-5">{step.title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {step.pageIntro}
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
            <div className="w-full overflow-hidden rounded-xl ring-1 ring-border">
              <MethodSceneSingle index={index} />
            </div>
          </Reveal>
        </div>

        {/* Le contenu propre à l'étape : ce qui s'y passe concrètement. */}
        <Reveal>
          <div className="card-surface mt-20 overflow-hidden">
            <h2 className="border-b border-border px-6 py-4 font-semibold tracking-display">
              Concrètement
            </h2>
            <ul className="divide-y divide-border">
              {step.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 px-6 py-3.5 text-sm leading-relaxed"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-emerald shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Les autres étapes, dans l'ordre du parcours. */}
        <div className="mt-16">
          <div className="h-px rule-fade" />
          <p className="mt-8 text-sm text-muted">Les autres étapes</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {others.map((other) => {
              const o = content.method.steps[other.index];
              if (!o) return null;
              return (
                <Link
                  key={other.slug}
                  href={`/methode/${other.slug}`}
                  className="card-surface group p-5 transition-colors hover:border-accent-cyan/40"
                >
                  <p className="font-mono text-xs text-brand-teal">
                    {String(other.index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 font-semibold tracking-display transition-colors group-hover:text-accent-cyan">
                    {o.title}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
