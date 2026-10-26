import { ctaHref } from "@/lib/links";
import { parsePrice } from "@/lib/format";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import type { Bolucompra } from "@/lib/types";

export function websiteJsonLd(site: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: site,
    inLanguage: "es-AR",
    description: SITE_DESCRIPTION,
  };
}

export function productJsonLd(product: Bolucompra, site: string) {
  const price = parsePrice(product.precioReferencia);
  const productUrl = `${site}/b/${product.slug}`;
  const node: Record<string, unknown> = {
    "@type": "Product",
    name: product.nombre,
    description: product.metaDescription || product.descripcion,
    category: product.categoria,
    sku: String(product.id),
    url: productUrl,
    brand: { "@type": "Brand", name: product.tienda },
  };

  if (product.imagenUrl) node.image = product.imagenUrl;

  if (price != null && product.moneda) {
    node.offers = {
      "@type": "Offer",
      url: ctaHref(product) ?? productUrl,
      priceCurrency: product.moneda.toUpperCase(),
      price: price.toFixed(2),
      availability: "https://schema.org/InStock",
      ...(product.fechaPrecio ? { priceValidUntil: product.fechaPrecio } : {}),
    };
  }

  const graph: Record<string, unknown>[] = [
    node,
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: site },
        { "@type": "ListItem", position: 2, name: "Archivo", item: `${site}/archivo` },
        { "@type": "ListItem", position: 3, name: product.nombre, item: productUrl },
      ],
    },
  ];

  if (product.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: product.faq.map((item) => ({
        "@type": "Question",
        name: item.pregunta,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.respuesta,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
