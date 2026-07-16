import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import AnimatedGlow from "@/components/motion/AnimatedGlow";
import type { ContactContent } from "@/lib/content/types";

export default function ContactSection({ data }: { data: ContactContent }) {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border bg-surface"
    >
      <AnimatedGlow variant="subtle" />
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <h2 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
              {data.kicker}
            </h2>
            <p className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {data.title}
            </p>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              {data.subtitle}
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald" />
                <a href={`mailto:${data.email}`} className="hover:underline">
                  {data.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald" />
                <span className="text-muted">{data.responseNote}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="card-surface mx-auto w-full max-w-md rounded-2xl p-6">
              <h3 className="text-lg font-semibold">{data.cardTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {data.cardText}
              </p>

              <div className="mt-6 flex justify-center">
                <Link
                  href="/inscription"
                  className="btn-accent inline-block rounded-full px-8 py-3 text-center text-sm font-semibold"
                >
                  {data.cardCta}
                </Link>
              </div>

              <p className="mt-5 text-center text-sm text-muted">
                Déjà un compte ?{" "}
                <Link
                  href="/connexion"
                  className="text-accent-cyan hover:underline"
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
