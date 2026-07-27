import Reveal from "@/components/motion/Reveal";

// Étiquette de section, centrée en haut de l'écran qu'elle occupe.
//
// Elle était jusqu'ici collée au-dessus du titre, dans la colonne de gauche :
// noyée dans le bloc de texte, elle ne disait plus « vous entrez dans une
// nouvelle section ». Isolée et centrée, elle joue le rôle d'un intertitre —
// c'est le premier élément que l'œil rencontre quand une flèche amène la
// section pile dans la fenêtre.
export default function SectionLabel({ children }: { children: string }) {
  return (
    <Reveal>
      <div className="mb-8 flex justify-center">
        <span className="kicker">{children}</span>
      </div>
    </Reveal>
  );
}
