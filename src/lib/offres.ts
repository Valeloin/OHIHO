// Les quatre offres, en dur et typées. Plus de CMS depuis la refonte du
// 2026-08-25 : les textes se modifient ici, dans le dépôt.
//
// L'ordre de ce tableau est celui de la section « Offres » de l'accueil, du
// menu déroulant du bandeau et du sitemap — les trois lisent la même liste.

export type Offre = {
  slug: string;
  /** Nom court, celui du menu et des cartes. */
  label: string;
  /** Phrase d'accroche de la carte, une ligne. */
  tagline: string;
  /** Résumé affiché sur la carte de l'accueil. */
  description: string;
  /** Délai indicatif, affiché partout où l'offre apparaît. */
  delai: string;
  /** Paragraphe d'ouverture de la page dédiée. */
  intro: string;
  /** « Ce qui est inclus ». */
  inclus: string[];
  /** « Pour qui ». */
  pourQui: string[];
  /** Métadonnées de la page dédiée. */
  meta: { title: string; description: string };
};

export const OFFRES: Offre[] = [
  {
    slug: "landing-page",
    label: "Landing page",
    tagline: "Une page, un objectif",
    description:
      "Une seule page, un seul objectif : que le visiteur vous contacte. Pour un lancement, une campagne, ou une activité qui tient en une page.",
    delai: "1 à 2 semaines",
    intro:
      "Une seule page, un seul objectif : que le visiteur passe à l'action. Pas de menus, pas de détours — un message clair, une offre, un bouton. Le format idéal pour lancer une activité, accompagner une campagne ou tester une idée sans investir dans un site complet.",
    inclus: [
      "Une page unique, construite pour amener au contact",
      "Formulaire ou bouton d'appel direct",
      "Rapide et irréprochable sur mobile",
      "Référencement de base (titre, description, aperçu réseaux)",
      "Mise en ligne sur votre nom de domaine",
    ],
    pourQui: [
      "Lancement d'une activité ou d'un produit",
      "Campagne publicitaire ou opération ponctuelle",
      "Valider une idée avant d'investir dans un site complet",
      "Indépendants qui veulent être joignables en un clic",
    ],
    meta: {
      title: "Création de landing page sur mesure",
      description:
        "Une page unique conçue pour convertir : message clair, formulaire de contact, mobile irréprochable. En ligne en 1 à 2 semaines.",
    },
  },
  {
    slug: "site-vitrine",
    label: "Site vitrine",
    tagline: "Plusieurs pages",
    description:
      "Accueil, services, à propos, contact. De quoi dérouler votre activité en détail, et donner envie de vous faire confiance.",
    delai: "3 à 4 semaines",
    intro:
      "Le format classique et efficace : plusieurs pages pour dérouler votre activité, asseoir votre crédibilité et être trouvé sur Google. Chaque page a son rôle — présenter, rassurer, convaincre, faire venir.",
    inclus: [
      "4 à 8 pages structurées : accueil, services, à propos, contact…",
      "Design sur mesure, aligné sur votre image",
      "Référencement travaillé page par page",
      "Formulaire de contact, carte et informations pratiques",
      "Textes relus et retravaillés avec vous",
    ],
    pourQui: [
      "PME et artisans qui présentent leurs prestations en détail",
      "Professions libérales et cabinets",
      "Associations et structures locales",
      "Remplacer une page réseaux sociaux par une vraie présence",
    ],
    meta: {
      title: "Création de site vitrine sur mesure",
      description:
        "Un site de 4 à 8 pages, conçu sur mesure et référencé page par page, pour présenter votre activité en détail. En ligne en 3 à 4 semaines.",
    },
  },
  {
    slug: "refonte",
    label: "Refonte de site",
    tagline: "Un site à rafraîchir",
    description:
      "Votre site existe déjà mais il a vieilli. On garde vos contenus, on refait le design, la vitesse et le mobile.",
    delai: "2 à 4 semaines",
    intro:
      "Votre site existe, mais il fait vieux, il est lent ou illisible sur téléphone ? On repart de vos contenus et on refait le design, la vitesse et le mobile — sans perdre votre référencement acquis.",
    inclus: [
      "Audit de l'existant : design, vitesse, mobile, référencement",
      "Nouveau design, contenus conservés et retravaillés",
      "Redirections soignées pour garder votre position Google",
      "Performances optimisées (chargement, images, mobile)",
      "Migration d'hébergement si nécessaire",
    ],
    pourQui: [
      "Un site vieillissant qui dessert votre image",
      "Un site illisible ou cassé sur téléphone",
      "Un site lent, ou que plus personne ne sait modifier",
      "Un changement de nom, d'identité ou d'activité",
    ],
    meta: {
      title: "Refonte de site web",
      description:
        "On refait le design, la vitesse et le mobile de votre site existant, en conservant vos contenus et votre référencement acquis.",
    },
  },
  {
    slug: "application-web",
    label: "Application web",
    tagline: "Un outil pour votre métier",
    description:
      "Espace client, réservation, tableau de bord, outil interne. Un logiciel écrit pour votre métier, avec ses comptes et ses règles.",
    delai: "Délai selon le projet",
    intro:
      "Quand un site ne suffit plus : espace client, réservation, tableau de bord, outil interne. Un logiciel écrit pour votre métier — avec ses comptes, ses règles et ses données — plutôt qu'un outil générique qu'on subit.",
    inclus: [
      "Comptes utilisateurs, rôles et droits d'accès",
      "Interface d'administration sur mesure",
      "Base de données structurée et sauvegardée",
      "Intégrations : paiement, email, outils métier",
      "Hébergement, surveillance et suivi en production",
    ],
    pourQui: [
      "Espace client ou espace adhérent",
      "Réservation, devis ou commande en ligne",
      "Outil interne pour remplacer les tableurs partagés",
      "Digitaliser un processus métier répétitif",
    ],
    meta: {
      title: "Développement d'application web sur mesure",
      description:
        "Espace client, réservation, tableau de bord, outil interne : un logiciel écrit pour votre métier, avec ses comptes, ses règles et ses données.",
    },
  },
];

export function offreBySlug(slug: string): Offre | undefined {
  return OFFRES.find((o) => o.slug === slug);
}

export function offreHref(slug: string): string {
  return `/offres/${slug}`;
}
