import type { MetadataRoute } from "next";
import { OFFRES, offreHref } from "@/lib/offres";

// Le plan du site se déduit de la liste des offres : ajouter une offre dans
// src/lib/offres.ts suffit, il n'y a pas de liste à tenir à jour ici.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ohiho.fr";

  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    ...OFFRES.map((offre) => ({
      url: `${base}${offreHref(offre.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/confidentialite`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
