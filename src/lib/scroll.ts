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
  duration = 280
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
    }
  }, 16);
}

// Petit espace entre le header et le titre de la section une fois arrivé.
const LANDING_GAP = 20;

// Position de défilement idéale pour arriver sur une section : on cale son
// PREMIER TITRE juste sous le header (dont la hauteur est mesurée en direct, car
// elle varie selon la taille d'écran), plutôt que le bord haut de la section —
// sinon la grande marge interne de la section laisse une bande vide sous le header.
export function sectionScrollTarget(section: HTMLElement): number {
  const header = document.querySelector("header");
  const headerH = header ? header.offsetHeight : 72;
  const anchor =
    section.querySelector<HTMLElement>("h1, h2, h3, p") ?? section;
  const anchorTop = anchor.getBoundingClientRect().top + window.scrollY;
  return Math.max(0, Math.round(anchorTop - headerH - LANDING_GAP));
}

// Fait défiler vers la section d'id donné. Retourne false si absente de la page.
export function scrollToId(id: string): boolean {
  const section = document.getElementById(id);
  if (!section) return false;
  animateScrollTo(sectionScrollTarget(section));
  return true;
}
