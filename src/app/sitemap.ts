import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ohiho.fr";

  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/portfolio`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
