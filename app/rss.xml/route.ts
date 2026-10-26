import { getCatalog } from "@/lib/products";
import { canonicalUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const revalidate = 86400;

function xml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function pubDate(fecha: string): string {
  return new Date(`${fecha}T12:00:00-03:00`).toUTCString();
}

export function GET() {
  const { published } = getCatalog();
  const items = published
    .map((product) => {
      const link = canonicalUrl(`/b/${product.slug}`);
      const title = product.tituloSeo || product.nombre;
      const description = product.metaDescription || product.descripcion;
      return `<item>
      <title>${xml(title)}</title>
      <description>${xml(description)}</description>
      <link>${xml(link)}</link>
      <guid isPermaLink="true">${xml(link)}</guid>
      <pubDate>${pubDate(product.fecha)}</pubDate>
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${xml(SITE_NAME)}</title>
    <link>${xml(canonicalUrl("/"))}</link>
    <description>${xml(SITE_DESCRIPTION)}</description>
    <language>es-ar</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>
`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
