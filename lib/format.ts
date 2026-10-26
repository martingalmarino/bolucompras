export function parsePrice(raw: string): number | null {
  if (!raw?.trim()) return null;
  const cleaned = raw.replace(/\u00a0/g, " ").replace(/[^\d,.-]/g, "");
  if (!cleaned) return null;

  let normalized = cleaned;
  const hasComma = normalized.includes(",");
  const hasDot = normalized.includes(".");
  if (hasComma && hasDot) {
    if (normalized.lastIndexOf(",") > normalized.lastIndexOf(".")) {
      normalized = normalized.replace(/\./g, "").replace(",", ".");
    } else {
      normalized = normalized.replace(/,/g, "");
    }
  } else if (hasComma) {
    normalized = normalized.replace(",", ".");
  }

  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

export function formatPrice(raw: string, moneda: string): string | null {
  const value = parsePrice(raw);
  if (value == null) return null;
  const currency = (moneda || "ARS").toUpperCase();
  try {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `$ ${Math.round(value).toLocaleString("es-AR")}`;
  }
}
