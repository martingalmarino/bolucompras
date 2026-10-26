import { MobileMenu } from "@/components/MobileMenu";
import Link from "next/link";


const CTA =
  "inline-block shrink-0 rounded-full border-2 border-white bg-fucsia-deep px-2.5 py-2 text-[12px] font-extrabold text-white no-underline min-[380px]:px-3.5 min-[380px]:text-sm";

const LINK = "font-extrabold text-white no-underline hover:text-sun";

export function Header() {
  return (
    <header className="border-b-[5px] border-fucsia bg-ink text-white">
      <div className="mx-auto flex w-full max-w-[1160px] items-center justify-between gap-3 px-5 py-3.5">
        <Link href="/" aria-label="Bolucompras, inicio" className="no-underline">
          <span className="inline-block -rotate-2 whitespace-nowrap font-impact text-[18px] tracking-wide text-white min-[380px]:text-[22px] min-[701px]:text-[34px]">
            <span aria-hidden="true">🛒 </span>
            BOLU
            <span className="ml-1 rounded-lg bg-sun px-2 text-ink">COMPRAS</span>
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
            💌 Suscribite
          </Link>
        </nav>

        <div className="flex items-center gap-2 min-[701px]:hidden">
          <MobileMenu />
          <Link className={CTA} href="#newsletter">
            💌 Suscribite
          </Link>
        </div>
      </div>
    </header>
  );
}
