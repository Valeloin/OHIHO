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
      "De l'idée au déploiement, nous concevons et développons votre site ou application sur mesure, avec un accompagnement dans la durée.",
    ctaPrimary: "Nous contacter",
    ctaSecondary: "Voir nos réalisations",
    stats: [
      { value: "Sur mesure", label: "Approche" },
      { value: "De A à Z", label: "Accompagnement" },
      { value: "Moderne", label: "Stack" },
      { value: "Sur mesure", label: "Délai" },
    ],
  },
  portfolio: {
    kicker: "Réalisations",
    title: "Des projets concrets, en ligne",
    subtitle:
      "Cadance Coaching est un projet réel, livré et utilisé par un client. Un aperçu de ce que nous pouvons construire pour vous.",
    ctaText: "Vous avez un projet de site ou d'application en tête ?",
    ctaButton: "Nous contacter",
  },
  services: {
    kicker: "Nos services",
    title: "De l'idée au site en ligne",
    subtitle:
      "Conception, développement et suivi dans la durée, pour un site vitrine ou une application web sur mesure, pour les entreprises comme pour les particuliers.",
    offers: {
      landing: {
        label: "Landing page",
        tagline: "Une page, un objectif",
        description:
          "Une seule page, un seul objectif : que le visiteur vous contacte. Pour un lancement, une campagne, ou une activité qui tient en une page.",
        pageIntro:
          "Une landing page, c'est une page unique pensée pour convertir : un message clair, une offre, un bouton. Le format idéal pour lancer une activité, accompagner une campagne ou valider une idée — sans investir tout de suite dans un site complet.",
        features: [
          "Une page unique, construite pour amener au contact",
          "Formulaire ou bouton d'appel direct",
          "Rapide et irréprochable sur mobile",
          "Référencement de base (titre, description, aperçu réseaux)",
          "Mise en ligne sur votre nom de domaine",
        ],
        useCases: [
          "Lancement d'une activité ou d'un produit",
          "Campagne publicitaire ou opération ponctuelle",
          "Valider une idée avant d'investir dans un site complet",
          "Indépendants qui veulent être joignables en un clic",
        ],
      },
      intermediaire: {
        label: "Site intermédiaire",
        tagline: "Plusieurs pages",
        description:
          "Accueil, services, à propos, contact. De quoi dérouler votre activité en détail, et donner envie de vous faire confiance.",
        pageIntro:
          "Le format classique et efficace : plusieurs pages pour dérouler votre activité, asseoir votre crédibilité et être trouvé sur Google. Chaque page a son rôle — présenter, rassurer, convaincre, faire venir.",
        features: [
          "4 à 8 pages structurées : accueil, services, à propos, contact…",
          "Design sur mesure, aligné sur votre image",
          "Référencement travaillé page par page",
          "Formulaire de contact, carte et informations pratiques",
          "Textes relus et retravaillés avec vous",
        ],
        useCases: [
          "PME et artisans qui présentent leurs prestations en détail",
          "Professions libérales et cabinets",
          "Associations et structures locales",
          "Remplacer une page réseaux sociaux par une vraie présence",
        ],
      },
      refonte: {
        label: "Refonte de site",
        tagline: "Un site à rafraîchir",
        description:
          "Votre site existe déjà mais il a vieilli. On garde vos contenus, on refait le design, la vitesse et le mobile.",
        pageIntro:
          "Votre site existe, mais il fait vieux, il est lent ou illisible sur téléphone ? On repart de vos contenus et on refait le design, la vitesse et le mobile — sans perdre votre référencement acquis.",
        features: [
          "Audit de l'existant : design, vitesse, mobile, référencement",
          "Nouveau design, contenus conservés et retravaillés",
          "Redirections soignées pour garder votre position Google",
          "Performances optimisées (chargement, images, mobile)",
          "Migration d'hébergement si nécessaire",
        ],
        useCases: [
          "Un site vieillissant qui dessert votre image",
          "Un site illisible ou cassé sur téléphone",
          "Un site lent, ou que plus personne ne sait modifier",
          "Un changement de nom, d'identité ou d'activité",
        ],
      },
      application: {
        label: "Application web",
        tagline: "Sur mesure",
        description:
          "Espace client, réservation, tableau de bord, outil interne. Un logiciel écrit pour votre métier, avec ses comptes et ses règles.",
        pageIntro:
          "Quand un site ne suffit plus : espace client, réservation, tableau de bord, outil interne. Un logiciel écrit pour votre métier — avec ses comptes, ses règles et ses données — plutôt qu'un outil générique qu'on subit.",
        features: [
          "Comptes utilisateurs, rôles et droits d'accès",
          "Interface d'administration sur mesure",
          "Base de données structurée et sauvegardée",
          "Intégrations : paiement, email, outils métier",
          "Hébergement, surveillance et suivi en production",
        ],
        useCases: [
          "Espace client ou espace adhérent",
          "Réservation, devis ou commande en ligne",
          "Outil interne pour remplacer les tableurs partagés",
          "Digitaliser un processus métier répétitif",
        ],
      },
    },
  },
  method: {
    kicker: "Méthode",
    title: "Comment nous travaillons ensemble",
    steps: [
      {
        title: "Échange initial",
        description:
          "Un échange pour comprendre votre projet, vos objectifs et votre budget, sans engagement.",
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
      "Chaque projet est développé avec une stack moderne et un code pensé pour durer. Pas de solution générique, pas de boîte noire. Vous savez toujours où en est votre projet.",
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
    kicker: "Contact",
    title: "Discutons de votre projet",
    subtitle:
      "Un site vitrine, une application sur mesure, une refonte ? Écrivez-nous, nous revenons vers vous rapidement.",
    email: "valentin.condamy@ohiho.fr",
    responseNote: "Réponse sous 24h ouvrées",
    linkedinUrl: "https://www.linkedin.com/in/valentin-condamy-966656423/",
    personName: "Valentin Condamy",
    personRole:
      "Création de sites web sur mesure pour PME. J'aide les entreprises à enfin avoir un site à la hauteur de leur savoir-faire.",
    personLocation: "Montpellier, Occitanie",
    // Vide tant que la photo n'est pas déposée dans /public : la carte
    // affiche alors les initiales, elle ne casse pas.
    personPhoto: "",
  },
  footer: {
    tagline:
      "OHIHO conçoit et développe des sites et applications web sur mesure, pour entreprises et particuliers, pensés pour durer.",
    bottomNote: "Création de sites web & applications",
  },
};
