import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import type { ContactContent } from "@/lib/content/types";

export default function ContactSection({ data }: { data: ContactContent }) {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border bg-surface"
    >
      <SectionBackdrop />
      <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            {/* En-tête éditorial : libellé mono, titre large aligné à gauche. */}
            <span className="kicker">{data.kicker}</span>
            <h2 className="mt-6 max-w-3xl text-3xl font-semibold tracking-display text-balance sm:text-5xl">
              {data.title}
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted">
              {data.subtitle}
            </p>
            <div className="mt-12 h-px rule-fade" />

            {/* Points ronds verts lumineux, dans l'esprit de la banderole. */}
            <div className="mt-8 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-emerald shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                <a href={`mailto:${data.email}`} className="inline-flex min-h-[44px] items-center hover:underline">
                  {data.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-emerald shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                <span className="text-muted">{data.responseNote}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            {/* Carte : aplat + filet + arrondi + ombre douce, aligné à gauche. */}
            <div className="card-surface w-full p-8">
              <h3 className="text-lg font-semibold tracking-display">
                {data.cardTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {data.cardText}
              </p>

              <div className="mt-8 h-px rule-fade" />

              <div className="mt-8">
                <Link
                  href="/inscription"
                  className="btn-accent inline-flex px-8 py-3 text-sm"
                >
                  {data.cardCta}
                </Link>
              </div>

              <p className="mt-6 text-sm text-muted">
                Déjà un compte ?{" "}
                <Link
                  href="/connexion"
                  className="inline-flex min-h-[44px] items-center text-accent-cyan hover:underline"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
