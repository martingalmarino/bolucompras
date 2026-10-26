const STORES: Record<string, { bg: string; color: string; mark: string }> = {
  "Mercado Libre": { bg: "#FFE600", color: "#1d1d1b", mark: "🟡" },
  Amazon: { bg: "#FF9900", color: "#1d1d1b", mark: "📦" },
  Temu: { bg: "#FF7A00", color: "#1d1d1b", mark: "🛍️" },
  Shein: { bg: "#1d1d1b", color: "#ffffff", mark: "✨" },
};

export function StoreBadge({
  tienda,
  withMark = false,
  compact = false,
}: {
  tienda: string;
  withMark?: boolean;
  compact?: boolean;
}) {
  const style = STORES[tienda] ?? { bg: "#ffffff", color: "#1d1d1b", mark: "🛒" };
  return (
    <span
      className={
        compact
          ? "inline-block max-w-full truncate rounded-full border-2 border-ink px-2 py-1 text-[12px] font-extrabold leading-none"
          : "inline-block whitespace-nowrap rounded-full border-2 border-ink px-3 py-1 text-[13px] font-extrabold leading-none"
      }
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      {withMark ? `${style.mark} ` : null}
      {tienda}
    </span>
  );
}
