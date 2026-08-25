"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Wordmark from "@/components/ui/Wordmark";

// Les liens pointent vers des ancres de l'accueil en chemin ABSOLU : depuis
// une page d'offre, « /#offres » ramène à l'accueil au bon endroit, là où un
// « #offres » nu ne ferait rien.
const LINKS = [
  { href: "/#offres", label: "Offres" },
  { href: "/#methode", label: "Méthode" },
  { href: "/#realisations", label: "Réalisations" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Le tiroir doit se refermer quand on change de page, sinon il reste
  // ouvert par-dessus la nouvelle page.
  useEffect(() => setOpen(false), [pathname]);

  // Tant que le tiroir est ouvert, la page derrière ne défile plus.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        borderColor: "var(--line)",
        background: "var(--page-blur)",
      }}
    >
      <div
        className="shell flex items-center justify-between"
        style={{ height: "var(--header-h)" }}
      >
        <Link href="/" aria-label="OHIHO, accueil">
          <Wordmark size={26} />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="link-brand">
              {link.label}
            </Link>
          ))}
          <Link href="/#contact" className="btn btn-ink px-5 py-2.5">
            Demander un devis
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="rounded-full border p-2.5 md:hidden"
          style={{ borderColor: "var(--line)" }}
        >
          {/* Deux barres qui se croisent : pas d'icône importée pour ça. */}
          <span className="relative block h-4 w-5">
            <span
              className="absolute left-0 block h-[2px] w-5 bg-ink transition-transform duration-200"
              style={{
                top: open ? "7px" : "3px",
                transform: open ? "rotate(45deg)" : "none",
              }}
            />
            <span
              className="absolute left-0 block h-[2px] w-5 bg-ink transition-transform duration-200"
              style={{
                top: open ? "7px" : "11px",
                transform: open ? "rotate(-45deg)" : "none",
              }}
            />
          </span>
        </button>
      </div>

      {open ? (
        <div
          id="menu-mobile"
          className="border-t bg-page md:hidden"
          style={{ borderColor: "var(--line)" }}
        >
          <nav className="shell flex flex-col gap-1 py-4">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-2 py-3 text-base"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/#contact" className="btn btn-ink mt-3 w-full">
              Demander un devis
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
