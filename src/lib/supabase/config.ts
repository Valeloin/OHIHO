// Indique si Supabase est configuré (clés présentes dans l'environnement).
// Sinon, le site fonctionne avec le contenu par défaut et l'admin est désactivé.
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// Tout le contenu éditable du site tient dans une seule ligne JSON.
export const CONTENT_TABLE = "site_content";
export const CONTENT_ROW_ID = "main";
