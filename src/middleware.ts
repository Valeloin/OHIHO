import { NextResponse, type NextRequest } from "next/server";

// SITE EN CONSTRUCTION. Tant que ce drapeau est actif, toutes les pages
// publiques affichent /construction. Le voile reste posé pendant toute la
// refonte : on le lève dans un commit dédié, une fois le site validé.
//
// Fermé par défaut, y compris si la variable n'existe pas : un oubli de
// configuration referme le site, il ne l'ouvre pas. Pour travailler sur le
// vrai site en local, poser EN_CONSTRUCTION=false dans .env.local.
// Pour rouvrir le site en production : la même variable sur Vercel.
const EN_CONSTRUCTION = process.env.EN_CONSTRUCTION !== "false";

// Routes qui restent joignables malgré le voile : la page de construction
// elle-même et la route d'envoi du formulaire de contact (le lien email de
// la page de construction reste un simple mailto:, mais la route sert dès
// qu'on rouvre).
const ALLOWED_PREFIXES = ["/construction", "/api"];

export function middleware(request: NextRequest) {
  if (!EN_CONSTRUCTION) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (ALLOWED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Réécriture et non redirection : l'URL demandée reste dans la barre
  // d'adresse, le visiteur retrouvera la page au même endroit à la
  // réouverture.
  return NextResponse.rewrite(new URL("/construction", request.url));
}

export const config = {
  matcher: [
    // Tout sauf les fichiers statiques de Next et les images du dossier public.
    "/((?!_next/static|_next/image|favicon.ico|favicon.svg|.*\.png$|.*\.svg$|.*\.webmanifest$).*)",
  ],
};
