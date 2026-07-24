import { NextResponse } from "next/server";
import { ecrireContenu, ecrireSnapshot, commitPush, codeAdminOk, collecterComposants } from "@/engine/save-server";
import { corsHeaders, preflight } from "@/engine/cors";
import { getContent } from "@/engine/getContent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS(req: Request) {
  return preflight(req);
}

// Enregistre le contenu graphique : snapshot + écriture + commit/push GitHub (git-first).
// body : { blocks: [...], nom?: string }  (nom → point de restauration nommé)
export async function POST(req: Request) {
  const headers = corsHeaders(req);
  if (!codeAdminOk(req)) {
    return NextResponse.json({ ok: false, error: "code admin requis" }, { status: 401, headers });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "corps JSON invalide" }, { status: 400, headers });
  }

  const { blocks, nom, page } = body as { blocks?: unknown; nom?: string; page?: string };
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return NextResponse.json({ ok: false, error: "aucun bloc à enregistrer" }, { status: 400, headers });
  }
  const slug = typeof page === "string" && page.trim() ? page.trim() : "accueil";

  const horodatage = new Date().toISOString();
  const nomPropre = typeof nom === "string" && nom.trim() ? nom.trim() : null;
  const message = (nomPropre ? "Point : " + nomPropre : "Enregistrement graphique") + " (page " + slug + ") " + horodatage;

  // Filet anti-régression : un onglet d'édition périmé (ouvert avant l'ajout
  // d'un bloc-composant) republie un état du DOM qui ne le connaît pas et
  // l'efface silencieusement — c'est ce qui a fait disparaître les scènes
  // animées à plusieurs reprises. On refuse plutôt que d'écraser le contenu
  // actuel si des composants déjà en place en disparaîtraient.
  const actuel = await getContent(slug);
  if (actuel) {
    const avant = collecterComposants(actuel);
    const apres = collecterComposants(blocks);
    const perdus = Array.from(avant).filter(([id]) => !apres.has(id));
    if (perdus.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Enregistrement refusé : " +
            perdus.length +
            " bloc(s)-composant (" +
            perdus.map(([, nomComposant]) => nomComposant).join(", ") +
            ") disparaîtraient de la page. Rafraîchissez la page d'édition puis réessayez.",
        },
        { status: 409, headers }
      );
    }
  }

  try {
    await ecrireSnapshot(blocks, nomPropre, horodatage); // sauvegarde avant tout (local)
    await ecrireContenu(blocks, horodatage, message, slug);
  } catch (e) {
    return NextResponse.json({ ok: false, error: "écriture impossible : " + String(e) }, { status: 500, headers });
  }

  const git = await commitPush(message);
  return NextResponse.json({ ok: true, ...git }, { headers });
}
