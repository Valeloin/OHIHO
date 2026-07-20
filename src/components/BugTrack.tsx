import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import TicketScene from "@/components/motion/TicketScene";

// Section dédiée à BugTrack, l'outil de suivi développé par OHIHO.
//
// Elle est née de la FUSION de deux sections qui disaient la même chose :
// l'ancienne « Suivi » promettait un accompagnement après la mise en ligne et
// décrivait des tickets, des statuts et des notifications sans jamais nommer
// l'outil ; celle-ci nommait le produit sans dire qu'il est livré avec le
// site. Mises côte à côte dans le bandeau, les deux se répétaient. Le contenu
// de « Suivi » est repris ici — sa promesse dans le chapeau, sa vignette
// animée à droite — et le composant Suivi.tsx a été supprimé.
//
// ⚠️ Ces textes NE SONT PAS éditables depuis /admin : ils sont écrits en dur
// ci-dessous. Les rendre modifiables demanderait d'ajouter une section au
// type SiteContent, aux valeurs par défaut et à l'éditeur.
const CAPACITES = [
  {
    titre: "Vous signalez, rien ne se perd",
    texte:
      "Une anomalie ou une demande d'évolution se dépose dans votre espace plutôt que dans un email qui se perd. Chaque demande a sa référence, sa priorité et son état.",
  },
  {
    titre: "Vous savez toujours où ça en est",
    texte:
      "Reçue, en cours d'analyse, corrigée : le statut est visible à tout moment, et les échanges restent attachés à la demande plutôt qu'éparpillés dans une boîte mail.",
  },
  {
    titre: "Rien ne dort indéfiniment",
    texte:
      "Vous êtes prévenu par email à chaque avancée, et les demandes restées sans réponse remontent puis se clôturent d'elles-mêmes plutôt que d'encombrer la liste.",
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
      {/* `py-12` sans reprise à `sm` : la section porte plus de contenu que
          les autres (chapeau, carte produit, vignette animée, quatre
          capacités), les 8 px de rembourrage supplémentaire suffisaient à la
          faire dépasser d'un écran. */}
      <div className="relative mx-auto max-w-7xl px-6 py-12">
        <Reveal>
          <span className="kicker">Notre outil</span>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-display text-balance sm:text-4xl">
            BugTrack, le suivi que nous branchons sur votre site
          </h2>
          {/* La promesse vient de l'ancienne section « Suivi » : c'est elle qui
              justifie l'outil, avant même de décrire ce qu'il fait. */}
          {/* L'argument commercial — « il s'installe sur vos projets » — était
              dans une barre séparée en bas de section. Il est remonté ici :
              c'est une raison d'être, elle se dit avant la démonstration, pas
              après. La barre coûtait 120 px et faisait déborder la section
              au-delà d'un écran. */}
          <p className="mt-3 max-w-3xl leading-relaxed text-muted">
            La mise en ligne n&apos;est pas la fin du projet. BugTrack est notre
            propre outil de suivi des demandes et des anomalies : nous
            l&apos;avons développé pour nos projets, et il s&apos;installe sur
            les sites que nous livrons, dès la mise en ligne ou plus tard. Vos
            utilisateurs y accèdent depuis leur compte, sans rien installer.
          </p>
        </Reveal>
        <div className="mt-5 h-px rule-fade" />

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[19rem_1fr]">
          <Reveal>
            <div className="card-dark p-6">
              {/* EMPLACEMENT RÉSERVÉ AU LOGO BUGTRACK.
                  Le logo définitif n'existe pas encore : cette tuile en tient
                  la place, aux dimensions exactes (80 px de côté, coins à
                  rounded-2xl) pour que rien ne bouge à la substitution.
                  Le jour où il arrive, remplacer tout le bloc `div` en
                  pointillés par :
                    <Image src="/bugtrack-logo.svg" alt="BugTrack"
                           width={80} height={80} className="h-20 w-20 rounded-2xl" />
                  Un favicon provisoire existe déjà dans
                  public/realisations/bugtrack.svg (il sert à la tuile de la
                  section Réalisations) — il dépannerait, mais il est dessiné
                  pour 16 px, il tiendra mal à 80. */}
              <div className="flex items-center gap-4">
                <div
                  aria-hidden="true"
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-dashed border-border"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted/60">
                    logo
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-teal">
                    Application web
                  </p>
                  <h3 className="mt-1.5 text-xl font-semibold tracking-display">
                    BugTrack
                  </h3>
                </div>
              </div>

              {/* Pas de paragraphe ici : il répétait mot pour mot le chapeau
                  de la section, deux centimètres plus haut. */}
              <div className="mt-5 flex flex-wrap gap-2">
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

          {/* Vignette animée reprise de l'ancienne section « Suivi » : trois
              demandes se règlent l'une après l'autre et la barre d'avancement
              suit. Elle montre l'outil en marche, ce qu'aucun texte ne fait. */}
          <Reveal delay={0.12}>
            {/* ⚠️ Largeur BORNÉE. La vignette est un SVG qui épouse la largeur
                qu'on lui donne : lâchée sur toute la colonne (880 px), elle
                montait à 493 px de haut et faisait à elle seule déborder la
                section à 1,31 écran. À 30 rem elle en fait 270. */}
            <div className="max-w-[30rem] overflow-hidden rounded-xl ring-1 ring-border">
              <TicketScene />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {CAPACITES.map((c, i) => (
              <li key={i} className="flex gap-3.5">
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

          <div className="mt-7">
            <Link
              href="/portail/devis/nouveau"
              className="btn-accent px-6 py-3 text-sm"
            >
              Démarrer un projet
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
