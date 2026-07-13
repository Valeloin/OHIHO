import Link from "next/link";

export default function InboxCard({ count }: { count: number }) {
  return (
    <Link
      href="/admin/tickets?assigned=unassigned"
      className="card-surface flex items-center justify-between rounded-2xl border border-accent-cyan/40 p-5 transition-colors hover:border-accent-cyan/70"
    >
      <div>
        <p className="text-sm font-semibold text-foreground">Inbox</p>
        <p className="mt-1 text-xs text-muted">Tickets non attribués</p>
      </div>
      <p className="text-3xl font-semibold text-accent-cyan">{count}</p>
    </Link>
  );
}
