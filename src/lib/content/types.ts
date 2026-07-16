// Modèle de contenu éditable du site OHIHO.
// Tout le contenu modifiable par l'admin est regroupé dans un seul document,
// section par section. On étend ce type au fur et à mesure des sections.

export type HeroContent = {
  badge: string;
  titleLead: string; // "Site web et application web"
  titleAccent: string; // "sur mesure" (partie en dégradé)
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: { value: string; label: string }[];
};

export type SiteContent = {
  hero: HeroContent;
};
