import { LogoLink } from "@/components/Logo";
import { todayISO, yearFromISO } from "@/lib/dates";
import Link from "next/link";

export function Footer() {
  const year = yearFromISO(todayISO());
  return (
    <footer className="mt-10 border-t-[5px] border-sun bg-ink py-8 text-sm leading-relaxed text-[#ddd]">
      <div className="mx-auto w-full max-w-[1160px] px-5">
        <LogoLink size="sm" />
        <nav aria-label="Pie" className="mb-3 mt-3 flex flex-wrap gap-x-4 gap-y-2 font-extrabold">
          <Link className="text-white no-underline hover:text-sun" href="/archivo">
            Archivo
          </Link>
          <Link className="text-white no-underline hover:text-sun" href="/archivo?vista=boludas">
            Ranking
          </Link>
          <Link className="text-white no-underline hover:text-sun" href="/que-es-esto">
            ¿Qué es esto?
          </Link>
          <Link className="text-white no-underline hover:text-sun" href="/privacidad">
            Privacidad
          </Link>
          <Link className="text-white no-underline hover:text-sun" href="/terminos">
            Términos
          </Link>
          <Link className="text-white no-underline hover:text-sun" href="/contacto">
            Contacto
          </Link>
        </nav>
        <p className="mb-3 font-extrabold text-sun">No lo necesitás · nolonecesitas.com.ar</p>
        <div className="my-3 rounded-lg border-l-[5px] border-fucsia bg-[#2c2c2a] px-4 py-3">
          <p>
            <span aria-hidden="true">⚠️ </span>
            <strong className="text-white">Aviso de afiliados:</strong> algunos links de este sitio
            son de afiliados (Mercado Libre, Amazon, Temu, Shein). Si comprás, podemos recibir una
            comisión sin costo extra para vos. Así bancamos el servidor y más boludeces.
          </p>
        </div>
        <p>
          Precios orientativos, pueden cambiar. No nos hacemos cargo de tu pareja preguntando “¿y
          esto para qué?”. © {year} Bolucompras · Hecho con 🧉 y cero responsabilidad financiera.
        </p>
      </div>
    </footer>
  );
}
