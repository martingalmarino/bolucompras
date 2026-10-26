import { monthKey, monthLabel, weekKey } from "@/lib/dates";
import type { Bolucompra } from "@/lib/types";

export type CarruselTab = {
  id: string;
  label: string;
  items: Bolucompra[];
};

export function buildTabs(anteriores: Bolucompra[], today: string): CarruselTab[] {
  const week = anteriores.filter((product) => weekKey(product.fecha) === weekKey(today));
  const byMonth = new Map<string, Bolucompra[]>();

  for (const product of anteriores) {
    const key = monthKey(product.fecha);
    const list = byMonth.get(key);
    if (list) list.push(product);
    else byMonth.set(key, [product]);
  }

  const years = new Set(anteriores.map((product) => product.fecha.slice(0, 4)));
  const monthTabs = [...byMonth.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([key, items]) => ({
      id: key,
      label: monthLabel(key, years.size > 1),
      items,
    }));

  const boludas = [...anteriores].sort(
    (a, b) => b.nivel - a.nivel || b.fecha.localeCompare(a.fecha) || b.id - a.id,
  );

  return [
    { id: "semana", label: "Esta semana", items: week },
    ...monthTabs,
    { id: "boludas", label: "🏆 Las más boludas", items: boludas },
  ];
}
