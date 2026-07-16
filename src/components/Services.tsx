import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import AnimatedGlow from "@/components/motion/AnimatedGlow";
import type { ServicesContent } from "@/lib/content/types";

export default function Services({ data }: { data: ServicesContent }) {
  return (
    <section id="services" className="relative overflow-hidden border-t border-border">
      <AnimatedGlow variant="subtle" />
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <Reveal className="max-w-2xl">
          <h2 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
            {data.kicker}
          </h2>
          <p className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {data.title}
          </p>
          <p className="mt-4 text-muted">{data.subtitle}</p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-3">
          {data.items.map((service, i) => (
            <RevealItem
              key={i}
              hover
              className="card-surface group relative flex flex-col overflow-hidden rounded-2xl p-8 transition-colors hover:border-accent-cyan/40"
            >
              <span className="font-mono text-xs text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
              <ul className="mt-5 space-y-2">
                {service.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-sm text-foreground/90"
                  >
                    <span className="h-1 w-1 rounded-full bg-accent-cyan" />
                    {point}
                  </li>
                ))}
              </ul>
              {/* Lien vers les réalisations sur la carte Applications (2e) */}
              {i === 1 && (
                <Link
                  href="/#portfolio"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan hover:underline"
                >
                  Voir nos réalisations
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
