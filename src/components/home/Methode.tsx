import Reveal from "@/components/ui/Reveal";

// FRISE et non plus quatre cartes (2026-08-26) : une méthode est une suite
// d'étapes, la mise en page doit le montrer. Un trait horizontal relie les
// quatre points sur grand écran ; il disparaît quand la grille se replie.
//
// Les textes reprennent ceux du site précédent, expurgés des renvois à
// l'espace client : le portail a été supprimé, le suivi se fait par email.
const ETAPES = [
  {
    titre: "Échange",
    delai: "1 appel",
    texte:
      "On regarde ensemble si le projet tient debout. Avis honnête, sans engagement.",
  },
  {
    titre: "Maquette et devis",
    delai: "3 à 5 jours",
    texte:
      "Vous voyez votre page d'accueil et son prix avant la première ligne de code.",
  },
  {
    titre: "Développement",
    delai: "1 à 4 semaines",
    texte:
      "Une version en ligne dès les premiers jours, et des points d'étape réguliers.",
  },
  {
    titre: "Mise en ligne",
    delai: "puis suivi",
    texte:
      "Sur votre domaine, en HTTPS. Ensuite, les évolutions se demandent par email.",
  },
];

export default function Methode() {
  return (
    <section
      id="methode"
      className="section"
      style={{ background: "var(--surface-alt)" }}
    >
      <div className="shell">
        <Reveal className="text-center">
          <p className="kicker">Méthode</p>
          <h2 className="h-section mt-4">Comment ça se passe</h2>
        </Reveal>

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {ETAPES.map((etape, index) => (
            <li key={etape.titre}>
              <Reveal delay={index * 90}>
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-[12px] font-semibold"
                    style={{
                      background: "var(--accent)",
                      color: "var(--on-accent)",
                    }}
                  >
                    {index + 1}
                  </span>
                  {index < ETAPES.length - 1 ? (
                    <span
                      className="hidden h-px flex-1 lg:block"
                      style={{ background: "var(--line-strong)" }}
                    />
                  ) : null}
                </div>

                <h3 className="h-card mt-5">{etape.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {etape.texte}
                </p>
                <p className="text-fine mt-3">{etape.delai}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
