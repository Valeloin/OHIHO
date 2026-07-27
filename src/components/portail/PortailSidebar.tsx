"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/supabase/actions";

const NAV = [
  { href: "/portail", label: "Vue d'ensemble" },
  { href: "/portail/profil", label: "Mon profil" },
  { href: "/portail/sites", label: "Mon projet" },
  { href: "/portail/facturation", label: "Facturation" },
  { href: "/portail/tickets", label: "Support" },
];

export default function PortailSidebar({
  name,
  email,
  initials,
  company,
  pendingTicketCount = 0,
}: {
  name: string;
  email: string;
  initials: string;
  company: string | null;
  pendingTicketCount?: number;
}) {
  const pathname = usePathname();

  return (
    // Colonne collante au défilement sur grand écran ; empilée au-dessus du
    // contenu (navigation en bandeau défilant) en dessous de `lg`.
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="card-dark p-5">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-sky via-brand-teal to-brand-emerald text-sm font-semibold text-background"
          >
            {initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{name}</p>
            <p className="truncate text-xs text-muted">{company || email}</p>
          </div>
        </div>

        <div className="mt-5 h-px rule-fade" />

        <nav className="mt-5 flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
          {NAV.map((item) => {
            // "/portail" ne prend le préfixe que pour lui-même : sinon il
            // resterait actif sur toutes les sous-pages.
            const active =
              item.href === "/portail"
                ? pathname === "/portail"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
            const badge =
              item.href === "/portail/tickets" && pendingTicketCount > 0
                ? pendingTicketCount
                : null;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex shrink-0 items-center justify-between gap-2.5 whitespace-nowrap rounded-xl px-3.5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                  active
                    ? "bg-surface-2 text-accent-cyan"
                    : "text-muted hover:bg-surface-2/50 hover:text-foreground"
                }`}
              >
                {active && (
                  <span
                    aria-hidden="true"
                    className="rule-brand-y absolute left-0 top-1/2 hidden h-6 w-[2px] -translate-y-1/2 rounded-full lg:block"
                  />
                )}
                {item.label}
                {badge !== null && (
                  <span
                    className="inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-brand-emerald px-1 text-[10px] font-semibold normal-case tracking-normal text-background"
                    aria-label={`${badge} ticket(s) nécessitant une action`}
                  >
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-5 h-px rule-fade" />

        <form action={signOut} className="mt-5">
          <button
            type="submit"
            className="btn-outline w-full px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em]"
          >
            Se déconnecter
          </button>
        </form>
      </div>
    </aside>
  );
}
