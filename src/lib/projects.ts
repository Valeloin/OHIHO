export type Project = {
  title: string;
  category: string;
  description: string;
  /** Lien vers le site réel. Absent tant que le projet n'est pas publié. */
  href?: string;
  accent: "red" | "violet" | "emerald" | "cyan";
};

export const PROJECTS: Project[] = [
  {
    title: "Cadance Coaching",
    category: "Site vitrine",
    description:
      "Site vitrine pour une salle de sport, avec un espace admin permettant au client de modifier lui-même les textes, la galerie, le planning des cours et les tarifs, sans toucher au code.",
    href: "https://cadance-coaching.vercel.app",
    accent: "red",
  },
  {
    title: "Application web — Exemple",
    category: "Application web",
    description:
      "Espace client avec compte, tableau de bord et suivi de demandes — sur le même principe que l'espace client d'OHIHO.",
    accent: "violet",
  },
  {
    title: "Plateforme sur mesure — Exemple",
    category: "Plateforme sur mesure",
    description:
      "Outil interne ou plateforme métier adaptée à un besoin spécifique, de la conception au déploiement.",
    accent: "emerald",
  },
];
