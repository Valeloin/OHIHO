import Link from "next/link";
import { signOut } from "@/lib/supabase/actions";

const NAV = [
  { href: "/admin", label: "Contenu du site" },
  { href: "/admin/clients", label: "Clients" },
];

export default function AdminHeader({ active }: { active: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[var(--header-bg)] backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-6">
          <p className="text-sm font-semibold text-[var(--header-fg)]">
            OHIHO · Espace admin
          </p>
          <nav className="flex items-center gap-4 text-sm">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active === item.href
                    ? "text-[var(--header-fg)]"
                    : "text-[var(--header-muted)] transition-colors hover:text-[var(--header-fg)]"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/"
            target="_blank"
            className="text-[var(--header-muted)] transition-colors hover:text-[var(--header-fg)]"
          >
            Voir le site ↗
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="text-[var(--header-muted)] transition-colors hover:text-[var(--header-fg)]"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
