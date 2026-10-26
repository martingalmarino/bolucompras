const PHRASE =
  "🔥    Mercado Libre · Amazon · Temu · Shein    ★    Una boludez nueva cada día    ★    Tu billetera ya está temblando    ★    Comprar no es necesario, pero qué lindo    🔥";

export function Ticker() {
  return (
    <div className="overflow-hidden border-b-[3px] border-ink bg-sun py-2 text-sm font-extrabold text-ink">
      <p className="sr-only">
        Mercado Libre, Amazon, Temu y Shein. Una boludez nueva cada día. Tu billetera ya está
        temblando.
      </p>
      <div className="ticker-track whitespace-nowrap" aria-hidden="true">
        <span className="px-8">{PHRASE}</span>
        <span className="px-8">{PHRASE}</span>
      </div>
    </div>
  );
}
