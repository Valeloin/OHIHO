// Page de TEST : la vitrine rendue par le moteur Simple Dev, à l'intérieur du
// projet OHIHO. Sert à vérifier l'intégration du moteur avant de brancher la
// vraie page d'accueil. Route jetable (branche de test).
import "@/engine/engine.css";
import { RenderPage } from "@/engine/RenderBlock";
import { pageDemo } from "@/engine/defaults";

export const dynamic = "force-dynamic";

export default function VitrineMoteur() {
  return <RenderPage blocks={pageDemo.blocks} />;
}
