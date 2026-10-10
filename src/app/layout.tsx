import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
    default: "OE BUSINESS | Innovación y Visión Empresarial — The Next Form",
    template: "%s | OE BUSINESS",
  },
  description:
    "OE BUSINESS es una empresa independiente de Colombia, fundada por Oscar y Eduardo. Innovación, visión y evolución: construir hoy lo que definirá el mañana. Conoce nuestra historia y contáctanos.",
  applicationName: "OE BUSINESS",
  authors: [{ name: "Oscar & Eduardo — OE BUSINESS" }],
  creator: "OE BUSINESS",
  keywords: [
    "OE BUSINESS",
    "The Next Form",
    "OE Business Colombia",
    "empresa independiente",
    "innovación empresarial",
    "visión empresarial",
    "innovación",
    "visión",
    "evolución",
    "Oscar y Eduardo",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "OE BUSINESS",
    title: "OE BUSINESS — Innovación y Visión Empresarial",
    description:
      "El futuro no se espera. Se construye. Conoce OE BUSINESS, la empresa independiente fundada por Oscar y Eduardo.",
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
    title: "OE BUSINESS — Innovación y Visión Empresarial",
    description:
      "El futuro no se espera. Se construye. Conoce OE BUSINESS, la empresa independiente fundada por Oscar y Eduardo.",
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

/**
 * Structured data — helps Google understand the organization behind the brand.
 * Only verifiable facts are included (no invented URLs or statistics).
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": "OE BUSINESS",
      "alternateName": "OE Business — The Next Form",
      "description":
        "Empresa independiente fundada por Oscar y Eduardo. Una visión compartida, una mentalidad innovadora y la determinación de construir lo que viene.",
      "url": `${siteUrl}/`,
      "logo": `${siteUrl}/og.png`,
      "founder": [
        { "@type": "Person", "name": "Oscar" },
        { "@type": "Person", "name": "Eduardo" },
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "telephone": "+57 324 707 8735",
        "url": "https://wa.me/573247078735",
        "availableLanguage": ["es", "en"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": `${siteUrl}/`,
      "name": "OE BUSINESS",
      "description": "El futuro no se espera. Se construye.",
      "inLanguage": "es",
      "publisher": { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#070809",
  width: "device-width",
  initialScale: 1,
};

/**
 * Google Analytics 4 — measurement ID overridable via NEXT_PUBLIC_GA_MEASUREMENT_ID.
 */
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-K0L03L09D4";

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {/* Google tag (gtag.js) — loads after hydration, never blocks rendering */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>
      </body>
    </html>
  );
}
