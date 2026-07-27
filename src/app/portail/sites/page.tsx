import type { Metadata } from "next";
import Link from "next/link";
import { requireProfile } from "@/lib/supabase/session";
import StatusBadge from "@/components/portail/StatusBadge";
import PageHeader from "@/components/portail/PageHeader";
import EmptyState from "@/components/portail/EmptyState";
import Panel from "@/components/portail/Panel";
import DetailGrid from "@/components/portail/DetailGrid";
import { PROJECT_STATUS_LABEL, PROJECT_STATUS_TONE } from "@/lib/portail/status";
import type { Project } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Mon projet · OHIHO",
  robots: { index: false, follow: false },
};

function formatDate(value: string | null) {
  if (!value) return "—";
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

            return (
              <div key={project.id} className="grid gap-6">
                <Panel
                  title={project.name}
                  action={
                    <StatusBadge
                      label={PROJECT_STATUS_LABEL[project.status]}
                      tone={PROJECT_STATUS_TONE[project.status]}
                    />
                  }
                >
                  <DetailGrid
                    items={[
                      {
                        label: "Avancement",
                        value: (
                          <div>
                            <p className="font-medium">
                              {percent}%
                              {total > 0 && (
                                <span className="ml-2 font-normal text-muted">
                                  {done}/{total} étapes
                                </span>
                              )}
                            </p>
                            <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-brand-sky via-brand-teal to-brand-emerald"
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </div>
                        ),
                      },
                      {
                        label: "Démarré le",
                        value: formatDate(project.created_at),
                      },
                      {
                        label: "Dernière mise à jour",
                        value: formatDate(project.updated_at),
                      },
                    ]}
                  />

                  {project.notes && (
                    <p className="mt-7 border-t border-border pt-6 leading-relaxed text-muted">
                      {project.notes}
                    </p>
                  )}
                </Panel>

                {total > 0 && (
                  <Panel title="Étapes" flush>
                    <ol className="divide-y divide-border">
                      {project.steps.map((step, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-4 px-6 py-3.5"
                        >
                          <span
                            aria-hidden="true"
                            className={`h-2 w-2 shrink-0 rounded-full ${
                              step.done
                                ? "bg-brand-emerald"
                                : "border border-border bg-background"
                            }`}
                          />
                          <span className={step.done ? "" : "text-muted"}>
                            {step.label}
                          </span>
                          {step.done && (
                            <span className="ml-auto shrink-0 text-[13px] text-muted">
                              Terminé
                            </span>
                          )}
                        </li>
                      ))}
                    </ol>
                  </Panel>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
