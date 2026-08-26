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
    title: "mycalories",
    // « SaaS » et non « Application web » : c'est un produit vendu par
    // abonnement, pas une application développée pour un client.
    category: "SaaS",
    description:
      "Suivi de calories par abonnement : on décrit son repas en une phrase, l'outil estime les calories et les macronutriments. Journal, calendrier, entraînements et commande vocale.",
    resultat: "Aucun aliment à chercher dans une base : on écrit, ou on dicte.",
    href: "https://mycalories.ohiho.fr",
    // ⚠️ Icône PROVISOIRE, dessinée ici : le projet n'en sert aucune (pas de
    // favicon sur mycalories.ohiho.fr). À remplacer par la vraie dès qu'elle
    // existe, comme pour les autres tuiles reprises telles quelles du projet.
    icon: "/realisations/mycalories.svg",
    iconBg: "#15A34A",
  },
  {
    title: "BugTrack",
    // Les deux à la fois : une application web, vendue par abonnement.
    category: "Application web / SaaS",
    description:
      "Suivi des demandes et des anomalies : tickets, priorités, statuts, fil de discussion et notifications par email.",
    resultat: "Plus aucune demande client perdue dans une boîte mail.",
    note: "Réservé aux comptes clients",
    icon: "/realisations/bugtrack.svg",
    iconBg: "#0B2C6B",
  },
];

// Mailys Solutions a été retiré des réalisations le 2026-07-28 à la demande
// de Valentin. L'icône /realisations/mailys-solutions.svg reste dans /public
// si le projet doit revenir.
//
// Cadance Coaching a été retiré le 2026-08-26, remplacé par mycalories, à la
// demande de Valentin. Son icône reste elle aussi dans /public.
// ⚠️ C'était le SEUL projet client de la liste : les deux réalisations
// affichées sont désormais des produits maison. Un site vitrine dont les
// références sont toutes internes convainc moins — à rouvrir dès qu'un
// projet client peut être montré.
