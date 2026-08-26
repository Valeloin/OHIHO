import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { OFFRES, offreHref } from "@/lib/offres";

// TABLEAU COMPARATIF, et non plus quatre cartes côte à côte (2026-08-26).
//
// Les cartes affichaient la même chose quatre fois : le visiteur devait les
// lire l'une après l'autre pour comprendre ce qui les distingue. Un tableau
// met les différences sur la même ligne — c'est ce qu'on vient chercher.
//
// Les lignes sont tirées des données : « Pour qui » reprend le premier cas
// d'usage de chaque offre, il n'y a pas de texte dupliqué ici.
const LIGNES = [
  { libelle: "Pour qui", valeur: (o: (typeof OFFRES)[number]) => o.pourQui[0] },
  { libelle: "Ce que ça donne", valeur: (o: (typeof OFFRES)[number]) => o.inclus[0] },
];

export default function Offres() {
  return (
    <section id="offres" className="section">
      <div className="shell">
        <Reveal className="text-center">
          <p className="kicker">Ce qu&apos;on fait</p>
          <h2 className="h-section mt-4">
            Quatre façons de travailler ensemble
          </h2>
        </Reveal>

        {/* Sous 900 px le tableau défile horizontalement plutôt que d'écraser
            quatre colonnes sur la largeur d'un téléphone. */}
        <Reveal delay={80}>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-left">
              <caption className="sr-only">
                Comparatif des quatre offres : pour qui, ce que ça donne, délai.
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[150px] p-0" />
                  {OFFRES.map((offre) => (
                    <th
                      key={offre.slug}
                      scope="col"
                      className="border-b p-5 align-bottom"
                      style={{ borderColor: "var(--line)" }}
                    >
                      <span
                        className="mb-4 block h-[3px] w-7 rounded-full"
                        style={{ background: "var(--accent)" }}
                      />
                      <span className="h-card block text-xl">{offre.label}</span>
                      <span className="mt-1 block text-sm font-normal text-ink-muted">
                        {offre.tagline}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {LIGNES.map((ligne) => (
                  <tr key={ligne.libelle}>
                    <th
                      scope="row"
                      className="border-b p-5 align-top text-[13px] font-medium text-ink-muted"
                      style={{ borderColor: "var(--line)" }}
                    >
                      {ligne.libelle}
                    </th>
                    {OFFRES.map((offre) => (
                      <td
                        key={offre.slug}
                        className="border-b p-5 align-top text-sm leading-relaxed"
                        style={{ borderColor: "var(--line)" }}
                      >
                        {ligne.valeur(offre)}
                      </td>
                    ))}
                  </tr>
                ))}

                <tr>
                  <th
                    scope="row"
                    className="border-b p-5 align-top text-[13px] font-medium text-ink-muted"
                    style={{ borderColor: "var(--line)" }}
                  >
                    Délai
                  </th>
                  {OFFRES.map((offre) => (
                    <td
                      key={offre.slug}
                      className="border-b p-5 align-top text-sm font-semibold"
                      style={{ borderColor: "var(--line)" }}
                    >
                      {offre.delai}
                    </td>
                  ))}
                </tr>

                <tr>
                  <th scope="row" className="p-5" />
                  {OFFRES.map((offre) => (
                    <td key={offre.slug} className="p-5 align-top">
                      <Link href={offreHref(offre.slug)} className="link-brand">
                        Le détail <span aria-hidden>→</span>
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
