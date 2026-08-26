import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

// Hero en BANDEAU PLEIN (2026-08-26), sur le modèle de la référence envoyée
// par Valentin : un aplat sombre qui occupe toute la largeur, un badge, un
// titre blanc très gras, et l'information la plus vendeuse mise en évidence
// juste sous le titre.
//
// La référence met une PHOTO de métier derrière ce bandeau, avec une
// surimpression violette. Nous n'avons pas de photothèque : le dégradé tient
// ce rôle en attendant, et il suffit de poser une image en fond de cette
// section le jour où on en aura une.
const REPERES = [
  { valeur: "24 h", libelle: "pour vous répondre" },
  { valeur: "1 à 4 sem.", libelle: "pour être en ligne" },
  { valeur: "1", libelle: "interlocuteur, du début à la fin" },
];

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--hero-grad)" }}
    >
      <div className="shell py-20 text-center sm:py-28">
        <Reveal>
          <p
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-semibold"
            style={{ background: "#ffffff", color: "#3b0764" }}
          >
            {SITE.responseNote}
          </p>

          <h1
            className="h-display mx-auto mt-7 max-w-[17ch]"
            style={{ color: "#ffffff" }}
          >
            Votre savoir-faire mérite mieux qu&apos;un site modèle.
          </h1>

          <p
            className="mx-auto mt-6 max-w-[56ch] text-base leading-relaxed sm:text-lg"
            style={{ color: "rgb(255 255 255 / 0.82)" }}
          >
            Sites vitrines, refontes et applications web, écrits sur mesure pour
            votre activité — jamais achetés sur étagère.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#contact"
              className="btn"
              style={{ background: "#ffffff", color: "#3b0764" }}
            >
              Demander un devis
            </Link>
            <Link
              href="#offres"
              className="btn border"
              style={{
                borderColor: "rgb(255 255 255 / 0.35)",
                color: "#ffffff",
              }}
            >
              Voir les offres
            </Link>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ul className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-3">
            {REPERES.map((repere) => (
              <li key={repere.libelle}>
                <p
                  className="text-3xl font-bold tracking-[-0.03em]"
                  style={{ color: "#ffffff" }}
                >
                  {repere.valeur}
                </p>
                <p
                  className="mt-1 text-[13px]"
                  style={{ color: "rgb(255 255 255 / 0.72)" }}
                >
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
