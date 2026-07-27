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
  pendingTicketCount = 0,
}: {
  name: string;
  email: string;
  initials: string;
  pendingTicketCount?: number;
}) {
  const pathname = usePathname();

  return (
    // Pas de carte autour du menu : une colonne posée à même le fond, séparée
    // du contenu par le seul espace. Une bordure de plus n'aurait rien dit.
    // `min-w-0` : sans lui, la rangée de liens du mobile impose sa largeur à
    // la grille entière et fait déborder la page vers la droite.
    <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-sky via-brand-teal to-brand-emerald text-sm font-semibold text-background"
        >
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate font-medium leading-tight">{name}</p>
          <p className="truncate text-[13px] leading-tight text-muted">
            {email}
          </p>
        </div>
      </div>

      {/* Mobile : les cinq liens passent à la ligne plutôt que de défiler
          horizontalement — rien à faire glisser pour découvrir le dernier. */}
      <nav className="mt-7 flex flex-wrap gap-1 lg:flex-col lg:flex-nowrap">
        {NAV.map((item) => {
          // "/portail" ne prend le préfixe que pour lui-même : sinon il
          // resterait actif sur toutes les sous-pages.
          const active =
            item.href === "/portail"
              ? pathname === "/portail"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const badge =
            item.href === "/portail/tickets" && pendingTicketCount > 0
              ? pendingTicketCount
              : null;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center justify-between gap-3 whitespace-nowrap rounded-xl px-4 py-2.5 transition-colors ${
                active
                  ? "bg-surface-2 font-medium text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {item.label}
              {badge !== null && (
                <span
                  className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-emerald px-1.5 text-[12px] font-semibold text-background"
                  aria-label={`${badge} ticket en attente de votre réponse`}
                >
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <form action={signOut} className="mt-7">
        <button
          type="submit"
          className="rounded-xl px-4 py-2.5 text-muted transition-colors hover:text-foreground"
        >
          Se déconnecter
        </button>
      </form>
    </aside>
  );
}
