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
  title: "OHIHO — Formations RGPD & IA pour structures réglementées",
  description:
    "OHIHO forme vos équipes non-techniques au RGPD et à l'IA — formations en ligne et interventions en présentiel. 7-8 ans d'expérience en justice, santé et notariat.",
  keywords: [
    "formation RGPD",
    "formation IA entreprise",
    "conformité RGPD",
    "formation secteur réglementé",
    "formation données sensibles",
    "OHIHO",
  ],
  openGraph: {
    title: "OHIHO — Formations RGPD & IA pour structures réglementées",
    description:
      "Formations RGPD et IA pour structures réglementées, en ligne et en présentiel.",
    type: "website",
    locale: "fr_FR",
    url: "https://ohiho.fr",
    images: ["/logo.svg"],
  },
  twitter: {
    card: "summary",
    title: "OHIHO — Formations RGPD & IA pour structures réglementées",
    description:
      "Formations RGPD et IA pour structures réglementées, en ligne et en présentiel.",
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
