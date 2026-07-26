import type { Metadata } from "next";
import Link from "next/link";
import { requireProfile } from "@/lib/supabase/session";
import StatusBadge from "@/components/portail/StatusBadge";
import { PROJECT_STATUS_LABEL, PROJECT_STATUS_TONE } from "@/lib/portail/status";
import type { Project } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Mon projet · OHIHO",
  robots: { index: false, follow: false },
};

export default async function PortailSitesPage() {
  const { supabase, user } = await requireProfile();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false });

  if (!projects || projects.length === 0) {
    return (
      <div className="card-surface p-6 sm:p-8">
        <p className="text-sm leading-relaxed text-muted">
          Les sites et applications que nous développons pour vous apparaîtront
          ici une fois livrés, avec un accès direct.
        </p>
        <Link
          href="mailto:contact@ohiho.fr"
          className="btn-accent mt-6 inline-flex px-6 py-2.5 text-sm font-semibold"
        >
          Décrivez votre projet
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {(projects as Project[]).map((project) => (
        <div key={project.id} className="card-surface p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">{project.name}</h2>
            <StatusBadge
              label={PROJECT_STATUS_LABEL[project.status]}
              tone={PROJECT_STATUS_TONE[project.status]}
            />
          </div>

          {project.notes && (
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {project.notes}
            </p>
          )}

          {project.steps.length > 0 && (
            <ul className="mt-6 divide-y divide-border border-t border-border">
              {project.steps.map((step, i) => (
                <li key={i} className="flex items-center gap-4 py-3.5">
                  <span
                    className={
                      step.done
                        ? "h-1.5 w-1.5 shrink-0 rounded-full bg-brand-emerald shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                        : "h-1.5 w-1.5 shrink-0 rounded-full border border-muted/50"
                    }
                    aria-hidden="true"
                  />
                  <span
                    className={
                      step.done ? "text-sm" : "text-sm text-muted"
                    }
                  >
                    {step.label}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
