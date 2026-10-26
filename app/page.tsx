import { CarruselAnteriores } from "@/components/CarruselAnteriores";
import { HeroBolucompra, HeroEspera } from "@/components/HeroBolucompra";
import { JsonLd } from "@/components/JsonLd";
import { productJsonLd } from "@/lib/jsonld";
import { getCatalog, getNextPublicationDate } from "@/lib/products";
import { getSiteUrl } from "@/lib/site";
import { buildTabs } from "@/lib/tabs";

export const revalidate = 86400;

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
