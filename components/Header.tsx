import { MobileMenu } from "@/components/MobileMenu";
import Link from "next/link";

const CTA =
  "inline-flex shrink-0 items-center rounded-full border-2 border-white bg-fucsia-deep px-2.5 py-2 text-[12px] font-extrabold text-white no-underline min-[400px]:px-3.5 min-[400px]:text-sm";

const LINK = "font-extrabold text-white no-underline hover:text-sun";

function Gorrito() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 28"
      className="absolute -left-[0.02em] -top-[0.22em] h-[0.5em] w-[0.5em] -rotate-[16deg]"
    >
      <path d="M6 21 L16 3 L26 21 Z" fill="#C8102E" stroke="#1d1d1b" strokeWidth="2" />
      <rect x="2" y="19" width="28" height="6" rx="2" fill="#fff" stroke="#1d1d1b" strokeWidth="2" />
      <circle cx="16" cy="3.2" r="2.4" fill="#fff" stroke="#1d1d1b" strokeWidth="1.6" />
    </svg>
  );
}

export function Header({ festive = false, showNavidad = false }: { festive?: boolean; showNavidad?: boolean }) {
  return (
    <header className="border-b-[5px] border-fucsia bg-ink text-white">
      <div className="mx-auto flex w-full max-w-[1160px] items-center justify-between gap-2 px-3 py-3 min-[400px]:px-5 min-[400px]:py-3.5">
        <Link href="/" aria-label="Bolucompras, inicio" className="min-w-0 no-underline">
          <span
            className={`inline-block -rotate-2 whitespace-nowrap font-impact tracking-wide text-white text-[16px] min-[400px]:text-[22px] ${
              showNavidad ? "min-[701px]:text-[26px] min-[1100px]:text-[34px]" : "min-[701px]:text-[34px]"
            }`}
          >
            <span className="relative inline-block">
              {festive ? <Gorrito /> : null}
              <span aria-hidden="true">🛒</span>
            </span>{" "}
            BOLU
            <span className="ml-1 rounded-lg bg-sun px-1.5 text-ink min-[400px]:px-2">COMPRAS</span>
          </span>
        </Link>

        <nav
          className={`hidden items-center min-[701px]:flex ${showNavidad ? "gap-x-3 text-sm" : "gap-x-[18px]"}`}
          aria-label="Principal"
        >
          {showNavidad ? (
            <Link className={LINK} href="/navidad">
              <span aria-hidden="true">🎄 </span>Navidad
            </Link>
          ) : null}
          <Link className={LINK} href="/archivo">
            Archivo
          </Link>
          <Link className={LINK} href="/archivo?vista=boludas">
            Ranking
          </Link>
          <Link className={LINK} href="/que-es-esto">
            ¿Qué es esto?
          </Link>
          <Link className={CTA} href="#newsletter">
            <span aria-hidden="true">💌</span>
            <span className="ml-1">Suscribite</span>
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 min-[701px]:hidden">
          <MobileMenu showNavidad={showNavidad} />
          <Link className={CTA} href="#newsletter">
            <span aria-hidden="true">💌</span>
            <span className="ml-1 max-[359px]:sr-only">Suscribite</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
