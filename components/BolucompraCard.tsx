import { BuyButton, BuyNote } from "@/components/BuyButton";
import { BoludezMeter } from "@/components/BoludezMeter";
import { ProductVisual } from "@/components/ProductVisual";
import { Sticker } from "@/components/Sticker";
import { StoreBadge } from "@/components/StoreBadge";
import { badgesFor } from "@/lib/badges";
import { cx } from "@/lib/cx";
import { formatLongDate } from "@/lib/dates";
import { formatPrice } from "@/lib/format";
import { badgeTemporada } from "@/lib/temporada";
import type { Bolucompra } from "@/lib/types";
import Link from "next/link";

export function BolucompraCard({
  product,
  today,
  heading = "h2",
  showFichaLink = false,
  priorityImage = false,
  compact = false,
  stack = false,
  ribbon,
}: {
  product: Bolucompra;
  today: string;
  heading?: "h1" | "h2" | "h3";
  showFichaLink?: boolean;
  priorityImage?: boolean;
  compact?: boolean;
  stack?: boolean;
  ribbon?: string;
}) {
  const Title = heading;
  const precio = formatPrice(product.precioReferencia, product.moneda);
  const isToday = product.fecha === today;
  const cinta = ribbon ?? (isToday ? "¡HOY!" : "LA ÚLTIMA");
  const temporada = badgeTemporada(product.temporada);

  return (
    <article
      className={cx(
        "grid grid-cols-1 items-center rounded-[28px] border-4 border-ink bg-white shadow-[7px_7px_0_#1d1d1b]",
        compact ? "gap-4 p-4" : "gap-6 p-[18px]",
        stack
          ? ""
          : "min-[701px]:grid-cols-2 min-[701px]:gap-[30px] min-[701px]:p-[30px] min-[701px]:shadow-[12px_12px_0_#1d1d1b]",
      )}
    >
      <div className="relative">
        <div
          className={cx(
            "relative flex items-center justify-center overflow-hidden rounded-[22px] border-[3px] border-ink bg-[linear-gradient(135deg,#7CF5D0,#5AB0FF)]",
            compact ? "min-h-[180px]" : "min-h-[260px] min-[701px]:min-h-[360px]",
          )}
        >
          <ProductVisual
            nombre={product.nombre}
            emoji={product.emoji}
            imagenUrl={product.imagenUrl}
            emojiClassName={
              compact
                ? "text-[92px] leading-none"
                : "text-[140px] leading-none min-[701px]:text-[190px]"
            }
            priority={priorityImage}
          />
        </div>
        <Sticker
          tone={ribbon === "BONUS" ? "yellow" : "pink"}
          className={cx(
            "left-2 top-2 -rotate-[10deg]",
            stack || compact ? "" : "min-[701px]:left-[-18px] min-[701px]:top-[-18px]",
          )}
        >
          {cinta}
        </Sticker>
        {compact ? null : (
          <>
            <Sticker
              tone="white"
              shape="circle"
              className={cx("right-2 top-2 rotate-[12deg]", stack ? "" : "min-[701px]:right-3.5 min-[701px]:top-5")}
            >
              <span>100%</span>
              <span>INÚTIL</span>
            </Sticker>
            <Sticker
              tone="yellow"
              className={cx(
                "bottom-3 right-2 rotate-[8deg] whitespace-nowrap",
                stack ? "" : "min-[701px]:bottom-4 min-[701px]:right-[-20px]",
              )}
            >
              Tu billetera llora 😭
            </Sticker>
          </>
        )}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <StoreBadge tienda={product.tienda} withMark />
          <time dateTime={product.fecha} className="shrink-0 text-sm font-bold text-ink/70">
            <span aria-hidden="true">📅 </span>
            {formatLongDate(product.fecha)}
          </time>
        </div>
        {temporada ? (
          <p
            className={cx(
              "mt-3 inline-block -rotate-1 rounded-full border-2 border-ink px-3 py-1 text-sm font-extrabold text-white",
              product.temporada === "Reyes" ? "bg-violet" : "bg-[#C8102E]",
            )}
          >
            {temporada}
          </p>
        ) : null}
        <Title
          className={cx(
            "break-words font-heavy leading-tight",
            compact
              ? "mb-2 mt-3 text-[22px]"
              : "mb-2.5 mt-3.5 text-[26px] min-[701px]:text-[34px]",
          )}
        >
          {product.nombre}
        </Title>
        <p className={cx("leading-normal", compact ? "mb-3 text-base" : "mb-4 text-[17px]")}>
          {product.descripcion}
        </p>
        {precio ? (
          <p
            className={cx(
              "break-words font-impact leading-none text-fucsia",
              compact
                ? "text-[32px]"
                : "text-[34px] min-[400px]:text-[42px] min-[701px]:text-[52px]",
            )}
          >
            <span className="sr-only">Precio de referencia: </span>
            {precio}
          </p>
        ) : (
          <p
            className={cx(
              "font-impact leading-none text-ink",
              compact ? "text-[24px]" : "text-[26px] min-[400px]:text-[32px]",
            )}
          >
            Precio en la tienda
          </p>
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
