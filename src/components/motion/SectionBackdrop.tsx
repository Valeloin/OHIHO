import AnimatedGlow from "@/components/motion/AnimatedGlow";
import Fireflies from "@/components/motion/Fireflies";

// Fond commun des sections intérieures — DA « Banderole ».
// Deux couches : le voile teal fixe et les lucioles vertes, qui clignotent
// doucement. Aucune texture de grille.
export default function SectionBackdrop() {
  return (
    <>
      <AnimatedGlow variant="subtle" />
      <Fireflies className="opacity-70" />
    </>
  );
}
