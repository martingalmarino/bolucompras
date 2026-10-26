import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "¿Qué es esto?",
  description:
    "Bolucompras muestra una compra innecesaria por día, con link a la tienda y un medidor de boludez del 1 al 10.",
  alternates: { canonical: "/que-es-esto" },
  openGraph: {
    title: "¿Qué es Bolucompras?",
    description:
      "Una bolucompra por día. Nadie la necesita. Igual la querés mirar.",
    locale: "es_AR",
  },
};

const cards = [
  {
    title: "Una por día",
    text: "Ni un carrusel infinito de ofertas ni un “también te puede interesar” eterno en la tapa. Cada día, en Córdoba, entra una sola. La de ayer pasa al archivo. La de mañana no se espía.",
    bg: "#FFD23F",
    rotate: "-rotate-1",
  },
  {
    title: "De dónde salen",
    text: "Mercado Libre, Amazon, Temu o Shein. El botón te lleva a la tienda. Si hay link de afiliado, lo usamos; si no, va el link del producto. En los dos casos se abre en otra pestaña.",
    bg: "#7CF5D0",
    rotate: "rotate-1",
  },
  {
    title: "El medidor",
    text: "El nivel de boludez lo ponemos nosotros, del 1 al 10. Criterio científico: si te hace reír y no te cambia la vida, sube. Un 10 es para enmarcar. O para esconder cuando viene visita.",
    bg: "#FF9EC9",
    rotate: "-rotate-1",
  },
  {
    title: "La plata",
    text: "Los precios son una referencia del día en que los miramos. Manda la tienda. Si el link es de afiliado, podemos cobrar una comisión sin que a vos te salga más caro. El aviso está en el pie, siempre.",
    bg: "#B9A6FF",
    rotate: "rotate-1",
  },
];

export default function QueEsEstoPage() {
  return (
    <section className="px-5 py-10">
      <div className="mx-auto w-full max-w-[1160px]">
        <h1 className="text-center font-impact text-[38px] leading-none min-[701px]:text-[56px]">
          ¿QUÉ <em className="titulo-fucsia not-italic">ES</em> ESTO?
        </h1>
        <p className="mx-auto mb-8 mt-3 max-w-2xl text-center text-lg">
          Un escaparate diario de cosas que nadie necesita y todo el mundo quiere mirar. Hecho para
          reírse, no para resolver la vida.
        </p>
        <div className="grid gap-6 min-[701px]:grid-cols-2">
          {cards.map((card) => (
            <article
              key={card.title}
              className={`rounded-[24px] border-4 border-ink p-6 shadow-[8px_8px_0_#1d1d1b] ${card.rotate}`}
              style={{ backgroundColor: card.bg }}
            >
              <h2 className="font-impact text-3xl leading-none">{card.title}</h2>
              <p className="mt-3 text-[17px] leading-normal">{card.text}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-lg font-extrabold">
          <Link
            href="/"
            className="text-ink underline decoration-2 underline-offset-4 hover:text-fucsia-deep"
          >
            Volver a la bolucompra del día
          </Link>
        </p>
      </div>
    </section>
  );
}
