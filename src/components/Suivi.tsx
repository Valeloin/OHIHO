import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import TicketScene from "@/components/motion/TicketScene";

// Section « suivi après mise en ligne » : l'espace de tickets ouvert avec
// chaque site livré. Elle prolonge « Pourquoi OHIHO », qui promet un
// accompagnement dans la durée — ici on montre concrètement par quoi il passe.
//
// ⚠️ Contrairement aux autres sections, ces textes NE SONT PAS éditables
// depuis /admin : ils sont écrits en dur ci-dessous. Les rendre modifiables
// demanderait d'ajouter une section au type SiteContent, aux valeurs par
// défaut et à l'éditeur — à faire si le contenu doit bouger souvent.
const POINTS = [
  {
    titre: "Vous signalez, nous suivons",
    texte:
      "Un souci ou une demande d'évolution ? Vous la déposez dans votre espace plutôt que dans un email qui se perd. Chaque demande a sa référence, sa priorité et son état.",
  },
  {
    titre: "Vous savez toujours où ça en est",
    texte:
      "Reçue, en cours d'analyse, corrigée : le statut est visible à tout moment, et les échanges restent attachés à la demande — pas éparpillés dans une boîte mail.",
  },
  {
    titre: "Rien ne reste en plan",
    texte:
      "Vous êtes prévenu par email à chaque avancée, et les demandes restées sans réponse remontent automatiquement plutôt que de tomber dans l'oubli.",
  },
];

export default function Suivi() {
  return (
    <section
      id="suivi"
      className="relative overflow-hidden border-t border-border"
    >
      <SectionBackdrop />
      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:py-16">
        <Reveal>
          <span className="kicker">Après la mise en ligne</span>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-display text-balance sm:text-4xl">
            Un espace de suivi ouvert avec votre site
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            La mise en ligne n&apos;est pas la fin du projet. Chaque site livré
            s&apos;accompagne d&apos;un espace dédié où vos demandes sont
            enregistrées, suivies et traitées — sans relance de votre part.
          </p>
        </Reveal>
        <div className="mt-5 h-px rule-fade" />

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          {/* La vignette animée : trois demandes se règlent l'une après
              l'autre et la barre d'avancement suit. */}
          <Reveal>
            <div className="overflow-hidden rounded-xl ring-1 ring-border">
              <TicketScene />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="space-y-6">
              {POINTS.map((point, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-emerald shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                  />
                  <div>
                    <h3 className="text-base font-semibold tracking-display">
                      {point.titre}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {point.texte}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="/portail/devis/nouveau"
                className="btn-accent inline-flex px-6 py-3 text-sm"
              >
                Démarrer un projet
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
