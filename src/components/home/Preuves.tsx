import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";

// Les quatre objections qu'on entend le plus souvent, et la réponse à
// chacune. Formulé comme une promesse tenable, pas comme un argument
// commercial : chaque ligne doit rester vraie si un client la vérifie.
const PROMESSES = [
  {
    titre: "Un interlocuteur, pas un standard",
    texte:
      "Vous écrivez à la personne qui développe votre site. Pas de chef de projet intermédiaire, pas de ticket qui se perd.",
  },
  {
    titre: "Le prix est fixé avant de commencer",
    texte:
      "Devis détaillé poste par poste, validé avant la première ligne de code. Ce qui n'y figure pas ne vous est pas facturé.",
  },
  {
    titre: "Le site vous appartient",
    texte:
      "Code, nom de domaine, hébergement, contenus : tout est à votre nom. Vous pouvez partir avec, sans rien avoir à racheter.",
  },
  {
    titre: "Pas de gabarit revendu",
    texte:
      "Chaque site est écrit pour son activité. Pas de thème acheté, pas d'empilement d'extensions qui casse à la première mise à jour.",
  },
];

export default function Preuves() {
  return (
    <section className="section" style={{ background: "var(--surface-alt)" }}>
      <div className="shell">
        <SectionHead
          kicker="Pourquoi OHIHO"
          title="Ce sur quoi vous pouvez compter"
          lede="Quatre engagements simples, vérifiables, qui valent pour tous les projets."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {PROMESSES.map((promesse, index) => (
            <li key={promesse.titre}>
              <Reveal delay={index * 70} className="h-full">
                <div className="card card-rule h-full p-7">
                  <h3 className="h-card">{promesse.titre}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {promesse.texte}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
