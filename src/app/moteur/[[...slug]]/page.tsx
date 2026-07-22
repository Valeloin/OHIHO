// Route MULTI-PAGE du moteur : /moteur = accueil, /moteur/services, /moteur/contact…
// Chaque page a son contenu (content/page-<slug>.json), son titre et sa
// description (SEO). Route de test (branche) — à terme, servira les vraies URLs.
import "@/engine/engine.css";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { RenderPage } from "@/engine/RenderBlock";
import { getContent } from "@/engine/getContent";
import { infoPage } from "@/engine/pages";

export const dynamic = "force-dynamic";

function slugDe(slug?: string[]): string {
  return (slug && slug[0]) || "accueil";
}

export async function generateMetadata({ params }: { params: { slug?: string[] } }): Promise<Metadata> {
  const info = await infoPage(slugDe(params.slug));
  return {
    title: info?.titre || "Simple Dev",
    description: info?.description || undefined,
  };
}

export default async function PageMoteur({ params }: { params: { slug?: string[] } }) {
  const slug = slugDe(params.slug);
  const blocks = await getContent(slug);
  if (!blocks) notFound();
  // data-sd-page : indique à l'extension quelle page on édite (sauvegarde ciblée).
  return (
    <main data-sd-page={slug}>
      <RenderPage blocks={blocks} />
    </main>
  );
}
