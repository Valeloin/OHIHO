// Modèle de contenu éditable du site OHIHO.
// Tout le contenu modifiable par l'admin est regroupé dans un seul document,
// section par section, plus le thème (couleurs clés).

// Thème sombre unique. Les clés darkBackground/darkSurface sont historiques
// (elles datent de l'époque à deux modes) : on les garde pour ne pas perdre
// les valeurs déjà enregistrées en base.
export type ThemeContent = {
  accent: string; // couleur d'accent (boutons, liens, badges) — hex #rrggbb
  headerBg: string; // bandeau du header
  cardDark: string; // cartes navy profondes (réalisations, panneau du portail)
  darkBackground: string; // fond du site
  darkSurface: string; // fond des cartes
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
  ctaText: string; // phrase au-dessus du bouton en bas de section
  ctaButton: string;
};

// Les 4 types de projets proposés (mêmes clés que les scènes animées de
// ServiceScene.tsx, l'ordre d'affichage suit SERVICE_TYPES dans Services.tsx).
export type ServiceType = "landing" | "intermediaire" | "refonte" | "application";

export type ServiceOfferContent = {
  label: string;
  tagline: string;
  description: string;
};

export type ServicesContent = {
  kicker: string;
  title: string;
  subtitle: string;
  offers: Record<ServiceType, ServiceOfferContent>;
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
};
