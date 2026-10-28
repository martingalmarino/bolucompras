import type { Bolucompra } from "@/lib/types";

export const AFFILIATE_REL = "sponsored nofollow noopener";

export function ctaHref(product: Bolucompra): string | null {
  return product.linkAfiliado.trim() || product.urlProducto.trim() || null;
}

export function ctaLabel(product: Bolucompra): string {
  if (product.tipoLink === "busqueda") return `Buscalo en ${product.tienda}`;
  return "¡LA QUIERO YA! 🛒";
}

export function usesAffiliateLink(product: Bolucompra): boolean {
  return product.linkAfiliado.trim().length > 0;
}
