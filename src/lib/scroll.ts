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

// Fait défiler vers l'élément d'id donné (compense la navbar sticky).
// Retourne false si l'élément n'existe pas sur la page courante.
export function scrollToId(id: string, offset = 80): boolean {
  const target = document.getElementById(id);
  if (!target) return false;
  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
  animateScrollTo(top);
  return true;
}
