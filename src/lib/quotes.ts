import type { QuoteProjectType, QuoteStatus } from "@/lib/supabase/types";

/**
 * Définition des formules de projet proposées dans le parcours de devis.
 * Partagé entre l'assistant client (DevisWizard) et la server action
 * (libellés dans l'email pré-devis) pour rester synchronisé.
 */

export type Formula = {
  type: QuoteProjectType;
  label: string;
  tagline: string;
  description: string;
  examples: string;
  /** Options / fonctionnalités proposées à cocher pour cette formule. */
  options: string[];
};

export const FORMULAS: Formula[] = [
  {
    type: "landing",
    label: "Landing page",
    tagline: "Une page unique, efficace",
    description:
      "Une seule page pensée pour présenter une offre précise et transformer vos visiteurs en contacts. Idéale pour un lancement, une campagne ou une activité qui tient sur une page.",
    examples: "Ex. : lancement de produit, page de réservation, mise en avant d'une offre.",
    options: [
      "Formulaire de contact",
      "Prise de rendez-vous",
      "Nom de domaine",
      "Rédaction des textes",
    ],
  },
  {
    type: "intermediaire",
    label: "Site intermédiaire",
    tagline: "Un site vitrine multi-pages",
    description:
      "Un site complet de plusieurs pages (accueil, services, à propos, contact…) pour présenter votre activité dans le détail et inspirer confiance.",
    examples: "Ex. : artisan, cabinet, salle de sport, restaurant, association.",
    options: [
      "Formulaire de contact",
      "Galerie / photos",
      "Blog / actualités",
      "Multilingue",
      "Nom de domaine",
      "Rédaction des textes",
    ],
  },
  {
    type: "refonte",
    label: "Refonte de site",
    tagline: "Moderniser un site existant",
    description:
      "Reprendre votre site actuel pour le moderniser : nouveau design, meilleure performance, adapté au mobile et au référencement, sans repartir de zéro.",
    examples: "Ex. : site vieillissant, lent, non responsive, ou à rafraîchir.",
    options: [
      "Reprise du contenu existant",
      "Nouveau design",
      "Optimisation référencement (SEO)",
      "Migration d'hébergement",
    ],
  },
  {
    type: "application",
    label: "Application web",
    tagline: "Un outil sur mesure",
    description:
      "Une application web développée pour votre besoin précis : espace client, tableau de bord, réservation, outil métier interne. Comptes utilisateurs et logique adaptée à votre activité.",
    examples: "Ex. : espace client, gestion de réservations, tableau de bord, outil interne.",
    options: [
      "Comptes / espace client",
      "Tableau de bord",
      "Paiement en ligne",
      "Espace administrateur",
      "Notifications email",
    ],
  },
];

export const BUDGET_OPTIONS = [
  "Moins de 1 000 €",
  "1 000 – 3 000 €",
  "3 000 – 6 000 €",
  "Plus de 6 000 €",
  "Je ne sais pas encore",
];

export const TIMELINE_OPTIONS = [
  "Urgent (moins d'un mois)",
  "1 à 3 mois",
  "Flexible / pas de date précise",
];

const FORMULA_BY_TYPE = new Map(FORMULAS.map((f) => [f.type, f]));

export function formulaLabel(type: QuoteProjectType): string {
  return FORMULA_BY_TYPE.get(type)?.label ?? type;
}

export const STATUS_LABELS: Record<QuoteStatus, string> = {
  received: "Reçu",
  in_review: "En cours d'étude",
  quoted: "Devis envoyé",
  closed: "Clôturé",
};
