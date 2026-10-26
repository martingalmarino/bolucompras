import { CuentaRegresiva } from "@/components/CuentaRegresiva";
import { ProductCard } from "@/components/ProductCard";
import { formatDayMonth } from "@/lib/dates";
import { cx } from "@/lib/cx";
import { getNavidad } from "@/lib/products";
import { canonicalUrl, pageOpenGraph } from "@/lib/site";
import { franjaLabel } from "@/lib/temporada";
import type { FranjaPrecio } from "@/lib/types";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

const TITLE = "Regalos navideños para chicos";
const DESCRIPTION =
  "Regalos de Navidad divertidos para chicos: las bolucompras navideñas que ya salieron, para filtrar por edad y por lo que aguanta la billetera.";

const FRANJAS: FranjaPrecio[] = ["barato", "medio", "caro"];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: canonicalUrl("/navidad") },
  openGraph: pageOpenGraph("/navidad", TITLE, DESCRIPTION),
};

type NavidadProps = {
  searchParams: Promise<{ edad?: string; franja?: string }>;
};

function hrefNavidad(edad: string, franja: string) {
  const params = new URLSearchParams();
  if (edad) params.set("edad", edad);
  if (franja) params.set("franja", franja);
  const query = params.toString();
  return query ? `/navidad?${query}` : "/navidad";
}

export default async function NavidadPage({ searchParams }: NavidadProps) {
  const { edad: edadParam, franja: franjaParam } = await searchParams;
  const { published, estreno } = getNavidad();
  const edades = [...new Set(published.map((product) => product.edadSugerida).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "es"),
  );
  const franjas = FRANJAS.filter((franja) => published.some((product) => product.franja === franja));
  const edad = edadParam && edades.includes(edadParam) ? edadParam : "";
  const franja = franjaParam && franjas.includes(franjaParam as FranjaPrecio) ? franjaParam : "";
  const items = published.filter((product) => {
    if (edad && product.edadSugerida !== edad) return false;
    if (franja && product.franja !== franja) return false;
    return true;
  });
  const cuando = formatDayMonth(estreno);

  return (
    <section className="px-5 py-10">
      <div className="mx-auto w-full max-w-[1160px]">
        <h1 className="font-impact text-[34px] leading-none min-[400px]:text-[42px] min-[701px]:text-[56px]">
          Regalos navideños para chicos
        </h1>
        <p className="mb-6 mt-3 max-w-3xl text-lg leading-relaxed">
          ¿Buscás un regalo de Navidad para un pibe y todo lo serio te aburre? Acá van las
          bolucompras navideñas que ya salieron: juguetes, disfraces y chiches que arrancan una
          carcajada. Filtrá por edad y por franja de precio. Lo que todavía no se publicó no
          aparece. En esta casa no hay spoilers.
        </p>

        {published.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-[28px] border-4 border-ink bg-white p-6 text-center shadow-[8px_8px_0_#1d1d1b] min-[701px]:p-8">
            <h2 className="font-impact text-[40px] leading-none min-[701px]:text-6xl">
              Se viene… <span aria-hidden="true">🎅</span>
            </h2>
            <p className="mt-3 text-lg">
              La primera se destapa el {cuando}. Hasta entonces, la lista sigue envuelta.
            </p>
            <CuentaRegresiva target={estreno} />
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-col gap-4 rounded-[24px] border-4 border-ink bg-white p-4 shadow-[6px_6px_0_#1d1d1b] min-[701px]:flex-row min-[701px]:items-end min-[701px]:justify-between">
              <form action="/navidad" className="flex flex-wrap items-end gap-3">
                <div>
                  <label htmlFor="edad" className="mb-1 block text-sm font-extrabold">
                    Edad
                  </label>
                  <select
                    id="edad"
                    name="edad"
                    key={edad}
                    defaultValue={edad}
                    className="min-h-11 rounded-xl border-[3px] border-ink bg-cream px-3 py-2 font-extrabold"
                  >
                    <option value="">Todas</option>
                    {edades.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {franja ? <input type="hidden" name="franja" value={franja} /> : null}
                <button
                  type="submit"
                  className="min-h-11 rounded-full border-[3px] border-ink bg-fucsia px-4 py-2 font-extrabold text-white shadow-[3px_3px_0_#1d1d1b]"
                >
                  Filtrar
                </button>
              </form>
              <div>
                <p id="franja-label" className="mb-1 text-sm font-extrabold">
                  Franja de precio
                </p>
                <nav aria-labelledby="franja-label" className="flex flex-wrap gap-2">
                  <Link
                    href={hrefNavidad(edad, "")}
                    aria-current={franja === "" ? "page" : undefined}
                    className={cx(
                      "rounded-full border-2 border-ink px-3 py-1.5 text-sm font-extrabold no-underline",
                      franja === "" ? "bg-ink text-white" : "bg-white text-ink",
                    )}
                  >
                    Todas
                  </Link>
                  {franjas.map((option) => (
                    <Link
                      key={option}
                      href={hrefNavidad(edad, option)}
                      aria-current={franja === option ? "page" : undefined}
                      className={cx(
                        "rounded-full border-2 border-ink px-3 py-1.5 text-sm font-extrabold no-underline",
                        franja === option ? "bg-ink text-white" : "bg-mint text-ink",
                      )}
                    >
                      {franjaLabel(option)}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {items.length === 0 ? (
              <p className="rounded-[20px] border-[3px] border-dashed border-ink bg-white px-5 py-10 text-center font-extrabold">
                Con ese filtro no hay regalos.{" "}
                <Link href="/navidad" className="underline decoration-2 underline-offset-4">
                  Sacale los filtros
                </Link>{" "}
                y volvé a mirar.
              </p>
            ) : (
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((product, index) => (
                  <li key={product.id}>
                    <ProductCard product={product} index={index} layout="grid" showRegalo />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </section>
  );
}
