import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  title: "OHIHO — Support informatique sur mesure",
  description:
    "OHIHO accompagne entreprises et particuliers avec un support informatique à distance réactif et des formations en ligne à leur rythme, sans jargon.",
  keywords: [
    "support informatique",
    "assistance informatique à distance",
    "formation informatique en ligne",
    "dépannage informatique entreprise",
    "dépannage informatique particulier",
    "OHIHO",
  ],
  openGraph: {
    title: "OHIHO — Support informatique sur mesure",
    description:
      "Prise en main à distance et formations en ligne, à votre rythme.",
    type: "website",
    locale: "fr_FR",
    url: "https://ohiho.fr",
    images: ["/logo.svg"],
  },
  twitter: {
    card: "summary",
    title: "OHIHO — Support informatique sur mesure",
    description:
      "Prise en main à distance et formations en ligne, à votre rythme.",
    images: ["/logo.svg"],
  },
  icons: {
    icon: [
      { url: "/ohiho_emblem.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon-180.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0A0E1A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
