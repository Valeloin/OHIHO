import Reveal from "@/components/motion/Reveal";

// EN-TÊTE DE SECTION, unifié (2026-07-28) : le NOM de la section (h2,
// mono capitales teal, point vert) épinglé en haut au centre, et dessous
// la PHRASE d'accroche (.section-lead), centrée elle aussi. Toutes les
// sections s'ouvrent exactement pareil — même position, mêmes tailles.
export default function SectionLabel({
  children,
  lead,
}: {
  children: string;
  /** Phrase d'accroche affichée sous le nom, centrée. */
  lead?: string;
}) {
  return (
    <Reveal>
      <div className="site-shell relative z-10 pt-12 text-center">
        <h2 className="section-name">{children}</h2>
        {lead && (
          <p className="section-lead mx-auto mt-4 max-w-3xl">{lead}</p>
        )}
      </div>
    </Reveal>
  );
}
