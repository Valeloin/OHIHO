"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/lib/supabase/actions";
import { scrollToId } from "@/lib/scroll";

// Ordre aligné sur le déroulé de la page : les huit sections y sont, dans
// l'ordre où le visiteur les rencontre en défilant. Le bandeau n'en listait
// que quatre, si bien que la Méthode, le Suivi, BugTrack et le Contact
// n'étaient atteignables qu'en faisant défiler à l'aveugle.
const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#methode", label: "Méthode" },
  { href: "/#expertise", label: "Expertise" },
  { href: "/#a-propos", label: "À propos" },
  { href: "/#suivi", label: "Suivi" },
  { href: "/#bugtrack", label: "BugTrack" },
  { href: "/#portfolio", label: "Réalisations" },
  { href: "/#contact", label: "Contact" },
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

  // L'en-tête partage le fond de la page : ce n'est plus une barre posée dessus
  // mais un bandeau, tenu par un simple filet 1px en bas. Au scroll on passe le
  // fond en semi-transparent + flou pour rester lisible au-dessus du contenu,
  // sans jamais poser d'ombre.
  return (
    <header
      className={`sticky top-0 z-50 border-b border-[var(--header-border)] transition-colors duration-300 ${
        scrolled
          ? "bg-[color-mix(in_srgb,var(--header-bg)_82%,transparent)] backdrop-blur-md"
          : "bg-[var(--header-bg)]"
      }`}
    >
      {/* Hauteur FIXE plutôt qu'un rembourrage vertical : le bandeau mesure
          ainsi 77 px partout (76 + le filet du bas), quel que soit l'élément
          le plus haut de la rangée — le bouton de menu à 44 px sur mobile,
          les pilules de compte à 44 px sur desktop, l'emblème à 40 px. Avec
          `py-4`, chaque changement de hauteur d'un bouton décalait le
          bandeau et désaccordait `--header-h`, dont dépend le calage de la
          barre d'onglets de /admin. */}
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            /* SVG et non PNG : le PNG date de l'anneau argenté, le SVG porte
               l'anneau au dégradé de marque de la banderole (et reste net à
               toutes les tailles). */
            src="/logo-mark.svg"
            alt="OHIHO"
            width={256}
            height={256}
            priority
            className="h-10 w-10"
          />
          {/* Wordmark entièrement blanc. Le « I » était en teal (repris de la
              banderole) ; l'emblème à gauche porte déjà le trio de marque,
              c'est lui qui apporte la couleur. */}
          <span className="text-xl font-semibold tracking-display text-[var(--header-fg)]">
            OHIHO
          </span>
        </Link>

        {/* Libellés de nav : mono, capitales espacées. L'état actif/survolé est
            marqué par un filet au DÉGRADÉ DE MARQUE sous le lien (bleu ciel →
            teal → émeraude), pas par une pastille. */}
        {/* Gouttière resserrée à 16 px (elle était à 24, puis 32 dès `lg`) :
            le bandeau porte maintenant huit liens au lieu de quatre, et une
            fois connecté le bloc de compte occupe près de 490 px. À l'ancien
            écartement l'ensemble réclamait 1386 px pour 1232 disponibles —
            la largeur utile est plafonnée par `max-w-7xl`, elle ne grandit
            donc pas avec l'écran. */}
        <div className="hidden items-center gap-4 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              /* `min-h-[44px]` : ces liens apparaissent dès `md`, donc sur
                 les tablettes, qui sont tactiles. Avec `py-1` ils ne
                 faisaient que 24 px de haut. Le filet de survol est calé sur
                 `bottom-3` pour rester collé au texte malgré la boîte
                 devenue plus haute. */
              className="group relative flex min-h-[44px] items-center nav-link"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="rule-brand absolute bottom-3 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex lg:gap-5">
          {firstName ? (
            <>
              <Link
                href="/portail"
                className="flex min-h-[44px] items-center nav-link"
              >
                Bonjour,{" "}
                <span className="text-accent-cyan">{firstName}</span>
              </Link>
              {/* « Mon profil » ne figure plus dans le bandeau du desktop : il
                  faisait doublon avec l'onglet du même nom déjà présent dans
                  le portail, où le salut ci-dessus mène. C'est la centaine de
                  pixels qui manquait pour loger les huit sections. Le lien
                  reste dans le tiroir mobile, où la place ne manque pas. */}
              {isAdmin && (
                <Link
                  href="/admin"
                  className="btn-outline px-5 py-2 text-sm !text-accent-cyan"
                >
                  Outil dev
                </Link>
              )}
              <form action={signOut}>
                <button
                  type="submit"
                  className="flex min-h-[44px] items-center nav-link"
                >
                  Déconnexion
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/connexion" className="btn-outline px-5 py-2 text-sm">
                Connexion
              </Link>
              <Link href="/inscription" className="btn-accent px-5 py-2 text-sm">
                S&apos;inscrire
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            /* 44 px et non 36 : c'est la cible tactile minimale recommandée,
               et c'est le seul bouton du bandeau sur mobile. */
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--header-border)] transition-colors hover:border-accent-cyan/60"
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

      {/* Tiroir mobile. Il porte MAINTENANT les liens de section en plus des
          liens de compte. Auparavant les sections vivaient dans une seconde
          rangée à défilement horizontal, collée sous le bandeau :
          « Réalisations » en dépassait de 50 px sur un écran de 375, on ne
          pouvait donc pas la lire sans faire glisser une bande qui ne
          s'annonçait pas comme glissante. Cette rangée portait aussi le
          header à 114 px de haut sur mobile, contre 73 ailleurs.
          Chaque entrée fait au moins 48 px de haut et toute la largeur : la
          cible tactile recommandée est de 44 px, les anciens liens en
          faisaient 16. */}
      {open && (
        <div className="border-t border-[var(--header-border)] bg-background md:hidden">
          <div className="mx-auto max-w-7xl px-6 pb-4 pt-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="flex min-h-[48px] items-center border-b border-border/60 nav-link"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-4 flex flex-col gap-2">
            {firstName ? (
              <>
                <Link
                  href="/portail"
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] items-center nav-link"
                >
                  Bonjour,{" "}
                  <span className="text-accent-cyan">{firstName}</span>
                </Link>
                <Link
                  href="/portail/profil"
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] items-center nav-link"
                >
                  Mon profil
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="flex min-h-[48px] items-center nav-link !text-accent-cyan"
                  >
                    Outil dev
                  </Link>
                )}
                <form action={signOut}>
                  <button
                    type="submit"
                    className="flex min-h-[48px] items-center nav-link"
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
                  className="btn-outline px-5 py-3.5 text-center text-sm"
                >
                  Connexion
                </Link>
                <Link
                  href="/inscription"
                  onClick={() => setOpen(false)}
                  className="btn-accent px-5 py-3.5 text-center text-sm"
                >
                  S&apos;inscrire
                </Link>
              </>
            )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
