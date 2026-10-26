import { calendarDate } from "@/lib/dates";
import { getCatalog } from "@/lib/products";
import { canonicalUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const { published } = getCatalog();

  return [
    { url: canonicalUrl("/"), lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    {
      url: canonicalUrl("/archivo"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: canonicalUrl("/archivo?vista=boludas"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: canonicalUrl("/que-es-esto"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: canonicalUrl("/privacidad"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: canonicalUrl("/terminos"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: canonicalUrl("/contacto"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...published.map((product) => ({
      url: canonicalUrl(`/b/${product.slug}`),
      lastModified: calendarDate(product.fecha),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
