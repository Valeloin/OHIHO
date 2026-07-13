"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/portail/profil", label: "Mon profil" },
  { href: "/portail/tickets", label: "Mes tickets" },
];

export default function PortailTabs() {
  const pathname = usePathname();

  return (
    <div className="flex gap-6 border-b border-border">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
              active
                ? "border-accent-cyan text-foreground"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
