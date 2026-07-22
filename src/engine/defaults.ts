import type { Block, Page } from "./types";

// La page par défaut : une vraie page de site, en balises natives.
// La structure de haut niveau (header, sections, footer) est VERROUILLÉE
// (verrou: true) → insupprimable dans l'extension. Le contenu reste éditable.

function bouton(id: string, texte: string): Block {
  return { id, type: "bouton", content: { texte, lien: "#" } };
}

// Lien de navigation OHIHO : mono, capitales espacées, texte clair (pas une pilule).
function lienNav(id: string, label: string): Block {
  return {
    id,
    type: "bouton",
    content: { texte: label, lien: "#" },
    css: {
      background: "none",
      backgroundImage: "none",
      boxShadow: "none",
      color: "#eef4fc",
      padding: "0",
      minHeight: "auto",
      borderRadius: "0",
      fontFamily: "ui-monospace, monospace",
      fontSize: "13px",
      fontWeight: "500",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
    },
  };
}

// Bouton secondaire OHIHO : pilule cernée d'un filet, fond nuit translucide.
function boutonOutline(id: string, label: string): Block {
  return {
    id,
    type: "bouton",
    content: { texte: label, lien: "#" },
    css: {
      backgroundImage: "none",
      background: "rgba(9,26,41,0.6)",
      color: "#eef4fc",
      border: "1px solid #23405c",
      boxShadow: "none",
    },
  };
}

// Lien de footer : texte simple clair (pas une pilule ni du mono capitales).
function lienFooter(id: string, label: string): Block {
  return {
    id,
    type: "bouton",
    content: { texte: label, lien: "#" },
    css: {
      background: "none",
      backgroundImage: "none",
      boxShadow: "none",
      color: "#cdd6e6",
      padding: "0",
      minHeight: "auto",
      borderRadius: "0",
      fontSize: "0.875rem",
      fontWeight: "400",
      textAlign: "left",
    },
  };
}

// Carte d'argument du Hero OHIHO : fond teinté dégradé de marque + tuile + valeur + libellé.
function carteStat(id: string, valeur: string, libelle: string): Block {
  return {
    id,
    type: "groupe",
    css: {
      padding: "1.25rem",
      borderRadius: "16px",
      border: "1px solid #23405c",
      background:
        "linear-gradient(135deg, rgba(56,189,248,0.14) 0%, rgba(34,211,196,0.05) 48%, rgba(52,211,153,0.16) 100%), #102436",
    },
    children: [
      { id: id + "_tile", type: "forme", style: { forme: "carre" }, css: { width: "48px", height: "48px", borderRadius: "12px", background: "rgba(34,211,196,0.12)", marginBottom: "1rem" } },
      { id: id + "_v", type: "titre", content: { niveau: 3, texte: valeur }, css: { fontSize: "1.125rem", fontWeight: "600", margin: "0", color: "#eef4fc" } },
      { id: id + "_l", type: "texte", content: { texte: libelle }, css: { fontSize: "0.8125rem", color: "#9fb2cc", marginTop: "0.5rem" } },
    ],
  };
}

