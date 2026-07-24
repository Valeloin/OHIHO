import { NextResponse } from "next/server";
import { resetContenu, commitPush, codeAdminOk } from "@/engine/save-server";
import { corsHeaders, preflight } from "@/engine/cors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS(req: Request) {
  return preflight(req);
}

// Reset total : on efface le contenu → le site retombe sur les défauts du code.
export async function POST(req: Request) {
  const headers = corsHeaders(req);
  if (!codeAdminOk(req)) {
    return NextResponse.json({ ok: false, error: "code admin requis" }, { status: 401, headers });
  }
  await resetContenu();
  const git = await commitPush("Reset aux valeurs d'origine");
  return NextResponse.json({ ok: true, ...git }, { headers });
}
