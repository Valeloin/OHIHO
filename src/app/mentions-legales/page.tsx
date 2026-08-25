import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site ohiho.fr : éditeur, hébergeur, propriété intellectuelle.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

// ATTENTION — trois informations légales restent à compléter par Valentin :
// la forme juridique, le numéro SIRET et l'adresse du siège. Elles sont
// signalées par « À COMPLÉTER » dans le texte : le site ne doit pas être
// rouvert au public tant qu'elles sont là.
export default function MentionsLegales() {
  return (
    <main className="section">
      <div className="shell max-w-3xl">
        <p className="kicker">Informations légales</p>
        <h1 className="h-section mt-5">Mentions légales</h1>

        <div className="mt-10 space-y-10">
          <section>
            <h2 className="h-card">Éditeur du site</h2>
            <div className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink-muted">
              <p>{SITE.name}</p>
              <p>Responsable de la publication : {SITE.person}</p>
              <p>Forme juridique : À COMPLÉTER</p>
              <p>SIRET : À COMPLÉTER</p>
              <p>Siège : À COMPLÉTER</p>
              <p>
                Contact :{" "}
                <a href={`mailto:${SITE.email}`} className="text-ink underline">
                  {SITE.email}
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="h-card">Hébergement</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133,
              Walnut, CA 91789, États-Unis —{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noreferrer"
                className="text-ink underline"
              >
                vercel.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="h-card">Propriété intellectuelle</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              L&apos;ensemble des contenus de ce site — textes, code, mise en
              page, logo — est la propriété d&apos;{SITE.name}, sauf mention
              contraire. Toute reproduction ou réutilisation, totale ou
              partielle, sans autorisation écrite préalable est interdite. Les
              noms et logos des projets présentés en réalisations restent la
              propriété de leurs titulaires respectifs.
            </p>
          </section>

          <section>
            <h2 className="h-card">Données personnelles</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Les informations transmises par le formulaire de contact servent
              uniquement à répondre à votre demande. Le détail du traitement,
              de la durée de conservation et de vos droits figure sur la page{" "}
              <a href="/confidentialite" className="text-ink underline">
                Confidentialité
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="h-card">Cookies</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Ce site ne dépose aucun cookie et n&apos;utilise aucun outil de
              mesure d&apos;audience. Aucune bannière de consentement
              n&apos;est donc nécessaire.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
