import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Pages sans valeur SEO (formulaires, espace connecté) : ne pas
      // gaspiller le budget de crawl dessus, ni les laisser apparaître
      // dans les résultats de recherche.
      disallow: [
        "/connexion",
        "/connexion/mot-de-passe-oublie",
        "/nouveau-mot-de-passe",
        "/inscription/confirmation",
        "/portail",
        "/portail/*",
        "/admin",
      ],
    },
    sitemap: "https://ohiho.fr/sitemap.xml",
  };
}
