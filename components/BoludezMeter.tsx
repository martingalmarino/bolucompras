export function BoludezMeter({ nivel }: { nivel: number }) {
  const value = Math.max(0, Math.min(10, Math.round(nivel)));
  return (
    <div className="my-4">
      <div className="mb-1.5 flex justify-between text-[15px] font-extrabold">
        <span>🤪 Nivel de boludez</span>
        <span>{value}/10</span>
      </div>
      <div
        className="h-[22px] overflow-hidden rounded-full border-[3px] border-ink bg-[#eee]"
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={10}
        aria-label={`Nivel de boludez ${value} de 10`}
      >
        <div
          className="h-full"
          style={{
            width: `${value * 10}%`,
            background:
              "repeating-linear-gradient(45deg,#FF3E9A 0 14px,#FF6FB5 14px 28px)",
          }}
        />
      </div>
    </div>
  );
}
