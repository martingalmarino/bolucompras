import { CarruselAnteriores } from "@/components/CarruselAnteriores";
import { HeroBolucompra, HeroEspera } from "@/components/HeroBolucompra";
import { JsonLd } from "@/components/JsonLd";
import { productJsonLd } from "@/lib/jsonld";
import { getCatalog, getNextPublicationDate } from "@/lib/products";
import { canonicalUrl, getSiteUrl } from "@/lib/site";
import { buildTabs } from "@/lib/tabs";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  alternates: { canonical: canonicalUrl("/") },
};

export default function HomePage() {
  const { today, featured, anteriores } = getCatalog();
  const tabs = buildTabs(anteriores, today);

  return (
    <>
      {featured ? (
        <>
          <HeroBolucompra product={featured} today={today} />
          <JsonLd data={productJsonLd(featured, getSiteUrl())} />
        </>
      ) : (
        <HeroEspera today={today} nextDate={getNextPublicationDate(today)} />
      )}
      <CarruselAnteriores tabs={tabs} />
    </>
  );
}
