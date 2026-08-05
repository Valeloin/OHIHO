import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import LinkedInQr from "@/components/LinkedInQr";
import type { ContactContent } from "@/lib/content/types";

// ============================================================
// SECTION CONTACT — reprise de la passation du 2026-08-05
// (branche agent/contact-section-handoff, CLAUDE-HANDOFF-CONTACT.md) :
// conclusion de page lumineuse et éditoriale, distincte du patron
// kicker + carte des autres sections. Volontairement SANS <SectionLabel> :
// le titre de la colonne de gauche fait office d'accroche.
//
// Trois zones : l'appel à l'action (gauche), le noyau orbital décoratif
// (centre, dès 1121 px seulement), la carte LinkedIn (droite). Pas
// d'email ni de ville dans cette section — ces champs restent dans
// ContactContent (admin, schema) mais ne sont plus affichés ici.
// ============================================================

const FIREFLIES = [
  { left: "4%", top: "18%", size: 2, duration: 6.2, delay: -1.1, peak: 0.85 },
  { left: "9%", top: "62%", size: 1.5, duration: 7.8, delay: -4.4, peak: 0.7 },
  { left: "15%", top: "38%", size: 2.5, duration: 5.6, delay: -2.6, peak: 0.9 },
  { left: "21%", top: "82%", size: 1.5, duration: 8.6, delay: -0.5, peak: 0.65 },
  { left: "27%", top: "12%", size: 2, duration: 6.9, delay: -5.3, peak: 0.8 },
  { left: "34%", top: "56%", size: 1.5, duration: 7.3, delay: -3.1, peak: 0.75 },
  { left: "46%", top: "28%", size: 2.5, duration: 5.9, delay: -6.2, peak: 0.9 },
  { left: "58%", top: "72%", size: 1.5, duration: 8.1, delay: -1.8, peak: 0.65 },
  { left: "67%", top: "16%", size: 2, duration: 6.5, delay: -3.9, peak: 0.85 },
  { left: "74%", top: "48%", size: 2.5, duration: 7.6, delay: -2.2, peak: 0.7 },
  { left: "82%", top: "24%", size: 1.5, duration: 5.7, delay: -6.7, peak: 0.9 },
  { left: "89%", top: "64%", size: 2, duration: 8.4, delay: -0.9, peak: 0.65 },
  { left: "94%", top: "34%", size: 2.5, duration: 6.8, delay: -4.6, peak: 0.85 },
  { left: "96%", top: "80%", size: 1.5, duration: 7.1, delay: -2.9, peak: 0.75 },
];

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21h-4V9Z" />
    </svg>
  );
}

/* Trois vagues concentriques, décalées d'un tiers de cycle chacune pour
   que l'une s'efface avant que la suivante ne parte (cf. handoff). */
