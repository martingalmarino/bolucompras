import type { FranjaPrecio, Temporada } from "@/lib/types";

export function franjaLabel(franja: FranjaPrecio): string {
  if (franja === "barato") return "Barato";
  if (franja === "medio") return "Precio medio";
  return "Caro";
}

export function badgeTemporada(temporada: Temporada): string | null {
  if (temporada === "Navidad") return "🎄 Especial Navidad";
  if (temporada === "Reyes") return "👑 Especial Reyes";
  return null;
}
