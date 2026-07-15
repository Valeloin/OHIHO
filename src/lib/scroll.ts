// Défilement fluide maison, partagé entre les flèches de navigation (ScrollNav)
// et les liens d'ancre du menu (Navbar).
//
// Piloté par un timer (setInterval) et non par requestAnimationFrame (throttlé
// dans certains contextes). On neutralise aussi temporairement
// `scroll-behavior: smooth` (défini globalement en CSS) via un style inline
// `auto` : sinon le smooth natif l'emporte et cale sur les pages très animées,
// empêchant tout défilement programmatique de progresser.

export function animateScrollTo(
  target: number,
  onTick?: () => void,
  duration = 550
) {
  const el = document.documentElement;
  const previous = el.style.scrollBehavior;
  el.style.scrollBehavior = "auto";
  const start = window.scrollY;
  const distance = target - start;
  if (Math.abs(distance) < 2) {
    el.style.scrollBehavior = previous;
    return;
  }
  const ease = (t: number) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const startTime = performance.now();
  const timer = window.setInterval(() => {
    const p = Math.min(1, (performance.now() - startTime) / duration);
    window.scrollTo(0, Math.round(start + distance * ease(p)));
    onTick?.();
    if (p >= 1) {
      window.clearInterval(timer);
      el.style.scrollBehavior = previous;
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
