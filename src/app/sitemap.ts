import type { MetadataRoute } from "next";
import { SERVICE_PAGES } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ohiho.fr";

  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    // Une page par formule depuis le 2026-07-27 : ce sont les seules pages de
    // contenu du site en dehors de l'accueil, elles doivent être indexées.
    ...SERVICE_PAGES.map((s) => ({
      url: `${base}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}/bugtrack`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/inscription`, changeFrequency: "monthly", priority: 0.5 },
  ];
}
