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
  title: "OHIHO — Support informatique sur-mesure pour entreprises",
  description:
    "OHIHO accompagne les entreprises avec un support informatique réactif et personnalisé. Dépannage, infogérance, accompagnement — et des formations pour vos équipes.",
  keywords: [
    "support informatique",
    "infogérance entreprise",
    "support informatique sur-mesure",
    "formation nouvelles technologies",
    "solutions entreprises",
    "OHIHO",
  ],
  openGraph: {
    title: "OHIHO — Support informatique sur-mesure pour entreprises",
    description:
      "Support informatique réactif et personnalisé pour les entreprises, avec des formations pour vos équipes.",
    type: "website",
    locale: "fr_FR",
    url: "https://ohiho.fr",
    images: ["/logo.svg"],
  },
  twitter: {
    card: "summary",
    title: "OHIHO — Support informatique sur-mesure pour entreprises",
    description:
      "Support informatique réactif et personnalisé pour les entreprises, avec des formations pour vos équipes.",
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
