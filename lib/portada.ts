import type { Bolucompra } from "@/lib/types";

export type Portada = {
  today: string;
  featured: Bolucompra | null;
  bonus: Bolucompra | null;
  anteriores: Bolucompra[];
  published: Bolucompra[];
};

function esDeTemporada(product: Bolucompra): boolean {
  return product.temporada === "Navidad" || product.temporada === "Reyes";
}

export function armarPortada(products: Bolucompra[], today: string): Portada {
  const published = products
    .filter((product) => product.fecha <= today)
    .sort((a, b) => b.fecha.localeCompare(a.fecha) || b.id - a.id);
  const deHoy = published.filter((product) => product.fecha === today);

  let featured: Bolucompra | null = null;
  let bonus: Bolucompra | null = null;

  if (deHoy.length > 1) {
    featured = deHoy.find(esDeTemporada) ?? deHoy[0];
    bonus = deHoy.find((product) => product.id !== featured?.id) ?? null;
  } else if (deHoy.length === 1) {
    featured = deHoy[0];
  } else {
    featured = published[0] ?? null;
  }

  const anteriores = published.filter(
    (product) => product.fecha < today && product.id !== featured?.id,
  );

  return { today, featured, bonus, anteriores, published };
}
