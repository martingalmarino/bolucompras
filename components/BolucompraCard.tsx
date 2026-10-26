import { BuyButton, BuyNote } from "@/components/BuyButton";
import { BoludezMeter } from "@/components/BoludezMeter";
import { ProductVisual } from "@/components/ProductVisual";
import { Sticker } from "@/components/Sticker";
import { StoreBadge } from "@/components/StoreBadge";
import { badgesFor } from "@/lib/badges";
import { formatLongDate } from "@/lib/dates";
import { formatPrice } from "@/lib/format";
import type { Bolucompra } from "@/lib/types";
import Link from "next/link";

export function BolucompraCard({
  product,
  today,
  heading = "h2",
  showFichaLink = false,
  priorityImage = false,
}: {
  product: Bolucompra;
  today: string;
  heading?: "h1" | "h2";
  showFichaLink?: boolean;
  priorityImage?: boolean;
}) {
  const Title = heading;
  const precio = formatPrice(product.precioReferencia, product.moneda);
  const isToday = product.fecha === today;

  return (
    <article className="grid grid-cols-1 items-center gap-6 rounded-[28px] border-4 border-ink bg-white p-[18px] shadow-[7px_7px_0_#1d1d1b] min-[701px]:grid-cols-2 min-[701px]:gap-[30px] min-[701px]:p-[30px] min-[701px]:shadow-[12px_12px_0_#1d1d1b]">
      <div className="relative">
        <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-[22px] border-[3px] border-ink bg-[linear-gradient(135deg,#7CF5D0,#5AB0FF)] min-[701px]:min-h-[360px]">
          <ProductVisual
            nombre={product.nombre}
            emoji={product.emoji}
            imagenUrl={product.imagenUrl}
            emojiClassName="text-[140px] leading-none min-[701px]:text-[190px]"
            priority={priorityImage}
          />
        </div>
        <Sticker tone="pink" className="left-[-18px] top-[-18px] -rotate-[10deg]">
          {isToday ? "¡HOY!" : "LA ÚLTIMA"}
        </Sticker>
        <Sticker tone="white" shape="circle" className="right-3.5 top-5 rotate-[12deg]">
          <span>100%</span>
          <span>INÚTIL</span>
        </Sticker>
        <Sticker
          tone="yellow"
          className="bottom-4 right-[-6px] rotate-[8deg] min-[701px]:right-[-20px]"
        >
          Tu billetera llora 😭
        </Sticker>
      </div>

      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <StoreBadge tienda={product.tienda} withMark />
          <time dateTime={product.fecha} className="shrink-0 pt-1 text-sm font-bold text-ink/70">
            <span aria-hidden="true">📅 </span>
            {formatLongDate(product.fecha)}
          </time>
        </div>
        <Title className="mb-2.5 mt-3.5 font-heavy text-[26px] leading-tight min-[701px]:text-[34px]">
          {product.nombre}
        </Title>
        <p className="mb-4 text-[17px] leading-normal">{product.descripcion}</p>
        {precio ? (
          <p className="font-impact text-[42px] leading-none text-fucsia min-[701px]:text-[52px]">
            <span className="sr-only">Precio de referencia: </span>
            {precio}
          </p>
        ) : (
          <p className="font-impact text-[32px] leading-none text-ink">Precio en la tienda</p>
        )}
        <BoludezMeter nivel={product.nivel} />
        <ul className="my-3.5 flex flex-wrap gap-2">
          {badgesFor(product).map((badge) => (
            <li
              key={badge}
              className="rounded-[10px] border-2 border-ink bg-[#E8F7FF] px-2.5 py-1.5 text-[13px] font-extrabold"
            >
              {badge}
            </li>
          ))}
        </ul>
        <BuyButton product={product} />
        <BuyNote product={product} />
        {showFichaLink ? (
          <p className="mt-3 text-center text-sm font-extrabold">
            <Link
              href={`/b/${product.slug}`}
              className="text-ink underline decoration-2 underline-offset-4 hover:text-fucsia-deep"
            >
              Ver la ficha de esta boludez
            </Link>
          </p>
        ) : null}
      </div>
    </article>
  );
}
