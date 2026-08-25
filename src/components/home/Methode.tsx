import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";

// Les quatre étapes. Les textes reprennent ceux du site précédent, expurgés
// des renvois à l'espace client : le portail a été supprimé avec la refonte
// du 2026-08-25, le suivi se fait par email.
const ETAPES = [
  {
    titre: "Échange initial",
    delai: "1 appel",
    texte:
      "On parle de votre activité, de vos objectifs, de votre budget et de vos délais. Vous repartez avec un avis honnête, même si la réponse est « vous n'avez pas besoin de ça ».",
  },
  {
    titre: "Maquette et devis",
    delai: "3 à 5 jours",
    texte:
      "Avant la moindre ligne de code, vous voyez à quoi ressemblera votre page d'accueil et ce qu'elle coûtera. Devis détaillé poste par poste, vos retours intégrés jusqu'à validation.",
  },
  {
    titre: "Développement",
    delai: "1 à 4 semaines",
    texte:
      "Votre site prend forme, avec une version consultable en ligne dès les premiers jours. Points d'étape réguliers, retours pris en compte au fil de l'eau.",
  },
  {
    titre: "Mise en ligne et suivi",
    delai: "En continu",
    texte:
      "Mise en ligne sur votre nom de domaine, en HTTPS, après vérification du mobile, de la vitesse et du référencement. Ensuite, les évolutions se demandent par email.",
  },
];

export default function Methode() {
  return (
    <section
      id="methode"
      className="section"
      style={{ background: "var(--deep)", color: "var(--on-deep)" }}
    >
      <div className="shell">
        <SectionHead
          onDeep
          kicker="Méthode"
          title="Comment on travaille ensemble"
          lede="Quatre étapes, dans cet ordre, à chaque projet. Rien ne démarre tant que le devis et la maquette ne sont pas validés."
        />

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPES.map((etape, index) => (
            <li key={etape.titre}>
              <Reveal delay={index * 80} className="h-full">
                <div className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.04] p-6">
                  <span
                    className="block h-[3px] w-7 rounded-full"
                    style={{ background: "var(--gradient)" }}
                  />
                  <span className="mt-5 block font-mono text-[11px] tracking-[0.16em] text-on-deep-muted">
                    0{index + 1}
                  </span>
                  <h3 className="h-card mt-2">{etape.titre}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-on-deep-muted">
                    {etape.texte}
                  </p>
                  <p className="mt-5 border-t border-white/10 pt-4 text-[13px] text-on-deep-muted">
                    {etape.delai}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
