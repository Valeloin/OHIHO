// Écran d'ordinateur de la section Méthode : une scène par étape, qui défile
// sur l'horloge de la frise (13,44 s).
//
// La VISIBILITÉ des scènes réutilise les classes `frise-desc-*` — celles qui
// pilotent déjà la description de la carte. La synchronisation avec la frise
// est donc garantie par construction : il n'y a pas deux jeux d'horaires à
// tenir alignés à la main.
//
// Pur CSS, aucun JavaScript : le composant reste un server component.
const RAIL = "#23405c";
const SKY = "#38bdf8";
const TEAL = "#22d3c4";
const EMERALD = "#34d399";

/* Emblème OHIHO, redessiné à la demande plutôt qu'importé : le fichier
   public/logo-mark.svg porte ses propres `id` de dégradé, et l'inclure deux
   fois dans la même page ferait doublon. Ici tout est exprimé en fraction du
   rayon voulu, à partir du dessin d'origine (boîte de 100 unités, anneau de
   rayon 46,5, trois barres centrées sur 50/50) : les proportions tiennent
   donc aussi bien à 6 unités qu'à 10.
   Il est posé DANS les écrans, il subit donc la perspective du SVG comme le
   reste — c'est bien le logo du site en train d'être construit qui s'affiche
   à l'écran, pas une pastille collée par-dessus. */
function Emblem({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const k = r / 46.5;
  const bar = (x: number, y: number, h: number, fill: string) => (
    <rect
      key={x}
      x={cx + (x - 50) * k}
      y={cy + (y - 50) * k}
      width={8 * k}
      height={h * k}
      rx={4 * k}
      fill={fill}
    />
  );
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="#0a1524"
        stroke="url(#mv-ring)"
        /* Plancher à 1 : à cette taille, 5 × k tomberait sous le demi-pixel
           et l'anneau disparaîtrait. */
        strokeWidth={Math.max(1, 5 * k)}
      />
      {bar(30, 28, 44, SKY)}
      {bar(46, 21, 58, TEAL)}
      {bar(62, 28, 44, EMERALD)}
    </g>
  );
}

/* 01 — Échange initial : la conversation s'installe. */
function Echange() {
  return (
    <g>
      <g className="mv mv-bubble-1">
        <rect x="24" y="34" width="96" height="18" rx="9" fill={RAIL} />
      </g>
      <g className="mv mv-bubble-2">
        <rect x="112" y="58" width="80" height="18" rx="9" fill={TEAL} opacity="0.85" />
      </g>
      <g className="mv mv-bubble-3">
        <rect x="24" y="82" width="110" height="18" rx="9" fill={RAIL} />
      </g>
    </g>
  );
}

/* 02 — Maquette & devis : le cadre se trace, le montant s'inscrit. */
function Maquette() {
  return (
    <g>
      <rect
        className="mv mv-draw"
        x="24"
        y="28"
        width="120"
        height="72"
        rx="6"
        pathLength={1}
        fill="none"
        stroke={SKY}
        strokeWidth="2"
      />
      <rect x="158" y="34" width="58" height="6" rx="3" fill={RAIL} />
      <rect x="158" y="48" width="42" height="6" rx="3" fill={RAIL} />
      <rect
        className="mv mv-amount"
        x="158"
        y="70"
        width="58"
        height="10"
        rx="5"
        fill={EMERALD}
      />
    </g>
  );
}

/* 03 — Développement. Le texte promet deux choses : « votre site prend
   forme » ET « des points d'étape réguliers pour suivre l'avancement ».
   Seule la première était dessinée. Les lignes de code s'écrivent toujours à
   gauche, et une colonne de jalons cochés s'ajoute à droite : ce sont les
   points d'étape, qui se valident au fil de l'écriture. */
function Developpement() {
  // Décalages courts (0 à -0,4 s) : ils échelonnent l'écriture des lignes
  // tout en gardant chaque fenêtre à l'intérieur de celle de la scène.
  const lignes = [
    { y: 32, w: 92, x: 24, fill: RAIL, delay: "0s" },
    { y: 48, w: 68, x: 38, fill: TEAL, delay: "-0.1s" },
    { y: 64, w: 104, x: 38, fill: RAIL, delay: "-0.2s" },
    { y: 80, w: 54, x: 52, fill: SKY, delay: "-0.3s" },
    { y: 96, w: 84, x: 24, fill: RAIL, delay: "-0.4s" },
  ];
  // Trois jalons, cochés dans le même ordre que l'écriture des lignes.
  const jalons = [
    { y: 36, delay: "-0.1s" },
    { y: 60, delay: "-0.25s" },
    { y: 84, delay: "-0.4s" },
  ];
  return (
    <g>
      {lignes.map((l) => (
        <rect
          key={l.y}
          className="mv mv-code"
          x={l.x}
          y={l.y}
          width={l.w}
          height="7"
          rx="3.5"
          fill={l.fill}
          style={{ animationDelay: l.delay }}
        />
      ))}

      {/* Colonne des points d'étape, séparée du code par un filet vertical. */}
      <path d="M152 28v80" stroke={RAIL} strokeWidth="1.5" opacity="0.6" />
      {jalons.map((j) => (
        <g key={j.y}>
          <rect x="168" y={j.y} width="48" height="6" rx="3" fill={RAIL} />
          <path
            className="mv mv-code"
            d={`M${164} ${j.y + 3}l3 3 5 -6`}
            transform="translate(-8 0)"
            pathLength={1}
            fill="none"
            stroke={EMERALD}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animationDelay: j.delay }}
          />
        </g>
      ))}
    </g>
  );
}

