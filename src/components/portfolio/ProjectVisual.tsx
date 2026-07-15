import ProjectMockup from "@/components/portfolio/ProjectMockup";

type Accent = "cyan" | "violet" | "emerald" | "red";

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/**
 * Visuel d'une carte projet :
 * - projet réel en ligne (href http) → aperçu live du site, encadré dans une
 *   fenêtre de navigateur stylisée (barre + points), défilement désactivé et
 *   contenu mis à l'échelle pour ressembler à une vignette propre ;
 * - exemple générique (href "#") → maquette schématique animée (ProjectMockup).
 *
 * L'iframe n'intercepte pas les clics (pointer-events-none) pour laisser le lien
 * de la carte fonctionner.
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
      <div className="flex h-full w-full flex-col bg-[#0e1526]">
        {/* Barre de navigateur */}
        <div className="flex h-6 shrink-0 items-center gap-1.5 bg-[#172033] px-3">
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="ml-2 truncate font-mono text-[9px] text-white/40">
            {hostnameOf(href)}
          </span>
        </div>
        {/* Aperçu live */}
        <div className="relative flex-1 overflow-hidden">
          <iframe
            src={href}
            title={`Aperçu du site ${title}`}
            loading="lazy"
            scrolling="no"
            tabIndex={-1}
            aria-hidden="true"
            sandbox="allow-scripts allow-same-origin"
            className="pointer-events-none absolute left-0 top-0"
            style={{
              width: "320%",
              height: "320%",
              transform: "scale(0.3125)",
              transformOrigin: "top left",
              border: 0,
            }}
          />
        </div>
      </div>
    );
  }

  return <ProjectMockup accent={accent} label={`Aperçu du site ${title}`} />;
}
