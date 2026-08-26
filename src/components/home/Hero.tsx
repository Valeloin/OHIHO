import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { OFFRES, offreHref } from "@/lib/offres";
import { SITE } from "@/lib/site";

// Hero conçu pour être la SEULE chose que beaucoup de visiteurs liront
// (« 90 % des gens ne regardent que le hero »). Il doit donc tenir seul :
// la promesse, ce qu'on vend, les délais, et comment nous joindre.
//
// D'où le panneau des quatre offres posé à cheval sur le bandeau violet :
// sans défiler, le visiteur voit le titre, les quatre formules avec leur
// délai, et deux boutons. La section « Offres » plus bas ne fait que
// détailler ce qu'il a déjà vu.
//
// Le chevauchement (marge négative) est aussi ce qui donne la profondeur au
// bandeau : le panneau est à cheval sur le violet et sur le fond de page.
const REPERES = [
  { valeur: "24 h", libelle: "pour vous répondre, jours ouvrés" },
  { valeur: "1 à 4 sem.", libelle: "de l'accord à la mise en ligne" },
  { valeur: "1", libelle: "interlocuteur, du début à la fin" },
];

export default function Hero() {
  return (
    <>
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--hero-grad)" }}
      >
        {/* Halo doux derrière le titre : il évite l'aplat parfaitement plat,
            sans rien ajouter à charger. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 0%, rgb(255 255 255 / 0.16), transparent 70%)",
          }}
        />

        <div className="shell relative pb-32 pt-12 text-center sm:pb-36 sm:pt-16">
          <Reveal>
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
              Sites vitrines, refontes et applications web, écrits sur mesure
              pour votre activité — jamais achetés sur étagère.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {/* Le bouton principal porte le dégradé de marque : c'est là,
                  sur le fond profond, qu'il ressort le mieux. */}
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
        </div>
      </section>

      <div className="shell relative z-10 -mt-28 sm:-mt-32">
        <Reveal delay={120}>
          <div
            className="overflow-hidden rounded-xl border"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface)",
              boxShadow: "0 40px 80px -40px rgb(3 26 38 / 0.6)",
            }}
          >
            <p
              className="border-b px-6 py-3 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-alt)",
              }}
            >
              Ce qu&apos;on fait
            </p>

            <ul className="grid sm:grid-cols-2 xl:grid-cols-4">
              {OFFRES.map((offre) => (
                <li key={offre.slug}>
                  <Link
                    href={offreHref(offre.slug)}
                    className="group flex h-full flex-col border-b p-6 transition-colors sm:border-r xl:border-b-0"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <span
                      className="block h-[3px] w-7 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                    <span className="h-card mt-4 block text-lg">
                      {offre.label}
                    </span>
                    <span className="mt-1.5 block flex-1 text-[13px] leading-relaxed text-ink-muted">
                      {offre.tagline}
                    </span>
                    <span className="mt-5 flex items-center justify-between text-[13px]">
                      <span className="font-semibold">{offre.delai}</span>
                      <span
                        className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                        style={{ color: "var(--accent-text)" }}
                        aria-hidden
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <ul className="mx-auto mt-12 grid max-w-3xl gap-8 text-center sm:grid-cols-3">
            {REPERES.map((repere) => (
              <li key={repere.libelle}>
                <p className="text-3xl font-bold tracking-[-0.03em]">
                  {repere.valeur}
                </p>
                <p className="mt-1 text-[13px] text-ink-muted">
                  {repere.libelle}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </>
  );
}
