# Passation — fond du héros et carrousel latéral OHIHO

Cette branche part de la dernière version de l’ancien site OHIHO, avant la refonte Codex.
Elle ne demande pas de remplacer le héros existant : il faut uniquement reprendre les deux idées ci-dessous.

## 1. Fond du héros

Conserver la structure, les textes et les interactions du héros actuel géré par Claude, mais remplacer son ambiance sombre par le fond lumineux de la refonte :

~~~css
background:
  linear-gradient(
    118deg,
    #2187ba 0%,
    #1f91b1 31%,
    #19a99c 67%,
    #28b681 112%
  );
~~~

Le fond doit rester aérien et vivant :

- dégradé continu du bleu vers le vert émeraude ;
- quelques lucioles blanches/vert pâle, petites et diffuses ;
- halo très léger derrière la vitrine animée ;
- titres blancs, avec le mot d’accent en bleu nuit ;
- aucun grand aplat sombre supplémentaire.

La mécanique AnimatedGlow et Fireflies déjà présente dans src/components/Hero.tsx peut être conservée, mais éclaircie pour se fondre dans ce dégradé.

## 2. Carrousel d’animations

Conserver les quatre scènes et leur horloge actuelle. La composition demandée est un coverflow uniquement horizontal :

1. une carte principale, grande et nette au centre ;
2. une carte secondaire réduite à droite ;
3. une carte réduite derrière la carte centrale ;
4. une carte secondaire réduite à gauche ;
5. retour de la carte au premier plan.

La trajectoire doit rester strictement latérale : aucune carte ne monte au-dessus de la composition.

Référence de mouvement :

~~~css
@keyframes ohiho-horizontal-carousel {
  0%, 100% {
    z-index: 5;
    left: 50%;
    top: 50%;
    opacity: 1;
    filter: brightness(1);
    transform: translate(-50%, -50%) scale(.82);
  }
  23%, 27% {
    z-index: 3;
    left: 82%;
    top: 50%;
    opacity: .72;
    filter: brightness(.78);
    transform: translate(-50%, -50%) scale(.45);
  }
  48%, 52% {
    z-index: 1;
    left: 50%;
    top: 50%;
    opacity: .30;
    filter: brightness(.58);
    transform: translate(-50%, -50%) scale(.34);
  }
  73%, 77% {
    z-index: 3;
    left: 18%;
    top: 50%;
    opacity: .65;
    filter: brightness(.74);
    transform: translate(-50%, -50%) scale(.45);
  }
}
~~~

Les quatre cartes utilisent la même animation sur 32 secondes, avec des décalages de -8s, -16s et -24s.

## Contraintes à préserver

- Ne pas reprendre les autres sections de la refonte Codex.
- Ne pas modifier les textes, boutons, statistiques ou routes de l’ancien héros.
- Conserver les quatre animations originales de Claude.
- Garder les onglets de progression cliquables.
- Respecter prefers-reduced-motion.
- Vérifier desktop et mobile avant de fusionner.
