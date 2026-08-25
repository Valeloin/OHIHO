import Link from "next/link";
import Wordmark from "@/components/ui/Wordmark";
import { OFFRES, offreHref } from "@/lib/offres";
import { SITE } from "@/lib/site";

export default function Footer() {
  const annee = new Date().getFullYear();

  return (
    <footer className="border-t" style={{ borderColor: "var(--line)" }}>
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Wordmark size={26} />
          <p className="lede mt-4 max-w-sm text-[15px]">{SITE.tagline}</p>
          <p className="text-fine mt-4">
            {SITE.city}, {SITE.region}
          </p>
        </div>

        <nav aria-label="Offres">
          <p className="text-[13px] font-medium">Offres</p>
          <ul className="mt-4 space-y-2.5">
            {OFFRES.map((offre) => (
              <li key={offre.slug}>
                <Link
                  href={offreHref(offre.slug)}
                  className="text-sm text-ink-muted hover:text-ink"
                >
                  {offre.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Contact et informations">
          <p className="text-[13px] font-medium">Contact</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="text-sm text-ink-muted hover:text-ink"
              >
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-ink-muted hover:text-ink"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <Link
                href="/mentions-legales"
                className="text-sm text-ink-muted hover:text-ink"
              >
                Mentions légales
              </Link>
            </li>
            <li>
              <Link
                href="/confidentialite"
                className="text-sm text-ink-muted hover:text-ink"
              >
                Confidentialité
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t" style={{ borderColor: "var(--line)" }}>
        <div className="shell flex flex-wrap items-center justify-between gap-3 py-5">
          <p className="text-fine">
            © {annee} {SITE.name} — Création de sites web et applications
          </p>
          <p className="text-fine">Conçu et développé à {SITE.city}</p>
        </div>
      </div>
    </footer>
  );
}
