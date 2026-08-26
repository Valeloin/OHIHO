import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // La page de construction ne doit jamais être indexée : elle
      // remplacerait l'accueil dans les résultats de recherche.
      disallow: ["/construction", "/variantes"],
    },
    sitemap: "https://ohiho.fr/sitemap.xml",
  };
}
