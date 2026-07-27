import type { ServiceType } from "@/lib/content/types";

// Une page par formule depuis le 2026-07-27 : la section d'accueil n'est plus
// qu'une vitrine (visuel + nom + bouton), le détail vit sur ces pages.
//
// L'ordre suit celui des scènes animées de ServiceScene.tsx et celui des
// libellés du hero — les trois listes doivent rester alignées.
export const SERVICE_PAGES: { slug: string; type: ServiceType }[] = [
  { slug: "landing-page", type: "landing" },
  { slug: "site-intermediaire", type: "intermediaire" },
  { slug: "refonte-de-site", type: "refonte" },
  { slug: "application-web", type: "application" },
];

export const SERVICE_TYPES: ServiceType[] = SERVICE_PAGES.map((s) => s.type);

export function serviceHref(type: ServiceType): string {
  const page = SERVICE_PAGES.find((s) => s.type === type);
  return page ? `/services/${page.slug}` : "/#services";
}

export function serviceTypeBySlug(slug: string): ServiceType | null {
  return SERVICE_PAGES.find((s) => s.slug === slug)?.type ?? null;
}
