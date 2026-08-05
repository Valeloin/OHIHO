import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/lib/supabase/types";

const PROTECTED_PREFIXES = ["/portail", "/admin"];
const AUTH_PAGES = ["/connexion", "/inscription"];

// SITE EN CONSTRUCTION (demande du 2026-07-28) : tant que ce booléen est à
// true, toutes les pages publiques affichent /construction. Restent
// accessibles : la connexion, l'espace client, l'admin et les routes
// techniques — Valentin garde donc la main pour tout rouvrir.
// Pour rouvrir le site : passer à false et pousser.
const EN_CONSTRUCTION = false;

const CONSTRUCTION_ALLOWED_PREFIXES = [
  "/construction",
  "/connexion",
  "/nouveau-mot-de-passe",
  "/portail",
  "/admin",
  "/auth",
  "/api",
];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  if (EN_CONSTRUCTION) {
    const { pathname } = request.nextUrl;
    const allowed = CONSTRUCTION_ALLOWED_PREFIXES.some((prefix) =>
      pathname.startsWith(prefix)
    );
    if (!allowed) {
      // Réécriture et non redirection : l'URL demandée reste dans la barre
      // d'adresse, le visiteur retrouvera la page au même endroit à la
      // réouverture.
      return NextResponse.rewrite(new URL("/construction", request.url));
    }
  }

  // Sécurité : si Supabase n'est pas encore configuré, on laisse passer
  // toutes les requêtes plutôt que de casser l'ensemble du site.
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return response;
  }

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
  const isAuthPage = AUTH_PAGES.some((page) => pathname.startsWith(page));

  if (isProtected && !user) {
    const redirectUrl = new URL("/connexion", request.url);
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthPage && user) {
    return NextResponse.redirect(new URL("/portail", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
