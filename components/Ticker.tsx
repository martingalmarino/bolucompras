const PHRASE =
  "🔥    Mercado Libre · Amazon · Temu · Shein    ★    Una boludez nueva cada día    ★    Tu billetera ya está temblando    ★    Comprar no es necesario, pero qué lindo    🔥";

const PHRASE_NIEVE =
  "❄    Mercado Libre · Amazon · Temu · Shein    ★    Una boludez nueva cada día    ❄    Tu billetera ya está temblando    ★    Comprar no es necesario, pero qué lindo    ❄";

export function Ticker({ festive = false }: { festive?: boolean }) {
  const phrase = festive ? PHRASE_NIEVE : PHRASE;
  return (
    <div className="relative overflow-hidden border-b-[3px] border-ink bg-sun py-2 text-sm font-extrabold text-ink">
      {festive ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <span className="nieve left-[8%]">❄</span>
          <span className="nieve left-[31%] [animation-delay:-1.2s]">❄</span>
          <span className="nieve left-[57%] [animation-delay:-2s]">❄</span>
          <span className="nieve left-[82%] [animation-delay:-0.6s]">❄</span>
        </div>
      ) : null}
      <p className="sr-only">
        Mercado Libre, Amazon, Temu y Shein. Una boludez nueva cada día. Tu billetera ya está
        temblando.
      </p>
      <div className="ticker-track whitespace-nowrap" aria-hidden="true">
        <span className="px-8">{phrase}</span>
        <span className="px-8">{phrase}</span>
      </div>
    </div>
  );
}
