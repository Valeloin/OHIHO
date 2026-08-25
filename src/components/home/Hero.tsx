import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

// Trois repères factuels plutôt que des chiffres inventés : un délai de
// réponse, une fourchette de délai de projet, un interlocuteur.
const REPERES = [
  { valeur: "24 h", libelle: "pour vous répondre, jours ouvrés" },
  { valeur: "1 à 4 sem.", libelle: "de l'accord à la mise en ligne" },
  { valeur: "1", libelle: "interlocuteur, du début à la fin" },
];

export default function Hero() {
  return (
    <section className="pb-16 pt-16 sm:pb-24 sm:pt-24">
      <div className="shell">
        <Reveal>
          <p className="pill">{SITE.responseNote}</p>

          <h1 className="h-display mt-7 max-w-4xl">
            Un site à la hauteur{" "}
            <span className="gradient-text">de votre savoir-faire.</span>
          </h1>

          <p className="lede mt-6">
            Sites vitrines, refontes et applications web sur mesure. De l&apos;idée
            à la mise en ligne, avec un devis clair avant de commencer et une
            personne qui répond quand vous écrivez.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="#contact" className="btn btn-primary">
              Demander un devis
            </Link>
            <Link href="#realisations" className="btn btn-outline">
              Voir les réalisations
            </Link>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ul className="mt-14 grid gap-4 sm:grid-cols-3">
            {REPERES.map((repere) => (
              <li key={repere.libelle} className="card card-rule">
                <p className="text-3xl font-medium tracking-display">
                  {repere.valeur}
                </p>
                <p className="mt-1.5 text-sm text-ink-muted">
                  {repere.libelle}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
