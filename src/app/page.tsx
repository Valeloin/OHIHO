// Page d'accueil OHIHO — vitrine rendue par le moteur Simple Dev.
// Le menu et le pied de page réels viennent de layout.tsx (Navbar/Footer) : on
// masque ici les blocs header/footer du moteur pour n'avoir qu'UN SEUL menu.
import "@/engine/engine.css";
import { RenderPage } from "@/engine/RenderBlock";
import { getContent } from "@/engine/getContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  // "accueil" a toujours un contenu (filet anti-bug de getContent), mais son
  // type reste nullable pour les autres pages : on part d'un tableau vide au pire.
  const blocks = (await getContent()) ?? [];
  const contenu = blocks.filter((b) => b.type !== "header" && b.type !== "footer");
  return (
    <main data-sd-page="accueil">
      <RenderPage blocks={contenu} />
    </main>
  );
}
