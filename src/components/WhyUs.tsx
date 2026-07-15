import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import AnimatedGlow from "@/components/motion/AnimatedGlow";

const VALUES = [
  {
    title: "Un travail soigné & durable",
    description:
      "Une stack moderne et un code lisible, pensés pour évoluer avec votre projet, pas contre lui.",
    accent: "hover:border-accent-cyan/50 hover:shadow-[0_12px_28px_-10px_rgba(56,189,248,0.3)]",
  },
  {
    title: "Communication claire",
    description:
      "Pas de jargon technique. Vous comprenez toujours où en est votre projet et pourquoi.",
    accent: "hover:border-accent-violet/50 hover:shadow-[0_12px_28px_-10px_rgba(129,140,248,0.3)]",
  },
  {
    title: "Livraison dans les délais",
    description:
      "Un devis clair en amont, et des points d'étape réguliers pour suivre l'avancement sans surprise.",
    accent: "hover:border-accent-emerald/50 hover:shadow-[0_12px_28px_-10px_rgba(52,211,153,0.3)]",
  },
  {
    title: "Accompagnement dans la durée",
    description:
      "Après la mise en ligne, nous restons disponibles pour les évolutions et corrections, par email.",
    accent: "hover:border-accent-cyan/50 hover:shadow-[0_12px_28px_-10px_rgba(56,189,248,0.3)]",
  },
];

export default function WhyUs() {
  return (
    <section id="a-propos" className="relative overflow-hidden border-t border-border bg-surface">
      <AnimatedGlow variant="subtle" />
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <Reveal className="max-w-2xl">
          <h2 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
            Pourquoi OHIHO
          </h2>
          <p className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Un accompagnement qui continue après la mise en ligne
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <RevealItem
              key={value.title}
              hover
              className={`rounded-2xl border border-border p-6 transition-colors ${value.accent}`}
            >
              <h3 className="text-base font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {value.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
