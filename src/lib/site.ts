// Constantes de la marque. Un seul endroit pour l'email, le nom et l'adresse :
// tout le reste du site lit ces valeurs plutôt que de les recopier.

export const SITE = {
  name: "OHIHO",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ohiho.fr",
  email: "valentin.condamy@ohiho.fr",
  person: "Valentin Condamy",
  city: "Montpellier",
  region: "Occitanie",
  linkedin: "https://www.linkedin.com/in/valentin-condamy-966656423/",
  responseNote: "Réponse sous 24 h ouvrées",
  tagline:
    "Sites vitrines et applications web sur mesure, pour les entreprises qui veulent un site à la hauteur de leur savoir-faire.",
} as const;
