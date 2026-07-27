// Défilement fluide maison, partagé entre les flèches de navigation (ScrollNav)
// et les liens d'ancre du menu (Navbar).
//
// Piloté par un timer (setInterval) et non par requestAnimationFrame (throttlé
// dans certains contextes). On neutralise aussi temporairement
// `scroll-behavior: smooth` (défini globalement en CSS) via un style inline
// `auto` : sinon le smooth natif l'emporte et cale sur les pages très animées,
// empêchant tout défilement programmatique de progresser.

// Une seule animation à la fois. Deux clics rapprochés lançaient auparavant deux
// timers concurrents qui corrompaient la restauration de `scroll-behavior`
// (laissant `auto` figé en inline, ce qui désactivait le smooth sur tout le site).
let activeTimer: number | null = null;
let baseBehavior = "";

export function animateScrollTo(
  target: number,
  onTick?: () => void,
  duration = 280,
  // Appelé une fois l'animation terminée. Sert au recalage de `scrollToId`.
  onDone?: () => void
) {
  const el = document.documentElement;

  if (activeTimer !== null) {
    // Une animation tourne déjà : on l'annule mais on conserve le
    // `baseBehavior` d'origine (ne pas recapturer le "auto" déjà posé).
    window.clearInterval(activeTimer);
    activeTimer = null;
  } else {
    baseBehavior = el.style.scrollBehavior;
  }
  el.style.scrollBehavior = "auto";

  const start = window.scrollY;
  const distance = target - start;
  if (Math.abs(distance) < 2) {
    el.style.scrollBehavior = baseBehavior;
    // Déjà à destination : le recalage doit tout de même avoir sa chance, la
    // disposition ayant pu bouger depuis le calcul de la cible.
    onDone?.();
    return;
  }

  const ease = (t: number) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const startTime = performance.now();
  activeTimer = window.setInterval(() => {
    const p = Math.min(1, (performance.now() - startTime) / duration);
    window.scrollTo(0, Math.round(start + distance * ease(p)));
    onTick?.();
    if (p >= 1) {
      if (activeTimer !== null) window.clearInterval(activeTimer);
      activeTimer = null;
      el.style.scrollBehavior = baseBehavior;
      onDone?.();
    }
  }, 16);
}

// Position de défilement idéale pour arriver sur une section : son BORD HAUT
// vient se caler juste sous le bandeau, qui est `sticky` et recouvre donc le
// contenu dès qu'on quitte le haut de page.
//
// Depuis que chaque section d'accueil fait exactement la hauteur utile de
// l'écran (`.section-screen` : 100svh moins le bandeau), cet alignement suffit
// à ce que la section remplisse la fenêtre au pixel près. La version
// précédente calait le PREMIER TITRE sous le bandeau : avec des sections au
// contenu centré verticalement, cela faisait dépasser le haut de la section
// derrière le bandeau et coupait son bas.
//
// La hauteur du bandeau est mesurée en direct plutôt que lue dans
// `--header-h` : c'est la valeur réellement rendue qui compte.
export function sectionScrollTarget(section: HTMLElement): number {
  const header = document.querySelector("header");
  const headerH = header ? header.offsetHeight : 72;
  const top = section.getBoundingClientRect().top + window.scrollY;
  return Math.max(0, Math.round(top - headerH));
}

// Fait défiler vers la section d'id donné. Retourne false si absente de la page.
export function scrollToId(id: string): boolean {
  const section = document.getElementById(id);
  if (!section) return false;

  animateScrollTo(sectionScrollTarget(section), undefined, 280, () => {
    // Recalage après coup. La cible est calculée AVANT le défilement, sur une
    // page qui n'a pas encore sa disposition finale : les blocs de la section
    // visée sont encore décalés de 20 px par leur animation d'apparition, et
    // sur mobile le tiroir du menu est encore ouvert au moment du clic. Le
    // titre arrivait ainsi 24 px trop haut, c'est-à-dire quatre pixels
    // DERRIÈRE le bandeau.
    // On remesure une fois la disposition stabilisée, et on ne rejoue une
    // animation que si l'écart se voit.
    const corrige = sectionScrollTarget(section);
    if (Math.abs(corrige - window.scrollY) > 4) animateScrollTo(corrige, undefined, 160);
  });
  return true;
}
