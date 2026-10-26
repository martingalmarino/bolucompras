import { MobileMenu } from "@/components/MobileMenu";
import Link from "next/link";


const CTA =
  "inline-flex shrink-0 items-center rounded-full border-2 border-white bg-fucsia-deep px-2.5 py-2 text-[12px] font-extrabold text-white no-underline min-[400px]:px-3.5 min-[400px]:text-sm";

const LINK = "font-extrabold text-white no-underline hover:text-sun";

export function Header() {
  return (
    <header className="border-b-[5px] border-fucsia bg-ink text-white">
      <div className="mx-auto flex w-full max-w-[1160px] items-center justify-between gap-2 px-3 py-3 min-[400px]:px-5 min-[400px]:py-3.5">
        <Link href="/" aria-label="Bolucompras, inicio" className="min-w-0 no-underline">
          <span className="inline-block -rotate-2 whitespace-nowrap font-impact text-[16px] tracking-wide text-white min-[400px]:text-[22px] min-[701px]:text-[34px]">
            <span aria-hidden="true">🛒 </span>
            BOLU
            <span className="ml-1 rounded-lg bg-sun px-1.5 text-ink min-[400px]:px-2">COMPRAS</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-x-[18px] min-[701px]:flex" aria-label="Principal">
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
          <MobileMenu />
          <Link className={CTA} href="#newsletter">
            <span aria-hidden="true">💌</span>
            <span className="ml-1 max-[359px]:sr-only">Suscribite</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
