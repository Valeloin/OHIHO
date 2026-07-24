import { NextResponse } from "next/server";
import { lireSnapshot, ecrireContenu, commitPush, codeAdminOk } from "@/engine/save-server";
import { corsHeaders, preflight } from "@/engine/cors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS(req: Request) {
  return preflight(req);
}

// Restaure un point de restauration : son contenu redevient le contenu courant.
// body : { id: string }
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
  const { id } = body as { id?: string };
  if (!id) {
    return NextResponse.json({ ok: false, error: "id manquant" }, { status: 400, headers });
  }

  let blocks: unknown;
  try {
    blocks = await lireSnapshot(id);
  } catch {
    return NextResponse.json({ ok: false, error: "point introuvable" }, { status: 404, headers });
  }
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return NextResponse.json({ ok: false, error: "point vide ou cassé" }, { status: 400, headers });
  }

  await ecrireContenu(blocks, new Date().toISOString());
  const git = await commitPush("Restauration du point " + id);
  return NextResponse.json({ ok: true, ...git }, { headers });
}
