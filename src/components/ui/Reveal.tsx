"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Décalage en millisecondes, pour faire apparaître une grille en cascade. */
  delay?: number;
};

// Apparition au défilement. Toute l'animation vit dans globals.css
// (`[data-reveal]`) : ce composant ne fait que basculer l'attribut quand
// l'élément entre dans l'écran, puis se débranche — l'élément ne doit
// réapparaître qu'une fois, pas à chaque passage.
export default function Reveal({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const montrer = () => {
      el.dataset.reveal = "in";
    };

    // Ce qui est déjà à l'écran au chargement apparaît sans attendre
    // l'observateur : dans un onglet ouvert en arrière-plan, celui-ci ne se
    // déclenche pas tant que l'onglet n'est pas affiché, et le haut de page
    // resterait invisible.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      montrer();
      return;
    }

    // Repli : sans IntersectionObserver, on montre tout de suite.
    if (typeof IntersectionObserver === "undefined") {
      montrer();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        montrer();
        observer.disconnect();
      },
      // On déclenche un peu avant que l'élément touche le bas de l'écran.
      { rootMargin: "0px 0px -12% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal="out"
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
