import type { Metadata } from "next";

export const SITE_NAME = "Bolucompras · No lo necesitás";

export const SITE_TAGLINE = "No lo necesitás, pero igual lo querés. La boludez del día en nolonecesitas.com.ar.";

export const SITE_DESCRIPTION = SITE_TAGLINE;

const LOCAL_URL = "http://localhost:3000";

/** Origen público, sin barra final. En producción sale solo de NEXT_PUBLIC_SITE_URL. */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  if (process.env.VERCEL_ENV === "production") {
    throw new Error("Falta NEXT_PUBLIC_SITE_URL");
  }
  return LOCAL_URL;
}

/** URL absoluta sin barra final. El origen sale de getSiteUrl(). */
export function canonicalUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;

  const queryIndex = path.indexOf("?");
  const pathname = queryIndex === -1 ? path : path.slice(0, queryIndex);
  const query = queryIndex === -1 ? "" : path.slice(queryIndex);
  const withSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const clean = withSlash.replace(/\/+$/, "");
  return `${base}${clean}${query}`;
}

/** Open Graph completo. Si una página manda solo `url`, Next descarta el site_name del layout. */
export function pageOpenGraph(path: string, title: string, description: string): Metadata["openGraph"] {
  return {
    type: "website",
    locale: "es_AR",
    siteName: SITE_NAME,
    url: canonicalUrl(path),
    title,
    description,
  };
}
