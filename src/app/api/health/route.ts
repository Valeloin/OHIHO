import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

// Sonde de santé, appelée par trois choses : le healthcheck Docker (qui
// redémarre le conteneur si elle ne répond plus), le script de déploiement
// (qui échoue bruyamment plutôt que de laisser passer un déploiement raté)
// et UptimeRobot.
//
// Elle doit rester joignable même quand le voile « site en construction »
// est posé : le middleware laisse passer tout /api.
export const dynamic = "force-dynamic";

export function GET() {
  // Garde-fou de déploiement : en production (ENFORCE_PUBLIC_URL posée par
  // docker-compose.yml), une URL publique restée sur localhost signifie que
  // le .env a été rempli APRÈS le build — les liens de partage et le plan du
  // site seraient cassés. On préfère un déploiement qui échoue franchement.
  if (process.env.ENFORCE_PUBLIC_URL === "1" && SITE.url.includes("localhost")) {
    return NextResponse.json(
      {
        status: "error",
        url: SITE.url,
        message:
          "NEXT_PUBLIC_APP_URL pointe encore vers localhost : renseignez-la dans le .env puis reconstruisez l'image.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ status: "ok", url: SITE.url });
}
