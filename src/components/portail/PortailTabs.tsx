"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/portail/profil", label: "Mon profil" },
  { href: "/portail/devis", label: "Mes devis" },
  { href: "/portail/sites", label: "Mes sites & outils" },
];

export default function PortailTabs() {
  const pathname = usePathname();

  return (
    // Onglets éditoriaux : libellés en mono capitales espacées. L'onglet courant
    // est souligné d'un filet au dégradé de marque (.rule-brand), statique.
    <div className="flex flex-wrap gap-x-7 gap-y-2 border-b border-border">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`relative -mb-px pb-3 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
              active ? "text-accent-cyan" : "text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
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
