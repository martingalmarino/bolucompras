import { BolucompraCard } from "@/components/BolucompraCard";
import { Sticker } from "@/components/Sticker";
import { cx } from "@/lib/cx";
import { addDays, formatLongDate } from "@/lib/dates";
import type { Bolucompra } from "@/lib/types";

function TituloDelDia() {
  return (
    <>
        <h1 className="text-center font-impact text-[32px] leading-[0.9] min-[400px]:text-[40px] min-[701px]:text-[56px]">
        <span className="block">
          LA <em className="titulo-fucsia not-italic">BOLUCOMPRA</em>
        </span>
        <span className="block">DEL DÍA</span>
      </h1>
      <p className="mb-7 mt-1.5 text-center text-lg">Nadie la necesita. Todos la quieren. 🤷‍♂️</p>
    </>
  );
}

function Etiqueta({ children, tone }: { children: string; tone: "pink" | "yellow" }) {
  return (
    <h2
      className={cx(
        "mb-4 inline-block -rotate-2 rounded-2xl border-[3px] border-ink px-4 py-1.5 font-impact text-[26px] leading-none shadow-[4px_4px_0_#1d1d1b] min-[400px]:text-[32px]",
        tone === "pink" ? "bg-fucsia text-white" : "bg-sun text-ink",
      )}
    >
      {children}
    </h2>
  );
}

export function HeroBolucompra({
  product,
  bonus,
  today,
}: {
  product: Bolucompra;
  bonus?: Bolucompra | null;
  today: string;
}) {
  return (
    <section className="px-5 pb-4 pt-10">
      <div className="mx-auto w-full max-w-[1160px]">
        <TituloDelDia />
        {bonus ? (
          <div className="grid grid-cols-1 items-start gap-8 min-[701px]:grid-cols-[minmax(0,1.15fr)_minmax(240px,0.85fr)]">
            <div>
              <Etiqueta tone="pink">Bolucompra del día</Etiqueta>
              <BolucompraCard
                product={product}
                today={today}
                heading="h3"
                showFichaLink
                priorityImage
                stack
              />
            </div>
            <div>
              <Etiqueta tone="yellow">Bonus del día</Etiqueta>
              <BolucompraCard
                product={bonus}
                today={today}
                heading="h3"
                showFichaLink
                compact
                stack
                ribbon="BONUS"
              />
            </div>
          </div>
        ) : (
          <BolucompraCard product={product} today={today} heading="h2" showFichaLink priorityImage />
        )}
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
            <Sticker tone="pink" className="left-2 top-2 -rotate-[10deg] min-[701px]:left-[-18px] min-[701px]:top-[-18px]">
              MUY PRONTO
            </Sticker>
            <Sticker tone="yellow" className="bottom-3 right-2 rotate-[8deg] min-[701px]:bottom-4 min-[701px]:right-[-20px]">
              Billetera a salvo
            </Sticker>
          </div>
          <div>
            <h2 className="font-heavy text-[26px] leading-tight min-[701px]:text-[34px]">
              Hoy no hay bolucompra
            </h2>
            <p className="mt-3 text-[17px] leading-normal">{when}</p>
            <p className="mt-3 text-[17px] leading-normal">
              Cuando cambia el día en Argentina, entra la que toca. Una sola. Ni una más.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
