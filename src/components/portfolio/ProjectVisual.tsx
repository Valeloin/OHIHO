import ProjectMockup from "@/components/portfolio/ProjectMockup";

type Accent = "cyan" | "violet" | "emerald" | "red";

/**
 * Visuel d'une carte projet :
 * - projet réel en ligne (href http) → aperçu live du site dans un iframe scalé ;
 * - exemple générique (href "#") → maquette schématique animée (ProjectMockup).
 *
 * L'iframe est dimensionné en pourcentages puis mis à l'échelle, ce qui remplit
 * la carte quelle que soit sa largeur (responsive), et n'intercepte pas les clics
 * (pointer-events-none) pour laisser le lien de la carte fonctionner.
 */
export default function ProjectVisual({
  href,
  accent,
  title,
}: {
  href: string;
  accent: Accent;
  title: string;
}) {
  const isExternal = href?.startsWith("http");

  if (isExternal) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#0e1526]">
        <iframe
          src={href}
          title={`Aperçu du site ${title}`}
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
          sandbox="allow-scripts allow-same-origin"
          className="pointer-events-none absolute left-0 top-0"
          style={{
            width: "250%",
            height: "250%",
            transform: "scale(0.4)",
            transformOrigin: "top left",
            border: 0,
          }}
        />
      </div>
    );
  }

  return <ProjectMockup accent={accent} label={`Aperçu du site ${title}`} />;
}
