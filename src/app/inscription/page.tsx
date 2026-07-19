import type { Metadata } from "next";
import SignupForm from "@/components/auth/SignupForm";
import AnimatedGlow from "@/components/motion/AnimatedGlow";

export const metadata: Metadata = {
  title: "Créer un compte — OHIHO",
  description:
    "Créez votre compte OHIHO pour suivre vos projets web et demander un devis.",
};

const BENEFITS = [
  {
    title: "Devis 100 % en ligne",
    text: "Décrivez votre projet en 3 minutes, nous revenons vers vous sous 24 h ouvrées.",
  },
  {
    title: "Suivi de vos demandes",
    text: "Retrouvez toutes vos demandes et leur avancement dans votre espace client.",
  },
  {
    title: "Un interlocuteur unique",
    text: "Vous échangez directement avec nous, du premier échange à la mise en ligne.",
  },
];

export default function InscriptionPage() {
  return (
    <main className="relative overflow-hidden">
      <AnimatedGlow variant="subtle" />
      <div className="relative mx-auto max-w-5xl px-6 py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* Panneau de bienvenue */}
          <div className="card-dark p-8 sm:p-9 lg:sticky lg:top-24">
            <p className="kicker">Espace client</p>
            <h1 className="mt-5 text-3xl font-semibold tracking-display">
              Créer votre compte
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Une minute suffit — seuls votre nom, votre email et un mot de
              passe sont nécessaires.
            </p>

            {/* Points ronds verts lumineux (comme les libellés de la banderole)
                et filets d'1px entre les entrées. */}
            <ul className="mt-8 divide-y divide-border border-t border-border">
              {BENEFITS.map((b) => (
                <li key={b.title} className="flex gap-4 py-5">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-emerald shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold">{b.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {b.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Formulaire */}
          <SignupForm />
        </div>
      </div>
    </main>
  );
}
