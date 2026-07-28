import Reveal from "@/components/motion/Reveal";

// TITRE de la section — c'est bien celui-ci, pas la phrase d'accroche.
//
// Il est ÉPINGLÉ en haut de la section, au centre, TOUJOURS à la même
// hauteur (demande du 2026-07-27) : il vit hors du bloc de contenu, qui se
// centre lui dans l'espace restant (`my-auto` sur le conteneur de chaque
// section). Avant, il était centré AVEC le contenu : sa position variait
// d'une section à l'autre selon la hauteur de ce qu'elle porte.
export default function SectionLabel({ children }: { children: string }) {
  return (
    <Reveal>
      <div className="relative z-10 flex justify-center pt-12">
        <h2 className="section-name">{children}</h2>
      </div>
    </Reveal>
  );
}
