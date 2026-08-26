import Reveal from "@/components/ui/Reveal";

// Les anciennes « preuves » deviennent une FAQ (2026-08-26).
//
// Elles disaient les mêmes choses, mais sous forme d'affirmations que
// personne ne lit. Posées comme des questions — celles qu'un client se pose
// vraiment avant de signer — elles se lisent. C'est aussi la structure qu'a
// mycalories, dont on reprend la direction artistique.
//
// Rédigé avec <details> natif : le navigateur gère l'ouverture, le clavier et
// les lecteurs d'écran sans une ligne de JavaScript.
const QUESTIONS = [
  {
    q: "Qui développe réellement mon site ?",
    r: "La personne à qui vous écrivez. Pas de chef de projet intermédiaire, pas de sous-traitance : vous parlez directement à celui qui code.",
  },
  {
    q: "Le prix peut-il bouger en cours de route ?",
    r: "Non. Le devis est détaillé et validé avant la première ligne de code. Ce qui n'y figure pas ne vous est pas facturé — et si le projet change en route, on refait un devis avant de continuer.",
  },
  {
    q: "À qui appartient le site une fois livré ?",
    r: "À vous : le code, le nom de domaine, l'hébergement et les contenus sont à votre nom. Vous pouvez partir avec, sans rien racheter ni demander d'autorisation.",
  },
  {
    q: "Est-ce un gabarit acheté et rempli ?",
    r: "Non. Chaque site est écrit pour l'activité qu'il sert. Pas de thème acheté, pas d'empilement d'extensions qui casse à la première mise à jour.",
  },
  {
    q: "Combien de temps avant d'être en ligne ?",
    r: "D'une à quatre semaines selon la formule, à compter de la validation du devis et de la maquette. Le délai est annoncé dans le devis, pas découvert en route.",
  },
  {
    q: "Et après la mise en ligne ?",
    r: "Les corrections et évolutions se demandent par email, et sont suivies jusqu'à leur résolution. Vous gardez le même interlocuteur.",
  },
];

export default function Faq() {
  return (
    <section className="section">
      <div className="shell max-w-3xl">
        <Reveal className="text-center">
          <p className="kicker">Questions fréquentes</p>
          <h2 className="h-section mt-4">Ce que vous vous demandez</h2>
        </Reveal>

        <div className="mt-12">
          {QUESTIONS.map((item, index) => (
            <Reveal key={item.q} delay={index * 50}>
              <details
                className="group border-b py-5"
                style={{ borderColor: "var(--line)" }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[16px] font-semibold marker:hidden">
                  {item.q}
                  <span
                    className="shrink-0 text-xl transition-transform duration-200 group-open:rotate-45"
                    style={{ color: "var(--accent-text)" }}
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {item.r}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
