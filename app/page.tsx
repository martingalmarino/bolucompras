import { BannerNavidad } from "@/components/BannerNavidad";
import { CarruselAnteriores } from "@/components/CarruselAnteriores";
import { HeroBolucompra, HeroEspera } from "@/components/HeroBolucompra";
import { JsonLd } from "@/components/JsonLd";
import { showNavidadBanner } from "@/lib/dates";
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
  const { today, featured, bonus, anteriores } = getCatalog();
  const tabs = buildTabs(anteriores, today);
  const site = getSiteUrl();

  return (
    <>
      {showNavidadBanner(today) ? <BannerNavidad /> : null}
      {featured ? (
        <>
          <HeroBolucompra product={featured} bonus={bonus} today={today} />
          <JsonLd data={productJsonLd(featured, site)} />
          {bonus ? <JsonLd data={productJsonLd(bonus, site)} /> : null}
        </>
      ) : (
        <HeroEspera today={today} nextDate={getNextPublicationDate(today)} />
      )}
      <CarruselAnteriores tabs={tabs} />
    </>
  );
}
