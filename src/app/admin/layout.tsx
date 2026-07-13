import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/supabase/actions";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/connexion");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  if (!profile || (profile.role !== "technician" && profile.role !== "admin")) {
    redirect("/portail");
  }

  return (
    <main className="bg-grid">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-mono font-medium uppercase tracking-wider text-accent-violet">
              Espace équipe
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">
              Gestionnaire de ticket
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/portail" className="text-muted hover:text-foreground">
              Mon espace
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent-cyan/60 hover:bg-surface"
              >
                Se déconnecter
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}
