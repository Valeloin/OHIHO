import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import AnimatedGlow from "@/components/motion/AnimatedGlow";

const STEPS = [
  {
    step: "01",
    title: "Échange initial",
    description:
      "Un échange pour comprendre votre projet, vos objectifs et votre budget — sans engagement.",
  },
  {
    step: "02",
    title: "Maquette & devis",
    description:
      "Une proposition claire, avec maquette visuelle et devis détaillé, avant de commencer le développement.",
  },
  {
    step: "03",
    title: "Développement",
    description:
      "Votre site ou application prend forme, avec des points d'étape réguliers pour suivre l'avancement.",
  },
  {
    step: "04",
    title: "Mise en ligne & suivi",
    description:
      "Déploiement, puis accompagnement dans la durée pour les évolutions et le suivi par email.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-surface">
      <AnimatedGlow variant="subtle" />
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <Reveal className="max-w-2xl">
          <h2 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-violet">
            Méthode
          </h2>
          <p className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Comment nous travaillons ensemble
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item, i) => (
            <RevealItem key={item.step} className="relative pl-6">
              <div className="absolute left-0 top-1 h-full w-px bg-border sm:hidden" />
              <span className="font-mono text-2xl font-semibold text-accent-cyan/70">
                {item.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
              {i < STEPS.length - 1 && (
                <div className="mt-6 hidden h-px w-full bg-gradient-to-r from-border to-transparent lg:block" />
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
