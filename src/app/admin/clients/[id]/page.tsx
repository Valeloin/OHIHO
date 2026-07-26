import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/session";
import AdminHeader from "@/components/admin/AdminHeader";
import ProjectForm from "@/components/admin/ProjectForm";
import InvoiceForm from "@/components/admin/InvoiceForm";
import type { Project, Invoice } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Fiche client · Admin OHIHO",
  robots: { index: false, follow: false },
};

export default async function AdminClientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { supabase } = await requireAdmin();

  const { data: client } = await supabase
    .from("profiles")
    .select("id, full_name, email, company")
    .eq("id", params.id)
    .single();

  if (!client) notFound();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", client.id)
    .order("created_at", { ascending: false });

  const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .eq("client_id", client.id)
    .order("issue_date", { ascending: false });

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader active="/admin/clients" />

      <main className="mx-auto max-w-5xl px-6 py-10">
        <Link
          href="/admin/clients"
          className="text-xs text-muted hover:text-foreground"
        >
          ← Tous les clients
        </Link>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          {client.full_name || client.email}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {client.email}
          {client.company ? ` · ${client.company}` : ""}
        </p>

        <section className="mt-10">
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-accent-cyan">
            Projet(s)
          </h2>
          <div className="mt-4 grid gap-5">
            {(projects as Project[] | null)?.map((project) => (
              <ProjectForm
                key={project.id}
                clientId={client.id}
                project={project}
              />
            ))}
            <div>
              <p className="mb-3 text-sm font-semibold">
                + Ajouter un projet
              </p>
              <ProjectForm clientId={client.id} />
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-accent-cyan">
            Factures
          </h2>
          <div className="mt-4 grid gap-5">
            {(invoices as Invoice[] | null)?.map((invoice) => (
              <InvoiceForm
                key={invoice.id}
                clientId={client.id}
                invoice={invoice}
              />
            ))}
            <div>
              <p className="mb-3 text-sm font-semibold">
                + Ajouter une facture
              </p>
              <InvoiceForm clientId={client.id} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
