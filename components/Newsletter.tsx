"use client";

import { Sticker } from "@/components/Sticker";
import { useState } from "react";

export function Newsletter() {
  const [done, setDone] = useState(false);

  return (
    <section id="newsletter" className="scroll-mt-6 px-5 pb-2 pt-6" aria-labelledby="newsletter-titulo">
      <div className="relative mx-auto max-w-[1160px] rounded-[28px] border-4 border-ink bg-violet px-4 pb-8 pt-20 text-center text-white shadow-[7px_7px_0_#1d1d1b] min-[701px]:px-10 min-[701px]:py-10 min-[701px]:shadow-[12px_12px_0_#1d1d1b]">
        <Sticker tone="green" className="right-3 top-3 rotate-[8deg] min-[701px]:right-8 min-[701px]:top-[-22px]">
          GRATIS 🙌
        </Sticker>
        <h2 id="newsletter-titulo" className="font-impact text-[28px] leading-none min-[400px]:text-[32px] min-[701px]:text-[44px]">
          💌 Recibí la boludez del día
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-lg">
          Todas las mañanas, una compra innecesaria directo a tu mail. Sin spam (bueno, un poquito
          de boludez).
        </p>
        <form
          className="mx-auto mt-5 flex max-w-[560px] flex-col gap-2.5 min-[701px]:flex-row"
          action="#newsletter"
          onSubmit={(event) => {
            event.preventDefault();
            setDone(true);
          }}
        >
          <label htmlFor="email" className="sr-only">
            Tu mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="tu@mail.com"
            className="min-w-0 flex-1 rounded-[14px] border-[3px] border-ink px-4 py-4 text-[17px] text-ink"
          />
          <button
            type="submit"
            className="rounded-[14px] border-[3px] border-ink bg-sun px-5 py-3.5 font-impact text-[22px] text-ink shadow-[4px_4px_0_#1d1d1b] min-[701px]:py-0"
          >
            ¡ME SUMO!
          </button>
        </form>
        {done ? (
          <p role="status" className="mt-4 font-extrabold text-sun">
            ¡Listo! Te anotamos en la lista imaginaria. Cuando conectemos el mail, la boludez te
            llega de mañana. Mientras, pasate por acá cada día.
          </p>
        ) : (
          <p className="mt-4 text-sm text-white/90">
            Por ahora es la interfaz: el mail todavía no sale. No te vamos a escribir de la nada.
          </p>
        )}
      </div>
    </section>
  );
}
