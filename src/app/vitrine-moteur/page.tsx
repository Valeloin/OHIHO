// Page de TEST : la vitrine rendue par le moteur Simple Dev, à l'intérieur du
// projet OHIHO. Éditable via l'extension ; les enregistrements sont relus ici
// par getContent() (fichier content/demo.json, sinon défauts). Route jetable.
import "@/engine/engine.css";
import { RenderPage } from "@/engine/RenderBlock";
import { getContent } from "@/engine/getContent";

export const dynamic = "force-dynamic";

export default async function VitrineMoteur() {
  const blocks = await getContent();
  // Le <main> est requis par l'extension Simple Dev (sélection / annulation /
  // sérialisation lisent `document.querySelector("main")`).
  return (
    <main>
      <RenderPage blocks={blocks} />
    </main>
  );
}
