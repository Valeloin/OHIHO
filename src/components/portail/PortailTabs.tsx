"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/portail", label: "Vue d'ensemble" },
  { href: "/portail/profil", label: "Mon profil" },
  { href: "/portail/sites", label: "Mon projet" },
  { href: "/portail/facturation", label: "Facturation" },
  { href: "/portail/tickets", label: "Support" },
];

export default function PortailTabs({
  pendingTicketCount = 0,
}: {
  pendingTicketCount?: number;
}) {
  const pathname = usePathname();

  return (
    // Onglets éditoriaux : libellés en mono capitales espacées. L'onglet courant
    // est souligné d'un filet au dégradé de marque (.rule-brand), statique.
    <div className="flex flex-wrap gap-x-7 gap-y-2 border-b border-border">
      {TABS.map((tab) => {
        // "/portail" ne prend le préfixe que pour lui-même : sinon il
        // resterait actif sur toutes les sous-pages, qui commencent toutes
        // par "/portail/".
        const active =
          tab.href === "/portail"
            ? pathname === "/portail"
            : pathname === tab.href || pathname.startsWith(`${tab.href}/`);
        const badge =
          tab.href === "/portail/tickets" && pendingTicketCount > 0
            ? pendingTicketCount
            : null;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`relative -mb-px flex items-center gap-1.5 pb-3 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
              active ? "text-accent-cyan" : "text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
            {badge !== null && (
              <span
                className="inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-brand-emerald px-1 text-[10px] font-semibold normal-case tracking-normal text-background"
                aria-label={`${badge} ticket(s) nécessitant une action`}
              >
                {badge}
              </span>
            )}
            {active && (
              <span
                aria-hidden="true"
                className="rule-brand absolute bottom-0 left-0 h-px w-full"
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
