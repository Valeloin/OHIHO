import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import SectionLabel from "@/components/SectionLabel";
import ServiceScene from "@/components/motion/ServiceScene";
import { SERVICE_TYPES, serviceHref } from "@/lib/services";
import type { ServicesContent } from "@/lib/content/types";

// Vitrine, et non argumentaire : depuis le 2026-07-27 chaque formule a sa
// page. La section ne garde donc que le visuel, le nom et un bouton — les
// quatre paragraphes de description qui s'y trouvaient sont partis sur les
// pages correspondantes, où ils ont la place de se déployer.
export default function Services({ data }: { data: ServicesContent }) {
  const formulas = SERVICE_TYPES.map((type) => ({
    type,
    ...data.offers[type],
  }));

  return (
    <section
      id="services"
      className="section-screen relative overflow-hidden border-t border-border"
    >
      <SectionBackdrop />
      {/* Conteneur plus large que les autres sections (90rem) : c'est lui qui
          donne leur taille aux quatre vignettes — à 7xl elles tombaient à
          ~280 px de large et se lisaient comme des timbres. */}
            <SectionLabel>{data.kicker}</SectionLabel>

<div className="relative mx-auto w-full max-w-[90rem] px-6 py-10 my-auto">

        <Reveal>
          <p className="section-lead max-w-4xl">{data.title}</p>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {formulas.map((formula) => (
            <RevealItem key={formula.type} hover className="h-full">
              <Link
                href={serviceHref(formula.type)}
                className="group flex h-full flex-col"
              >
                {/* L'animation est l'objet, posée à même le fond avec son seul
                    cadre de navigateur — pas de carte autour. */}
                <div className="aspect-[400/240] w-full overflow-hidden rounded-xl ring-1 ring-border transition duration-300 group-hover:ring-accent-cyan/60">
                  <ServiceScene type={formula.type} />
                </div>

                <h3 className="mt-5 text-xl font-semibold tracking-display transition-colors group-hover:text-accent-cyan">
                  {formula.label}
                </h3>
                {/* La description de la formule (éditable dans /admin), en
                    quelques lignes sous chaque animation. Bornée à 3 lignes
                    pour que les quatre colonnes restent à la même hauteur. */}
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                  {formula.description}
                </p>

                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-accent-cyan">
                  Découvrir
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
