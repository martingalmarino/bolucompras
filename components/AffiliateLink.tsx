import { AFFILIATE_REL } from "@/lib/links";
import type { ReactNode } from "react";

export function AffiliateLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className={className} target="_blank" rel={AFFILIATE_REL}>
      {children}
    </a>
  );
}
