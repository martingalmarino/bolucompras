import { ProductVisual } from "@/components/ProductVisual";
import { StoreBadge } from "@/components/StoreBadge";
import { cx } from "@/lib/cx";
import { formatShortDate } from "@/lib/dates";
import { formatPrice } from "@/lib/format";
import type { Bolucompra } from "@/lib/types";
import Link from "next/link";

const BACKGROUNDS = ["#FFD23F", "#7CF5D0", "#FF9EC9", "#B9A6FF", "#5AB0FF"];

export function cardBackground(index: number): string {
  return BACKGROUNDS[index % BACKGROUNDS.length];
}

export function ProductCard({
  product,
  index = 0,
  layout = "carousel",
}: {
  product: Bolucompra;
  index?: number;
  layout?: "carousel" | "grid";
}) {
  const precio = formatPrice(product.precioReferencia, product.moneda);
  return (
    <Link
      href={`/b/${product.slug}`}
      data-card
      className={cx(
        "flex h-full flex-col overflow-hidden rounded-[20px] border-[3px] border-ink bg-white no-underline text-ink shadow-[6px_6px_0_#1d1d1b] transition hover:-translate-y-0.5 hover:rotate-0",
        index % 2 === 0 ? "-rotate-[1.5deg]" : "rotate-[1.2deg]",
        layout === "carousel"
          ? "w-[220px] shrink-0 snap-start min-[701px]:w-[250px]"
          : "w-full",
      )}
    >
      <div
        className="relative flex h-[160px] items-center justify-center overflow-hidden border-b-[3px] border-ink"
        style={{ backgroundColor: cardBackground(index) }}
      >
        <ProductVisual
          nombre={product.nombre}
          emoji={product.emoji}
          imagenUrl={product.imagenUrl}
          emojiClassName="text-[84px] leading-none"
          sizes="250px"
        />
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <div className="flex items-center justify-between gap-2 text-[13px] font-bold">
          <time dateTime={product.fecha}>{formatShortDate(product.fecha)}</time>
          <StoreBadge tienda={product.tienda} compact />
        </div>
        <p className="mt-2 line-clamp-3 min-h-[3.9rem] text-[17px] font-extrabold leading-tight">
          {product.nombre}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2 text-[13px] font-bold">
          <span className="font-impact text-2xl leading-none text-fucsia">
            {precio ?? "En la tienda"}
          </span>
          <span>🤪 {product.nivel}/10</span>
        </div>
      </div>
    </Link>
  );
}
