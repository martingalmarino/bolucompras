import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Newsletter } from "@/components/Newsletter";
import { Ticker } from "@/components/Ticker";
import { websiteJsonLd } from "@/lib/jsonld";
import { getSiteUrl, SITE_DESCRIPTION } from "@/lib/site";
import type { Metadata } from "next";
import "./globals.css";

export const revalidate = 86400;

const site = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "Bolucompras – La boludez del día",
    template: "%s · Bolucompras",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Bolucompras",
  authors: [{ name: "Bolucompras" }],
  creator: "Bolucompras",
  category: "shopping",
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Bolucompras",
    title: "Bolucompras – La boludez del día",
    description: SITE_DESCRIPTION,
    url: site,
  },
  twitter: {
    card: "summary_large_image",
    title: "Bolucompras – La boludez del día",
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <Header />
        <Ticker />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Newsletter />
        <Footer />
      </body>
    </html>
  );
}
