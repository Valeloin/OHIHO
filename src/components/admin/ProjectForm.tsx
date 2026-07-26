"use client";

import { useFormState, useFormStatus } from "react-dom";
import { upsertProject, deleteProject } from "@/app/admin/clients/actions";
import ProjectStepsEditor from "./ProjectStepsEditor";
import type { Project, ProjectStatus } from "@/lib/supabase/types";

const FIELD = "field";
const LABEL = "field-label";

const STATUS_OPTIONS: { value: ProjectStatus; label: string }[] = [
  { value: "nouveau", label: "Nouveau" },
  { value: "en_cours", label: "En cours" },
  { value: "en_revision", label: "En révision" },
  { value: "livre", label: "Livré" },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-accent px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
    >
      {pending ? "Enregistrement..." : "Enregistrer"}
    </button>
  );
}

export default function ProjectForm({
  clientId,
  project,
}: {
  clientId: string;
  project?: Project;
}) {
  const [state, formAction] = useFormState(upsertProject, null);

  return (
    <div className="card-surface p-6">
      <form action={formAction}>
        <input type="hidden" name="clientId" value={clientId} />
        {project && <input type="hidden" name="projectId" value={project.id} />}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={LABEL}>Nom du projet</label>
            <input
              name="name"
              type="text"
              required
              defaultValue={project?.name ?? ""}
              className={FIELD}
              placeholder="Site vitrine OHIHO"
            />
          </div>
          <div>
            <label className={LABEL}>Statut</label>
            <select
              name="status"
              defaultValue={project?.status ?? "nouveau"}
              className={FIELD}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className={LABEL}>Notes (optionnel)</label>
          <textarea
            name="notes"
            rows={2}
            defaultValue={project?.notes ?? ""}
            className={`${FIELD} resize-none`}
          />
        </div>

        <div className="mt-4">
          <label className={LABEL}>Étapes</label>
          <div className="mt-2">
            <ProjectStepsEditor initialSteps={project?.steps} />
          </div>
        </div>

        {state?.error && (
          <p className="mt-4 rounded-xl border-l-2 border-red-400/60 bg-red-400/10 px-4 py-3 text-sm text-red-400">
            {state.error}
          </p>
        )}

        <div className="mt-5">
          <SubmitButton />
        </div>
      </form>

      {project && (
        <form
          action={deleteProject.bind(null, project.id, clientId)}
          className="mt-3"
        >
          <button
            type="submit"
            className="btn-outline px-5 py-2.5 text-sm font-semibold"
          >
            Supprimer
          </button>
        </form>
      )}
    </div>
  );
}
