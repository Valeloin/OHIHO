import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import ContactForm from "./ContactForm";
import { SITE } from "@/lib/site";

export default function Contact() {
  // Sans clé Resend, le formulaire n'aurait nulle part où envoyer : on
  // affiche alors l'email en grand plutôt qu'un formulaire qui échoue. La
  // lecture se fait ici, côté serveur — la clé ne part jamais au navigateur.
  const formulaireActif = Boolean(process.env.RESEND_API_KEY);

  return (
    <section id="contact" className="section">
      <div className="shell">
        <SectionHead
          kicker="Contact"
          title={
            <>
              Parlons de votre projet,{" "}
              <span className="gradient-text">sans engagement.</span>
            </>
          }
          lede="Décrivez votre besoin en quelques lignes. Vous aurez une réponse d'une personne, pas d'un robot, sous 24 h ouvrées."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <div className="card-deep h-full p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-on-deep-muted">
                Écrire directement
              </p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-3 block break-words text-lg font-medium underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                {SITE.email}
              </a>

              <dl className="mt-8 space-y-5 text-sm">
                <div>
                  <dt className="text-on-deep-muted">Délai de réponse</dt>
                  <dd className="mt-1">{SITE.responseNote}</dd>
                </div>
                <div>
                  <dt className="text-on-deep-muted">Interlocuteur</dt>
                  <dd className="mt-1">
                    {SITE.person}, qui développe aussi votre site
                  </dd>
                </div>
                <div>
                  <dt className="text-on-deep-muted">Où</dt>
                  <dd className="mt-1">
                    {SITE.city}, {SITE.region} — et à distance partout en France
                  </dd>
                </div>
              </dl>

              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn-on-deep mt-8"
              >
                Voir le profil LinkedIn <span aria-hidden>↗</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            {formulaireActif ? (
              <ContactForm />
            ) : (
              <div className="card h-full p-7">
                <h3 className="h-card">Le formulaire arrive</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  En attendant, un email fait très bien l&apos;affaire —
                  racontez-nous votre activité et ce que le site doit permettre.
                </p>
                <a
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent(
                    "Demande de devis"
                  )}`}
                  className="btn btn-primary mt-6"
                >
                  Écrire à {SITE.email}
                </a>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
