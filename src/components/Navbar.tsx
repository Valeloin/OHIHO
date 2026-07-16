"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/lib/supabase/actions";
import { scrollToId } from "@/lib/scroll";

const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#expertise", label: "Expertise" },
  { href: "/#portfolio", label: "Réalisations" },
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

  // Liens d'ancre (/#section) : défilement fluide maison quand on est déjà sur
  // l'accueil (le smooth natif cale à cause des animations de la page).
  function handleNavClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
    if (href.startsWith("/#") && pathname === "/") {
      const id = href.slice(2);
      if (document.getElementById(id)) {
        e.preventDefault();
        scrollToId(id);
        window.history.replaceState(null, "", href.slice(1));
      }
    }
    setOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[var(--header-border)] bg-[var(--header-bg)] backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-md shadow-black/5" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo-mark.png"
            alt="OHIHO"
            width={256}
            height={256}
            priority
            className="h-10 w-10 transition-transform duration-300 ease-out group-hover:scale-110"
          />
          <span className="text-xl font-semibold tracking-tight">
            <span className="text-[var(--header-fg)]">OH</span>
            <span className="text-accent-cyan">I</span>
            <span className="text-[var(--header-fg)]">HO</span>
          </span>
        </Link>

        <div className="hidden items-center gap-5 md:flex lg:gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm text-[var(--header-muted)] transition-colors hover:text-[var(--header-fg)]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex lg:gap-4">
          {firstName ? (
            <>
              <Link
                href="/portail"
                className="text-sm text-[var(--header-muted)] transition-colors hover:text-[var(--header-fg)]"
              >
                Bonjour,{" "}
                <span className="font-semibold text-accent-cyan">
                  {firstName}
                </span>
              </Link>
              <Link
                href="/portail/profil"
                className="text-sm text-[var(--header-muted)] transition-colors hover:text-[var(--header-fg)]"
              >
                Mon profil
              </Link>
              <form action={signOut}>
                <button
                  type="submit"
                  className="text-sm text-[var(--header-muted)] transition-colors hover:text-[var(--header-fg)]"
                >
                  Déconnexion
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/connexion"
                className="rounded-full border border-accent-cyan/60 px-5 py-2 text-sm font-medium text-accent-cyan transition-colors hover:bg-accent-cyan/10"
              >
                Connexion
              </Link>
              <Link
                href="/inscription"
                className="rounded-full bg-accent-cyan px-5 py-2 text-sm font-medium text-white transition-transform hover:scale-105"
              >
                S&apos;inscrire
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            aria-label="Ouvrir le menu"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--header-border)]"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-4 bg-[var(--header-fg)] transition-transform ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[5px] h-[1.5px] w-4 bg-[var(--header-fg)] transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[10px] h-[1.5px] w-4 bg-[var(--header-fg)] transition-transform ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Sections directement accessibles dans le header — mobile & tablette (sous md).
          Défilement horizontal si l'écran est trop étroit pour tout afficher. */}
      <div className="border-t border-[var(--header-border)] md:hidden">
        <div className="flex items-center gap-6 overflow-x-auto px-6 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="shrink-0 whitespace-nowrap text-sm font-medium text-[var(--header-muted)] transition-colors hover:text-[var(--header-fg)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {firstName ? (
              <>
                <Link
                  href="/portail"
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted hover:text-foreground"
                >
                  Bonjour,{" "}
                  <span className="font-semibold text-accent-cyan">
                    {firstName}
                  </span>
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
              <>
                <Link
                  href="/connexion"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-accent-cyan/60 px-5 py-2 text-center text-sm font-medium text-accent-cyan transition-colors hover:bg-accent-cyan/10"
                >
                  Connexion
                </Link>
                <Link
                  href="/inscription"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-full bg-foreground px-5 py-2 text-center text-sm font-medium text-background"
                >
                  S&apos;inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