// Carte de formule (section Services OHIHO) : emplacement d'animation + texte
// (numéro, sur-titre mono, titre, description). animDroite = animation à droite.
function carteFormule(
  id: string,
  num: string,
  label: string,
  tagline: string,
  description: string,
  animDroite: boolean
): Block {
  return {
    id,
    type: "groupe",
    css: { display: "flex", gap: "1.25rem", alignItems: "flex-start", flexWrap: "wrap", flexDirection: animDroite ? "row-reverse" : "row" },
    children: [
      { id: id + "_scene", type: "groupe", css: { flex: "0 0 56%", minWidth: "280px", aspectRatio: "400 / 220", borderRadius: "12px", border: "1px solid #23405c", background: "#071522" }, children: [] },
      {
        id: id + "_txt",
        type: "groupe",
        css: { flex: "1", minWidth: "200px" },
        children: [
          {
            id: id + "_head",
            type: "groupe",
            css: { display: "flex", alignItems: "baseline", gap: "0.75rem", minHeight: "2.1rem" },
            children: [
              { id: id + "_num", type: "texte", content: { texte: num }, css: { fontFamily: "ui-monospace, monospace", fontSize: "0.875rem", color: "#22d3c4", margin: "0" } },
              { id: id + "_tag", type: "texte", content: { texte: tagline }, css: { fontFamily: "ui-monospace, monospace", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#9fb2cc", margin: "0" } },
            ],
          },
          { id: id + "_label", type: "titre", content: { niveau: 3, texte: label }, css: { fontSize: "1.5rem", fontWeight: "600", margin: "0.375rem 0 0", color: "#eef4fc" } },
          { id: id + "_desc", type: "texte", content: { texte: description }, css: { fontSize: "0.875rem", lineHeight: "1.6", color: "#eef4fc", marginTop: "0.625rem" } },
        ],
      },
    ],
  };
}

// Carte de réalisation (Portfolio OHIHO) : tuile d'icône + catégorie + titre + description + action.
function carteProjet(
  id: string,
  iconSrc: string,
  iconBg: string,
  categorie: string,
  titre: string,
  description: string,
  action: string,
  actionCouleur: string
): Block {
  return {
    id,
    type: "groupe",
    css: {
      padding: "1.5rem",
      borderRadius: "16px",
      border: "1px solid #23405c",
      background: "linear-gradient(135deg, rgba(52,211,153,0.16) 0%, rgba(34,211,196,0.05) 48%, rgba(56,189,248,0.16) 100%), #071522",
      display: "flex",
      flexDirection: "column",
    },
    children: [
      {
        id: id + "_head",
        type: "groupe",
        css: { display: "flex", alignItems: "center", gap: "1rem" },
        children: [
          { id: id + "_icon", type: "image", content: { src: iconSrc, alt: "" }, css: { width: "80px", height: "80px", borderRadius: "16px", background: iconBg, flex: "none" } },
          {
            id: id + "_meta",
            type: "groupe",
            children: [
              { id: id + "_cat", type: "texte", content: { texte: categorie }, css: { margin: "0", fontFamily: "ui-monospace, monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#22d3c4" } },
              { id: id + "_title", type: "titre", content: { niveau: 3, texte: titre }, css: { fontSize: "1.125rem", fontWeight: "600", margin: "0.5rem 0 0", color: "#eef4fc" } },
            ],
          },
        ],
      },
      { id: id + "_desc", type: "texte", content: { texte: description }, css: { fontSize: "0.875rem", lineHeight: "1.6", color: "#9fb2cc", marginTop: "1.25rem" } },
      { id: id + "_action", type: "texte", content: { texte: action }, css: { marginTop: "1.25rem", fontSize: "0.875rem", fontWeight: "500", color: actionCouleur } },
    ],
  };
}

// En-tête de section : pastille verte + intitulé mono en majuscules.
function kicker(id: string, texte: string): Block {
  return {
    id,
    type: "groupe",
    css: { display: "inline-flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" },
    children: [
      { id: id + "_dot", type: "forme", style: { forme: "cercle" }, css: { width: "0.4rem", height: "0.4rem", background: "#34d399", boxShadow: "0 0 8px rgba(52,211,153,0.7)" } },
      { id: id + "_t", type: "texte", content: { texte }, css: { margin: "0", fontFamily: "ui-monospace, monospace", fontSize: "0.6875rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#22d3c4" } },
    ],
  };
}

// Une étape de la Méthode (numéro + titre + description).
function etapeMethode(id: string, num: string, titre: string, desc: string): Block {
  return {
    id, type: "groupe",
    css: { padding: "1.5rem", border: "1px solid #23405c", borderRadius: "16px", background: "#102436" },
    children: [
      { id: id + "_num", type: "texte", content: { texte: num }, css: { margin: "0", fontFamily: "ui-monospace, monospace", fontSize: "0.875rem", color: "#22d3c4" } },
      { id: id + "_t", type: "titre", content: { niveau: 3, texte: titre }, css: { fontSize: "1.125rem", fontWeight: "600", margin: "0.5rem 0 0", color: "#eef4fc" } },
      { id: id + "_d", type: "texte", content: { texte: desc }, css: { fontSize: "0.875rem", lineHeight: "1.6", color: "#9fb2cc", marginTop: "0.5rem" } },
    ],
  };
}

// Une valeur « Pourquoi OHIHO » (titre + description).
function carteValeur(id: string, titre: string, desc: string): Block {
  return {
    id, type: "groupe",
    css: { padding: "1.5rem", border: "1px solid #23405c", borderRadius: "16px", background: "#102436" },
    children: [
      { id: id + "_t", type: "titre", content: { niveau: 3, texte: titre }, css: { fontSize: "1rem", fontWeight: "600", margin: "0", color: "#eef4fc" } },
      { id: id + "_d", type: "texte", content: { texte: desc }, css: { fontSize: "0.875rem", lineHeight: "1.6", color: "#9fb2cc", marginTop: "0.5rem" } },
    ],
  };
}

// Un point fort BugTrack (titre + description).
function pointBug(id: string, titre: string, desc: string): Block {
  return {
    id, type: "groupe",
    css: { padding: "1.25rem", border: "1px solid #23405c", borderRadius: "14px", background: "#0d1e30" },
    children: [
      { id: id + "_t", type: "titre", content: { niveau: 3, texte: titre }, css: { fontSize: "0.95rem", fontWeight: "600", margin: "0", color: "#eef4fc" } },
      { id: id + "_d", type: "texte", content: { texte: desc }, css: { fontSize: "0.85rem", lineHeight: "1.55", color: "#9fb2cc", marginTop: "0.4rem" } },
    ],
  };
}

// Une ligne « Ce qu'on couvre » (pastille + libellé).
function covLine(id: string, texte: string): Block {
  return {
    id, type: "groupe",
    css: { display: "flex", alignItems: "center", gap: "0.7rem", padding: "0.55rem 0" },
    children: [
      { id: id + "_d", type: "forme", style: { forme: "cercle" }, css: { width: "0.4rem", height: "0.4rem", background: "#22d3c4", flex: "none" } },
      { id: id + "_t", type: "texte", content: { texte }, css: { margin: "0", fontSize: "0.9rem", color: "#eef4fc" } },
    ],
  };
}

export const pageDemo: Page = {
  id: "demo",
  titre: "Mon site",
  blocks: [
    // --- HEADER (verrouillé) : Navbar OHIHO — logo + liens de section + compte ---
    {
      id: "hdr",
      type: "header",
      verrou: true,
      css: {
        background: "#071522",
        borderBottom: "1px solid rgba(238,244,252,0.1)",
        position: "sticky",
        top: "0",
        zIndex: "50",
      },
      children: [
        {
          id: "hdr_bar",
          type: "groupe",
          css: {
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "1rem 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          },
          children: [
            // Logo : emblème + wordmark OHIHO
            {
              id: "hdr_logo",
              type: "groupe",
              css: { display: "flex", alignItems: "center", gap: "0.5rem" },
              children: [
                { id: "logo_img", type: "image", content: { src: "/logo-mark.svg", alt: "OHIHO" }, css: { width: "40px", height: "40px" } },
                { id: "logo_txt", type: "titre", content: { niveau: 1, texte: "OHIHO" }, css: { fontSize: "20px", fontWeight: "600", letterSpacing: "-0.03em" } },
              ],
            },
            // Navigation + compte
            {
              id: "hdr_nav",
              type: "groupe",
              css: { display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" },
              children: [
                lienNav("nav_services", "Services"),
                lienNav("nav_methode", "Méthode"),
                lienNav("nav_expertise", "Expertise"),
                lienNav("nav_apropos", "À propos"),
                lienNav("nav_bugtrack", "BugTrack"),
                lienNav("nav_realisations", "Réalisations"),
                lienNav("nav_contact", "Contact"),
                boutonOutline("nav_connexion", "Connexion"),
                bouton("nav_inscription", "S'inscrire"),
              ],
            },
          ],
        },
      ],
    },

    // --- HERO (verrouillé) : Hero OHIHO (sans la vitrine animée) ---
    {
      id: "hero",
      type: "section",
      verrou: true,
      css: { maxWidth: "1280px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" },
      children: [
        // Kicker « ● Développement web & applications sur mesure »
        {
          id: "hero_kicker",
          type: "groupe",
          css: { display: "inline-flex", alignItems: "center", gap: "0.6rem", marginBottom: "2rem" },
          children: [
            { id: "hero_dot", type: "forme", style: { forme: "cercle" }, css: { width: "0.4rem", height: "0.4rem", background: "#34d399", boxShadow: "0 0 8px rgba(52,211,153,0.7)" } },
            { id: "hero_kicker_t", type: "texte", content: { texte: "Développement web & applications sur mesure" }, css: { margin: "0", fontFamily: "ui-monospace, monospace", fontSize: "0.6875rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#22d3c4" } },
          ],
        },
        // Titre : « Site web et application web » + « sur mesure » (dégradé)
        {
          id: "hero_title",
          type: "groupe",
          css: { display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0.5rem", maxWidth: "46rem", marginBottom: "2rem" },
          children: [
            { id: "hero_title_lead", type: "titre", content: { niveau: 1, texte: "Site web et application web" }, css: { fontSize: "3.5rem", fontWeight: "600", lineHeight: "1.05", letterSpacing: "-0.03em", color: "#eef4fc", margin: "0" } },
            { id: "hero_title_accent", type: "texte", content: { texte: "sur mesure" }, css: { fontSize: "3.5rem", fontWeight: "600", lineHeight: "1.05", letterSpacing: "-0.03em", margin: "0", backgroundImage: "linear-gradient(100deg, #38bdf8 0%, #22d3c4 50%, #34d399 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" } },
          ],
        },
        // Sous-titre
        {
          id: "hero_sub",
          type: "texte",
          content: { texte: "De l'idée au déploiement, nous concevons et développons votre site ou application sur mesure, avec un accompagnement dans la durée." },
          css: { maxWidth: "36rem", fontSize: "1.125rem", lineHeight: "1.7", color: "#9fb2cc", marginBottom: "2.5rem" },
        },
        // Boutons
        {
          id: "hero_ctas",
          type: "groupe",
          css: { display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2.5rem" },
          children: [
            { id: "hero_cta1", type: "bouton", content: { texte: "Demander un devis", lien: "#" }, css: { padding: "0.85rem 1.75rem" } },
            boutonOutline("hero_cta2", "Voir nos réalisations"),
          ],
        },
        // 4 arguments
        {
          id: "hero_stats",
          type: "groupe",
          css: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" },
          children: [
            carteStat("stat_1", "Sur mesure", "Approche"),
            carteStat("stat_2", "De A à Z", "Accompagnement"),
            carteStat("stat_3", "Moderne", "Stack"),
            carteStat("stat_4", "Sur devis", "Délai"),
          ],
        },
      ],
    },

    // --- SERVICES (verrouillé) : Services OHIHO — en-tête + 4 formules ---
    {
      id: "serv",
      type: "section",
      verrou: true,
      css: { maxWidth: "1280px", margin: "0 auto", padding: "3rem 1.5rem", borderTop: "1px solid #23405c" },
      children: [
        {
          id: "serv_kicker",
          type: "groupe",
          css: { display: "inline-flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" },
          children: [
            { id: "serv_dot", type: "forme", style: { forme: "cercle" }, css: { width: "0.4rem", height: "0.4rem", background: "#34d399", boxShadow: "0 0 8px rgba(52,211,153,0.7)" } },
            { id: "serv_kicker_t", type: "texte", content: { texte: "Nos services" }, css: { margin: "0", fontFamily: "ui-monospace, monospace", fontSize: "0.6875rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#22d3c4" } },
          ],
        },
        { id: "serv_title", type: "titre", content: { niveau: 2, texte: "De l'idée au site en ligne" }, css: { fontSize: "2.25rem", fontWeight: "600", letterSpacing: "-0.03em", maxWidth: "48rem", margin: "0", color: "#eef4fc" } },
        { id: "serv_sub", type: "texte", content: { texte: "Conception, développement et suivi dans la durée, pour un site vitrine ou une application web sur mesure, pour les entreprises comme pour les particuliers." }, css: { maxWidth: "42rem", lineHeight: "1.6", color: "#9fb2cc", marginTop: "0.75rem" } },
        { id: "serv_rule", type: "groupe", css: { height: "1px", marginTop: "1.25rem", marginBottom: "1.5rem", background: "linear-gradient(to right, #23405c, #23405c 30%, transparent)" }, children: [] },
        {
          id: "serv_grid",
          type: "groupe",
          css: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem 3rem" },
          children: [
            carteFormule("f1", "01", "Landing page", "Une page, un objectif", "Une seule page, un seul objectif : que le visiteur vous contacte. Pour un lancement, une campagne, ou une activité qui tient en une page.", true),
            carteFormule("f2", "02", "Site intermédiaire", "Plusieurs pages", "Accueil, services, à propos, contact. De quoi dérouler votre activité en détail, et donner envie de vous faire confiance.", false),
            carteFormule("f3", "03", "Refonte de site", "Un site à rafraîchir", "Votre site existe déjà mais il a vieilli. On garde vos contenus, on refait le design, la vitesse et le mobile.", true),
            carteFormule("f4", "04", "Application web", "Sur mesure", "Espace client, réservation, tableau de bord, outil interne. Un logiciel écrit pour votre métier, avec ses comptes et ses règles.", false),
          ],
        },
      ],
    },

    // --- MÉTHODE : Comment nous travaillons ensemble (4 étapes) ---
    {
      id: "method",
      type: "section",
      verrou: true,
      css: { maxWidth: "1280px", margin: "0 auto", padding: "3rem 1.5rem", borderTop: "1px solid #23405c" },
      children: [
        kicker("method_k", "Méthode"),
        { id: "method_title", type: "titre", content: { niveau: 2, texte: "Comment nous travaillons ensemble" }, css: { fontSize: "2.25rem", fontWeight: "600", letterSpacing: "-0.03em", maxWidth: "48rem", margin: "0", color: "#eef4fc" } },
        {
          id: "method_grid",
          type: "groupe",
          css: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem", marginTop: "2rem" },
          children: [
            etapeMethode("m1", "01", "Échange initial", "Un échange pour comprendre votre projet, vos objectifs et votre budget, sans engagement."),
            etapeMethode("m2", "02", "Maquette & devis", "Une proposition claire, avec maquette visuelle et devis détaillé, avant de commencer le développement."),
            etapeMethode("m3", "03", "Développement", "Votre site ou application prend forme, avec des points d'étape réguliers pour suivre l'avancement."),
            etapeMethode("m4", "04", "Mise en ligne & suivi", "Déploiement, puis accompagnement dans la durée pour les évolutions et le suivi par email."),
          ],
        },
      ],
    },

    // --- EXPERTISE : Notre approche (2 paragraphes + panneau « Ce qu'on couvre ») ---
    {
      id: "expertise",
      type: "section",
      verrou: true,
      css: { borderTop: "1px solid #23405c" },
      children: [
        {
          id: "exp_inner",
          type: "groupe",
          css: { maxWidth: "1280px", margin: "0 auto", padding: "3.5rem 1.5rem", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "3rem", alignItems: "start" },
          children: [
            {
              id: "exp_left",
              type: "groupe",
              children: [
                kicker("exp_k", "Notre approche"),
                { id: "exp_title", type: "titre", content: { niveau: 2, texte: "Un travail soigné, une communication claire, du début à la fin" }, css: { fontSize: "2rem", fontWeight: "600", letterSpacing: "-0.03em", margin: "0", color: "#eef4fc" } },
                { id: "exp_p1", type: "texte", content: { texte: "Chaque projet est développé avec une stack moderne et un code pensé pour durer. Pas de solution générique, pas de boîte noire. Vous savez toujours où en est votre projet." }, css: { lineHeight: "1.7", color: "#9fb2cc", marginTop: "1.5rem" } },
                { id: "exp_p2", type: "texte", content: { texte: "Une fois votre site ou application en ligne, l'accompagnement continue : les demandes d'évolution ou de correction se font simplement par email, jusqu'à leur résolution." }, css: { lineHeight: "1.7", color: "#9fb2cc", marginTop: "1rem" } },
              ],
            },
            {
              id: "exp_panel",
              type: "groupe",
              css: { padding: "1.75rem", border: "1px solid #23405c", borderRadius: "18px", background: "#102436" },
              children: [
                { id: "exp_panel_t", type: "titre", content: { niveau: 3, texte: "Ce qu'on couvre" }, css: { fontSize: "0.75rem", fontFamily: "ui-monospace, monospace", textTransform: "uppercase", letterSpacing: "0.15em", color: "#22d3c4", margin: "0 0 1rem" } },
                covLine("cov1", "Sites vitrines"),
                covLine("cov2", "Applications web sur mesure"),
                covLine("cov3", "Refonte de sites existants"),
                covLine("cov4", "Maintenance & évolutions"),
              ],
            },
          ],
        },
      ],
    },

    // --- POURQUOI OHIHO : 4 valeurs ---
    {
      id: "whyus",
      type: "section",
      verrou: true,
      css: { maxWidth: "1280px", margin: "0 auto", padding: "3.5rem 1.5rem", borderTop: "1px solid #23405c" },
      children: [
        kicker("why_k", "Pourquoi OHIHO"),
        { id: "why_title", type: "titre", content: { niveau: 2, texte: "Un accompagnement qui continue après la mise en ligne" }, css: { fontSize: "2.25rem", fontWeight: "600", letterSpacing: "-0.03em", maxWidth: "48rem", margin: "0", color: "#eef4fc" } },
        {
          id: "why_grid",
          type: "groupe",
          css: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem", marginTop: "2rem" },
          children: [
            carteValeur("v1", "Un travail soigné & durable", "Une stack moderne et un code lisible, pensés pour évoluer avec votre projet, pas contre lui."),
            carteValeur("v2", "Communication claire", "Pas de jargon technique. Vous comprenez toujours où en est votre projet et pourquoi."),
            carteValeur("v3", "Livraison dans les délais", "Un devis clair en amont, et des points d'étape réguliers pour suivre l'avancement sans surprise."),
            carteValeur("v4", "Accompagnement dans la durée", "Après la mise en ligne, nous restons disponibles pour les évolutions et corrections, par email."),
          ],
        },
      ],
    },

    // --- BUGTRACK : notre outil de suivi (chapeau + 4 points) ---
    {
      id: "bugtrack",
      type: "section",
      verrou: true,
      css: { borderTop: "1px solid #23405c" },
      children: [
        {
          id: "bt_inner",
          type: "groupe",
          css: { maxWidth: "1280px", margin: "0 auto", padding: "3.5rem 1.5rem" },
          children: [
            kicker("bt_k", "Notre outil"),
            { id: "bt_title", type: "titre", content: { niveau: 2, texte: "BugTrack, le suivi que nous branchons sur votre site" }, css: { fontSize: "2.25rem", fontWeight: "600", letterSpacing: "-0.03em", maxWidth: "48rem", margin: "0", color: "#eef4fc" } },
            {
              id: "bt_grid",
              type: "groupe",
              css: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginTop: "2rem" },
              children: [
                pointBug("bt1", "Vous signalez, rien ne se perd", "Une anomalie ou une demande d'évolution se dépose dans votre espace plutôt que dans un email qui se perd. Chaque demande a sa référence, sa priorité et son état."),
                pointBug("bt2", "Vous savez toujours où ça en est", "Reçue, en cours d'analyse, corrigée : le statut est visible à tout moment, et les échanges restent attachés à la demande plutôt qu'éparpillés dans une boîte mail."),
                pointBug("bt3", "Rien ne dort indéfiniment", "Vous êtes prévenu par email à chaque avancée, et les demandes restées sans réponse remontent puis se clôturent d'elles-mêmes plutôt que d'encombrer la liste."),
                pointBug("bt4", "Un espace par client", "Chaque compte ne voit que ses propres demandes. L'outil sert plusieurs projets sans que les clients se croisent."),
              ],
            },
          ],
        },
      ],
    },

    // --- PORTFOLIO (verrouillé) : Réalisations OHIHO ---
    {
      id: "portfolio",
      type: "section",
      verrou: true,
      css: { borderTop: "1px solid #23405c" },
      children: [
        {
          id: "pf_inner",
          type: "groupe",
          css: { maxWidth: "1280px", margin: "0 auto", padding: "3.5rem 1.5rem" },
          children: [
            {
              id: "pf_kicker",
              type: "groupe",
              css: { display: "inline-flex", alignItems: "center", gap: "0.6rem" },
              children: [
                { id: "pf_dot", type: "forme", style: { forme: "cercle" }, css: { width: "0.4rem", height: "0.4rem", background: "#34d399", boxShadow: "0 0 8px rgba(52,211,153,0.7)" } },
                { id: "pf_kicker_t", type: "texte", content: { texte: "Réalisations" }, css: { margin: "0", fontFamily: "ui-monospace, monospace", fontSize: "0.6875rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#22d3c4" } },
              ],
            },
            { id: "pf_title", type: "titre", content: { niveau: 2, texte: "Des projets concrets, en ligne" }, css: { fontSize: "2.25rem", fontWeight: "600", letterSpacing: "-0.03em", maxWidth: "48rem", margin: "1.5rem 0 0", color: "#eef4fc" } },
            { id: "pf_sub", type: "texte", content: { texte: "Cadance Coaching est un projet réel, livré et utilisé par un client. Un aperçu de ce que nous pouvons construire pour vous." }, css: { maxWidth: "42rem", lineHeight: "1.6", color: "#9fb2cc", marginTop: "1.25rem" } },
            { id: "pf_rule", type: "groupe", css: { height: "1px", marginTop: "1.5rem", marginBottom: "2rem", background: "linear-gradient(to right, #23405c, #23405c 30%, transparent)" }, children: [] },
            {
              id: "pf_grid",
              type: "groupe",
              css: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" },
              children: [
                carteProjet("proj1", "/realisations/cadance-coaching.svg", "#E11D2A", "Site vitrine", "Cadance Coaching", "Site vitrine pour une salle de sport, avec un espace admin permettant au client de modifier lui-même les textes, la galerie, le planning des cours et les tarifs, sans toucher au code.", "Voir le site →", "#22d3c4"),
                carteProjet("proj2", "/realisations/bugtrack.svg", "transparent", "Application web", "BugTrack", "Outil de suivi des demandes et des anomalies : création de tickets, priorités, statuts, fil de discussion avec le client et notifications par email. Les tickets sans réponse se clôturent automatiquement.", "Accès privé", "#9fb2cc"),
                carteProjet("proj3", "/realisations/mailys-solutions.svg", "transparent", "Site vitrine & back-office", "Mailys Solutions", "Site d'un éditeur d'applications métier, construit pour le référencement : une page par requête, données structurées, blog. Un back-office complet permet de tout modifier sans toucher au code.", "Voir le site →", "#22d3c4"),
              ],
            },
            {
              id: "pf_cta",
              type: "groupe",
              css: { marginTop: "2rem", padding: "1.5rem", background: "#102436", border: "1px solid #23405c", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" },
              children: [
                { id: "pf_cta_t", type: "texte", content: { texte: "Vous avez un projet de site ou d'application en tête ?" }, css: { margin: "0", maxWidth: "36rem", fontSize: "0.875rem", color: "#9fb2cc" } },
                { id: "pf_cta_b", type: "bouton", content: { texte: "Demander un devis", lien: "#" }, css: { padding: "0.75rem 1.5rem" } },
              ],
            },
          ],
        },
      ],
    },

    // --- CONTACT (verrouillé) : Contact OHIHO — texte + carte CTA ---
    {
      id: "contact",
      type: "section",
      verrou: true,
      css: { borderTop: "1px solid #23405c", background: "#102436" },
      children: [
        {
          id: "contact_inner",
          type: "groupe",
          css: { maxWidth: "1280px", margin: "0 auto", padding: "5rem 1.5rem", display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "3rem", alignItems: "center" },
          children: [
            {
              id: "contact_left",
              type: "groupe",
              children: [
                {
                  id: "contact_kicker",
                  type: "groupe",
                  css: { display: "inline-flex", alignItems: "center", gap: "0.6rem" },
                  children: [
                    { id: "contact_dot", type: "forme", style: { forme: "cercle" }, css: { width: "0.4rem", height: "0.4rem", background: "#34d399", boxShadow: "0 0 8px rgba(52,211,153,0.7)" } },
                    { id: "contact_kicker_t", type: "texte", content: { texte: "Votre projet" }, css: { margin: "0", fontFamily: "ui-monospace, monospace", fontSize: "0.6875rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#22d3c4" } },
                  ],
                },
                { id: "contact_title", type: "titre", content: { niveau: 2, texte: "Prêt à lancer votre site ou application ?" }, css: { fontSize: "2.75rem", fontWeight: "600", letterSpacing: "-0.03em", lineHeight: "1.1", maxWidth: "44rem", margin: "1.5rem 0 0", color: "#eef4fc" } },
                { id: "contact_sub", type: "texte", content: { texte: "Créez votre compte en une minute, puis décrivez votre besoin via une demande de devis guidée. Nous revenons vers vous rapidement pour en discuter." }, css: { maxWidth: "42rem", lineHeight: "1.6", color: "#9fb2cc", marginTop: "1.25rem" } },
                { id: "contact_rule", type: "groupe", css: { height: "1px", marginTop: "3rem", background: "linear-gradient(to right, #23405c, #23405c 30%, transparent)" }, children: [] },
                {
                  id: "contact_points",
                  type: "groupe",
                  css: { display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem" },
                  children: [
                    { id: "cp1", type: "groupe", css: { display: "flex", alignItems: "center", gap: "0.75rem" }, children: [
                      { id: "cp1_dot", type: "forme", style: { forme: "cercle" }, css: { width: "0.375rem", height: "0.375rem", background: "#34d399", boxShadow: "0 0 10px rgba(52,211,153,0.8)" } },
                      { id: "cp1_t", type: "texte", content: { texte: "contact@ohiho.fr" }, css: { margin: "0", fontSize: "0.875rem", color: "#eef4fc" } },
                    ] },
                    { id: "cp2", type: "groupe", css: { display: "flex", alignItems: "center", gap: "0.75rem" }, children: [
                      { id: "cp2_dot", type: "forme", style: { forme: "cercle" }, css: { width: "0.375rem", height: "0.375rem", background: "#34d399", boxShadow: "0 0 10px rgba(52,211,153,0.8)" } },
                      { id: "cp2_t", type: "texte", content: { texte: "Réponse sous 24h ouvrées" }, css: { margin: "0", fontSize: "0.875rem", color: "#9fb2cc" } },
                    ] },
                  ],
                },
              ],
            },
            {
              id: "contact_card",
              type: "groupe",
              css: { background: "#102436", border: "1px solid #23405c", borderRadius: "16px", boxShadow: "0 1px 2px rgba(0,0,0,0.35), 0 18px 40px -24px rgba(0,0,0,0.7)", padding: "2rem" },
              children: [
                { id: "cc_title", type: "titre", content: { niveau: 3, texte: "Demander un devis" }, css: { fontSize: "1.125rem", fontWeight: "600", margin: "0", color: "#eef4fc" } },
                { id: "cc_text", type: "texte", content: { texte: "Depuis votre espace client, choisissez une formule (landing page, site vitrine, application, refonte) et recevez une proposition adaptée." }, css: { fontSize: "0.875rem", lineHeight: "1.6", color: "#9fb2cc", marginTop: "0.75rem" } },
                { id: "cc_rule", type: "groupe", css: { height: "1px", marginTop: "2rem", background: "linear-gradient(to right, #23405c, #23405c 30%, transparent)" }, children: [] },
                { id: "cc_cta", type: "bouton", content: { texte: "Demander un devis", lien: "#" }, css: { marginTop: "2rem", padding: "0.75rem 2rem" } },
                { id: "cc_login", type: "texte", content: { texte: "Déjà un compte ? Se connecter" }, css: { marginTop: "1.5rem", fontSize: "0.875rem", color: "#9fb2cc" } },
              ],
            },
          ],
        },
      ],
    },

    // --- FOOTER (verrouillé) : Footer OHIHO ---
    {
      id: "ftr",
      type: "footer",
      verrou: true,
      css: { borderTop: "1px solid #23405c", background: "#091a29" },
      children: [
        {
          id: "ftr_inner",
          type: "groupe",
          css: { maxWidth: "1280px", margin: "0 auto", padding: "3.5rem 1.5rem" },
          children: [
            {
              id: "ftr_cols",
              type: "groupe",
              css: { display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "2.5rem" },
              children: [
                {
                  id: "ftr_brand",
                  type: "groupe",
                  children: [
                    { id: "ftr_logo", type: "image", content: { src: "/logo-mark.svg", alt: "OHIHO" }, css: { width: "40px", height: "40px" } },
                    { id: "ftr_tagline", type: "texte", content: { texte: "OHIHO conçoit et développe des sites et applications web sur mesure, pour entreprises et particuliers, pensés pour durer." }, css: { maxWidth: "24rem", fontSize: "0.875rem", lineHeight: "1.6", color: "#9fb2cc", marginTop: "1rem" } },
                  ],
                },
                {
                  id: "ftr_nav",
                  type: "groupe",
                  children: [
                    { id: "ftr_nav_t", type: "titre", content: { niveau: 3, texte: "Navigation" }, css: { fontFamily: "ui-monospace, monospace", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "#9fb2cc", margin: "0" } },
                    { id: "ftr_nav_l", type: "groupe", css: { display: "flex", flexDirection: "column", gap: "0.25rem", marginTop: "0.75rem", alignItems: "flex-start" }, children: [
                      lienFooter("ftr_l1", "Services"),
                      lienFooter("ftr_l2", "Expertise"),
                      lienFooter("ftr_l3", "Réalisations"),
                      lienFooter("ftr_l4", "Contact"),
                    ] },
                  ],
                },
                {
                  id: "ftr_contact",
                  type: "groupe",
                  children: [
                    { id: "ftr_contact_t", type: "titre", content: { niveau: 3, texte: "Contact" }, css: { fontFamily: "ui-monospace, monospace", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "#9fb2cc", margin: "0" } },
                    { id: "ftr_contact_l", type: "groupe", css: { display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.75rem" }, children: [
                      { id: "ftr_email", type: "texte", content: { texte: "contact@ohiho.fr" }, css: { margin: "0", fontSize: "0.875rem", color: "#eef4fc" } },
                      { id: "ftr_c1", type: "texte", content: { texte: "Développement web sur mesure" }, css: { margin: "0", fontSize: "0.875rem", color: "#9fb2cc" } },
                      { id: "ftr_c2", type: "texte", content: { texte: "Réponse sous 24h ouvrées" }, css: { margin: "0", fontSize: "0.875rem", color: "#9fb2cc" } },
                    ] },
                  ],
                },
              ],
            },
            {
              id: "ftr_bottom",
              type: "groupe",
              css: { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid #23405c", fontFamily: "ui-monospace, monospace", fontSize: "0.75rem", color: "#9fb2cc" },
              children: [
                { id: "ftr_copy", type: "texte", content: { texte: "© 2026 OHIHO. Tous droits réservés." }, css: { margin: "0" } },
                { id: "ftr_by", type: "texte", content: { texte: "Réalisé par OHIHO" }, css: { margin: "0" } },
                { id: "ftr_note", type: "texte", content: { texte: "Création de sites web & applications" }, css: { margin: "0" } },
              ],
            },
          ],
        },
      ],
    },
  ],
};
