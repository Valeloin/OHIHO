// CORS pour les routes /api/simple-dev/*.
// L'extension Simple Dev qui pilote l'édition tourne sur une origine DIFFÉRENTE
// de celle du site édité (ex: chrome-extension://…) : sans ces en-têtes, le
// navigateur bloque l'appel (échec du preflight) avant même que le code admin
// ne soit vérifié — la requête POST n'est jamais envoyée.
export function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") || "*";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "content-type, x-sd-code",
    Vary: "Origin",
  };
}

// Réponse au preflight (requête OPTIONS envoyée par le navigateur avant tout
// appel cross-origin qui porte un en-tête personnalisé comme `x-sd-code`).
export function preflight(req: Request): Response {
  return new Response(null, { status: 204, headers: corsHeaders(req) });
}
