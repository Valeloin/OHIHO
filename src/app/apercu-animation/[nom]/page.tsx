// Page interne : rend UNE scène animée seule, pour que l'extension Simple Dev
// en récupère le HTML (via fetch + extraction du bloc #sd-apercu-cible) et
// l'affiche en aperçu. Pas de lien depuis le site — accédée par son adresse.
import { notFound } from "next/navigation";
import { COMPOSANTS } from "@/engine/composants";

export const dynamic = "force-dynamic";

// Seules les SCÈNES ANIMÉES (pur CSS, sans données ni compte connecté) peuvent
// être prévisualisées ainsi — pas les formulaires (connexion, devis…).
const PREVISUALISABLES = new Set([
  "scene-hero",
  "scene-methode",
  "scene-bugtrack",
  "fond-anime",
  "scene-maintenance",
  "scene-digitalisation",
  "scene-refonte",
  "scene-application",
]);

export default function PageApercuAnimation({ params }: { params: { nom: string } }) {
  if (!PREVISUALISABLES.has(params.nom)) notFound();
  const Comp = COMPOSANTS[params.nom];
  if (!Comp) notFound();
  return (
    <div id="sd-apercu-cible" style={{ background: "#071522", minHeight: "100vh" }}>
      <Comp />
    </div>
  );
}
