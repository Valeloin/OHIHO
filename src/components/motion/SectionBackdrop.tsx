import AnimatedGlow from "@/components/motion/AnimatedGlow";
import Starfield from "@/components/motion/Starfield";

// Fond commun des sections intérieures — DA « Banderole ».
// Deux couches fixes : le voile teal et le ciel étoilé, comme sur la
// banderole. Aucune texture de grille, aucune animation.
export default function SectionBackdrop() {
  return (
    <>
      <AnimatedGlow variant="subtle" />
      <Starfield className="opacity-60" />
    </>
  );
}
