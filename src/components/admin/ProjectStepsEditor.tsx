"use client";

import { useState } from "react";
import type { ProjectStep } from "@/lib/supabase/types";

const DEFAULT_STEPS: ProjectStep[] = [
  { label: "Maquette", done: false },
  { label: "Développement", done: false },
  { label: "Mise en ligne", done: false },
];

export default function ProjectStepsEditor({
  initialSteps,
}: {
  initialSteps?: ProjectStep[];
}) {
  const [steps, setSteps] = useState<ProjectStep[]>(
    initialSteps && initialSteps.length > 0 ? initialSteps : DEFAULT_STEPS
  );

  return (
    <div>
      <input type="hidden" name="steps" value={JSON.stringify(steps)} />
      <div className="grid gap-2.5">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={step.done}
              onChange={(e) =>
                setSteps((prev) =>
                  prev.map((s, j) =>
                    j === i ? { ...s, done: e.target.checked } : s
                  )
                )
              }
              className="h-4 w-4 shrink-0 accent-[rgb(var(--accent))]"
            />
            <input
              type="text"
              value={step.label}
              onChange={(e) =>
                setSteps((prev) =>
                  prev.map((s, j) =>
                    j === i ? { ...s, label: e.target.value } : s
                  )
                )
              }
              placeholder="Nom de l'étape"
              className="field !mt-0 flex-1"
            />
            <button
              type="button"
              onClick={() =>
                setSteps((prev) => prev.filter((_, j) => j !== i))
              }
              className="btn-outline shrink-0 px-3 py-2 text-xs"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() =>
          setSteps((prev) => [...prev, { label: "", done: false }])
        }
        className="btn-outline mt-3 px-4 py-2 text-xs"
      >
        + Ajouter une étape
      </button>
    </div>
  );
}
