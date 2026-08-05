import Fireflies from "@/components/motion/Fireflies";

// Fond de la section Services — repris de la passation « fond du héros et
// carrousel » (2026-08-05) : dégradé continu bleu → vert émeraude, plus vif
// que le voile nuit des autres sections. Lucioles conservées, éclaircies
// pour rester visibles sur ce fond plus clair.
export default function ServicesBackdrop() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(118deg, #2187ba 0%, #1f91b1 31%, #19a99c 67%, #28b681 112%)",
        }}
      />
      <Fireflies className="opacity-80" />
    </>
  );
}
