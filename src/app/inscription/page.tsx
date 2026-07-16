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
    <main className="relative overflow-hidden bg-grid">
      <AnimatedGlow variant="subtle" />
      <div className="relative mx-auto max-w-5xl px-6 py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* Panneau de bienvenue */}
          <div className="card-dark rounded-3xl p-8 sm:p-9 lg:sticky lg:top-24">
            <p className="text-sm font-mono font-medium uppercase tracking-wider text-accent-cyan">
              Espace client
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight">
              Créer votre compte
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Une minute suffit — seuls votre nom, votre email et un mot de
              passe sont nécessaires.
            </p>

            <ul className="mt-8 space-y-5">
              {BENEFITS.map((b) => (
                <li key={b.title} className="flex gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-cyan/15">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3 w-3 text-accent-cyan"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{b.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">
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
