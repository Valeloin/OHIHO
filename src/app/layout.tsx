import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";
import { themeCss } from "@/lib/content/theme-css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ohiho.fr"),
  title: "OHIHO — Création de sites web & applications sur mesure",
  description:
    "OHIHO conçoit et développe des sites web et applications sur mesure, pour entreprises et particuliers, de l'idée à la mise en ligne et au-delà.",
  keywords: [
    "création site web",
    "développement web",
    "application web sur mesure",
    "développeur web freelance",
    "refonte site web",
    "OHIHO",
  ],
  openGraph: {
    title: "OHIHO — Création de sites web & applications sur mesure",
    description:
      "Des sites et applications web sur mesure, de l'idée à la mise en ligne.",
    type: "website",
    locale: "fr_FR",
    url: "https://ohiho.fr",
    images: ["/logo.svg"],
  },
  twitter: {
    card: "summary",
    title: "OHIHO — Création de sites web & applications sur mesure",
    description:
      "Des sites et applications web sur mesure, de l'idée à la mise en ligne.",
    images: ["/logo.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon-180.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

// Le thème clair est la valeur par défaut : le mode sombre ne s'applique que si
// le visiteur l'a explicitement choisi via le bouton, pas selon son réglage système.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Contenu éditable depuis /admin : couleurs du thème + texte du footer.
  // Les couleurs personnalisées sont injectées en <style> après validation
  // (voir themeCss) ; vide tant que rien ne diffère des valeurs par défaut.
  const content = await getContent();
  const customThemeCss = themeCss(content.theme);

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {customThemeCss && (
          <style dangerouslySetInnerHTML={{ __html: customThemeCss }} />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Navbar />
        {children}
        <Footer data={content.footer} />
      </body>
    </html>
  );
}
