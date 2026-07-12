"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/lib/supabase/actions";

const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#formation", label: "Formation" },
  { href: "/blog", label: "Ressources" },
  { href: "/#a-propos", label: "À propos" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();

    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setFirstName(null);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      const name = profile?.full_name?.trim().split(" ")[0];
      setFirstName(name || user.email || "Mon compte");
    }

    loadProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadProfile();
    });

    return () => subscription.unsubscribe();
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center group">
          <Image
            src="/logo-mark.svg"
            alt="OHIHO"
            width={120}
            height={36}
            priority
            className="h-9 w-auto rounded-md transition-transform duration-300 ease-out group-hover:scale-110"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-5 md:flex">
          {firstName ? (
            <>
              <Link
                href="/portail"
                className="text-sm text-foreground transition-colors hover:text-accent-cyan"
              >
                Bonjour, {firstName}
              </Link>
              <Link
                href="/portail/profil"
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                Mon profil
              </Link>
              <form action={signOut}>
                <button
                  type="submit"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  Déconnexion
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/connexion"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              Connexion
            </Link>
          )}
          <Link
            href="/#contact"
            className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-transform hover:scale-105"
          >
            Demander un devis
          </Link>
        </div>

        <button
          aria-label="Ouvrir le menu"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-4 bg-foreground transition-transform ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[5px] h-[1.5px] w-4 bg-foreground transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[10px] h-[1.5px] w-4 bg-foreground transition-transform ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            {firstName ? (
              <>
                <Link
                  href="/portail"
                  onClick={() => setOpen(false)}
                  className="text-sm text-foreground hover:text-accent-cyan"
                >
                  Bonjour, {firstName}
                </Link>
                <Link
                  href="/portail/profil"
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted hover:text-foreground"
                >
                  Mon profil
                </Link>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="text-sm text-muted hover:text-foreground"
                  >
                    Déconnexion
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/connexion"
                onClick={() => setOpen(false)}
                className="text-sm text-muted hover:text-foreground"
              >
                Connexion
              </Link>
            )}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-foreground px-5 py-2 text-center text-sm font-medium text-background"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
