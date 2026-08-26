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
            style={{ background: "#ffffff", color: "#04262b" }}
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
          <ul className="mt-14 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {OFFRES.map((offre) => (
              <li key={offre.slug}>
                <Link
                  href={offreHref(offre.slug)}
                  className="group flex h-full flex-col rounded-xl border p-5"
                  style={{
                    borderColor: "rgb(255 255 255 / 0.18)",
                    background: "rgb(255 255 255 / 0.07)",
                    color: "#ffffff",
                  }}
                >
                  <span className="text-[17px] font-semibold tracking-[-0.015em]">
                    {offre.label}
                  </span>
                  <span
                    className="mt-1.5 flex-1 text-[13px] leading-relaxed"
                    style={{ color: "rgb(255 255 255 / 0.88)" }}
                  >
                    {offre.tagline}
                  </span>
                  <span className="mt-5 flex items-center justify-between text-[13px]">
                    <span className="font-semibold">{offre.delai}</span>
                    <span
                      className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden
                    >
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
