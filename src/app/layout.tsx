import type { Metadata } from "next";
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
  title: "OHIHO — Le lien entre l'humain et la machine",
  description:
    "OHIHO accompagne les entreprises avec du support informatique et des formations aux nouvelles technologies. Support, pédagogie, solutions sur-mesure.",
  keywords: [
    "support informatique",
    "formation nouvelles technologies",
    "pédagogie numérique",
    "solutions entreprises",
    "OHIHO",
  ],
  openGraph: {
    title: "OHIHO — Le lien entre l'humain et la machine",
    description:
      "Support informatique et formation aux nouvelles technologies pour les entreprises.",
    type: "website",
    locale: "fr_FR",
    url: "https://ohiho.fr",
    images: ["/logo.svg"],
  },
  twitter: {
    card: "summary",
    title: "OHIHO — Le lien entre l'humain et la machine",
    description:
      "Support informatique et formation aux nouvelles technologies pour les entreprises.",
    images: ["/logo.svg"],
  },
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
