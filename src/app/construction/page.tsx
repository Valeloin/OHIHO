import type { Metadata } from "next";
import Wordmark from "@/components/ui/Wordmark";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Site en construction",
  description:
    "Le site OHIHO est en cours de refonte. Écrivez-nous en attendant, nous répondons sous 24 h ouvrées.",
  robots: { index: false, follow: false },
};

// Page affichée à la place de TOUT le site public tant que le mode
// « en construction » est actif (voir EN_CONSTRUCTION dans middleware.ts).
//
// `fixed inset-0` : la page est servie DANS le layout racine, qui rend aussi
// le bandeau et le pied de page — le voile plein écran les recouvre plutôt
// que d'exiger un layout dédié (l'App Router ne permet pas d'échapper au
// layout racine).
export default function ConstructionPage() {
  return (
    <main
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-9 px-6 text-center"
      style={{ background: "var(--page)" }}
    >
      <Wordmark size={40} />

      <div>
        <p className="kicker justify-center">Site en construction</p>
        <h1 className="h-section mt-6">
          Le nouveau site <span className="accent-text">arrive.</span>
        </h1>
        <p className="lede mx-auto mt-5 text-center">
          Nous le refaisons de fond en comble. En attendant, écrivez-nous — la
          réponse arrive sous 24 h ouvrées.
        </p>
      </div>

      <a href={`mailto:${SITE.email}`} className="btn btn-primary">
        {SITE.email}
      </a>
    </main>
  );
}
