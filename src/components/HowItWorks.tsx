"use client";

import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import SectionLabel from "@/components/SectionLabel";
import MethodScenes from "@/components/motion/MethodScenes";
import type { MethodContent } from "@/lib/content/types";

export default function HowItWorks({ data }: { data: MethodContent }) {
  // `null` = la frise tourne toute seule. Un numéro = le visiteur a choisi
  // son étape ; recliquer la même puce rend la main à la rotation. Même
  // patron que la vitrine du hero (pv-manual / data-scene).
  const [step, setStep] = useState<number | null>(null);

  return (
    // Fond par défaut (et non `bg-surface`) : le halo teal et les lucioles
    // se lisent alors exactement comme sur le hero. Sur le panneau plus clair
    // de `bg-surface`, les lucioles s'effaçaient presque.
    <section
      id="methode"
      className="section-screen relative overflow-hidden border-t border-border"
    >
      <SectionBackdrop />
      {/* `frise-manual` + `data-step` gèlent TOUTE la frise (scène, jalons,
          remplissage, numéros) sur l'instant représentatif de l'étape
          choisie — voir globals.css. Un seul instant suffit pour toutes les
          familles d'animation puisqu'elles partagent la même horloge de
          13,44 s : pas besoin de recalculer chaque état à la main. */}
      <div
        className={`relative mx-auto w-full max-w-7xl px-6 py-14 ${step ? "frise-manual" : ""}`}
        data-step={step ?? undefined}
      >
        {/* En-tête sur deux colonnes : le titre à gauche, et à droite une
            carte qui récapitule le déroulé. Elle donne à la section la
            hauteur des autres et sert de légende à la frise — ses jalons
            s'allument sur la MÊME horloge que le trait qui se remplit. */}
        {/* Colonne de droite élargie : elle porte désormais le portable ET le
            téléphone posé devant lui. */}
        <SectionLabel>{data.kicker}</SectionLabel>

        <div className="grid gap-10 lg:grid-cols-[1fr_30rem] lg:items-center">
          <Reveal>
            <p className="section-lead max-w-4xl">{data.title}</p>

            {/* Légende de la scène qui joue à droite. Elle change AVEC elle,
                sur la même horloge (`frise-desc-*`) : le lien est garanti par
                construction, comme partout dans la frise.
                Elle occupe la colonne de gauche, qui restait vide sous le
                titre, et rapproche le texte de l'image qu'il décrit — cette
                légende vivait jusqu'ici sous l'écran, en tout petit.
                Hauteur FIXE : les enfants sont en absolu, sans elle le bloc
                serait de hauteur nulle ; et une hauteur qui suivrait le texte
                ferait sauter la mise en page d'une étape à l'autre.
                `aria-hidden` : les quatre étapes sont déjà énoncées en clair
                dans la frise juste en dessous, ce bloc n'en est qu'un rappel
                visuel — sans lui, un lecteur d'écran les entendrait deux fois. */}
            <div
              aria-hidden="true"
              className="relative mt-8 h-[13rem] max-w-xl sm:h-[11rem]"
            >
              {data.steps.map((item, i) => (
                <div
                  key={i}
                  className={`frise-desc-${i + 1} absolute inset-0`}
                >
                  <span className="text-gradient font-mono text-sm font-semibold tracking-display">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-2xl font-semibold tracking-display">
                    {item.title}
                  </p>
                  <p className="mt-4 leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Un écran d'ordinateur qui joue une scène par étape, sur
              l'horloge de la frise. Il remplace la liste des étapes : celle-ci
              répétait des titres déjà écrits juste en dessous. */}
          <Reveal delay={0.15}>
            <div className="w-full">
              {/* Le titre de l'étape ne se répète plus ici : il est passé dans
                  la légende de la colonne de gauche, avec sa description. */}

              {/* Puces cliquables, comme la vitrine du hero : on peut
                  choisir son étape au lieu de subir la rotation. */}
              <div className="mb-2 flex justify-center gap-1">
                {data.steps.map((item, i) => {
                  const n = i + 1;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setStep(step === n ? null : n)}
                      aria-label={`Voir l'étape ${item.title}`}
                      aria-pressed={step === n}
                      className="group flex items-center rounded-full px-2 py-3 focus-visible:outline-none"
                    >
                      <span className="relative block h-1 w-8 overflow-hidden rounded-full bg-brand-sky/35 transition-colors group-hover:bg-brand-sky/55 group-focus-visible:ring-2 group-focus-visible:ring-accent-cyan/60">
                        <span
                          className={`frise-desc-${n} absolute inset-0 rounded-full bg-brand-teal`}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Une scène par étape, dans une fenêtre de navigateur comme
                  les vignettes de Services — la vitrine 3D des deux appareils
                  (MethodShowcase) a été remplacée à la demande. */}
              <div className="overflow-hidden rounded-xl ring-1 ring-border">
                <MethodScenes steps={data.steps.length} />
              </div>
              {/* La description ne se répète plus sous l'écran : elle est
                  passée dans la légende de la colonne de gauche, où elle a la
                  place de se lire en pleine taille au lieu de 13 px centrés. */}
            </div>
          </Reveal>
        </div>

        <div className="mt-6 h-px rule-fade" />

        {/* Frise : un rail sombre porte tout le tracé, et le dégradé de marque
            s'y remplit de gauche à droite. Chaque jalon s'allume au passage
            du remplissage. En mobile, la frise passe à la verticale. */}
        <RevealGroup className="relative mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Le rail est INVISIBLE : seul le trait déjà parcouru se voit.
              Le chemin à venir ne se devine pas, la progression se lit
              d'autant mieux. */}
          {/* ⚠️ `opacity-0` et non `hidden` : `display:none` ARRÊTE les
              animations CSS et les fait repartir de zéro au retour. Comme la
              carte de suivi, elle, reste affichée en permanence, franchir le
              seuil `lg` désynchronisait la frise de la carte. L'élément est
              absolu : invisible, il n'occupe de toute façon aucune place. */}
          {/* Trait de 2 px et non 1 : à un pixel, le fil était si fin devant
              des jalons de 11 px que les deux ne se lisaient pas comme un
              même objet. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-0.5 -translate-y-1/2 opacity-0 lg:opacity-100"
          >
            <div className="frise-fill rule-brand h-full w-full rounded-full" />
          </div>

          {/* Jalons du desktop, posés DIRECTEMENT sur le rail et non dans les
              blocs d'étape. C'est structurel : les blocs sont animés à
              l'apparition (translation verticale échelonnée), le rail ne
              l'est pas — un jalon placé dedans se retrouvait décalé de
              20 px sous le trait, et les quatre ne bougeaient même pas
              ensemble à cause du décalage entre eux.
              Cette rangée reprend la MÊME grille (4 colonnes, même
              gouttière) : chaque jalon tombe donc exactement au départ de
              sa colonne, comme le numéro qui lui correspond. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 grid grid-cols-4 gap-x-10 opacity-0 lg:opacity-100"
          >
            {data.steps.map((_, i) => (
              <div key={i} className="relative">
                {/* Le jalon est cerné d'un anneau de la couleur du FOND :
                    le trait passe donc derrière lui sans le traverser, et le
                    jalon se lit comme un nœud SUR la ligne plutôt que comme
                    une bille posée à côté. */}
                {/* DEUX COUCHES : la base éteinte est statique, seule la
                    couche allumée (halo compris) anime son opacité — voir le
                    commentaire des keyframes frise-dot-* : c'est ce qui garde
                    les jalons sur la même horloge (compositeur) que le trait
                    et les scènes. */}
                <div className="absolute left-0 top-0 -translate-y-1/2 rounded-full bg-background p-1">
                  <span className="relative block h-[9px] w-[9px]">
                    <span className="absolute inset-0 scale-[0.8] rounded-full bg-[#26415c]" />
                    <span
                      className={`frise-dot-${i + 1} absolute inset-0 rounded-full bg-brand-emerald shadow-[0_0_12px_rgba(52,211,153,0.9)]`}
                    />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Arrivée : quand le remplissage atteint le bout, un GRAND cercle
              de validation se pose et la coche s'y trace. La gerbe d'étincelles
              a été retirée à la demande. Desktop uniquement, comme le rail. */}
          {/* Cercle nettement agrandi (r 24 dans un viewBox de 80, rendu
              96 px) : sans la gerbe autour, il peut occuper tout le cadre et
              devenir le vrai point d'orgue de la frise. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 80 80"
            /* Entièrement DANS le conteneur (plus de translate-x-1/2) : à
               moitié dehors, il se faisait couper par l'overflow-hidden de
               la section dès que le conteneur approchait du bord de
               l'écran — on ne voyait qu'un demi-anneau. */
            className="absolute right-0 top-0 hidden h-24 w-24 -translate-y-1/2 lg:block"
          >
            <defs>
              <linearGradient
                id="frise-ring"
                x1="20"
                y1="20"
                x2="60"
                y2="60"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#38bdf8" />
                <stop offset="0.5" stopColor="#22d3c4" />
                <stop offset="1" stopColor="#34d399" />
              </linearGradient>
            </defs>

            {/* Disque nuit cerclé du dégradé de marque. Toujours présent, en
                retrait tant que la frise n'est pas arrivée. */}
            <g className="frise-final">
              <circle
                cx="40"
                cy="40"
                r="24"
                fill="#071522"
                stroke="url(#frise-ring)"
                strokeWidth="3.5"
              />
              {/* Le point d'arrivée est une VALIDATION : le cercle attend, vide,
                  et la coche s'y trace d'un trait quand le remplissage
                  l'atteint. Agrandie avec le cercle. */}
              <path
                className="frise-check"
                d="M30 40.5l6.5 6.5 13 -13"
                stroke="#34d399"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                pathLength={1}
              />
            </g>
          </svg>

          {data.steps.map((item, i) => (
            <RevealItem key={i} className="relative pl-6 lg:pl-0 lg:pt-5">
              {/* Rail + remplissage, en mobile / tablette */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-0.5 -translate-x-1/2 opacity-100 lg:opacity-0"
              >
                <div className="frise-fill-y rule-brand-y h-full w-full rounded-full" />
              </div>
              {/* Jalon de la version MOBILE uniquement. Ici il peut rester
                  dans le bloc animé : le rail vertical y est aussi, les deux
                  se déplacent donc ensemble. En desktop, les jalons sont
                  rendus hors des blocs (voir la rangée dédiée plus haut). */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-[1px] -translate-x-1/2 rounded-full bg-background p-1 opacity-100 lg:opacity-0"
              >
                <span className="relative block h-[9px] w-[9px]">
                  <span className="absolute inset-0 scale-[0.8] rounded-full bg-[#26415c]" />
                  <span
                    className={`frise-dot-${i + 1} absolute inset-0 rounded-full bg-brand-emerald shadow-[0_0_12px_rgba(52,211,153,0.9)]`}
                  />
                </span>
              </div>

              {/* Filet VERTICAL le long de l'étape dont la scène joue en ce
                  moment sur l'écran, au-dessus. Sans lui, rien ne reliait les
                  deux à l'œil : une fois la frise passée, les quatre étapes
                  s'affichaient à l'identique et rien ne disait laquelle était
                  illustrée.
                  Il emprunte la classe `frise-desc-N`, celle qui pilote déjà
                  l'affichage de la scène correspondante : le lien est garanti
                  PAR CONSTRUCTION, il n'y a pas un second jeu d'horaires à
                  tenir aligné à la main.
                  Il est posé dans la GOUTTIÈRE (-left-4), pas dans le bloc :
                  le texte garde ainsi son alignement exact avec le jalon de
                  la frise qui le surplombe.
                  ⚠️ `opacity-0` et non `hidden` en dessous de `lg` : en
                  mobile le rail vertical de la frise occupe déjà cette place,
                  mais `display:none` ARRÊTERAIT l'animation et la ferait
                  repartir de zéro au retour, désynchronisant ce filet de
                  toutes les autres pièces de l'horloge. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-4 top-8 bottom-0 w-0.5 opacity-0 lg:opacity-100"
              >
                <div
                  className={`frise-desc-${i + 1} rule-brand-y h-full w-full rounded-full`}
                />
              </div>

              {/* Au passage de la frise : le numéro grossit d'un coup, le
                  texte se déhanche. Déclenché par les mêmes horloges que le
                  jalon, donc parfaitement synchrone. */}
              <span
                className={`frise-num-${i + 1} text-gradient font-mono text-2xl font-semibold tracking-display`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={`frise-txt-${i + 1}`}>
                <h3 className="mt-3 text-lg font-semibold tracking-display">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
