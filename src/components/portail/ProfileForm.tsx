"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updateProfile } from "@/app/portail/profil/actions";

type FieldKey = "firstName" | "lastName" | "phone" | "company" | "address";

const FIELDS: {
  key: FieldKey;
  label: string;
  type: string;
  autoComplete: string;
  required: boolean;
}[] = [
  {
    key: "firstName",
    label: "Prénom",
    type: "text",
    autoComplete: "given-name",
    required: true,
  },
  {
    key: "lastName",
    label: "Nom",
    type: "text",
    autoComplete: "family-name",
    required: true,
  },
  {
    key: "phone",
    label: "Téléphone",
    type: "tel",
    autoComplete: "tel",
    required: false,
  },
  {
    key: "company",
    label: "Entreprise",
    type: "text",
    autoComplete: "organization",
    required: false,
  },
  {
    key: "address",
    label: "Adresse",
    type: "text",
    autoComplete: "street-address",
    required: false,
  },
];

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-accent px-5 py-2 text-[14px] font-semibold disabled:opacity-50"
    >
      {pending ? "Enregistrement..." : "Enregistrer"}
    </button>
  );
}

export default function ProfileForm({
  email,
  firstName,
  lastName,
  phone,
  address,
  company,
}: {
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  address: string | null;
  company: string | null;
}) {
  const [state, formAction] = useFormState(updateProfile, null);

  const [values, setValues] = useState<Record<FieldKey, string>>({
    firstName: firstName ?? "",
    lastName: lastName ?? "",
    phone: phone ?? "",
    company: company ?? "",
    address: address ?? "",
  });
  const [editing, setEditing] = useState<FieldKey | null>(null);
  const [draft, setDraft] = useState("");

  // L'action met à jour le profil entier ; la ligne en cours d'édition est le
  // seul champ visible, les autres partent en champs cachés avec leur valeur
  // courante. Une fois l'enregistrement confirmé côté serveur, on referme la
  // ligne et on adopte le brouillon.
  useEffect(() => {
    if (state?.success && editing) {
      setValues((v) => ({ ...v, [editing]: draft.trim() }));
      setEditing(null);
    }
    // `draft`/`editing` sont lus au moment où l'état de l'action change ;
    // les rajouter en dépendance relancerait l'effet à chaque frappe.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  function startEditing(key: FieldKey) {
    setDraft(values[key]);
    setEditing(key);
  }

  return (
    <form action={formAction} className="card-surface overflow-hidden">
      <div className="border-b border-border px-6 py-3.5">
        <h2 className="font-medium">Informations</h2>
      </div>

      <div className="divide-y divide-border">
        {FIELDS.map((field) => {
          const isEditing = editing === field.key;

          if (isEditing) {
            return (
              <div key={field.key} className="px-6 py-5">
                <label htmlFor={field.key} className="field-label">
                  {field.label}
                </label>
                <input
                  id={field.key}
                  name={field.key}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  required={field.required}
                  autoFocus
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  className="field"
                />

                {state?.error && (
                  <p className="mt-3 text-[14px] text-red-400">{state.error}</p>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <SaveButton />
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="btn-outline px-5 py-2 text-[14px]"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={field.key}
              className="flex items-center justify-between gap-4 px-6 py-4"
            >
              {/* Valeur non modifiée : elle part quand même en champ caché,
                  l'action réécrit le profil entier à chaque enregistrement. */}
              <input type="hidden" name={field.key} value={values[field.key]} />
              <div className="min-w-0">
                <p className="text-[13px] text-muted">{field.label}</p>
                <p className="mt-1 break-words">
                  {values[field.key] || (
                    <span className="text-muted">Non renseigné</span>
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={() => startEditing(field.key)}
                disabled={editing !== null}
                className="btn-outline shrink-0 px-4 py-2 text-[14px] disabled:opacity-40"
              >
                Modifier
              </button>
            </div>
          );
        })}

        <div className="px-6 py-4">
          <p className="text-[13px] text-muted">Email</p>
          <p className="mt-1 break-all">{email}</p>
          <p className="mt-1.5 text-[13px] text-muted">
            L&apos;email ne peut pas être modifié ici.
          </p>
        </div>
      </div>

      {state?.success && editing === null && (
        <div className="border-t border-border bg-[var(--header-bg)] px-6 py-3.5">
          <p className="text-[14px] text-brand-emerald">Profil mis à jour.</p>
        </div>
      )}
    </form>
  );
}
