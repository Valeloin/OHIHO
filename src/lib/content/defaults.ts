import type { SiteContent } from "./types";

// Valeurs par défaut = les textes actuels du site. Servent de repli tant que
// rien n'est enregistré en base, et de base au premier chargement de l'admin.
export const defaultContent: SiteContent = {
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
};
