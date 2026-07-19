import Link from "next/link";
import Image from "next/image";
import type { FooterContent } from "@/lib/content/types";

export default function Footer({ data }: { data: FooterContent }) {
  const year = new Date().getFullYear();

  // Le pied de page se fond dans la nuit bleu-teal : même fond que la page,
  // séparé du contenu par un simple filet 1px en haut.
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo-mark.svg"
                alt="OHIHO"
                width={256}
                height={256}
                className="h-10 w-10"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {data.tagline}
            </p>
          </div>

          {/* Titres de colonnes : mono capitales espacées, en gris bleuté. */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-foreground/80">
              <li>
                <Link
                  href="/#services"
                  className="transition-colors hover:text-accent-cyan"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#expertise"
                  className="transition-colors hover:text-accent-cyan"
                >
                  Expertise
                </Link>
              </li>
              <li>
                <Link
                  href="/#portfolio"
                  className="transition-colors hover:text-accent-cyan"
                >
                  Réalisations
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="transition-colors hover:text-accent-cyan"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-foreground/80">
              <li>
                <a
                  href="mailto:contact@ohiho.fr"
                  className="transition-colors hover:text-accent-cyan"
                >
                  contact@ohiho.fr
                </a>
              </li>
              <li className="text-muted">Développement web sur mesure</li>
              <li className="text-muted">Réponse sous 24h ouvrées</li>
            </ul>
          </div>
        </div>

        {/* Barre du bas : filet de séparation, mentions en mono gris bleuté. */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 font-mono text-xs text-muted md:flex-row">
          <p>© {year} OHIHO. Tous droits réservés.</p>
          <p>
            Réalisé par <span className="text-accent-cyan">OHIHO</span>
          </p>
          <p>{data.bottomNote}</p>
        </div>
      </div>
    </footer>
  );
}
