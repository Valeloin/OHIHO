"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/lib/supabase/actions";
import { scrollToId } from "@/lib/scroll";

// Ordre aligné sur le déroulé de la page.
const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#expertise", label: "Expertise" },
  { href: "/#a-propos", label: "À propos" },
  { href: "/#portfolio", label: "Réalisations" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
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
        setIsAdmin(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", user.id)
        .single();

      const name = profile?.full_name?.trim().split(" ")[0];
      setFirstName(name || user.email || "Mon compte");
      setIsAdmin(profile?.role === "admin");
    }

    loadProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadProfile();
    });

    return () => subscription.unsubscribe();
  }, [pathname]);

  // Liens d'ancre (/#section) sur l'accueil : défilement fluide maison SANS
  // écrire le hash dans l'URL — la page principale reste « ohiho.fr/ ».
  // Délégué au document pour couvrir aussi les liens du Hero, des sections et
  // du footer sans devoir passer chaque composant en client.
  useEffect(() => {
    if (pathname !== "/") return;

    function onDocumentClick(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest?.("a");
      if (!link || e.defaultPrevented) return;
      const href = link.getAttribute("href") ?? "";
      if (!href.startsWith("/#") && !href.startsWith("#")) return;
      const id = href.replace(/^\/?#/, "");
      if (!document.getElementById(id)) return;
      e.preventDefault();
      scrollToId(id);
      window.history.replaceState(null, "", "/");
    }

    // Phase de capture : il faut passer AVANT le gestionnaire interne de
    // next/link (attaché à la racine React), qui sinon pousse /#section dans
    // l'URL via son routeur. Link ignore le clic si defaultPrevented est posé.
    document.addEventListener("click", onDocumentClick, true);
    return () => document.removeEventListener("click", onDocumentClick, true);
  }, [pathname]);

  // Arrivée sur l'accueil avec un hash (ex. lien /#portfolio depuis une autre
  // page) : on défile jusqu'à la section puis on nettoie l'URL.
  useEffect(() => {
    if (pathname !== "/" || !window.location.hash) return;
    const id = window.location.hash.slice(1);
    // Délai : au chargement initial, le routeur Next réécrit lui-même l'URL
    // (hash compris) pendant son initialisation — on nettoie après lui.
    const timer = window.setTimeout(() => {
      scrollToId(id);
      window.history.replaceState(null, "", "/");
    }, 600);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  // Ferme le menu mobile au clic sur un lien (le défilement est géré par la
  // délégation ci-dessus).
  function handleNavClick() {
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
              onClick={handleNavClick}
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
              {isAdmin && (
                <Link
                  href="/admin"
                  className="rounded-full border border-accent-cyan/60 px-4 py-1.5 text-sm font-medium text-accent-cyan transition-colors hover:bg-accent-cyan/10"
                >
                  Outil dev
                </Link>
              )}
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
                className="btn-accent rounded-full px-5 py-2 text-sm font-semibold transition-transform hover:scale-105"
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
              onClick={handleNavClick}
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
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-accent-cyan hover:underline"
                  >
                    Outil dev
                  </Link>
                )}
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
