import type { Bolucompra } from "@/lib/types";

export function badgesFor(product: Bolucompra): string[] {
  const badges = [`📦 ${product.categoria}`];
  if (product.nivel >= 9) badges.push("💀 Arrepentimiento: nulo");
  else if (product.nivel >= 7) badges.push("💀 Arrepentimiento: bajo");
  else badges.push("💀 Arrepentimiento: aceptable");
  if (product.nivel >= 8) badges.push("🎁 Ideal para regalar");
  else badges.push("😌 Para entrar en calor");
  return badges;
}
