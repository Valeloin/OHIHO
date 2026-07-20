import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import SectionBackdrop from "@/components/motion/SectionBackdrop";
import type { MethodContent } from "@/lib/content/types";

export default function HowItWorks({ data }: { data: MethodContent }) {
  return (
    // Fond par défaut (et non `bg-surface`) : le halo teal et les lucioles
    // se lisent alors exactement comme sur le hero. Sur le panneau plus clair
    // de `bg-surface`, les lucioles s'effaçaient presque.
    <section className="relative overflow-hidden border-t border-border">
      <SectionBackdrop />
      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
        {/* En-tête sur deux colonnes : le titre à gauche, et à droite une
            carte qui récapitule le déroulé. Elle donne à la section la
            hauteur des autres et sert de légende à la frise — ses jalons
            s'allument sur la MÊME horloge que le trait qui se remplit. */}
        <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-center">
          <Reveal>
            <span className="kicker">{data.kicker}</span>
            <h2 className="mt-6 max-w-2xl text-3xl font-semibold tracking-display text-balance sm:text-5xl">
              {data.title}
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <div aria-hidden="true" className="card-surface w-full p-6">
              {/* Libellé calculé sur les données : rien n'est écrit en dur,
                  si une étape est ajoutée dans l'admin le compte suit. */}
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {data.steps.length} étapes
              </p>
              <ul className="mt-4 space-y-3.5">
                {data.steps.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span
                      className={`frise-dot-${i + 1} h-2 w-2 shrink-0 rounded-full bg-brand-emerald`}
                    />
                    <span className="truncate text-sm text-muted">
                      {item.title}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Description de l'étape en cours. Les quatre sont empilées et
                  se relaient sur l'horloge de la frise ; la hauteur est fixée
                  pour que la carte ne saute pas d'une étape à l'autre. */}
              <div className="mt-5 border-t border-border pt-4">
                <div className="relative h-[4.5rem]">
                  {data.steps.map((item, i) => (
                    <p
                      key={i}
                      className={`frise-desc-${i + 1} absolute inset-0 text-[0.8125rem] leading-[1.45] text-muted`}
                    >
                      {item.description}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 h-px rule-fade" />

        {/* Frise : un rail sombre porte tout le tracé, et le dégradé de marque
            s'y remplit de gauche à droite. Chaque jalon s'allume au passage
            du remplissage. En mobile, la frise passe à la verticale. */}
        <RevealGroup className="relative mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Le rail est INVISIBLE : seul le trait déjà parcouru se voit.
              Le chemin à venir ne se devine pas, la progression se lit
              d'autant mieux. */}
          {/* ⚠️ `opacity-0` et non `hidden` : `display:none` ARRÊTE les
              animations CSS et les fait repartir de zéro au retour. Comme la
              carte de suivi, elle, reste affichée en permanence, franchir le
              seuil `lg` désynchronisait la frise de la carte. L'élément est
              absolu : invisible, il n'occupe de toute façon aucune place. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px opacity-0 lg:opacity-100"
          >
            <div className="frise-fill rule-brand h-full w-full" />
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
                <div className="absolute left-0 top-0 -translate-y-1/2">
                  <span
                    className={`frise-dot-${i + 1} block h-[11px] w-[11px] rounded-full bg-brand-emerald`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Arrivée : quand le remplissage atteint le bout, l'emblème OHIHO
              se pose dans son cercle et une gerbe jaillit — la méthode est
              menée à son terme. Desktop uniquement, comme le rail. */}
          {/* Le viewBox est large (80) pour que les rayons, en s'écartant
              jusqu'à scale(1.4), ne soient pas rognés par le bord du SVG. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 80 80"
            className="absolute right-0 top-0 hidden h-16 w-16 -translate-y-1/2 translate-x-1/2 lg:block"
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

            {/* Gerbe : 8 rayons qui partent à 19 unités du centre, alors que
                l'emblème s'arrête à 14,25 — ils ne le touchent jamais.
                L'ensemble est pivoté de 22,5° (moitié de l'écart entre deux
                rayons) : sans cela deux rayons tombaient exactement à
                l'horizontale et se confondaient avec le trait de la frise.
                La rotation est portée par un groupe EXTÉRIEUR, car le groupe
                animé a déjà sa propre transformation CSS. */}
            <g transform="rotate(22.5 40 40)">
              <g
                className="frise-burst"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              >
                <path d="M59 40h8" stroke="#22d3c4" />
                <path d="M53.4 53.4l5.7 5.7" stroke="#34d399" />
                <path d="M40 59v8" stroke="#38bdf8" />
                <path d="M26.6 53.4l-5.7 5.7" stroke="#22d3c4" />
                <path d="M21 40h-8" stroke="#34d399" />
                <path d="M26.6 26.6l-5.7-5.7" stroke="#38bdf8" />
                <path d="M40 21v-8" stroke="#22d3c4" />
                <path d="M53.4 26.6l5.7-5.7" stroke="#34d399" />
              </g>
            </g>

            {/* Emblème : disque nuit cerclé du dégradé de marque. Toujours
                présent, en retrait tant que la frise n'est pas arrivée. */}
            <g className="frise-final">
              <circle
                cx="40"
                cy="40"
                r="13"
                fill="#071522"
                stroke="url(#frise-ring)"
                strokeWidth="2.5"
              />
              {/* Le trident, visible tant que la méthode est en cours. */}
              <g className="frise-trident">
                <rect x="34.9" y="35.5" width="2.2" height="9" rx="1.1" fill="#38bdf8" />
                <rect x="38.9" y="33.5" width="2.2" height="13" rx="1.1" fill="#22d3c4" />
                <rect x="42.9" y="35.5" width="2.2" height="9" rx="1.1" fill="#34d399" />
              </g>
              {/* …et la coche qui le remplace à l'arrivée : le trident
                  s'efface, la validation apparaît. Même langage que
                  l'interstitiel de la vitrine du hero. */}
              <path
                className="frise-check"
                d="M34.5 40.2l3.8 3.8 7.2 -7.2"
                stroke="#34d399"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
          </svg>

          {data.steps.map((item, i) => (
            <RevealItem key={i} className="relative pl-6 lg:pl-0 lg:pt-10">
              {/* Rail + remplissage, en mobile / tablette */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-px opacity-100 lg:opacity-0"
              >
                <div className="frise-fill-y rule-brand-y h-full w-full" />
              </div>
              {/* Jalon de la version MOBILE uniquement. Ici il peut rester
                  dans le bloc animé : le rail vertical y est aussi, les deux
                  se déplacent donc ensemble. En desktop, les jalons sont
                  rendus hors des blocs (voir la rangée dédiée plus haut). */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-[5px] -translate-x-1/2 opacity-100 lg:opacity-0"
              >
                <span
                  className={`frise-dot-${i + 1} block h-[11px] w-[11px] rounded-full bg-brand-emerald`}
                />
              </div>

              {/* Au passage de la frise : le numéro grossit d'un coup, le
                  texte se déhanche. Déclenché par les mêmes horloges que le
                  jalon, donc parfaitement synchrone. */}
              <span
                className={`frise-num-${i + 1} text-gradient font-mono text-3xl font-semibold tracking-display`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={`frise-txt-${i + 1}`}>
                <h3 className="mt-4 text-lg font-semibold tracking-display">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
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
