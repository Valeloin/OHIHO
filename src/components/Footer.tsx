import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-mark.svg" alt="OHIHO" className="h-9 w-auto rounded-md" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              OHIHO relie l&apos;humain et la machine : support informatique et
              formation aux nouvelles technologies pour accompagner durablement
              les entreprises dans leur transformation numérique.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <Link href="/#services" className="hover:text-foreground">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#formation" className="hover:text-foreground">
                  Formation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground">
                  Ressources
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <a
                  href="mailto:contact@ohiho.fr"
                  className="hover:text-foreground"
                >
                  contact@ohiho.fr
                </a>
              </li>
              <li>Support &amp; formation entreprises</li>
              <li>Réponse sous 24h ouvrées</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted md:flex-row">
          <p>© {year} OHIHO. Tous droits réservés.</p>
          <p className="font-mono">Le lien entre l&apos;humain et la machine</p>
        </div>
      </div>
    </footer>
  );
}
