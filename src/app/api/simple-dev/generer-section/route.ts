import { NextResponse } from "next/server";
import { codeAdminOk } from "@/engine/save-server";
import { corsHeaders, preflight } from "@/engine/cors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS(req: Request) {
  return preflight(req);
}

// Modèle : Haiku suffit largement pour de la génération de JSON structuré, et
// coûte beaucoup moins cher qu'un modèle plus gros pour cette tâche.
const MODELE = "claude-haiku-4-5-20251001";

// Prompt système : explique le modèle de blocs Simple Dev à Claude. Envoyé à
// chaque génération — on le garde volontairement concis (coût = tokens).
const PROMPT_SYSTEME = `Tu génères une section pour le moteur Simple Dev. Réponds UNIQUEMENT avec un objet JSON valide (le bloc "section"), sans texte autour, sans balises markdown.

## Modèle de données
Un bloc : { "id": string, "type": string, "content"?: object, "css"?: object, "children"?: [blocs] }
- id : identifiant unique, snake_case, préfixé par le nom de la section (ex: "hero_titre")
- type : "section" | "titre" | "texte" | "bouton" | "image" | "forme" | "groupe" | "icone" | "champ" | "zonetexte" | "composant"
- content : selon le type — titre/texte/bouton: {texte, niveau?, lien?} ; image: {src, alt} ; composant: {composant: nom}
- css : objet CSS en camelCase (comme du style React), appliqué directement
- children : sous-blocs, uniquement pour section/groupe/composant

## Règles impératives
- JAMAIS de position absolue (position: absolute/fixed). Toute disposition se fait avec display:flex ou display:grid + gap.
- Les couleurs viennent de cette charte : fond #091a29, surface #102436, bordures #23405c, texte #eef4fc, texte atténué #9fb2cc, accent bleu #38bdf8, accent teal #22d3c4, accent vert #34d399.
- Un bloc "image" : content.src doit être un chemin plausible dans /illustrations/ ou /realisations/, alt toujours rempli.
- Un bloc "composant" avec content.composant : uniquement parmi cette liste : scene-hero, scene-methode, scene-bugtrack, fond-anime, scene-maintenance, scene-digitalisation, scene-refonte, scene-application.
- Toujours mobile-friendly : préférer des unités relatives, gap plutôt que margin manuel entre enfants.

## Exemple de sortie attendue
{"id":"demo_sec","type":"section","css":{"maxWidth":"1280px","margin":"0 auto","padding":"4rem 1.5rem","display":"grid","gridTemplateColumns":"1fr 1fr","gap":"2rem","alignItems":"center"},"children":[{"id":"demo_txt","type":"groupe","children":[{"id":"demo_kicker","type":"texte","content":{"texte":"NOTRE OFFRE"},"css":{"fontSize":"0.75rem","color":"#22d3c4","letterSpacing":"0.15em","textTransform":"uppercase","margin":"0"}},{"id":"demo_title","type":"titre","content":{"niveau":2,"texte":"Un service pensé pour vous"},"css":{"fontSize":"2.25rem","fontWeight":"600","color":"#eef4fc","margin":"0.75rem 0"}},{"id":"demo_texte","type":"texte","content":{"texte":"Un accompagnement complet, de la conception au déploiement."},"css":{"color":"#9fb2cc","lineHeight":"1.6"}}]},{"id":"demo_img","type":"image","content":{"src":"/illustrations/service.svg","alt":"Illustration du service"},"css":{"width":"100%","borderRadius":"16px"}},{"id":"demo_scene","type":"composant","content":{"composant":"scene-hero"},"css":{"marginTop":"2rem"}}]}`;

// Extrait le premier objet JSON valide d'un texte (au cas où Claude ajoute des
// mots autour malgré la consigne).
function extraireJson(texte: string): unknown {
  const debut = texte.indexOf("{");
  const fin = texte.lastIndexOf("}");
  if (debut === -1 || fin === -1) throw new Error("aucun JSON trouvé dans la réponse");
  return JSON.parse(texte.slice(debut, fin + 1));
}

// Validation minimale : un bloc doit avoir un id et un type, au moins.
function estBlocValide(v: unknown): v is { id: string; type: string } {
  return !!v && typeof v === "object" && typeof (v as { id?: unknown }).id === "string" && typeof (v as { type?: unknown }).type === "string";
}

export async function POST(req: Request) {
  const headers = corsHeaders(req);
  if (!codeAdminOk(req)) {
    return NextResponse.json({ ok: false, error: "code admin requis" }, { status: 401, headers });
  }
  const cle = process.env.ANTHROPIC_API_KEY;
  if (!cle) {
    return NextResponse.json({ ok: false, error: "ANTHROPIC_API_KEY non configurée sur le serveur" }, { status: 500, headers });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "corps JSON invalide" }, { status: 400, headers });
  }
  const { description } = body as { description?: string };
  if (!description || !description.trim()) {
    return NextResponse.json({ ok: false, error: "description manquante" }, { status: 400, headers });
  }

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": cle,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODELE,
        max_tokens: 2000,
        system: PROMPT_SYSTEME,
        messages: [{ role: "user", content: description.trim() }],
      }),
    });
    if (!r.ok) {
      const detail = await r.text();
      return NextResponse.json({ ok: false, error: "API Claude " + r.status + " : " + detail.slice(0, 300) }, { status: 502, headers });
    }
    const data = (await r.json()) as { content?: { type: string; text?: string }[] };
    const texte = (data.content || []).find((b) => b.type === "text")?.text || "";
    const section = extraireJson(texte);
    if (!estBlocValide(section)) {
      return NextResponse.json({ ok: false, error: "réponse de l'IA mal formée" }, { status: 502, headers });
    }
    return NextResponse.json({ ok: true, section }, { headers });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "génération impossible : " + String(e) }, { status: 500, headers });
  }
}
