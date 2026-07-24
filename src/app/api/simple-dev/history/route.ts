import { NextResponse } from "next/server";
import { listerSnapshots } from "@/engine/save-server";
import { corsHeaders, preflight } from "@/engine/cors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS(req: Request) {
  return preflight(req);
}

// Liste les points de restauration (snapshots), le plus récent d'abord.
export async function GET(req: Request) {
  const points = await listerSnapshots();
  return NextResponse.json({ ok: true, points }, { headers: corsHeaders(req) });
}
