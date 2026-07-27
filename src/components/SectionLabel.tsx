import Reveal from "@/components/motion/Reveal";

// TITRE de la section — c'est bien celui-ci, pas la phrase d'accroche en
// dessous. Le nom de section (« Nos services », « Méthode », « Contact »)
// est ce qui dit où l'on est ; la phrase, elle, est un sous-titre.
//
// Il porte donc le h2, en grand, centré en haut de l'écran que la section
// occupe : c'est le premier élément que l'œil rencontre quand une flèche
// amène la section pile dans la fenêtre.
export default function SectionLabel({ children }: { children: string }) {
  return (
    <Reveal>
      <h2 className="section-name mb-8">{children}</h2>
    </Reveal>
  );
}
