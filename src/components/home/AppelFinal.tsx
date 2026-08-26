import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

// Relance finale, juste avant le pied de page.
//
// La page se terminait sur la FAQ puis le formulaire : un visiteur qui a tout
// lu et qui hésite encore n'avait plus rien à quoi se raccrocher. Un dernier
// appel, court et sur fond plein, referme la page — et c'est aussi le seul
// endroit où on lève l'objection du premier pas (« ça n'engage à rien »).
export default function AppelFinal() {
  return (
    <section className="section">
      <div className="shell">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-xl px-8 py-14 text-center sm:px-12"
            style={{ background: "var(--deep)", color: "var(--on-deep)" }}
          >
            {/* Halo de marque, discret : la même signature que le hero, pour
                que les deux extrémités de la page se répondent. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-[380px] w-[520px] opacity-[0.22]"
              style={{
                background:
                  "radial-gradient(closest-side, #22d3c4, transparent 74%)",
              }}
            />

            <div className="relative">
              <h2 className="h-section mx-auto max-w-[18ch]">
                Un projet en tête ? Parlons-en.
              </h2>
              <p
                className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed"
                style={{ color: "var(--on-deep-muted)" }}
              >
                Décrivez-le en quelques lignes. Vous aurez un avis honnête, un
                délai et un prix — même si la réponse est que vous n&apos;avez
                pas besoin de nous.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href="#contact" className="btn btn-primary">
                  Demander un devis
                </Link>
                <a
                  href={`mailto:${SITE.email}`}
                  className="btn btn-on-deep"
                >
                  Écrire directement
                </a>
              </div>

              <p
                className="mt-6 text-[13px]"
                style={{ color: "var(--on-deep-muted)" }}
              >
                {SITE.responseNote} · Sans engagement
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
