import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

// Hero volontairement court (2026-08-26) : la demande est que le visiteur
// voie « 90 % de ce qu'on vend » sans défiler. Tout ce qui n'amène pas
// directement aux offres a donc été retiré ou réduit à une ligne — les trois
// repères, qui occupaient une rangée de cartes entière, tiennent maintenant
// sur une seule ligne de texte fin.
const REPERES = [
  "Réponse sous 24 h ouvrées",
  "En ligne en 1 à 4 semaines",
  "Un seul interlocuteur",
];

export default function Hero() {
  return (
    <section className="pb-8 pt-10 sm:pb-10 sm:pt-14">
      <div className="shell">
        <Reveal>
          <h1 className="h-display max-w-4xl">
            Un site à la hauteur{" "}
            <span className="gradient-text">de votre savoir-faire.</span>
          </h1>

          <p className="lede mt-5">
            Sites vitrines, refontes et applications web sur mesure, conçus et
            développés à {SITE.city}.
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
