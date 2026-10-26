import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

const tones = {
  pink: "bg-fucsia text-white",
  yellow: "bg-sun text-ink",
  white: "bg-white text-ink",
  green: "bg-grass text-ink",
} as const;

export function Sticker({
  children,
  tone = "yellow",
  shape = "tag",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  shape?: "tag" | "circle";
  className?: string;
}) {
  return (
    <span
      className={cx(
        "pointer-events-none absolute z-10 border-[3px] border-ink text-center font-impact shadow-[4px_4px_0_#1d1d1b]",
        tones[tone],
        shape === "circle"
          ? "flex h-[72px] w-[72px] flex-col items-center justify-center rounded-full p-1 text-[12px] leading-tight min-[701px]:h-[92px] min-[701px]:w-[92px] min-[701px]:text-[15px]"
          : "rounded-[14px] px-2.5 py-1.5 text-base leading-tight min-[701px]:px-3.5 min-[701px]:py-2 min-[701px]:text-xl min-[701px]:leading-none",
        className,
      )}
    >
      {children}
    </span>
  );
}
