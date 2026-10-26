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
          ? "flex h-[92px] w-[92px] flex-col items-center justify-center rounded-full p-1 text-[15px] leading-tight"
          : "rounded-[14px] px-3.5 py-2 text-xl leading-none",
        className,
      )}
    >
      {children}
    </span>
  );
}
