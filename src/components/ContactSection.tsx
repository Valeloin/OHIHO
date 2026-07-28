import Reveal from "@/components/motion/Reveal";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import SectionLabel from "@/components/SectionLabel";
import LinkedInQr from "@/components/LinkedInQr";
import type { ContactContent } from "@/lib/content/types";

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
      {/* `self-stretch` + `flex-col` : `.section-screen` centre son unique
          enfant (align-items: center), si bien que le contenu — plus court
          ici que dans les autres sections — flottait au milieu de 300 px de
          vide. En s'étirant, le conteneur récupère toute la hauteur, et la
          grille (`flex-1` plus bas) l'absorbe. */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-col self-stretch px-6 py-16">
        <SectionLabel>{data.kicker}</SectionLabel>

        {/* `items-stretch` et non `items-center` : centrées, les deux colonnes
            se plaçaient chacune selon SA hauteur, et la section — qui fait un
            écran entier — se retrouvait avec deux blocs courts flottant au
            milieu d'un grand vide. Étirées, elles occupent la même hauteur et
            la section se remplit. */}
        <div className="grid flex-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <Reveal className="flex flex-col">
            <p className="section-lead max-w-4xl">{data.title}</p>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted">
              {data.subtitle}
            </p>

            <div className="mt-10 h-px rule-fade" />

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
