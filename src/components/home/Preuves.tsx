import Reveal from "@/components/ui/Reveal";

// Les quatre objections qu'on entend le plus souvent, et la réponse à
// chacune. Formulé comme une promesse tenable, pas comme un argument
// commercial : chaque ligne doit rester vraie si un client la vérifie.
//
// Allégé le 2026-08-26 : c'étaient quatre cartes pleine largeur pour quatre
// phrases. Une simple liste à deux colonnes dit la même chose sans peser
// autant dans la page.
const PROMESSES = [
  {
    titre: "Un interlocuteur, pas un standard",
    texte:
      "Vous écrivez à la personne qui développe votre site. Pas de chef de projet intermédiaire.",
  },
  {
    titre: "Le prix est fixé avant de commencer",
    texte:
      "Devis détaillé, validé avant la première ligne de code. Ce qui n'y figure pas ne vous est pas facturé.",
  },
  {
    titre: "Le site vous appartient",
    texte:
      "Code, domaine, hébergement, contenus : tout est à votre nom. Vous pouvez partir avec.",
  },
  {
    titre: "Pas de gabarit revendu",
    texte:
      "Chaque site est écrit pour son activité. Pas de thème acheté, pas d'extensions qui cassent.",
  },
];

export default function Preuves() {
  return (
    <section
      className="py-16 sm:py-20"
      style={{ background: "var(--surface-alt)" }}
    >
      <div className="shell">
        <Reveal>
          <p className="kicker">Ce sur quoi vous pouvez compter</p>
        </Reveal>

        <ul className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {PROMESSES.map((promesse, index) => (
            <li key={promesse.titre}>
              <Reveal delay={index * 60}>
                <div className="flex gap-3.5">
                  <span
                    className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full"
                    style={{ background: "rgb(var(--brand-emerald))" }}
                  />
                  <div>
                    <h3 className="text-[15px] font-medium">{promesse.titre}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                      {promesse.texte}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
