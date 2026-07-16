import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/supabase/actions";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getContent } from "@/lib/content";
import AdminEditor from "@/components/admin/AdminEditor";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Espace admin — OHIHO",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20">
        <h1 className="text-2xl font-semibold">Espace admin — à activer</h1>
        <p className="mt-4 text-muted">
          Supabase n&apos;est pas configuré : la connexion admin et l&apos;édition
          du contenu sont désactivées pour l&apos;instant.
        </p>
        <Link href="/" className="mt-8 inline-block text-accent-cyan hover:underline">
          ← Retour au site
        </Link>
      </main>
    );
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/connexion?next=/admin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, email")
    .eq("id", user.id)
    .single();

  // Réservé au rôle admin.
  if (profile?.role !== "admin") redirect("/portail");

  const content = await getContent();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-[var(--header-bg)] backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <p className="text-sm font-semibold text-[var(--header-fg)]">
            OHIHO · Espace admin
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/"
              target="_blank"
              className="text-[var(--header-muted)] transition-colors hover:text-[var(--header-fg)]"
            >
              Voir le site ↗
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="text-[var(--header-muted)] transition-colors hover:text-[var(--header-fg)]"
              >
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          Modifier le contenu du site
        </h1>
        <p className="mt-2 text-sm text-muted">
          Connecté en tant que {profile?.email}. Les modifications sont visibles
          immédiatement sur le site après enregistrement.
        </p>

        <div className="mt-8">
          <AdminEditor initial={content} />
        </div>
      </main>
    </div>
  );
}
