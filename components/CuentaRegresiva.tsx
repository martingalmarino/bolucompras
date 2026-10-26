"use client";

import { useEffect, useState } from "react";

function partes(diff: number) {
  const total = Math.max(0, Math.floor(diff / 1000));
  const dias = Math.floor(total / 86400);
  const horas = Math.floor((total % 86400) / 3600);
  const minutos = Math.floor((total % 3600) / 60);
  const segundos = total % 60;
  return { dias, horas, minutos, segundos };
}

function Bloque({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-[4.5rem] flex-1 rounded-2xl border-[3px] border-ink bg-white px-2 py-3 text-center shadow-[4px_4px_0_#1d1d1b]">
      <p className="font-impact text-4xl leading-none">{value}</p>
      <p className="mt-1 text-xs font-extrabold">{label}</p>
    </div>
  );
}

export function CuentaRegresiva({ target }: { target: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const targetMs = new Date(`${target}T00:00:00-03:00`).getTime();
  const diff = now == null ? null : targetMs - now;
  const listo = diff != null && diff <= 0;
  const tiempo = diff == null ? null : partes(diff);

  return (
    <div className="mt-6" aria-live="off">
      {listo ? (
        <p className="text-center text-lg font-extrabold">
          Ya es {target.slice(8, 10)}/{target.slice(5, 7)}. Actualizá, que el regalo está saliendo del horno.
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-3">
          <Bloque value={tiempo ? String(tiempo.dias) : "—"} label="días" />
          <Bloque value={tiempo ? String(tiempo.horas).padStart(2, "0") : "—"} label="horas" />
          <Bloque value={tiempo ? String(tiempo.minutos).padStart(2, "0") : "—"} label="minutos" />
          <Bloque value={tiempo ? String(tiempo.segundos).padStart(2, "0") : "—"} label="segundos" />
        </div>
      )}
    </div>
  );
}
