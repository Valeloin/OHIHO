// Les projets présentés en réalisations. En dur et typés, comme les offres.
//
// Les icônes sont servies depuis /public : aucun appel vers un domaine
// extérieur depuis le navigateur du visiteur.

export type Realisation = {
  title: string;
  /** Type de projet, repris du vocabulaire des offres. */
  category: string;
  description: string;
  /** Ce que le projet a changé pour le client, en une ligne. */
  resultat: string;
  /** Lien vers le site réel. Absent quand le projet n'est pas public. */
  href?: string;
  /** Mention affichée à la place du lien quand `href` est absent. */
  note?: string;
  icon: string;
  /** Couleur de fond de la tuile, reprise de l'identité du projet. */
  iconBg: string;
};

export const REALISATIONS: Realisation[] = [
  {
    title: "Cadance Coaching",
    category: "Site vitrine",
    description:
      "Site vitrine d'une salle de sport, avec un espace d'administration qui permet au client de modifier lui-même les textes, la galerie, le planning des cours et les tarifs.",
    resultat: "Le client met son planning à jour seul, sans nous appeler.",
    href: "https://cadance-coaching.vercel.app",
    // Icône reprise telle quelle du projet, en SVG : elle reste nette en
    // grand format, là où un favicon 32 px baverait.
    icon: "/realisations/cadance-coaching.svg",
    iconBg: "#E11D2A",
  },
  {
    title: "BugTrack",
    category: "Application web",
    description:
      "Outil de suivi des demandes et des anomalies : tickets, priorités, statuts, fil de discussion avec le client et notifications par email. Chaque compte dispose de son espace.",
    resultat: "Plus aucune demande client perdue dans une boîte mail.",
    note: "Réservé aux comptes clients",
    icon: "/realisations/bugtrack.svg",
    iconBg: "#0B2C6B",
  },
];

// Mailys Solutions a été retiré des réalisations le 2026-07-28 à la demande
// de Valentin. L'icône /realisations/mailys-solutions.svg reste dans /public
// si le projet doit revenir.
