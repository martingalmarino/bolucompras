import { ProductCard } from "@/components/ProductCard";
import { monthKey, monthLabel, weekKey } from "@/lib/dates";
import { getCatalog } from "@/lib/products";
import { cx } from "@/lib/cx";
import type { Bolucompra } from "@/lib/types";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

type ArchivoProps = {
  searchParams: Promise<{ vista?: string; mes?: string }>;
};

function filterProducts(
  published: Bolucompra[],
  today: string,
  vista?: string,
  mes?: string,
): Bolucompra[] {
  if (vista === "boludas") {
    return [...published].sort(
      (a, b) => b.nivel - a.nivel || b.fecha.localeCompare(a.fecha) || b.id - a.id,
    );
  }
  if (vista === "semana") {
    const week = weekKey(today);
    return published.filter((product) => weekKey(product.fecha) === week);
  }
  if (mes && /^\d{4}-\d{2}$/.test(mes)) {
    return published.filter((product) => monthKey(product.fecha) === mes);
  }
  return published;
}

export async function generateMetadata({ searchParams }: ArchivoProps): Promise<Metadata> {
  const { vista } = await searchParams;
  if (vista === "boludas") {
    return {
      title: "Ranking: las más boludas",
      description:
        "El ranking de bolucompras ordenado por nivel de boludez. Las que rozan el 10, primero.",
      alternates: { canonical: "/archivo?vista=boludas" },
      openGraph: {
        title: "Ranking: las más boludas",
        description:
          "El ranking de bolucompras ordenado por nivel de boludez. Las que rozan el 10, primero.",
        locale: "es_AR",
      },
    };
  }
  return {
    title: "Archivo",
    description:
      "Todas las bolucompras que ya salieron, de la más nueva a la más vieja. Una por día, sin adelantar las que vienen.",
    alternates: { canonical: "/archivo" },
    openGraph: {
      title: "Archivo de Bolucompras",
      description:
        "Todas las bolucompras que ya salieron, de la más nueva a la más vieja.",
      locale: "es_AR",
    },
  };
}

export default async function ArchivoPage({ searchParams }: ArchivoProps) {
  const { vista, mes } = await searchParams;
  const { today, published } = getCatalog();
  const items = filterProducts(published, today, vista, mes);
  const years = new Set(published.map((product) => product.fecha.slice(0, 4)));
  const months = [...new Set(published.map((product) => monthKey(product.fecha)))].sort((a, b) =>
    b.localeCompare(a),
  );

  const tabs = [
    { href: "/archivo", label: "Todas", active: vista !== "boludas" && vista !== "semana" && !mes },
    { href: "/archivo?vista=semana", label: "Esta semana", active: vista === "semana" },
    ...months.map((key) => ({
      href: `/archivo?mes=${key}`,
      label: monthLabel(key, years.size > 1),
      active: mes === key,
    })),
    {
      href: "/archivo?vista=boludas",
      label: "🏆 Las más boludas",
      active: vista === "boludas",
    },
  ];

  const heading =
    vista === "boludas" ? "Las más boludas" : vista === "semana" ? "Esta semana" : "El archivo";

  return (
    <section className="px-5 py-10">
      <div className="mx-auto w-full max-w-[1160px]">
        <h1 className="font-impact text-[34px] leading-none min-[400px]:text-[42px] min-[701px]:text-[56px]">{heading}</h1>
        <p className="mb-6 mt-2 max-w-2xl text-lg">
          {published.length === 0
            ? "Todavía no salió ninguna. Cuando cambie el día en Argentina, esta página se llena sola."
            : vista === "boludas"
              ? `${items.length} en el ranking, de la que más duele a la que apenas hace cosquillas.`
              : `${items.length} ${items.length === 1 ? "bolucompra ya publicada" : "bolucompras ya publicadas"}, de la más nueva a la más vieja.`}
        </p>
        <nav aria-label="Filtrar el archivo" className="mb-6 flex flex-wrap">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={tab.active ? "page" : undefined}
              className={cx(
                "mb-1.5 mr-1.5 rounded-full border-2 border-ink px-3 py-1 text-[13px] font-extrabold no-underline",
                tab.active ? "bg-ink text-white" : "bg-white text-ink",
              )}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
        {items.length === 0 ? (
          <p className="rounded-[20px] border-[3px] border-dashed border-ink bg-white px-5 py-10 text-center font-extrabold">
            Acá no hay nada publicado con ese filtro. Probá con Todas, que es donde se junta el
            quilombo.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((product, index) => (
              <li key={product.id}>
                <ProductCard product={product} index={index} layout="grid" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