/* 04 — Mise en ligne & suivi. Le texte annonce « déploiement, PUIS
   accompagnement dans la durée pour les évolutions et le suivi par email ».
   Seul le déploiement était dessiné, et la seconde moitié de la phrase — la
   plus engageante commercialement — restait muette. La jauge se remplit et
   se valide comme avant, mais elle remonte pour laisser place à une
   enveloppe : le suivi qui prend le relais une fois le site en ligne.
   La scène est composée en HAUT et en BAS de l'écran, jamais au milieu :
   la bande centrale (y 65 à 115 en absolu) est réservée à l'emblème, qui
   apparaît entre les deux moments. Déplacer un élément dans cette bande le
   ferait chevaucher le logo. */
function EnLigne() {
  return (
    <g>
      <rect x="24" y="6" width="150" height="10" rx="5" fill={RAIL} />
      <rect
        className="mv mv-deploy"
        x="24"
        y="6"
        width="150"
        height="10"
        rx="5"
        fill={EMERALD}
      />
      <path
        className="mv mv-done"
        d="M190 11l7 7 14 -14"
        pathLength={1}
        fill="none"
        stroke={EMERALD}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Le suivi qui prend le relais : une enveloppe et deux notifications.
          `mv-follow` les fait arriver à 80 %, soit APRÈS le remplissage de la
          jauge (60-72 %) et le tracé de la coche (72-80 %). */}
      <g className="mv mv-follow" style={{ animationDelay: "0.35s" }}>
        <rect
          x="24"
          y="92"
          width="34"
          height="24"
          rx="4"
          fill="none"
          stroke={SKY}
          strokeWidth="2"
        />
        <path
          d="M24 96l17 12 17 -12"
          fill="none"
          stroke={SKY}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <rect
        className="mv mv-follow"
        x="68"
        y="96"
        width="88"
        height="6"
        rx="3"
        fill={RAIL}
        style={{ animationDelay: "0.5s" }}
      />
      <rect
        className="mv mv-follow"
        x="68"
        y="108"
        width="62"
        height="6"
        rx="3"
        fill={RAIL}
        style={{ animationDelay: "0.65s" }}
      />
    </g>
  );
}

/* Échos sur le téléphone : la même étape, réduite à l'essentiel. Le
   téléphone n'est pas une seconde histoire mais le reflet mobile de la
   même — d'où des formes volontairement plus pauvres. */
function TelEchange() {
  return (
    <g>
      <g className="mv mv-bubble-1">
        <rect x="8" y="14" width="36" height="9" rx="4.5" fill={RAIL} />
      </g>
      <g className="mv mv-bubble-2">
        <rect x="18" y="29" width="30" height="9" rx="4.5" fill={TEAL} opacity="0.85" />
      </g>
      <g className="mv mv-bubble-3">
        <rect x="8" y="44" width="40" height="9" rx="4.5" fill={RAIL} />
      </g>
    </g>
  );
}
function TelMaquette() {
  return (
    <g>
      <rect
        className="mv mv-draw"
        x="8"
        y="12"
        width="40"
        height="30"
        rx="4"
        pathLength={1}
        fill="none"
        stroke={SKY}
        strokeWidth="2"
      />
      <rect className="mv mv-amount" x="8" y="50" width="40" height="7" rx="3.5" fill={EMERALD} />
    </g>
  );
}
function TelDeveloppement() {
  const l = [
    { y: 14, w: 42, x: 8, delay: "0s" },
    { y: 26, w: 30, x: 14, delay: "-0.2s" },
    { y: 38, w: 38, x: 14, delay: "-0.4s" },
  ];
  return (
    <g>
      {l.map((x) => (
        <rect
          key={x.y}
          className="mv mv-code"
          x={x.x}
          y={x.y}
          width={x.w}
          height="6"
          rx="3"
          fill={x.y === 26 ? TEAL : RAIL}
          style={{ animationDelay: x.delay }}
        />
      ))}
    </g>
  );
}
/* Comme sur le portable, la scène 4 du téléphone laisse le bas de l'écran
   libre : c'est là que l'emblème vient se poser une fois le site en ligne. */
