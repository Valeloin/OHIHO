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
      <PageHeader
        title="Mon projet"
        subtitle="L'avancement de ce que nous construisons pour vous, étape par étape."
      />

      {projects.length === 0 ? (
        <EmptyState
          title="Aucun projet en cours"
          description="Dès que nous démarrons un projet ensemble, vous retrouverez ici son avancement détaillé, étape par étape."
          action={
            <Link
              href="/#contact"
              className="btn-accent inline-flex px-6 py-2.5 text-sm font-semibold"
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
              <article key={project.id} className="card-surface p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold tracking-display">
                      {project.name}
                    </h2>
                    {updated && (
                      <p className="mt-2 text-xs text-muted">
                        Mis à jour le {updated}
                      </p>
                    )}
                  </div>
                  <StatusBadge
                    label={PROJECT_STATUS_LABEL[project.status]}
                    tone={PROJECT_STATUS_TONE[project.status]}
                  />
                </div>

                {project.notes && (
                  <p className="mt-5 text-sm leading-relaxed text-muted">
                    {project.notes}
                  </p>
                )}

                {total > 0 && (
                  <>
                    {/* Jauge d'avancement : rail sombre, remplissage au
                        dégradé de marque. */}
                    <div className="mt-7">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                          Avancement
                        </p>
                        <p className="text-sm font-semibold tracking-display">
                          {percent}%
                          <span className="ml-2 text-xs font-normal text-muted">
                            {done}/{total} étapes
                          </span>
                        </p>
                      </div>
                      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-sky via-brand-teal to-brand-emerald transition-[width]"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-8 h-px rule-fade" />

                    {/* Frise verticale : un filet relie les pastilles d'une
                        étape à l'autre pour se lire comme un parcours et non
                        comme une simple liste à puces. */}
                    <ol className="mt-7 space-y-0">
                      {project.steps.map((step, i) => {
                        const isLast = i === project.steps.length - 1;
                        return (
                          <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
                            {!isLast && (
                              <span
                                aria-hidden="true"
                                className="absolute left-[5px] top-4 h-full w-px bg-border"
                              />
                            )}
                            <span
                              aria-hidden="true"
                              className={`relative z-10 mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full ${
                                step.done
                                  ? "bg-brand-emerald shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                                  : "border border-border bg-background"
                              }`}
                            />
                            <div className="min-w-0">
                              <p
                                className={`text-sm ${
                                  step.done
                                    ? "font-medium text-foreground"
                                    : "text-muted"
                                }`}
                              >
                                {step.label}
                              </p>
                              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                                {step.done ? "Terminé" : "À venir"}
                              </p>
                            </div>
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
