"use client";

import Link from "next/link";
import { useLayoutEffect, useState } from "react";

const CLAVE = "bolucompras-navidad-banner";

export function BannerNavidad() {
  const [cerrado, setCerrado] = useState(false);

  useLayoutEffect(() => {
    try {
      if (localStorage.getItem(CLAVE) === "cerrado") setCerrado(true);
    } catch {
      /* el aviso sigue visible si no se puede leer el almacenamiento */
    }
  }, []);

  if (cerrado) return null;

  function cerrar() {
    try {
      localStorage.setItem(CLAVE, "cerrado");
    } catch {
      /* si el navegador bloquea el almacenamiento, igual se cierra en esta visita */
    }
    setCerrado(true);
  }

  return (
    <div className="border-b-[3px] border-ink bg-[#C8102E] text-white">
      <div className="mx-auto flex w-full max-w-[1160px] items-center gap-2 px-3 py-2 min-[400px]:px-5">
        <Link
          href="/navidad"
          className="min-w-0 flex-1 text-left text-[13px] font-extrabold leading-snug text-white no-underline hover:text-sun min-[400px]:text-sm min-[701px]:text-center"
        >
          <span aria-hidden="true">🎅 </span>
          Se vienen las Bolucompras Navideñas: regalos absurdos para chicos desde el 22/11{" "}
          <span className="whitespace-nowrap underline decoration-2 underline-offset-2">→ Ver especial</span>
        </Link>
        <button
          type="button"
          onClick={cerrar}
          aria-label="Cerrar el aviso de Navidad"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-white text-lg font-extrabold leading-none text-white hover:bg-white hover:text-[#C8102E]"
        >
          <span aria-hidden="true">✕</span>
        </button>
      </div>
    </div>
  );
}