function TelEnLigne() {
  return (
    <g>
      <rect x="8" y="4" width="44" height="8" rx="4" fill={RAIL} />
      <rect className="mv mv-deploy" x="8" y="4" width="44" height="8" rx="4" fill={EMERALD} />
      <path
        className="mv mv-done"
        d="M20 22l6 6 12 -12"
        pathLength={1}
        fill="none"
        stroke={EMERALD}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

const SCENES = [Echange, Maquette, Developpement, EnLigne];
const SCENES_TEL = [TelEchange, TelMaquette, TelDeveloppement, TelEnLigne];

export default function MethodShowcase({ steps }: { steps: number }) {
  // On ne rend que les scènes dont l'étape existe : si l'admin passe de 4 à
  // 3 étapes, la 4e ne s'affiche pas dans le vide.
  const visibles = SCENES.slice(0, Math.min(steps, SCENES.length));
  const visiblesTel = SCENES_TEL.slice(0, Math.min(steps, SCENES_TEL.length));

  return (
    // Vue de trois-quarts plutôt que de face. La perspective est portée par
    // le parent et la rotation par le SVG : c'est ce couple qui donne la
    // profondeur, une rotation seule aplatirait l'objet.
    // Les animations internes ne sont pas affectées — leurs transformations
    // se composent avec celle-ci au lieu de l'écraser.
    <div className="[perspective:1100px]">
      <svg
        // Hauteur resserrée à 198 : sans le socle, le dessin s'arrête au bas
        // du téléphone (y = 192) et laissait sinon une bande morte.
        viewBox="-96 0 416 198"
        aria-hidden="true"
        focusable="false"
        className="h-auto w-full origin-center drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] [transform:rotateY(-22deg)_rotateX(9deg)]"
      >
      <defs>
        {/* Trio de marque, repris du logo : bleu ciel → teal → vert. */}
        <linearGradient
          id="mv-ring"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor={SKY} />
          <stop offset="0.5" stopColor={TEAL} />
          <stop offset="1" stopColor={EMERALD} />
        </linearGradient>
      </defs>

      {/* ---- Téléphone, posé devant et à gauche du portable ----
           Il joue la MÊME étape, réduite à l'essentiel : c'est le reflet
           mobile du même projet, pas une seconde histoire. */}
      <rect
        x="-88"
        y="60"
        width="74"
        height="132"
        rx="12"
        fill="#071522"
        stroke={RAIL}
        strokeWidth="2"
      />
      <path d="M-64 70h26" stroke={RAIL} strokeWidth="3" strokeLinecap="round" />
      {/* Emblème CENTRÉ dans l'écran du téléphone, DERRIÈRE la scène : il est
          dessiné avant elle, donc la scène passe par-dessus. Voir mv-brand. */}
      <g className="mv-brand">
        <Emblem cx={-51} cy={146} r={18} />
      </g>
      <g transform="translate(-84 82)">
        {visiblesTel.map((Scene, i) => (
          <g key={i} className={`frise-desc-${i + 1}`}>
            <Scene />
          </g>
        ))}
      </g>

      {/* ---- Portable ---- */}
      <rect
        x="30"
        y="8"
        width="260"
        height="150"
        rx="10"
        fill="#071522"
        stroke={RAIL}
        strokeWidth="2"
      />
      {/* Barre de fenêtre */}
      <path d="M30 26h260" stroke={RAIL} strokeWidth="2" />
      <circle cx="44" cy="17" r="2.5" fill={RAIL} />
      <circle cx="53" cy="17" r="2.5" fill={RAIL} />
      <circle cx="62" cy="17" r="2.5" fill={RAIL} />
      <rect x="74" y="13.5" width="82" height="7" rx="3.5" fill={RAIL} opacity="0.7" />

      {/* Emblème CENTRÉ dans la zone d'écran (x 30-290, barre de fenêtre
          jusqu'à 26 : le centre tombe à 160/92), et dessiné AVANT les scènes
          pour passer derrière elles. Il a d'abord été un favicon dans la
          barre d'onglet, puis une vignette en haut à gauche : dans les deux
          cas c'était une décoration posée à côté de l'animation. Ici il en
          fait partie — voir mv-brand. */}
      <g className="mv-brand">
        <Emblem cx={160} cy={90} r={25} />
      </g>

      {/* Les scènes, décalées sous la barre de fenêtre. Chacune emprunte la
          fenêtre d'affichage de son étape (frise-desc-N). */}
      <g transform="translate(38 30)">
        {visibles.map((Scene, i) => (
          <g key={i} className={`frise-desc-${i + 1}`}>
            <Scene />
          </g>
        ))}
      </g>

      {/* Pas de socle : l'écran flotte seul. Le pied dessiné en perspective
          alourdissait l'ensemble sans rien apporter, l'objet se lit très bien
          comme un simple écran posé à côté du téléphone. */}
      </svg>
    </div>
  );
}
