import Link from "next/link";
import { cx } from "@/lib/cx";

export function Logo({ size = "md" }: { size?: "md" | "sm" }) {
  return (
    <span
      className={cx(
        "inline-block -rotate-2 font-impact tracking-wide text-white",
        size === "sm" ? "text-[26px]" : "text-[22px] min-[400px]:text-[26px] min-[701px]:text-[34px]",
      )}
    >
      <span aria-hidden="true">🛒 </span>
      BOLU
      <span className="ml-1 rounded-lg bg-sun px-2 text-ink">COMPRAS</span>
    </span>
  );
}

export function LogoLink({ size = "md" }: { size?: "md" | "sm" }) {
  return (
    <Link href="/" aria-label="Bolucompras, inicio" className="no-underline">
      <Logo size={size} />
    </Link>
  );
}
