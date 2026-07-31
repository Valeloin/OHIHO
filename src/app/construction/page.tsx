import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "OHIHO · Site en construction",
  description:
    "Le site OHIHO est en cours de construction. Contactez-nous par email en attendant.",
  robots: { index: false, follow: false },
};

// Page affichée à la place de TOUT le site public tant que le mode
// « en construction » est actif (voir EN_CONSTRUCTION dans middleware.ts).
//
// `fixed inset-0 z-[100]` : la page est servie DANS le layout racine, qui
// rend aussi le bandeau et le footer — le voile plein écran les recouvre
// plutôt que d'exiger un layout dédié (l'App Router ne permet pas d'échapper
// au layout racine).
export default function ConstructionPage() {
  return (
    <main className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-background px-6 text-center">
      <Image
        src="/logo-mark.svg"
        alt="OHIHO"
        width={256}
        height={256}
        priority
        className="h-20 w-20"
      />

      <div>
        <p className="kicker justify-center">Site en construction</p>
        <h1 className="mt-6 text-3xl font-semibold tracking-display sm:text-4xl">
          OHIHO arrive bientôt
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
          Nous peaufinons notre nouveau site. En attendant, vous pouvez nous
          écrire — nous répondons sous 24h ouvrées.
        </p>
      </div>

      <a
        href="mailto:valentin.condamy@ohiho.fr"
        className="btn-accent inline-flex px-7 py-3 text-sm"
      >
        valentin.condamy@ohiho.fr
      </a>
    </main>
  );
}
