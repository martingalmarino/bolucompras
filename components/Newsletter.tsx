"use client";

import { Sticker } from "@/components/Sticker";
import { useState, type FormEvent } from "react";

const ERROR = "Algo se rompió, probá de nuevo";
const EXITO = "¡Listo! Revisá tu mail para confirmar 🙌";

export function Newsletter() {
  const [estado, setEstado] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [mensaje, setMensaje] = useState("");

  async function enviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const datos = new FormData(event.currentTarget);
    setEstado("loading");
    setMensaje("");

    try {
      const respuesta = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(datos.get("email") ?? ""),
          bolu_extra: String(datos.get("bolu_extra") ?? ""),
        }),
      });
      const payload = (await respuesta.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;
      if (!respuesta.ok || !payload?.ok) {
        setEstado("error");
        setMensaje(payload?.error || ERROR);
        return;
      }
      setEstado("success");
      setMensaje(EXITO);
    } catch {
      setEstado("error");
      setMensaje(ERROR);
    }
  }

  const ocupado = estado === "loading";

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
          onSubmit={enviar}
          aria-busy={ocupado}
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
            disabled={ocupado || estado === "success"}
            className="min-w-0 flex-1 rounded-[14px] border-[3px] border-ink px-4 py-4 text-[17px] text-ink disabled:opacity-70"
          />
          <label className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
            Dejá esto vacío
            <input name="bolu_extra" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
          <button
            type="submit"
            disabled={ocupado || estado === "success"}
            className="rounded-[14px] border-[3px] border-ink bg-sun px-5 py-3.5 font-impact text-[22px] text-ink shadow-[4px_4px_0_#1d1d1b] disabled:cursor-wait disabled:opacity-70 min-[701px]:py-0"
          >
            {ocupado ? "SUMANDO…" : "¡ME SUMO!"}
          </button>
        </form>
        {mensaje ? (
          <p
            role="status"
            className={`mt-4 font-extrabold ${estado === "error" ? "text-white" : "text-sun"}`}
          >
            {mensaje}
          </p>
        ) : null}
      </div>
    </section>
  );
}
