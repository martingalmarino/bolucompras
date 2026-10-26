import { calendarDate } from "@/lib/dates";
import { getCatalog } from "@/lib/products";
import { getSiteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  const { published } = getCatalog();

  return [
    { url: site, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    {
      url: `${site}/archivo`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${site}/archivo?vista=boludas`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${site}/que-es-esto`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...published.map((product) => ({
      url: `${site}/b/${product.slug}`,
      lastModified: calendarDate(product.fecha),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
