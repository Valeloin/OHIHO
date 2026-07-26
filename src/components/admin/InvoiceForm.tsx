"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  upsertInvoice,
  deleteInvoice,
  updateInvoiceStatus,
} from "@/app/admin/clients/actions";
import { formatCents } from "@/lib/money";
import type { Invoice, InvoiceStatus } from "@/lib/supabase/types";

const FIELD = "field";
const LABEL = "field-label";

const STATUS_OPTIONS: { value: InvoiceStatus; label: string }[] = [
  { value: "brouillon", label: "Brouillon" },
  { value: "envoyee", label: "Envoyée" },
  { value: "payee", label: "Payée" },
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

export default function InvoiceForm({
  clientId,
  invoice,
}: {
  clientId: string;
  invoice?: Invoice;
}) {
  const [state, formAction] = useFormState(upsertInvoice, null);

  return (
    <div className="card-surface p-6">
      <form action={formAction}>
        <input type="hidden" name="clientId" value={clientId} />
        {invoice && <input type="hidden" name="invoiceId" value={invoice.id} />}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={LABEL}>Numéro</label>
            <input
              name="number"
              type="text"
              required
              defaultValue={invoice?.number ?? ""}
              className={FIELD}
              placeholder="OHIHO-2026-001"
            />
          </div>
          <div>
            <label className={LABEL}>Statut</label>
            <select
              name="status"
              defaultValue={invoice?.status ?? "brouillon"}
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
          <label className={LABEL}>Description</label>
          <input
            name="description"
            type="text"
            required
            defaultValue={invoice?.description ?? ""}
            className={FIELD}
            placeholder="Développement site vitrine"
          />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label className={LABEL}>Montant (€)</label>
            <input
              name="amount"
              type="text"
              required
              defaultValue={
                invoice ? (invoice.amount_cents / 100).toFixed(2) : ""
              }
              className={FIELD}
              placeholder="1500.00"
            />
          </div>
          <div>
            <label className={LABEL}>Date d&apos;émission</label>
            <input
              name="issueDate"
              type="date"
              required
              defaultValue={
                invoice?.issue_date ?? new Date().toISOString().slice(0, 10)
              }
              className={FIELD}
            />
          </div>
          <div>
            <label className={LABEL}>Échéance (optionnel)</label>
            <input
              name="dueDate"
              type="date"
              defaultValue={invoice?.due_date ?? ""}
              className={FIELD}
            />
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

      {invoice && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {invoice.status !== "payee" && (
            <form
              action={updateInvoiceStatus.bind(
                null,
                invoice.id,
                clientId,
                "payee"
              )}
            >
              <button
                type="submit"
                className="btn-outline px-5 py-2.5 text-sm font-semibold"
              >
                Marquer payée ({formatCents(invoice.amount_cents)})
              </button>
            </form>
          )}
          <form action={deleteInvoice.bind(null, invoice.id, clientId)}>
            <button
              type="submit"
              className="btn-outline px-5 py-2.5 text-sm font-semibold"
            >
              Supprimer
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
