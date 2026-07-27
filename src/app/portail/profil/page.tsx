import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ProfileForm from "@/components/portail/ProfileForm";
import ProfileSummary from "@/components/portail/ProfileSummary";
import PageHeader from "@/components/portail/PageHeader";

export const metadata: Metadata = {
  title: "Mon profil · OHIHO",
  robots: { index: false, follow: false },
};

export default async function ProfilPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "first_name, last_name, phone, address, company, email, role, created_at"
    )
    .eq("id", user!.id)
    .single();

  return (
    <div>
      {/* Raccourci vers l'espace admin, réservé au rôle admin (la page /admin
          revérifie le rôle de son côté). */}
      {profile?.role === "admin" && (
        <div className="card-surface mb-8 flex flex-wrap items-center justify-between gap-4 p-6">
          <p className="text-muted">
            Modifier les textes et les couleurs du site.
          </p>
          <Link
            href="/admin"
            className="btn-outline shrink-0 px-5 py-2.5 font-semibold"
          >
            Ouvrir l&apos;outil dev
          </Link>
        </div>
      )}

      <PageHeader title="Mon profil" />

      {/* `items-start` : sans lui la carte d'identité s'étire sur toute la
          hauteur du formulaire et se retrouve à moitié vide. */}
      <div className="grid items-start gap-6 lg:grid-cols-[17rem_1fr]">
        <ProfileSummary
          firstName={profile?.first_name ?? null}
          lastName={profile?.last_name ?? null}
          email={profile?.email ?? user?.email ?? ""}
          company={profile?.company ?? null}
          createdAt={profile?.created_at ?? new Date().toISOString()}
        />

        <ProfileForm
          email={profile?.email ?? user?.email ?? ""}
          firstName={profile?.first_name ?? null}
          lastName={profile?.last_name ?? null}
          phone={profile?.phone ?? null}
          address={profile?.address ?? null}
          company={profile?.company ?? null}
        />
      </div>
    </div>
  );
}
