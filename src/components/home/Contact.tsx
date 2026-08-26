import Reveal from "@/components/ui/Reveal";
import ContactForm from "./ContactForm";
import { SITE } from "@/lib/site";

// Contact recentré (2026-08-26). L'ancienne version mettait un panneau bleu
// nuit à gauche et le formulaire à droite : deux blocs de poids égal, dont un
// qui ne servait qu'à répéter l'email. Le formulaire est maintenant seul au
// centre, et les coordonnées passent en bas, en une ligne.
export default function Contact() {
  // Sans clé Resend, le formulaire n'aurait nulle part où envoyer : on affiche
  // alors l'email en grand plutôt qu'un formulaire qui échoue. La lecture se
  // fait ici, côté serveur — la clé ne part jamais au navigateur.
  const formulaireActif = Boolean(process.env.RESEND_API_KEY);

  return (
    <section
      id="contact"
      className="section"
      style={{ background: "var(--surface-alt)" }}
    >
      <div className="shell max-w-2xl">
        {/* En-tête volontairement sobre : la relance juste au-dessus
            (AppelFinal) porte déjà le grand titre et l'argument. Deux titres
            de même poids à la suite se neutraliseraient. */}
        <Reveal className="text-center">
          <p className="kicker">Contact</p>
          <h2 className="h-card mt-3 text-xl">Le formulaire</h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-8">
            {formulaireActif ? (
              <ContactForm />
            ) : (
              <div className="card p-7 text-center">
                <h3 className="h-card">Le formulaire arrive</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  En attendant, un email fait très bien l&apos;affaire.
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
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="text-fine mt-8 text-center">
            Ou directement :{" "}
            <a href={`mailto:${SITE.email}`} className="underline">
              {SITE.email}
            </a>{" "}
            ·{" "}
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              LinkedIn
            </a>{" "}
            · {SITE.person}, {SITE.city}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
