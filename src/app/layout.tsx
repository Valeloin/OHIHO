import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE } from "@/lib/site";

// Polices servies depuis le dépôt : aucune requête vers un domaine extérieur,
// donc pas de texte invisible le temps du chargement.
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ohiho.fr"),
  title: {
    default: "OHIHO · Création de sites web et applications sur mesure",
    template: "%s · OHIHO",
  },
  description:
    "OHIHO conçoit et développe des sites vitrines et applications web sur mesure à Montpellier. Un interlocuteur unique, un devis clair, une date tenue.",
  keywords: [
    "création site web Montpellier",
    "développeur web freelance",
    "site vitrine sur mesure",
    "refonte site web",
    "application web sur mesure",
    "OHIHO",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "OHIHO · Création de sites web et applications sur mesure",
    description:
      "Des sites vitrines et applications web sur mesure, de l'idée à la mise en ligne.",
    type: "website",
    locale: "fr_FR",
    url: "https://ohiho.fr",
    siteName: "OHIHO",
    // PNG et non SVG : la plupart des réseaux sociaux n'affichent pas les
    // images SVG en partage. Ce visuel est sur fond sombre alors que le site
    // est passé en clair — une image de partage dédiée (1200×630) reste à
    // produire.
    images: [
      {
        url: "/logo_horizontal_dark.png",
        width: 1192,
        height: 360,
        alt: "OHIHO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OHIHO · Création de sites web et applications sur mesure",
    description:
      "Des sites vitrines et applications web sur mesure, de l'idée à la mise en ligne.",
    images: ["/logo_horizontal_dark.png"],
  },
  // Le SVG est déclaré en premier : les navigateurs modernes le préfèrent et
  // il porte l'anneau au dégradé de marque. Les PNG restent en repli — ils
  // datent de l'anneau argenté et sont encore à régénérer.
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon-180.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  // La barre d'adresse des navigateurs mobiles prend la couleur du fond —
  // une valeur par mode, sinon elle reste bleu pastel sur un site sombre.
  // (Ces deux valeurs suivent le réglage du système, pas la bascule manuelle :
  // c'est une balise statique, le navigateur ne la recalcule pas.)
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#dce9fa" },
    { media: "(prefers-color-scheme: dark)", color: "#071528" },
  ],
};

// Exécuté AVANT la première peinture. Deux choses :
//
// 1. la classe `js` sur <html>, qui autorise l'état caché des apparitions au
//    défilement — sans JavaScript elle n'arrive jamais et tout le contenu
//    reste visible (voir la fin de globals.css) ;
// 2. le thème choisi par le visiteur, relu depuis le navigateur. Il DOIT
//    être posé ici et pas dans un effet React : appliqué après le montage,
//    la page s'afficherait en clair puis basculerait en sombre sous les yeux
//    du visiteur. Sans choix enregistré, on ne pose rien et le CSS suit le
//    réglage du système.
const SCRIPT_INITIAL = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('ohiho-theme');if(t==='dark'||t==='light')d.setAttribute('data-theme',t)}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning : le script ci-dessous ajoute la classe `js` à
    // <html> avant l'hydratation, ce que React signalerait sinon comme une
    // divergence serveur/client. C'est le seul attribut concerné.
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_INITIAL }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#contenu"
          className="btn btn-ink sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
        >
          Aller au contenu
        </a>
        <Header />
        <div id="contenu" className="flex-1">
          {children}
        </div>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: SITE.name,
              description: SITE.tagline,
              url: SITE.url,
              email: SITE.email,
              founder: { "@type": "Person", name: SITE.person },
              areaServed: "France",
              address: {
                "@type": "PostalAddress",
                addressLocality: SITE.city,
                addressRegion: SITE.region,
                addressCountry: "FR",
              },
              sameAs: [SITE.linkedin],
            }),
          }}
        />
      </body>
    </html>
  );
}
