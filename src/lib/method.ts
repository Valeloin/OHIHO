// Une page par étape de la Méthode depuis le 2026-07-28, sur le même modèle
// que les pages de services (src/lib/services.ts) : la section d'accueil
// reste la vitrine, le détail vit sur ces pages, reliées par le menu
// déroulant « Méthode » du bandeau.
//
// L'INDEX est le lien avec le contenu éditable (content.method.steps[i]) et
// avec la scène correspondante de MethodScenes : les trois listes suivent le
// même ordre.
export const METHOD_PAGES: { slug: string; index: number }[] = [
  { slug: "echange-initial", index: 0 },
  { slug: "maquette-et-devis", index: 1 },
  { slug: "developpement", index: 2 },
  { slug: "mise-en-ligne-et-suivi", index: 3 },
];

export function methodHref(index: number): string {
  const page = METHOD_PAGES.find((p) => p.index === index);
  return page ? `/methode/${page.slug}` : "/#methode";
}

export function methodIndexBySlug(slug: string): number | null {
  return METHOD_PAGES.find((p) => p.slug === slug)?.index ?? null;
}
