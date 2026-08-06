import Fireflies from "@/components/motion/Fireflies";

// Fond de la section Services — dégradé continu bleu → vert émeraude, plus
// vif que le voile nuit des autres sections.
//
// Valeur alignée le 2026-08-06 sur celle de Contact (`.codex-contact`) et de
// Réalisations (`.portfolio-vivid`) : les trois sections vivantes portaient
// chacune une variante légèrement différente, ce qui cassait l'unité du
// site d'une section à l'autre. Une seule palette maintenant — ne plus la
// faire dériver sans la reporter aussi dans globals.css et Portfolio.tsx.
//
// Les lucioles restent le composant partagé (couleur/taille fixées par
// `.firefly` dans globals.css, communes à tout le site — pas touché ici).
// Sur ce fond plus clair et de teinte proche du vert des lucioles, leur
// opacité de base (0,45) les rendait quasi invisibles : `brightness` +
// `drop-shadow` sur ce conteneur les éclaircit et leur donne un halo blanc
// net, sans changer la couleur/opacité de base du composant partagé.
export default function ServicesBackdrop() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(118deg, #1e84ba 0%, #199aab 38%, #17aa91 72%, #2bb67e 112%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [filter:brightness(2)_saturate(1.2)_drop-shadow(0_0_3px_rgba(255,255,255,0.65))]"
      >
        <Fireflies />
      </div>
    </>
  );
}
