"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/supabase/actions";
import {
  IconOverview,
  IconUser,
  IconProject,
  IconInvoice,
  IconSupport,
  IconLogout,
} from "@/components/portail/icons";

const NAV = [
  { href: "/portail", label: "Vue d'ensemble", Icon: IconOverview },
  { href: "/portail/profil", label: "Mon profil", Icon: IconUser },
  { href: "/portail/sites", label: "Mon projet", Icon: IconProject },
  { href: "/portail/facturation", label: "Facturation", Icon: IconInvoice },
  { href: "/portail/tickets", label: "Support", Icon: IconSupport },
];

// "/portail" ne prend le préfixe que pour lui-même : sinon il resterait actif
// sur toutes les sous-pages, qui commencent toutes par "/portail/".
function isActive(pathname: string, href: string) {
  return href === "/portail"
    ? pathname === "/portail"
    : pathname === href || pathname.startsWith(`${href}/`);
}

function Badge({ count }: { count: number }) {
  return (
    <span
      className="ml-auto inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-emerald px-1.5 text-[12px] font-semibold text-background"
      aria-label={`${count} ticket en attente de votre réponse`}
    >
      {count}
    </span>
  );
}

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
    <>
      {/* Volet de gauche, collé sous le bandeau du site et haut comme l'écran :
          il reste en place quand le contenu défile. */}
      <aside
        className="sticky hidden w-64 shrink-0 flex-col border-r border-border bg-[var(--header-bg)] lg:flex"
        style={{
          top: "var(--header-h)",
          height: "calc(100vh - var(--header-h))",
        }}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-4">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-sky via-brand-teal to-brand-emerald text-[13px] font-semibold text-background"
          >
            {initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-medium leading-tight">
              {name}
            </p>
            <p className="truncate text-[12px] leading-tight text-muted">
              {email}
            </p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <p className="px-3 pb-2 text-[12px] text-muted">Espace client</p>
          {NAV.map(({ href, label, Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[14px] transition-colors ${
                  active
                    ? "bg-surface-2 font-medium text-foreground"
                    : "text-muted hover:bg-surface-2/50 hover:text-foreground"
                }`}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" />
                {label}
                {href === "/portail/tickets" && pendingTicketCount > 0 && (
                  <Badge count={pendingTicketCount} />
                )}
              </Link>
            );
          })}
        </nav>

        <form action={signOut} className="border-t border-border p-3">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[14px] text-muted transition-colors hover:bg-surface-2/50 hover:text-foreground"
          >
            <IconLogout className="h-[18px] w-[18px] shrink-0" />
            Se déconnecter
          </button>
        </form>
      </aside>

      {/* Sous lg : même rangée, en bandeau horizontal sous le header. */}
      <nav className="no-scrollbar flex gap-1 overflow-x-auto border-b border-border bg-[var(--header-bg)] px-4 py-2 lg:hidden">
        {NAV.map(({ href, label, Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-[14px] transition-colors ${
                active
                  ? "bg-surface-2 font-medium text-foreground"
                  : "text-muted"
              }`}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              {label}
              {href === "/portail/tickets" && pendingTicketCount > 0 && (
                <Badge count={pendingTicketCount} />
              )}
            </Link>
          );
        })}

        <form action={signOut} className="shrink-0">
          <button
            type="submit"
            className="flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-[14px] text-muted"
          >
            <IconLogout className="h-[18px] w-[18px] shrink-0" />
            Se déconnecter
          </button>
        </form>
      </nav>
    </>
  );
}
