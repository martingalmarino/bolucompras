import { BolucompraCard } from "@/components/BolucompraCard";
import { Sticker } from "@/components/Sticker";
import { addDays, formatLongDate } from "@/lib/dates";
import type { Bolucompra } from "@/lib/types";

function TituloDelDia() {
  return (
    <>
      <h1 className="text-center font-impact text-[38px] leading-none min-[701px]:text-[56px]">
        LA <em className="titulo-fucsia not-italic">BOLUCOMPRA</em> DEL DÍA
      </h1>
      <p className="mb-7 mt-1.5 text-center text-lg">Nadie la necesita. Todos la quieren. 🤷‍♂️</p>
    </>
  );
}

export function HeroBolucompra({ product, today }: { product: Bolucompra; today: string }) {
  return (
    <section className="px-5 pb-4 pt-10">
      <div className="mx-auto w-full max-w-[1160px]">
        <TituloDelDia />
        <BolucompraCard product={product} today={today} heading="h2" showFichaLink priorityImage />
      </div>
    </section>
  );
}

export function HeroEspera({ today, nextDate }: { today: string; nextDate: string | null }) {
  const tomorrow = addDays(today, 1);
  const when = !nextDate
    ? "Por ahora no hay más en la gatera. Cuando carguemos otra, aparece sola."
    : nextDate === tomorrow
      ? "Mañana sale la primera. Dormí tranquilo, que la billetera todavía está a salvo."
      : `La próxima sale el ${formatLongDate(nextDate)}. Hasta entonces, cero spoilers.`;

  return (
    <section className="px-5 pb-4 pt-10">
      <div className="mx-auto w-full max-w-[1160px]">
        <TituloDelDia />
        <div className="grid grid-cols-1 items-center gap-6 rounded-[28px] border-4 border-ink bg-white p-[18px] shadow-[7px_7px_0_#1d1d1b] min-[701px]:grid-cols-2 min-[701px]:gap-[30px] min-[701px]:p-[30px] min-[701px]:shadow-[12px_12px_0_#1d1d1b]">
          <div className="relative">
            <div className="flex min-h-[260px] items-center justify-center rounded-[22px] border-[3px] border-ink bg-[linear-gradient(135deg,#7CF5D0,#5AB0FF)] text-[140px] min-[701px]:min-h-[360px] min-[701px]:text-[190px]">
              <span role="img" aria-label="Todavía no hay bolucompra">
                🤷
              </span>
            </div>
            <Sticker tone="pink" className="left-[-18px] top-[-18px] -rotate-[10deg]">
              MUY PRONTO
            </Sticker>
            <Sticker tone="yellow" className="bottom-4 right-[-6px] rotate-[8deg] min-[701px]:right-[-20px]">
              Billetera a salvo
            </Sticker>
          </div>
          <div>
            <h2 className="font-heavy text-[26px] leading-tight min-[701px]:text-[34px]">
              Hoy no hay bolucompra
            </h2>
            <p className="mt-3 text-[17px] leading-normal">{when}</p>
            <p className="mt-3 text-[17px] leading-normal">
              Cuando cambia el día en Córdoba, entra la que toca. Una sola. Ni una más.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
