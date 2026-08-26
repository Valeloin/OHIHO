import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

// Hero CENTRÉ (2026-08-26), sur le modèle de mycalories : une seule colonne,
// titre large, deux boutons, rien d'autre. La version précédente alignait
// tout à gauche et laissait la moitié droite de l'écran vide.
export default function Hero() {
  return (
    <section className="pb-14 pt-16 text-center sm:pb-16 sm:pt-24">
      <div className="shell">
        <Reveal>
          <p className="pill mx-auto">{SITE.responseNote}</p>

          <h1 className="h-display mx-auto mt-7 max-w-[17ch]">
            Votre savoir-faire mérite mieux qu&apos;un{" "}
            <span className="accent-text">site modèle.</span>
          </h1>

          <p className="lede mx-auto mt-6 max-w-[56ch] text-center">
            Sites vitrines, refontes et applications web, écrits sur mesure pour
            votre activité — jamais achetés sur étagère.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="#contact" className="btn btn-primary">
              Demander un devis
            </Link>
            <Link href="#offres" className="btn btn-outline">
              Voir les offres
            </Link>
          </div>

          <p className="text-fine mt-6">
            Devis sans engagement. En ligne en 1 à 4 semaines. Un seul
            interlocuteur, du début à la fin.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
