import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Confidentialité",
  description:
    "Comment les informations transmises via le formulaire de contact d'ohiho.fr sont traitées et conservées.",
  alternates: { canonical: "/confidentialite" },
  robots: { index: false, follow: true },
};

export default function Confidentialite() {
  return (
    <main className="section">
      <div className="shell max-w-3xl">
        <p className="kicker">Vos données</p>
        <h1 className="h-section mt-5">Confidentialité</h1>
        <p className="lede mt-6">
          Ce site collecte le minimum : uniquement ce que vous écrivez
          vous-même dans le formulaire de contact. Ni cookie, ni traceur, ni
          mesure d&apos;audience.
        </p>

        <div className="mt-10 space-y-10">
          <section>
            <h2 className="h-card">Ce qui est collecté</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Votre nom, votre adresse email, le type de projet choisi et le
              message que vous rédigez. Rien d&apos;autre : aucune donnée
              n&apos;est déduite de votre navigation, aucun profil n&apos;est
              constitué.
            </p>
          </section>

          <section>
            <h2 className="h-card">Pourquoi</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Pour répondre à votre demande, et pour cela seulement. Vos
              informations ne sont ni revendues, ni cédées, ni utilisées pour de
              la prospection commerciale.
            </p>
          </section>

          <section>
            <h2 className="h-card">Qui y a accès</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {SITE.person}, seul. L&apos;acheminement du message est assuré par
              Resend (service d&apos;envoi d&apos;emails), qui agit comme
              sous-traitant technique, et par le fournisseur de la boîte mail de
              destination.
            </p>
          </section>

          <section>
            <h2 className="h-card">Combien de temps</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Les messages sont conservés le temps de l&apos;échange, puis trois
              ans au plus à compter du dernier contact — le délai habituel pour
              une relation commerciale. Passé ce délai, ils sont supprimés.
            </p>
          </section>

          <section>
            <h2 className="h-card">Vos droits</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Vous pouvez demander à consulter, corriger ou supprimer les
              informations vous concernant, à tout moment, en écrivant à{" "}
              <a href={`mailto:${SITE.email}`} className="text-ink underline">
                {SITE.email}
              </a>
              . La réponse intervient sous un mois. En cas de désaccord, vous
              pouvez saisir la CNIL (
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noreferrer"
                className="text-ink underline"
              >
                cnil.fr
              </a>
              ).
            </p>
          </section>

          <section>
            <h2 className="h-card">Cookies</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Aucun. Le site ne dépose rien sur votre appareil et ne charge
              aucune ressource depuis un domaine tiers — polices comprises.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
