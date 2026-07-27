import type { Metadata } from "next";
import Link from "next/link";
import { requireProfile } from "@/lib/supabase/session";
import StatusBadge from "@/components/portail/StatusBadge";
import PageHeader from "@/components/portail/PageHeader";
import EmptyState from "@/components/portail/EmptyState";
import { PROJECT_STATUS_LABEL, PROJECT_STATUS_TONE } from "@/lib/portail/status";
import type { Project } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Mon projet · OHIHO",
  robots: { index: false, follow: false },
};

function formatDate(value: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PortailSitesPage() {
  const { supabase, user } = await requireProfile();

  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false });

  const projects = (data as Project[] | null) ?? [];

  return (
    <div>
      <PageHeader title="Mon projet" />

      {projects.length === 0 ? (
        <EmptyState
          title="Aucun projet en cours"
          description="Dès que nous démarrons un projet ensemble, son avancement apparaît ici."
          action={
            <Link
              href="/#contact"
              className="btn-accent inline-flex px-6 py-2.5 font-semibold"
            >
              Décrire mon projet
            </Link>
          }
        />
      ) : (
        <div className="grid gap-6">
          {projects.map((project) => {
            const total = project.steps.length;
            const done = project.steps.filter((s) => s.done).length;
            const percent = total > 0 ? Math.round((done / total) * 100) : 0;
            const updated = formatDate(project.updated_at);

            return (
              <article key={project.id} className="card-surface p-7 sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold">{project.name}</h2>
                  <StatusBadge
                    label={PROJECT_STATUS_LABEL[project.status]}
                    tone={PROJECT_STATUS_TONE[project.status]}
                  />
                </div>

                {updated && (
                  <p className="mt-2 text-[14px] text-muted">
                    Mis à jour le {updated}
                  </p>
                )}

                {project.notes && (
                  <p className="mt-5 leading-relaxed text-muted">
                    {project.notes}
                  </p>
                )}

                {total > 0 && (
                  <>
                    <div className="mt-8">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="font-medium">Avancement</p>
                        <p className="text-muted">
                          {done} sur {total} étapes
                        </p>
                      </div>
                      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-2">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-sky via-brand-teal to-brand-emerald"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    {/* Frise verticale : un filet relie les pastilles d'une
                        étape à l'autre pour se lire comme un parcours. */}
                    <ol className="mt-8">
                      {project.steps.map((step, i) => {
                        const isLast = i === project.steps.length - 1;
                        return (
                          <li
                            key={i}
                            className="relative flex gap-4 pb-5 last:pb-0"
                          >
                            {!isLast && (
                              <span
                                aria-hidden="true"
                                className="absolute left-[5px] top-4 h-full w-px bg-border"
                              />
                            )}
                            <span
                              aria-hidden="true"
                              className={`relative z-10 mt-2 h-[11px] w-[11px] shrink-0 rounded-full ${
                                step.done
                                  ? "bg-brand-emerald"
                                  : "border border-border bg-background"
                              }`}
                            />
                            <p
                              className={
                                step.done ? "" : "text-muted"
                              }
                            >
                              {step.label}
                            </p>
                          </li>
                        );
                      })}
                    </ol>
                  </>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
