import type { ReactNode } from "react";

export function PaginaTexto({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <section className="px-5 py-10">
      <div className="mx-auto w-full max-w-[760px]">
        <h1 className="font-impact text-[34px] leading-none min-[400px]:text-[48px]">{title}</h1>
        <p className="mt-3 text-lg">{intro}</p>
        <div className="mt-6 space-y-4 rounded-[24px] border-4 border-ink bg-white p-6 text-[17px] leading-relaxed shadow-[8px_8px_0_#1d1d1b]">
          {children}
        </div>
      </div>
    </section>
  );
}
