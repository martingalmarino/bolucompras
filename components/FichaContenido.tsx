import { BoludezMeter } from "@/components/BoludezMeter";
import { BuyButton, BuyNote } from "@/components/BuyButton";
import { FaqAcordeon } from "@/components/FaqAcordeon";
import { Sticker } from "@/components/Sticker";
import { badgeTemporada, franjaLabel } from "@/lib/temporada";
import type { Bolucompra } from "@/lib/types";
import type { ReactNode } from "react";
import Link from "next/link";

function Titulo({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mb-4 break-words font-impact text-[26px] leading-none min-[400px]:text-[32px] min-[701px]:text-[40px]">
      {children}
    </h2>
  );
}

function Lista({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-[17px] leading-normal">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden="true">👉</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function FichaContenido({ product }: { product: Bolucompra }) {
  const temporada = badgeTemporada(product.temporada);
  const deFiesta = product.temporada === "Navidad" || product.temporada === "Reyes";

  return (
    <div className="mt-12 space-y-12">
      {deFiesta ? (
        <section aria-labelledby="temporada-titulo">
          <h2
            id="temporada-titulo"
            className={`inline-block -rotate-2 rounded-2xl border-[3px] border-ink px-4 py-2 font-impact text-[28px] leading-none text-white shadow-[4px_4px_0_#1d1d1b] ${
              product.temporada === "Reyes" ? "bg-violet" : "bg-[#C8102E]"
            }`}
          >
            {temporada}
          </h2>
          {product.edadSugerida || product.franja ? (
            <ul className="mt-5 flex flex-wrap gap-2">
              {product.edadSugerida ? (
                <li className="rounded-full border-2 border-ink bg-white px-3 py-1.5 text-sm font-extrabold">
                  Edad: {product.edadSugerida}
                </li>
              ) : null}
              {product.franja ? (
                <li className="rounded-full border-2 border-ink bg-mint px-3 py-1.5 text-sm font-extrabold">
                  {franjaLabel(product.franja)}
                </li>
              ) : null}
            </ul>
          ) : null}
          {product.consejoParaRegalar ? (
            <div className="mt-5 rotate-1 rounded-[24px] border-4 border-ink bg-sun p-6 shadow-[8px_8px_0_#1d1d1b]">
              <p className="font-impact text-[28px] leading-none min-[701px]:text-4xl">Consejo para regalar</p>
              <p className="mt-3 text-[17px] leading-relaxed">{product.consejoParaRegalar}</p>
            </div>
          ) : null}
          {product.temporada === "Navidad" ? (
            <p className="mt-4 text-sm font-extrabold">
              <Link href="/navidad" className="text-ink underline decoration-2 underline-offset-4 hover:text-fucsia-deep">
                Ver los regalos de Navidad que ya salieron
              </Link>
            </p>
          ) : null}
        </section>
      ) : null}

      {product.intro ? (
        <section aria-labelledby="intro-titulo">
          <Titulo id="intro-titulo">La previa</Titulo>
          <div className="-rotate-1 rounded-[24px] border-4 border-ink bg-white p-6 shadow-[8px_8px_0_#1d1d1b] min-[701px]:p-8">
            <p className="text-[17px] leading-relaxed min-[701px]:text-lg">{product.intro}</p>
          </div>
        </section>
      ) : null}

      {product.porQue.length > 0 ? (
        <section aria-labelledby="porque-titulo">
          <Titulo id="porque-titulo">¿Por qué es una bolucompra?</Titulo>
          <div className="grid gap-5 min-[701px]:grid-cols-2">
            {product.porQue.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`rounded-[24px] border-4 border-ink p-6 text-[17px] leading-relaxed shadow-[8px_8px_0_#1d1d1b] ${
                  index % 2 === 0 ? "-rotate-1 bg-sun" : "rotate-1 bg-mint"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ) : null}

      {product.paraQuien.length > 0 ? (
        <section aria-labelledby="para-quien-titulo">
          <Titulo id="para-quien-titulo">¿Para quién es?</Titulo>
          <div className="rounded-[24px] border-4 border-ink bg-sky p-6 shadow-[8px_8px_0_#1d1d1b]">
            <Lista items={product.paraQuien} />
          </div>
        </section>
      ) : null}

      {product.pros.length > 0 || product.contras.length > 0 ? (
        <section aria-labelledby="balance-titulo">
          <Titulo id="balance-titulo">El balance, sin vueltas</Titulo>
          <div className="grid gap-5 min-[701px]:grid-cols-2">
            {product.pros.length > 0 ? (
              <div className="rounded-[24px] border-4 border-ink bg-mint p-6 shadow-[8px_8px_0_#1d1d1b]">
                <h3 className="mb-3 font-impact text-3xl leading-none">Lo bueno</h3>
                <Lista items={product.pros} />
              </div>
            ) : null}
            {product.contras.length > 0 ? (
              <div className="rounded-[24px] border-4 border-ink bg-[#FF9EC9] p-6 shadow-[8px_8px_0_#1d1d1b]">
                <h3 className="mb-3 font-impact text-3xl leading-none">Lo malo</h3>
                <Lista items={product.contras} />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {product.ideasDeUso.length > 0 ? (
        <section aria-labelledby="ideas-titulo">
          <Titulo id="ideas-titulo">Ideas de uso</Titulo>
          <div className="rotate-1 rounded-[24px] border-4 border-ink bg-[#B9A6FF] p-6 shadow-[8px_8px_0_#1d1d1b]">
            <ol className="space-y-2 text-[17px] leading-normal">
              {product.ideasDeUso.map((idea, index) => (
                <li key={idea} className="flex gap-3">
                  <span className="font-impact text-2xl leading-none">{index + 1}</span>
                  <span>{idea}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {product.veredicto ? (
        <section aria-labelledby="veredicto-titulo">
          <Titulo id="veredicto-titulo">Veredicto</Titulo>
          <div className="relative rounded-[28px] border-4 border-ink bg-white p-6 shadow-[12px_12px_0_#1d1d1b] min-[701px]:p-8">
            <Sticker tone="pink" className="right-3 top-3 rotate-[8deg] min-[701px]:right-4 min-[701px]:top-[-18px]">
              SIN FILTRO
            </Sticker>
            <p className="mt-10 text-[18px] leading-relaxed min-[701px]:mt-4 min-[701px]:text-xl">{product.veredicto}</p>
            <BoludezMeter nivel={product.nivel} />
            <div className="mx-auto mt-6 max-w-xl">
              <BuyButton product={product} />
              <BuyNote product={product} />
            </div>
          </div>
        </section>
      ) : null}

      {product.faq.length > 0 ? (
        <section aria-labelledby="faq-titulo">
          <Titulo id="faq-titulo">Preguntas frecuentes</Titulo>
          <FaqAcordeon items={product.faq} />
        </section>
      ) : null}

      {product.tagsRicos.length > 0 ? (
        <section aria-labelledby="tags-titulo">
          <Titulo id="tags-titulo">También lo buscan así</Titulo>
          <ul className="flex flex-wrap gap-2">
            {product.tagsRicos.map((tag) => (
              <li
                key={tag}
                className="rounded-full border-2 border-ink bg-[#E8F7FF] px-3 py-1.5 text-sm font-extrabold"
              >
                {tag}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
