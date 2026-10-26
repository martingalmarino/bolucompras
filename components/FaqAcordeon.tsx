import type { FaqItem } from "@/lib/types";

export function FaqAcordeon({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.pregunta}
          className="group rounded-[18px] border-[3px] border-ink bg-white shadow-[4px_4px_0_#1d1d1b] open:bg-sun"
        >
          <summary className="flex items-center justify-between gap-3 px-4 py-3 font-extrabold">
            <span className="min-w-0">{item.pregunta}</span>
            <span aria-hidden="true" className="shrink-0 font-impact text-xl leading-none group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="px-4 pb-4 text-[17px] leading-normal">{item.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
