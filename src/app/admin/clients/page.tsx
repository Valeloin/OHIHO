import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/session";
import AdminHeader from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Clients · Admin OHIHO",
  robots: { index: false, follow: false },
};

export default async function AdminClientsPage() {
  const { supabase } = await requireAdmin();

  const { data: clients } = await supabase
    .from("profiles")
    .select("id, full_name, email, company")
    .eq("role", "client")
    .order("created_at", { ascending: false });

  const { data: projects } = await supabase
    .from("projects")
    .select("client_id");
  const { data: invoices } = await supabase
    .from("invoices")
    .select("client_id");

  const projectCounts = new Map<string, number>();
  for (const p of projects ?? []) {
    projectCounts.set(p.client_id, (projectCounts.get(p.client_id) ?? 0) + 1);
  }
  const invoiceCounts = new Map<string, number>();
  for (const i of invoices ?? []) {
    invoiceCounts.set(i.client_id, (invoiceCounts.get(i.client_id) ?? 0) + 1);
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader active="/admin/clients" />

      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
        <p className="mt-2 text-sm text-muted">
          Gérez le suivi de projet et la facturation de chaque client.
        </p>

        <div className="mt-8 grid gap-4">
          {(!clients || clients.length === 0) && (
            <p className="text-sm text-muted">Aucun compte client pour le moment.</p>
          )}
          {clients?.map((client) => (
            <Link
              key={client.id}
              href={`/admin/clients/${client.id}`}
              className="card-surface flex flex-wrap items-center justify-between gap-3 p-5 transition-colors hover:border-accent-cyan/40"
            >
              <div>
                <p className="font-semibold">
                  {client.full_name || client.email}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {client.email}
                  {client.company ? ` · ${client.company}` : ""}
                </p>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {projectCounts.get(client.id) ?? 0} projet(s) ·{" "}
                {invoiceCounts.get(client.id) ?? 0} facture(s)
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
