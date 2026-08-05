# Passation — section contact OHIHO

Cette branche part de la version actuellement gérée par Claude. Elle ne demande pas de reprendre toute la refonte Codex : il faut uniquement adapter ou remplacer la section de contact finale avec la direction ci-dessous.

## Intention

Créer une conclusion de page lumineuse, éditoriale et immédiatement identifiable comme OHIHO. La section doit tenir dans un écran sur ordinateur, rester fluide sur tablette et passer en colonne sur mobile.

Le fond reprend la palette du héros :

~~~css
background: linear-gradient(
  118deg,
  #1e84ba 0%,
  #199aab 38%,
  #17aa91 72%,
  #2bb67e 112%
);
~~~

## Composition

La section contient trois zones reliées visuellement.

### 1. À gauche — l'appel à l'action

Titre :

~~~text
Un projet
en tête ?
Parlons-en.
~~~

Les deux premières lignes sont en sans-serif blanc. « Parlons-en. » utilise la serif de la marque en bleu nuit `#071d2b`.

Texte d'accompagnement :

> Une idée à lancer, un site à repenser ou un outil à imaginer ? Racontez-moi où vous en êtes. Je vous réponds avec un premier regard clair et des pistes concrètes.

Ajouter un badge animé « Réponse sous 24h ouvrées » : léger flottement vertical, reflet traversant périodiquement le badge et point vert qui pulse. Ne mentionner aucune zone géographique : OHIHO peut travailler partout dans le monde.

### 2. Au centre — noyau orbital

Créer un système circulaire suffisamment présent pour éviter un vide entre le titre et le QR code :

- logo OHIHO au centre dans un disque clair ;
- deux cercles concentriques fins et translucides ;
- une orbite extérieure en pointillés, en rotation lente ;
- trois petits libellés autour : « Une idée », « Un échange », « Un projet » ;
- un point vert lumineux qui parcourt l'orbite.

Le noyau est décoratif (`aria-hidden="true"`). Il disparaît entre 901 et 1120 px afin de préserver l'espace, puis la section passe en colonne sous 900 px.

### 3. À droite — carte LinkedIn

Afficher une carte claire, légèrement surélevée, comprenant :

- pictogramme LinkedIn ;
- titre « Échangeons sur LinkedIn » ;
- grand QR code carré ;
- nom « Valentin Condamy » ;
- fonction « Fondateur & designer-développeur · OHIHO » ;
- mention « Scannez ou cliquez ».

La carte entière pointe vers :

`https://www.linkedin.com/in/valentin-condamy-966656423/`

Le QR code encode exactement cette même URL. Il doit rester carré à toutes les résolutions.

## Ambiance animée

Ajouter en arrière-plan :

- quatorze petites lucioles blanc-vert, aux trajectoires et rythmes légèrement différents ;
- trois cercles qui se propagent depuis un même centre, comme les ondes créées par un caillou dans l'eau ;
- chaque onde grandit puis s'efface avant que la suivante ne démarre.

Les animations restent derrière le texte et la carte, sans réduire la lisibilité.

## Ligne de fermeture

En bas de la section, ajouter une fine séparation puis :

- « Premier échange libre, sans engagement. » ;
- « Site vitrine · Landing page · Refonte · Application web ».

## Responsive

- Ordinateur : hauteur exacte `100svh`, composition en trois colonnes.
- Écran intermédiaire : masquer le noyau orbital et passer en deux colonnes.
- Mobile/tablette : hauteur automatique avec `min-height: 100svh`, contenu en une colonne.
- Le titre, le QR code, les cercles et les marges doivent conserver leurs proportions lorsque la fenêtre change de taille.
- Le QR code reste carré et les ondes restent circulaires.

## Accessibilité

- Respecter `prefers-reduced-motion` en désactivant les orbites, ondes, lucioles et flottements.
- Lien LinkedIn accessible au clavier avec un libellé explicite.
- QR code avec texte alternatif décrivant sa destination.
- Conserver un contraste suffisant pour le texte blanc et bleu nuit.

## À ne pas reprendre

- Ne pas importer les autres sections de la refonte Codex.
- Ne pas ajouter d'adresse e-mail dans cette section.
- Ne pas ajouter « Montpellier », « France » ou une limitation géographique.
- Ne pas transformer la section en thème sombre.
