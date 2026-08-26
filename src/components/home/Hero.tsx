import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

// Hero court, et qui parle au VISITEUR plutôt que de nous (2026-08-26).
//
// L'ancienne version annonçait ce qu'on est (« un site à la hauteur de votre
// savoir-faire ») puis listait nos formats. Elle ne disait pas ce que le
// visiteur y gagne. Le titre nomme donc maintenant ce qu'il évite — le site
// modèle, le gabarit — et le sous-titre dit ce qu'il obtient à la place.
//
// Les trois repères tiennent sur une ligne : ils rassurent sans repousser les
// offres sous la ligne de flottaison, qui est le point de la page.
const REPERES = [
  "Réponse sous 24 h ouvrées",
  "En ligne en 1 à 4 semaines",
  "Un seul interlocuteur",
];

export default function Hero() {
  return (
    <section className="pb-6 pt-8 sm:pb-8 sm:pt-12">
      <div className="shell">
        <Reveal>
          <h1 className="h-display max-w-[19ch]">
            Votre savoir-faire mérite mieux qu&apos;un{" "}
            <span className="gradient-text">site modèle.</span>
          </h1>

          <p className="lede mt-5 max-w-[52ch]">
            Sites vitrines, refontes et applications web, écrits sur mesure pour
            votre activité — jamais achetés sur étagère.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="#contact" className="btn btn-primary">
              Demander un devis
            </Link>
            <Link href="#realisations" className="btn btn-outline">
              Voir les réalisations
            </Link>
          </div>

          <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
            {REPERES.map((repere) => (
              <li key={repere} className="text-fine flex items-center gap-2">
                <span
                  className="h-[6px] w-[6px] shrink-0 rounded-full"
                  style={{ background: "rgb(var(--brand-emerald))" }}
                />
                {repere}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
