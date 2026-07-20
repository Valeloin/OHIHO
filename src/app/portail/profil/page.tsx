import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ProfileForm from "@/components/portail/ProfileForm";

export const metadata: Metadata = {
  title: "Mon profil · OHIHO",
};

export default async function ProfilPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, last_name, phone, address, company, email, role")
    .eq("id", user!.id)
    .single();

  return (
    <div>
      {/* Raccourci vers l'espace admin, réservé au rôle admin (la page /admin
          revérifie le rôle de son côté). */}
      {profile?.role === "admin" && (
        <div className="card-dark mb-6 flex flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-cyan">
              Outil dev
            </p>
            <p className="mt-2 text-xs text-muted">
              Modifier les textes et les couleurs du site.
            </p>
          </div>
          <Link
            href="/admin"
            className="btn-accent shrink-0 px-5 py-2 text-sm font-semibold"
          >
            Ouvrir l&apos;outil dev
          </Link>
        </div>
      )}

      <ProfileForm
        email={profile?.email ?? user?.email ?? ""}
        firstName={profile?.first_name ?? null}
        lastName={profile?.last_name ?? null}
        phone={profile?.phone ?? null}
        address={profile?.address ?? null}
        company={profile?.company ?? null}
      />
    </div>
  );
}
