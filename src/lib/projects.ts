export type Project = {
  title: string;
  category: string;
  description: string;
  /** Lien vers le site réel. Absent tant que le projet n'est pas publié. */
  href?: string;
  /**
   * Favicon du site, servie depuis /public (aucun appel externe depuis le
   * navigateur du visiteur). Absente pour les projets à venir : on n'invente
   * pas d'icône pour un site qui n'existe pas encore.
   */
  icon?: string;
  /** Couleur de fond de la tuile, reprise de l'identité du site. */
  iconBg?: string;
  /**
   * Mention affichée à la place du lien quand `href` est absent. Par défaut
   * « Bientôt en ligne », qui ne convient qu'aux projets à venir : un outil
   * livré mais non public doit dire pourquoi il n'est pas cliquable, sans
   * laisser croire qu'il n'existe pas encore.
   */
  note?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Cadance Coaching",
    category: "Site vitrine",
    description:
      "Site vitrine pour une salle de sport, avec un espace admin permettant au client de modifier lui-même les textes, la galerie, le planning des cours et les tarifs, sans toucher au code.",
    href: "https://cadance-coaching.vercel.app",
    // Icône reprise telle quelle du projet (D:\CadenceCoaching), en SVG :
    // elle reste nette en grand format, là où un favicon 32 px baverait.
    icon: "/realisations/cadance-coaching.svg",
    iconBg: "#E11D2A",
  },
  {
    title: "BugTrack",
    category: "Application web",
    description:
      "Outil de suivi des demandes et des anomalies : création de tickets, priorités, statuts, fil de discussion avec le client et notifications par email. Chaque compte dispose de son espace, et les tickets restés sans réponse se clôturent automatiquement.",
    // Icône reprise du projet (D:\BugTrack) : SVG au fond bleu intégré.
    icon: "/realisations/bugtrack.svg",
    // Outil réservé aux comptes clients : pas de vitrine publique à montrer,
    // mais une page de présentation dédiée sur ohiho.fr depuis le 2026-07-27.
    href: "/bugtrack",
  },
];
// Mailys Solutions a été retiré des réalisations le 2026-07-28 à la demande
// de Valentin (l'icône /realisations/mailys-solutions.svg reste dans /public
// si le projet doit revenir).
