import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import AnimatedGlow from "@/components/motion/AnimatedGlow";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border bg-surface"
    >
      <AnimatedGlow variant="subtle" />
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <h2 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
              Votre projet
            </h2>
            <p className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Prêt à lancer votre site ou application ?
            </p>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              Créez votre compte en une minute, puis décrivez votre besoin via
              une demande de devis guidée. Nous revenons vers vous rapidement
              pour en discuter.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald" />
                <a href="mailto:contact@ohiho.fr" className="hover:underline">
                  contact@ohiho.fr
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald" />
                <span className="text-muted">Réponse sous 24h ouvrées</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="card-surface rounded-2xl p-8">
              <h3 className="text-lg font-semibold">Demander un devis</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Depuis votre espace client, choisissez une formule (landing
                page, site vitrine, application, refonte) et recevez une
                proposition adaptée.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/inscription"
                  className="flex-1 rounded-full bg-foreground px-6 py-3 text-center text-sm font-semibold text-background transition-all hover:opacity-90 hover:shadow-[0_0_24px_4px_rgba(56,189,248,0.35)]"
                >
                  Créer un compte
                </Link>
                <Link
                  href="/portail/devis/nouveau"
                  className="flex-1 rounded-full border border-border px-6 py-3 text-center text-sm font-semibold text-foreground transition-colors hover:border-accent-cyan/60 hover:bg-surface"
                >
                  Demander un devis
                </Link>
              </div>

              <p className="mt-5 text-center text-sm text-muted">
                Déjà un compte ?{" "}
                <Link
                  href="/connexion"
                  className="text-accent-cyan hover:underline"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
