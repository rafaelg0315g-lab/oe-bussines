import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

/**
 * Domain is still not registered — keep it configurable via NEXT_PUBLIC_SITE_URL.
 * Set it once the definitive domain is purchased (e.g. https://oebusiness.com).
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OE BUSINESS — The Next Form",
    template: "%s — OE BUSINESS",
  },
  description:
    "OE BUSINESS es una empresa independiente fundada por Oscar y Eduardo. Una visión compartida, una mentalidad innovadora y la determinación de construir lo que viene.",
  applicationName: "OE BUSINESS",
  authors: [{ name: "Oscar & Eduardo — OE BUSINESS" }],
  creator: "OE BUSINESS",
  keywords: [
    "OE BUSINESS",
    "The Next Form",
    "visión",
    "innovación",
    "evolución",
    "empresa independiente",
  ],
  alternates: {
    canonical: "/",
    languages: { es: "/", en: "/" },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "OE BUSINESS",
    title: "OE BUSINESS — The Next Form",
    description: "El futuro no se espera. Se construye.",
    locale: "es_ES",
    images: [
      {
        url: "/og.png",
        width: 1344,
        height: 768,
        alt: "OE BUSINESS — The Next Form",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OE BUSINESS — The Next Form",
    description: "El futuro no se espera. Se construye.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  /** Google Search Console ownership verification (must stay in place). */
  verification: {
    google: "zrn5KAs6u2P8CfpEa7xs8k3FdSUweI5puizcVjxc2t0",
  },
};

export const viewport: Viewport = {
  themeColor: "#070809",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
