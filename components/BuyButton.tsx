import { AffiliateLink } from "@/components/AffiliateLink";
import { ctaHref, usesAffiliateLink } from "@/lib/links";
import type { Bolucompra } from "@/lib/types";

export const buyButtonClass =
  "mt-1 block w-full rounded-[18px] border-4 border-ink bg-grass-deep px-3 py-3.5 text-center font-impact text-[22px] leading-none tracking-wide text-white no-underline shadow-[6px_6px_0_#1d1d1b] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#1d1d1b] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#1d1d1b] min-[400px]:text-[26px] min-[701px]:py-4 min-[701px]:text-[30px]";

export function BuyButton({ product }: { product: Bolucompra }) {
  const href = ctaHref(product);
  if (!href) {
    return <span className={`${buyButtonClass} cursor-not-allowed opacity-70`}>Link en camino</span>;
  }

  return (
    <AffiliateLink href={href} className={buyButtonClass}>
      ¡LA QUIERO YA! 🛒
    </AffiliateLink>
  );
}

export function BuyNote({ product }: { product: Bolucompra }) {
  return (
    <p className="mt-2.5 text-center text-xs font-bold text-ink/70">
      {usesAffiliateLink(product)
        ? "Link de afiliado · El precio puede cambiar en la tienda"
        : "Te manda a la tienda · Precio orientativo, puede cambiar"}
    </p>
  );
}
