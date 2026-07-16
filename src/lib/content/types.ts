// Modèle de contenu éditable du site OHIHO.
// Tout le contenu modifiable par l'admin est regroupé dans un seul document,
// section par section, plus le thème (couleurs clés).

export type ThemeContent = {
  accent: string; // couleur d'accent (boutons, liens, badges) — hex #rrggbb
  background: string; // fond du site en mode clair
  surface: string; // fond des cartes en mode clair
  headerBg: string; // bandeau du header (appliqué aux deux modes)
  cardDark: string; // cartes navy (réalisations, panneau du portail)
  darkBackground: string; // fond du site en mode sombre
  darkSurface: string; // fond des cartes en mode sombre
};

export type HeroContent = {
  badge: string;
  titleLead: string; // "Site web et application web"
  titleAccent: string; // "sur mesure" (partie en dégradé)
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: { value: string; label: string }[];
};

export type PortfolioContent = {
  kicker: string;
  title: string;
  subtitle: string;
  ctaText: string; // phrase au-dessus du bouton devis en bas de section
  ctaButton: string;
};

export type ServiceItem = {
  title: string;
  description: string;
  points: string[];
};

export type ServicesContent = {
  kicker: string;
  title: string;
  subtitle: string;
  items: ServiceItem[];
};

export type MethodStep = {
  title: string;
  description: string;
};

export type MethodContent = {
  kicker: string;
  title: string;
  steps: MethodStep[];
};

export type ExpertiseContent = {
  kicker: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  panelTitle: string;
  coverage: string[];
};

export type WhyUsValue = {
  title: string;
  description: string;
};

export type WhyUsContent = {
  kicker: string;
  title: string;
  values: WhyUsValue[];
};

export type ContactContent = {
  kicker: string;
  title: string;
  subtitle: string;
  email: string;
  responseNote: string;
  cardTitle: string;
  cardText: string;
  cardCta: string;
};

export type FooterContent = {
  tagline: string;
  bottomNote: string;
};

export type QuoteFormulaContent = {
  label: string;
  tagline: string;
  description: string;
  examples: string;
  /** Options / fonctionnalités proposées à cocher pour cette formule. */
  options: string[];
};

export type QuoteColorsContent = {
  cardBg: string; // fond des cartes du formulaire (formules, récapitulatif)
  text: string; // textes principaux (titres) dans le formulaire
  textMuted: string; // textes secondaires (descriptions, libellés)
  accent: string; // accents : accroche, carte sélectionnée, options cochées
  previewScreen: string; // maquettes animées : fond d'écran
  previewBlocks: string; // maquettes animées : blocs de contenu
  previewAccent: string; // maquettes animées : éléments colorés/animés
};

export type QuotesContent = {
  // Assistant de demande de devis
  step1Title: string;
  step1Subtitle: string;
  step2Subtitle: string;
  colors: QuoteColorsContent;
  budgets: string[];
  timelines: string[];
  formulas: {
    landing: QuoteFormulaContent;
    intermediaire: QuoteFormulaContent;
    refonte: QuoteFormulaContent;
    application: QuoteFormulaContent;
  };
  // Page « Mes devis »
  listTitle: string;
  listSubtitle: string;
  emptyText: string;
  statusLabels: {
    received: string;
    in_review: string;
    quoted: string;
    closed: string;
  };
};

export type SiteContent = {
  theme: ThemeContent;
  hero: HeroContent;
  portfolio: PortfolioContent;
  services: ServicesContent;
  method: MethodContent;
  expertise: ExpertiseContent;
  whyUs: WhyUsContent;
  contact: ContactContent;
  footer: FooterContent;
  quotes: QuotesContent;
};
