"use client";

import { ProductCard } from "@/components/ProductCard";
import type { CarruselTab } from "@/lib/tabs";
import { cx } from "@/lib/cx";
import { useEffect, useRef, useState } from "react";

function emptyMessage(tabId: string): string {
  if (tabId === "semana") {
    return "Esta semana todavía no hay bolucompras anteriores. O es lunes y la de hoy no cuenta, o la cosa recién arranca.";
  }
  if (tabId === "boludas") {
    return "Cuando haya archivo, acá se ordenan de la más boluda a la más tímida.";
  }
  return "Este mes está en blanco. Mirá otra pestaña, que el material está por ahí.";
}

export function CarruselAnteriores({ tabs }: { tabs: CarruselTab[] }) {
  const [tabId, setTabId] = useState(tabs[0]?.id ?? "semana");
  const tab = tabs.find((item) => item.id === tabId) ?? tabs[0];
  const items = tab?.items ?? [];
  const scroller = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    const measure = () => {
      const card = el.querySelector<HTMLElement>("[data-card]");
      const width = (card?.offsetWidth ?? 250) + 20;
      const max = Math.max(0, el.scrollWidth - el.clientWidth);
      const total = max <= 8 ? 1 : Math.round(max / width) + 1;
      setPages(total);
      setPage(Math.min(total - 1, Math.round(el.scrollLeft / width)));
    };

    el.scrollTo({ left: 0 });
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [tabId, items.length]);

  function scrollByCard(direction: number) {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const width = (card?.offsetWidth ?? 250) + 20;
    el.scrollBy({ left: direction * width, behavior: "smooth" });
  }

  function scrollToPage(index: number) {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const width = (card?.offsetWidth ?? 250) + 20;
    el.scrollTo({ left: index * width, behavior: "smooth" });
  }

  return (
    <section className="px-5 py-8" aria-labelledby="anteriores-titulo">
      <div className="mx-auto w-full max-w-[1160px]">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h2 id="anteriores-titulo" className="font-impact text-[26px] leading-none min-[400px]:text-[32px] min-[701px]:text-[40px]">
              📚 Bolucompras anteriores
            </h2>
            <div role="tablist" aria-label="Filtrar bolucompras anteriores" className="mt-2 flex flex-wrap">
              {tabs.map((item) => {
                const selected = item.id === tab?.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    id={`tab-${item.id}`}
                    aria-selected={selected}
                    aria-controls="panel-anteriores"
                    className={cx(
                      "mb-1.5 mr-1.5 rounded-full border-2 border-ink px-3 py-1 text-[13px] font-extrabold",
                      selected ? "bg-ink text-white" : "bg-white text-ink",
                    )}
                    onClick={() => {
                      setTabId(item.id);
                      scroller.current?.scrollTo({ left: 0 });
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
          {items.length > 1 ? (
            <div className="hidden shrink-0 min-[701px]:flex">
              <button
                type="button"
                aria-label="Ver las anteriores"
                className="h-[50px] w-[50px] rounded-full border-[3px] border-ink bg-sun text-[22px] font-black shadow-[3px_3px_0_#1d1d1b] disabled:cursor-not-allowed disabled:opacity-40"
                onClick={() => scrollByCard(-1)}
                disabled={page <= 0}
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Ver las siguientes"
                className="ml-2 h-[50px] w-[50px] rounded-full border-[3px] border-ink bg-sun text-[22px] font-black shadow-[3px_3px_0_#1d1d1b] disabled:cursor-not-allowed disabled:opacity-40"
                onClick={() => scrollByCard(1)}
                disabled={page >= pages - 1}
              >
                →
              </button>
            </div>
          ) : null}
        </div>

        <div
          id="panel-anteriores"
          role="tabpanel"
          aria-labelledby={tab ? `tab-${tab.id}` : undefined}
        >
          {items.length === 0 ? (
            <p className="rounded-[20px] border-[3px] border-dashed border-ink bg-white px-5 py-10 text-center font-extrabold">
              {emptyMessage(tab?.id ?? "semana")}
            </p>
          ) : (
            <div
              ref={scroller}
              tabIndex={0}
              aria-label="Listado de bolucompras. Deslizá o usá las flechas para moverte."
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  scrollByCard(1);
                }
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  scrollByCard(-1);
                }
              }}
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-1.5 pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {items.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>

        {items.length > 1 && pages > 1 ? (
          <div className="mt-2 flex justify-center gap-2">
            {Array.from({ length: pages }, (_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Ir al grupo ${index + 1} de ${pages}`}
                aria-current={index === page ? "true" : undefined}
                className={cx(
                  "h-3 border-0 p-0",
                  index === page ? "w-[30px] rounded-lg bg-fucsia" : "w-3 rounded-full bg-ink/20",
                )}
                onClick={() => scrollToPage(index)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
