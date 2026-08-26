import Reveal from "@/components/ui/Reveal";

// Bandeau de réassurance, juste sous le hero : six promesses courtes, une
// icône chacune. Repris du principe de la référence (jelouemonsiteweb.com),
// qui aligne six pictos entre le hero et le détail des offres — c'est ce qui
// répond aux objections avant qu'elles ne se posent.
//
// Les icônes sont dessinées ici, en traits : six glyphes ne justifient pas
// d'embarquer une bibliothèque, et une icône vectorielle prend la couleur du
// texte sans avoir à en produire deux versions pour les deux thèmes.
const ARGUMENTS = [
  {
    titre: "Un seul interlocuteur",
    texte: "Vous parlez à la personne qui code.",
    path: "M12 12.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20a7.5 7.5 0 0 1 15 0",
  },
  {
    titre: "Prix ferme",
    texte: "Fixé au devis, avant de commencer.",
    path: "M4 8.5h16M4 8.5 6.5 4h11L20 8.5M4 8.5V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8.5M9.5 12.5h5",
  },
  {
    titre: "Écrit sur mesure",
    texte: "Pas de gabarit, pas d'extensions.",
    path: "m8.5 8.5-4 3.5 4 3.5M15.5 8.5l4 3.5-4 3.5M13.5 5l-3 14",
  },
  {
    titre: "Mobile d'abord",
    texte: "Irréprochable sur téléphone.",
    path: "M7.5 3.5h9a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1ZM11 17.5h2",
  },
  {
    titre: "Trouvable sur Google",
    texte: "Référencement travaillé page par page.",
    path: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4",
  },
  {
    titre: "Le site est à vous",
    texte: "Code, domaine et hébergement à votre nom.",
    path: "M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8.5Z",
  },
];

export default function Arguments() {
  return (
    <section className="border-b py-14" style={{ borderColor: "var(--line)" }}>
      <div className="shell">
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {ARGUMENTS.map((argument, index) => (
            <li key={argument.titre}>
              <Reveal delay={index * 50}>
                <div className="flex gap-4">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: "color-mix(in srgb, var(--accent) 12%, transparent)",
                      color: "var(--accent-text)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d={argument.path} />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold">
                      {argument.titre}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                      {argument.texte}
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
