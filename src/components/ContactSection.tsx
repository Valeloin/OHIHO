import ContactForm from "@/components/ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
              Contact
            </h2>
            <p className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Parlons de votre besoin en formation
            </p>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              Décrivez votre besoin en quelques mots — formation RGPD ou IA —
              et nous revenons vers vous rapidement pour en discuter.
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
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
