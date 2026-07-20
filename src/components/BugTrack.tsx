import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SectionBackdrop from "@/components/motion/SectionBackdrop";

// Section dédiée à BugTrack, l'outil de suivi développé par OHIHO. Elle ne
// vend pas une prestation mais un PRODUIT : ce qu'il fait, et le fait qu'il
// puisse être branché sur n'importe quel site livré.
//
// ⚠️ Recouvrement assumé avec la section « Suivi » : celle-ci promet un
// accompagnement après la mise en ligne, celle-là nomme et montre l'outil qui
// le rend possible. Si les deux finissent par se répéter à la lecture, c'est
// « Suivi » qu'il faut retirer — elle dit la même chose sans nommer le
// produit ni pouvoir le vendre.
//
// ⚠️ Comme « Suivi », ces textes NE SONT PAS éditables depuis /admin : ils
// sont écrits en dur ci-dessous. Les rendre modifiables demanderait d'ajouter
// une section au type SiteContent, aux valeurs par défaut et à l'éditeur.
const CAPACITES = [
  {
    titre: "Des demandes qui ne se perdent pas",
    texte:
      "Chaque anomalie ou demande d'évolution devient un ticket, avec sa référence, sa priorité et son état. Plus de fil d'emails à remonter pour savoir ce qui avait été dit.",
  },
  {
    titre: "Un fil de discussion par sujet",
    texte:
      "Les échanges restent attachés à la demande qu'ils concernent. Vous répondez depuis votre espace, et chaque avancée déclenche une notification par email.",
  },
  {
    titre: "Rien ne dort indéfiniment",
    texte:
      "Les tickets laissés sans réponse remontent puis se clôturent d'eux-mêmes, plutôt que d'encombrer la liste pendant des mois.",
  },
  {
    titre: "Un espace par client",
    texte:
      "Chaque compte ne voit que ses propres demandes. L'outil sert plusieurs projets sans que les clients se croisent.",
  },
];

export default function BugTrack() {
  return (
    <section
      id="bugtrack"
      className="relative overflow-hidden border-t border-border"
    >
      <SectionBackdrop />
      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:py-16">
        <Reveal>
          <span className="kicker">Notre outil</span>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-display text-balance sm:text-4xl">
            BugTrack, le suivi que nous branchons sur votre site
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            BugTrack est notre propre outil de suivi des demandes et des
            anomalies. Nous l&apos;avons développé pour nos projets, et il
            s&apos;installe sur les sites et applications que nous livrons.
          </p>
        </Reveal>
        <div className="mt-5 h-px rule-fade" />

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[22rem_1fr]">
          <Reveal>
            <div className="card-dark p-7">
              {/* EMPLACEMENT RÉSERVÉ AU LOGO BUGTRACK.
                  Le logo définitif n'existe pas encore : cette tuile en tient
                  la place, aux dimensions exactes (96 px de côté, coins à
                  rounded-2xl) pour que rien ne bouge à la substitution.
                  Le jour où il arrive, remplacer tout le bloc `div` en
                  pointillés par :
                    <Image src="/bugtrack-logo.svg" alt="BugTrack"
                           width={96} height={96} className="h-24 w-24 rounded-2xl" />
                  Un favicon provisoire existe déjà dans
                  public/realisations/bugtrack.svg (il sert à la tuile de la
                  section Réalisations) — il dépannerait, mais il est dessiné
                  pour 16 px, il tiendra mal à 96. */}
              <div
                aria-hidden="true"
                className="flex h-24 w-24 items-center justify-center rounded-2xl border border-dashed border-border"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted/60">
                  logo
                </span>
              </div>

              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-teal">
                Application web
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-display">
                BugTrack
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Tickets, priorités, statuts, fil de discussion et notifications
                par email. Un espace par client, des demandes qui se clôturent
                seules si elles restent sans réponse.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Tickets", "Priorités", "Notifications", "Espaces clients"].map(
                  (mot) => (
                    <span key={mot} className="pill px-3 py-1.5 text-[11px]">
                      {mot}
                    </span>
                  )
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="grid gap-6 sm:grid-cols-2">
              {CAPACITES.map((c, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-emerald shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                  />
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold tracking-display">
                      {c.titre}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {c.texte}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* L'argument commercial : ce n'est pas une démo, c'est un outil
                livrable. C'est la raison d'être de la section. */}
            <div className="mt-8 card-surface flex flex-wrap items-center justify-between gap-4 px-6 py-5">
              <p className="max-w-xl text-sm leading-relaxed text-muted">
                BugTrack peut être ajouté à votre projet dès la mise en ligne,
                ou plus tard sur un site déjà livré. Vos utilisateurs y accèdent
                depuis leur compte, sans installation de leur côté.
              </p>
              <Link
                href="/portail/devis/nouveau"
                className="btn-accent px-6 py-3 text-sm"
              >
                En parler
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
