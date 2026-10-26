import { ctaHref } from "@/lib/links";
import { parsePrice } from "@/lib/format";
import type { Bolucompra } from "@/lib/types";

export function websiteJsonLd(site: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Bolucompras",
    url: site,
    inLanguage: "es-AR",
    description:
      "Cada día, una compra innecesaria que igual querés. La boludez diaria, con link y todo.",
  };
}

export function productJsonLd(product: Bolucompra, site: string) {
  const price = parsePrice(product.precioReferencia);
  const productUrl = `${site}/b/${product.slug}`;
  const node: Record<string, unknown> = {
    "@type": "Product",
    name: product.nombre,
    description: product.descripcion,
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

  return {
    "@context": "https://schema.org",
    "@graph": [
      node,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: site },
          { "@type": "ListItem", position: 2, name: "Archivo", item: `${site}/archivo` },
          { "@type": "ListItem", position: 3, name: product.nombre, item: productUrl },
        ],
      },
    ],
  };
}
