"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const ITEM = "rounded-xl px-3 py-3 font-extrabold text-ink no-underline hover:bg-sun";

export function MobileMenu({ showNavidad = false }: { showNavidad?: boolean }) {
  const pathname = usePathname();
  const details = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (details.current) details.current.open = false;
  }, [pathname]);

  function close() {
    if (details.current) details.current.open = false;
  }

  return (
    <details ref={details} className="relative">
      <summary
        className="list-none rounded-full border-2 border-white px-3 py-2 text-sm font-extrabold"
        aria-label="Menú"
      >
        <span aria-hidden="true">☰</span>
      </summary>
      <nav
        aria-label="Principal"
        className="absolute right-0 z-30 mt-2 flex w-56 flex-col rounded-2xl border-[3px] border-ink bg-white p-2 text-ink shadow-[4px_4px_0_#1d1d1b]"
      >
        {showNavidad ? (
          <Link className={ITEM} href="/navidad" onClick={close}>
            <span aria-hidden="true">🎄 </span>Navidad
          </Link>
        ) : null}
        <Link className={ITEM} href="/archivo" onClick={close}>
          Archivo
        </Link>
        <Link className={ITEM} href="/archivo?vista=boludas" onClick={close}>
          Ranking
        </Link>
        <Link className={ITEM} href="/que-es-esto" onClick={close}>
          ¿Qué es esto?
        </Link>
      </nav>
    </details>
  );
}
