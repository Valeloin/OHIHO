// Constantes de la marque. Un seul endroit pour l'email, le nom et l'adresse :
// tout le reste du site lit ces valeurs plutôt que de les recopier.

export const SITE = {
  name: "OHIHO",
  // NEXT_PUBLIC_APP_URL : nom retenu par convention sur le VPS, où tous les
  // sites l'utilisent. Figée au build par Next (préfixe NEXT_PUBLIC_) : la
  // changer oblige à reconstruire l'image.
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://ohiho.fr",
  email: "valentin.condamy@ohiho.fr",
  person: "Valentin Condamy",
  city: "Montpellier",
  region: "Occitanie",
  linkedin: "https://www.linkedin.com/in/valentin-condamy-966656423/",
  responseNote: "Réponse sous 24 h ouvrées",
  tagline:
    "Sites vitrines et applications web sur mesure, pour les entreprises qui veulent un site à la hauteur de leur savoir-faire.",
} as const;
