import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo-mark.png"
                alt="OHIHO"
                width={256}
                height={256}
                className="h-10 w-10 transition-transform duration-300 ease-out group-hover:scale-110"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              OHIHO accompagne entreprises et particuliers au quotidien :
              support informatique à distance et formations en ligne, sans
              jargon.
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
                <Link href="/#expertise" className="hover:text-foreground">
                  Expertise
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-foreground">
                  Portfolio
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
              <li>Support & formation en ligne</li>
              <li>Réponse sous 24h ouvrées</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted md:flex-row">
          <p>© {year} OHIHO. Tous droits réservés.</p>
          <p className="font-mono">Support informatique & formation en ligne</p>
        </div>
      </div>
    </footer>
  );
}