function ContactRipples() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      {[0, -3, -6].map((delay) => (
        <span
          key={delay}
          className="contact-ripple absolute rounded-full border border-white/40"
          style={{ width: "70vmin", height: "70vmin", animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  );
}

function ContactFireflies() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {FIREFLIES.map((fly, i) => (
        <span
          key={i}
          className="contact-firefly absolute rounded-full"
          style={{
            left: fly.left,
            top: fly.top,
            width: fly.size,
            height: fly.size,
            opacity: 0.5,
            animationDuration: `${fly.duration}s, 10s`,
            animationDelay: `${fly.delay}s, ${-(((i * 17) % 100) / 10)}s`,
            ["--fly-peak" as string]: fly.peak,
            ["--fly-halo" as string]: `${fly.size * 2.5}px`,
            ["--fly-drift" as string]: "14px",
          }}
        />
      ))}
    </div>
  );
}

/* Noyau orbital décoratif : anneaux concentriques, orbite en pointillés
   qui tourne lentement, point vert qui la parcourt, trois libellés fixes
   autour. N'apparaît qu'à partir de 1121 px (voir .contact-core,
   globals.css) — en dessous, il laisserait un vide entre le titre et la
   carte plutôt que de le combler. */
function ContactOrbitalCore() {
  return (
    <div
      aria-hidden="true"
      className="contact-core relative mx-auto h-[228px] w-[228px] items-center justify-center"
    >
      <div className="absolute inset-0 animate-[contact-orbit-spin_54s_linear_infinite] rounded-full border border-dashed border-white/40" />
      <div className="absolute inset-6 rounded-full border border-white/25" />
      <div className="absolute inset-12 rounded-full border border-white/20" />

      <div className="absolute inset-0 animate-[contact-orbit-spin_9s_linear_infinite]">
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-emerald shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
      </div>

      <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl">
        <Image src="/logo-mark.svg" alt="" width={32} height={32} />
      </div>

      <span className="absolute -top-7 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/75">
        Une idée
      </span>
      <span className="absolute bottom-3 left-0 font-mono text-[10px] uppercase tracking-[0.16em] text-white/75">
        Un échange
      </span>
      <span className="absolute bottom-3 right-0 font-mono text-[10px] uppercase tracking-[0.16em] text-white/75">
        Un projet
      </span>
    </div>
  );
}

export default function ContactSection({ data }: { data: ContactContent }) {
  return (
    <section
      id="contact"
      className="contact-stage relative flex flex-col overflow-hidden border-t border-border"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(118deg, #1e84ba 0%, #199aab 38%, #17aa91 72%, #2bb67e 112%)",
        }}
      />
      <ContactRipples />
      <ContactFireflies />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-12">
        <div className="contact-cols items-center gap-y-12 lg:gap-x-10">
          <Reveal>
            <div>
              <h2 className="text-4xl font-semibold leading-[1.05] tracking-display text-white sm:text-5xl">
                Un projet
                <br />
                en tête ?
                <br />
                <span className="font-serif italic text-[#071d2b]">
                  Parlons-en.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-base leading-relaxed text-white/85">
                Une idée à lancer, un site à repenser ou un outil à imaginer
                ? Racontez-moi où vous en êtes. Je vous réponds avec un
                premier regard clair et des pistes concrètes.
              </p>

              <div className="contact-badge relative mt-7 inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-white/90 px-4 py-2.5 text-xs font-semibold text-[#071d2b] shadow-lg">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-emerald opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-emerald" />
                </span>
                {data.responseNote}
                <span
                  aria-hidden="true"
                  className="contact-badge-shine pointer-events-none absolute inset-y-0 -left-[33%] w-[33%] bg-gradient-to-r from-transparent via-white/80 to-transparent"
                />
              </div>
            </div>
          </Reveal>

          <ContactOrbitalCore />

          {data.linkedinUrl && (
            <Reveal delay={0.15}>
              <a
                href={data.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ouvrir le profil LinkedIn de ${data.personName} dans un nouvel onglet`}
                className="group mx-auto flex w-full max-w-[280px] flex-col items-center gap-1 rounded-3xl bg-white p-7 text-center shadow-2xl shadow-black/25 ring-1 ring-black/5 transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#071d2b]"
              >
                <span className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#071d2b]/5 text-[#071d2b]">
                  <IconLinkedIn className="h-5 w-5" />
                </span>
                <p className="text-lg font-semibold tracking-display text-[#071d2b]">
                  Échangeons sur LinkedIn
                </p>

                <div className="my-4">
                  <LinkedInQr url={data.linkedinUrl} size={168} />
                </div>

                <p className="text-base font-semibold text-[#071d2b]">
                  {data.personName}
                </p>
                <p className="mt-1 text-sm text-[#071d2b]/70">
                  Fondateur &amp; designer-développeur · OHIHO
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#071d2b]/45">
                  Scannez ou cliquez
                </p>
              </a>
            </Reveal>
          )}
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-8 text-center">
        <div className="mx-auto mb-4 h-px w-20 bg-white/30" />
        <p className="text-sm text-white/85">
          Premier échange libre, sans engagement.
        </p>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-white/60">
          Site vitrine · Landing page · Refonte · Application web
        </p>
      </div>
    </section>
  );
}
