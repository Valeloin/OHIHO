import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { OFFRES, offreHref } from "@/lib/offres";
import { SITE } from "@/lib/site";

// Hero conçu pour tenir SEUL : beaucoup de visiteurs ne verront que lui.
// Promesse, ce qu'on vend, délais, et comment nous joindre — le tout dans un
// seul bandeau.
//
// Trois défauts corrigés ici, signalés par Valentin sur capture :
//
// 1. Le panneau des offres était posé À CHEVAL sur la fin du dégradé. La
//    coupure du fond passait derrière lui, en plein milieu : c'est ce qui
//    salissait le plus la zone. Les offres sont maintenant DANS le bandeau,
//    sur des cartes translucides — un seul fond, aucune couture.
// 2. Une rangée de trois chiffres (24 h, 1 à 4 semaines, 1 interlocuteur)
//    répétait mot pour mot le badge du dessus et trois des six arguments du
//    dessous. Supprimée : c'était la même information trois fois.
// 3. Il en résultait trois blocs de petits textes empilés, de poids
//    identique, sans hiérarchie. Il n'en reste qu'un.
//
// Les cartes elles-mêmes ont ensuite été retravaillées : c'étaient quatre
// boîtes de texte identiques. Chacune a maintenant son icône, la formule la
// plus demandée est signalée, et le filet clair sur l'arête haute donne aux
// cartes translucides leur épaisseur de verre.

// Un glyphe par formule. Quatre icônes ne justifient pas d'embarquer une
// bibliothèque : un tracé prend la couleur du texte et reste net partout.
const ICONES: Record<string, string> = {
  // Une page, une cible : un rectangle et un point de mire.
  "landing-page": "M4 5h16v14H4zM8 9h8M8 13h4",
  // Plusieurs pages empilées.
  "site-vitrine": "M8 3h12v12M4 8h12v12H4z",
  // Refonte : la flèche qui reboucle.
  refonte: "M20 12a8 8 0 1 1-2.3-5.6M20 4v4h-4",
  // Application : un tableau de bord.
  "application-web": "M4 4h7v7H4zM13 4h7v4h-7zM13 11h7v9h-7zM4 14h7v6H4z",
  defaut: "M4 5h16v14H4z",
};

// La formule mise en avant, la même que dans la section « Offres » : c'est la
// plus large, celle qui convient au plus grand nombre de visiteurs.
const MISE_EN_AVANT = "site-vitrine";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--hero-grad)" }}
    >
      {/* Halo doux derrière le titre : il évite l'aplat parfaitement plat,
          sans rien ajouter à charger. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[460px]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgb(255 255 255 / 0.14), transparent 70%)",
        }}
      />

      <div className="shell relative py-16 sm:py-20">
        <Reveal className="text-center">
          <p
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-semibold"
            style={{ background: "#ffffff", color: "var(--on-accent)" }}
          >
            {SITE.responseNote}
          </p>

          <h1
            className="h-display mx-auto mt-6 max-w-[16ch]"
            style={{ color: "#ffffff" }}
          >
            Votre savoir-faire mérite mieux qu&apos;un site modèle.
          </h1>

          <p
            className="mx-auto mt-6 max-w-[54ch] text-base leading-relaxed sm:text-lg"
            style={{ color: "rgb(255 255 255 / 0.92)" }}
          >
            Sites vitrines, refontes et applications web, écrits sur mesure pour
            votre activité — jamais achetés sur étagère.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="#contact" className="btn btn-primary">
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
              Voir le détail des offres
            </Link>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {OFFRES.map((offre) => {
              const enAvant = offre.slug === MISE_EN_AVANT;

              return (
                <li key={offre.slug} className="relative">
                  {enAvant ? (
                    <span
                      className="absolute -top-2.5 left-5 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]"
                      style={{
                        background: "var(--accent-grad)",
                        color: "var(--on-accent)",
                      }}
                    >
                      Le plus demandé
                    </span>
                  ) : null}

                  <Link
                    href={offreHref(offre.slug)}
                    className="group flex h-full flex-col rounded-xl border p-5 transition-transform duration-200 hover:-translate-y-1"
                    style={{
                      // Cartes de VERRE : le bandeau est sombre, une carte
                      // translucide s'y pose sans le trouer. Le filet clair
                      // sur l'arête haute leur donne leur épaisseur.
                      background: enAvant
                        ? "rgb(255 255 255 / 0.13)"
                        : "rgb(255 255 255 / 0.07)",
                      borderColor: enAvant
                        ? "rgb(255 255 255 / 0.45)"
                        : "rgb(255 255 255 / 0.18)",
                      color: "#ffffff",
                      boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.16)",
                    }}
                  >
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ background: "rgb(255 255 255 / 0.12)" }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d={ICONES[offre.slug] ?? ICONES.defaut} />
                      </svg>
                    </span>

                    <span className="mt-4 text-[17px] font-semibold tracking-[-0.015em]">
                      {offre.label}
                    </span>
                    <span
                      className="mt-1.5 flex-1 text-[13px] leading-relaxed"
                      style={{ color: "rgb(255 255 255 / 0.88)" }}
                    >
                      {offre.tagline}
                    </span>

                    <span
                      className="mt-5 flex items-center justify-between border-t pt-4"
                      style={{ borderColor: "rgb(255 255 255 / 0.14)" }}
                    >
                      <span className="text-[13px] font-semibold">
                        {offre.delai}
                      </span>
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-full text-[13px] transition-transform duration-200 group-hover:translate-x-0.5"
                        style={{ background: "rgb(255 255 255 / 0.14)" }}
                        aria-hidden
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
