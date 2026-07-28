import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import SectionLabel from "@/components/SectionLabel";
import LinkedInQr from "@/components/LinkedInQr";
import type { ContactContent } from "@/lib/content/types";

/** Deux premières lettres du nom, faute de photo déposée. */
function initiales(nom: string) {
  return nom
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((mot) => mot[0]?.toUpperCase() ?? "")
    .join("");
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21h-4V9Z" />
    </svg>
  );
}

export default function ContactSection({ data }: { data: ContactContent }) {
  return (
    // Fond par défaut (et non `bg-surface`) : le halo et les lucioles
    // s'y lisent comme sur le hero — sur le panneau plus clair de
    // `bg-surface`, ils s'effaçaient presque.
    <section
      id="contact"
      className="section-screen relative overflow-hidden border-t border-border"
    >
      <SectionBackdrop />
      <SectionLabel lead={data.title}>{data.kicker}</SectionLabel>

      {/* `flex-1` : le titre étant épinglé en haut (SectionLabel hors du
          conteneur), le conteneur absorbe toute la hauteur restante et la
          grille intérieure s'y étire. */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-10">

        {/* `items-stretch` et non `items-center` : centrées, les deux colonnes
            se plaçaient chacune selon SA hauteur, et la section — qui fait un
            écran entier — se retrouvait avec deux blocs courts flottant au
            milieu d'un grand vide. Étirées, elles occupent la même hauteur et
            la section se remplit. */}
        <div className="grid flex-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <Reveal className="flex flex-col">
            <p className="max-w-2xl leading-relaxed text-muted">
              {data.subtitle}
            </p>

            <div className="mt-8 h-px rule-fade" />

            {/* L'email n'est plus une simple ligne posée sous un filet : c'est
                LA façon de nous joindre, il occupe donc un bloc à part
                entière, du même poids que la carte LinkedIn en face. Le délai
                de réponse vit dedans, à côté de l'adresse, au lieu de traîner
                seul en dessous. */}
            <a
              href={`mailto:${data.email}`}
              className="group mt-8 flex flex-1 flex-col justify-center rounded-2xl border border-border p-8 transition-colors hover:border-accent-cyan/50"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-teal">
                Par email
              </span>
              <span className="mt-4 flex items-center gap-3 text-2xl font-semibold tracking-display transition-colors group-hover:text-accent-cyan sm:text-3xl">
                <span className="h-2 w-2 shrink-0 rounded-full bg-brand-emerald shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                {data.email}
              </span>
              <span className="mt-4 text-sm text-muted">
                {data.responseNote}
              </span>
            </a>
          </Reveal>

          {data.linkedinUrl && (
            <Reveal delay={0.15} className="flex">
              <div className="card-surface flex w-full flex-col items-center justify-center p-8 text-center">
                {/* Qui est en face. La carte ne portait qu'un QR code : on
                    savait où scanner, pas à qui on écrivait. Photo (ou
                    initiales tant qu'aucune n'est déposée), nom, accroche,
                    ville — tout vient du contenu éditable. */}
                {data.personName && (
                  <>
                    {data.personPhoto ? (
                      <Image
                        src={data.personPhoto}
                        alt={data.personName}
                        width={96}
                        height={96}
                        className="h-24 w-24 rounded-full object-cover ring-1 ring-border"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-teal/10 text-2xl font-semibold tracking-display text-brand-teal ring-1 ring-brand-teal/20"
                      >
                        {initiales(data.personName)}
                      </span>
                    )}

                    <p className="mt-5 text-xl font-semibold tracking-display">
                      {data.personName}
                    </p>
                    {data.personRole && (
                      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
                        {data.personRole}
                      </p>
                    )}
                    {data.personLocation && (
                      <p className="mt-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                        {data.personLocation}
                      </p>
                    )}

                    <div className="mt-7 h-px w-full rule-fade" />
                  </>
                )}

                <LinkedInQr url={data.linkedinUrl} />

                <p className="mt-6 text-sm text-muted">
                  Scannez pour ouvrir mon profil LinkedIn
                </p>

                <a
                  href={data.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline mt-5 inline-flex items-center gap-2.5 px-6 py-2.5 text-sm font-semibold"
                >
                  <IconLinkedIn className="h-4 w-4" />
                  Voir le profil LinkedIn
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
