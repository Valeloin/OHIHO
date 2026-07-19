import type { SiteContent } from "./types";

// Valeurs par défaut = les textes et couleurs actuels du site. Servent de repli
// tant que rien n'est enregistré en base, et de base au premier chargement de
// l'admin. Les couleurs doivent rester alignées sur globals.css.
export const defaultContent: SiteContent = {
  theme: {
    accent: "#22d3c4",
    headerBg: "#071522",
    cardDark: "#071522",
    darkBackground: "#091a29",
    darkSurface: "#102436",
  },
  hero: {
    badge: "Développement web & applications sur mesure",
    titleLead: "Site web et application web",
    titleAccent: "sur mesure",
    subtitle:
      "De l'idée au déploiement, nous concevons et développons votre site ou application — sur mesure, avec un accompagnement dans la durée.",
    ctaPrimary: "Demander un devis",
    ctaSecondary: "Voir nos réalisations",
    stats: [
      { value: "Sur mesure", label: "Approche" },
      { value: "De A à Z", label: "Accompagnement" },
      { value: "Moderne", label: "Stack" },
      { value: "Sur devis", label: "Délai" },
    ],
  },
  portfolio: {
    kicker: "Réalisations",
    title: "Des projets concrets, en ligne",
    subtitle:
      "Cadance Coaching est un projet réel, livré et utilisé par un client. Un aperçu de ce que nous pouvons construire pour vous.",
    ctaText: "Vous avez un projet de site ou d'application en tête ?",
    ctaButton: "Demander un devis",
  },
  services: {
    kicker: "Nos services",
    title: "De l'idée au site en ligne",
    subtitle:
      "Conception, développement et suivi dans la durée — pour un site vitrine ou une application web sur mesure, pour les entreprises comme pour les particuliers.",
  },
  method: {
    kicker: "Méthode",
    title: "Comment nous travaillons ensemble",
    steps: [
      {
        title: "Échange initial",
        description:
          "Un échange pour comprendre votre projet, vos objectifs et votre budget — sans engagement.",
      },
      {
        title: "Maquette & devis",
        description:
          "Une proposition claire, avec maquette visuelle et devis détaillé, avant de commencer le développement.",
      },
      {
        title: "Développement",
        description:
          "Votre site ou application prend forme, avec des points d'étape réguliers pour suivre l'avancement.",
      },
      {
        title: "Mise en ligne & suivi",
        description:
          "Déploiement, puis accompagnement dans la durée pour les évolutions et le suivi par email.",
      },
    ],
  },
  expertise: {
    kicker: "Notre approche",
    title: "Un travail soigné, une communication claire, du début à la fin",
    paragraph1:
      "Chaque projet est développé avec une stack moderne et un code pensé pour durer — pas de solution générique, pas de boîte noire. Vous savez toujours où en est votre projet.",
    paragraph2:
      "Une fois votre site ou application en ligne, l'accompagnement continue : les demandes d'évolution ou de correction se font simplement par email, jusqu'à leur résolution.",
    panelTitle: "Ce qu'on couvre",
    coverage: [
      "Sites vitrines",
      "Applications web sur mesure",
      "Refonte de sites existants",
      "Maintenance & évolutions",
    ],
  },
  whyUs: {
    kicker: "Pourquoi OHIHO",
    title: "Un accompagnement qui continue après la mise en ligne",
    values: [
      {
        title: "Un travail soigné & durable",
        description:
          "Une stack moderne et un code lisible, pensés pour évoluer avec votre projet, pas contre lui.",
      },
      {
        title: "Communication claire",
        description:
          "Pas de jargon technique. Vous comprenez toujours où en est votre projet et pourquoi.",
      },
      {
        title: "Livraison dans les délais",
        description:
          "Un devis clair en amont, et des points d'étape réguliers pour suivre l'avancement sans surprise.",
      },
      {
        title: "Accompagnement dans la durée",
        description:
          "Après la mise en ligne, nous restons disponibles pour les évolutions et corrections, par email.",
      },
    ],
  },
  contact: {
    kicker: "Votre projet",
    title: "Prêt à lancer votre site ou application ?",
    subtitle:
      "Créez votre compte en une minute, puis décrivez votre besoin via une demande de devis guidée. Nous revenons vers vous rapidement pour en discuter.",
    email: "contact@ohiho.fr",
    responseNote: "Réponse sous 24h ouvrées",
    cardTitle: "Demander un devis",
    cardText:
      "Depuis votre espace client, choisissez une formule (landing page, site vitrine, application, refonte) et recevez une proposition adaptée.",
    cardCta: "Demander un devis",
  },
  footer: {
    tagline:
      "OHIHO conçoit et développe des sites et applications web sur mesure, pour entreprises et particuliers, pensés pour durer.",
    bottomNote: "Création de sites web & applications",
  },
  quotes: {
    step1Title: "Quel type de projet ?",
    step1Subtitle:
      "Choisissez la formule la plus proche de votre besoin — on affinera ensemble.",
    step2Subtitle: "Quelques précisions pour préparer un devis au plus juste.",
    // Couleurs du formulaire de devis. Tant qu'une valeur = défaut, la couleur
    // globale du thème s'applique.
    colors: {
      cardBg: "#102436",
      text: "#eef4fc",
      textMuted: "#9fb2cc",
      accent: "#22d3c4",
      previewScreen: "#071522",
      previewBlocks: "#23405c",
      previewAccent: "#22d3c4",
    },
    budgets: [
      "Moins de 1 000 €",
      "1 000 – 3 000 €",
      "3 000 – 6 000 €",
      "Plus de 6 000 €",
      "Je ne sais pas encore",
    ],
    timelines: [
      "Urgent (moins d'un mois)",
      "1 à 3 mois",
      "Flexible / pas de date précise",
    ],
    formulas: {
      landing: {
        label: "Landing page",
        tagline: "Une page unique, efficace",
        description:
          "Une seule page pensée pour présenter une offre précise et transformer vos visiteurs en contacts. Idéale pour un lancement, une campagne ou une activité qui tient sur une page.",
        examples:
          "Ex. : lancement de produit, page de réservation, mise en avant d'une offre.",
        options: [
          "Formulaire de contact",
          "Prise de rendez-vous",
          "Nom de domaine",
          "Rédaction des textes",
        ],
      },
      intermediaire: {
        label: "Site intermédiaire",
        tagline: "Un site vitrine multi-pages",
        description:
          "Un site complet de plusieurs pages (accueil, services, à propos, contact…) pour présenter votre activité dans le détail et inspirer confiance.",
        examples:
          "Ex. : artisan, cabinet, salle de sport, restaurant, association.",
        options: [
          "Formulaire de contact",
          "Galerie / photos",
          "Blog / actualités",
          "Multilingue",
          "Nom de domaine",
          "Rédaction des textes",
        ],
      },
      refonte: {
        label: "Refonte de site",
        tagline: "Moderniser un site existant",
        description:
          "Reprendre votre site actuel pour le moderniser : nouveau design, meilleure performance, adapté au mobile et au référencement, sans repartir de zéro.",
        examples:
          "Ex. : site vieillissant, lent, non responsive, ou à rafraîchir.",
        options: [
          "Reprise du contenu existant",
          "Nouveau design",
          "Optimisation référencement (SEO)",
          "Migration d'hébergement",
        ],
      },
      application: {
        label: "Application web",
        tagline: "Un outil sur mesure",
        description:
          "Une application web développée pour votre besoin précis : espace client, tableau de bord, réservation, outil métier interne. Comptes utilisateurs et logique adaptée à votre activité.",
        examples:
          "Ex. : espace client, gestion de réservations, tableau de bord, outil interne.",
        options: [
          "Comptes / espace client",
          "Tableau de bord",
          "Paiement en ligne",
          "Espace administrateur",
          "Notifications email",
        ],
      },
    },
    listTitle: "Mes demandes de devis",
    listSubtitle: "Suivez l'avancement de vos demandes ici.",
    emptyText:
      "Vous n'avez pas encore de demande de devis. Lancez-vous en quelques minutes.",
    statusLabels: {
      received: "Reçu",
      in_review: "En cours d'étude",
      quoted: "Devis envoyé",
      closed: "Clôturé",
    },
  },
};
