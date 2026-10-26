import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Newsletter } from "@/components/Newsletter";
import { Ticker } from "@/components/Ticker";
import { websiteJsonLd } from "@/lib/jsonld";
import { isFestiveSeason, todayISO } from "@/lib/dates";
import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import type { Metadata } from "next";
import "./globals.css";

export const revalidate = 86400;

const site = getSiteUrl();
const googleVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim();
const isPreview = process.env.VERCEL_ENV === "preview";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") || site),
  title: {
    default: "Bolucompras – La boludez del día",
    template: "%s · Bolucompras",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Bolucompras" }],
  creator: "Bolucompras",
  category: "shopping",
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: SITE_NAME,
    title: "Bolucompras – La boludez del día",
    description: SITE_DESCRIPTION,
    url: site,
  },
  twitter: {
    card: "summary_large_image",
    title: "Bolucompras – La boludez del día",
    description: SITE_DESCRIPTION,
  },
  robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
  alternates: {
    canonical: site,
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const festive = isFestiveSeason(todayISO());

  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col font-rounded">
        <JsonLd data={websiteJsonLd(site)} />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-sun focus:px-4 focus:py-2 focus:font-extrabold focus:text-ink"
        >
          Saltar al contenido
        </a>
        <Header festive={festive} />
        <Ticker festive={festive} />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Newsletter />
        <Footer />
      </body>
    </html>
  );
}
