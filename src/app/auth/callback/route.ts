import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next");
  // Destination par défaut : le portail. Une réinitialisation de mot de passe
  // (type=recovery) envoie plutôt vers la page de nouveau mot de passe.
  const destination =
    nextParam && nextParam.startsWith("/")
      ? nextParam
      : type === "recovery"
        ? "/nouveau-mot-de-passe"
        : "/portail";

  const supabase = createClient();

  // Confirmation d'inscription / réinitialisation de mot de passe par email.
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });
    if (!error) {
      return NextResponse.redirect(`${origin}${destination}`);
    }
  }

  // Flux OAuth (non utilisé pour l'instant, gardé pour compatibilité future).
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${destination}`);
    }
  }

  return NextResponse.redirect(`${origin}/connexion?error=confirmation`);
}
