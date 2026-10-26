import "server-only";

import dataset from "@/data/dataset.json";
import { todayISO } from "@/lib/dates";
import type { Bolucompra } from "@/lib/types";

type RawProduct = {
  id: number;
  nombre: string;
  tienda: string;
  url_producto: string;
  precio_referencia: string;
  moneda: string;
  fecha_precio: string;
  emoji: string;
  imagen_url: string;
  descripcion_graciosa: string;
  nivel_boludez: number;
  tags: string;
  categoria: string;
  link_afiliado: string;
  fecha_publicacion: string;
};

const DATE = /^\d{4}-\d{2}-\d{2}$/;

export function slugify(nombre: string, id: number): string {
  const base = nombre
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
  return `${base || "bolucompra"}-${id}`;
}

function toProduct(raw: RawProduct): Bolucompra {
  if (!DATE.test(raw.fecha_publicacion)) {
    throw new Error(`fecha_publicacion inválida en el id ${raw.id}`);
  }
  return {
    id: raw.id,
    slug: slugify(raw.nombre, raw.id),
    nombre: raw.nombre.trim(),
    tienda: raw.tienda.trim(),
    urlProducto: raw.url_producto?.trim() ?? "",
    linkAfiliado: raw.link_afiliado?.trim() ?? "",
    precioReferencia: raw.precio_referencia?.trim() ?? "",
    moneda: raw.moneda?.trim() ?? "",
    fechaPrecio: raw.fecha_precio?.trim() ?? "",
    emoji: raw.emoji?.trim() || "🛒",
    imagenUrl: raw.imagen_url?.trim() ?? "",
    descripcion: raw.descripcion_graciosa?.trim() ?? "",
    nivel: raw.nivel_boludez,
    tags: raw.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    categoria: raw.categoria.trim(),
    fecha: raw.fecha_publicacion,
  };
}

const products: Bolucompra[] = (dataset as RawProduct[])
  .map(toProduct)
  .sort((a, b) => a.fecha.localeCompare(b.fecha) || a.id - b.id);

const slugs = new Set<string>();
const ids = new Set<number>();
for (const product of products) {
  if (ids.has(product.id)) throw new Error(`id duplicado: ${product.id}`);
  if (slugs.has(product.slug)) throw new Error(`slug duplicado: ${product.slug}`);
  ids.add(product.id);
  slugs.add(product.slug);
}

const bySlug = new Map(products.map((product) => [product.slug, product]));

export type Catalogo = {
  today: string;
  featured: Bolucompra | null;
  anteriores: Bolucompra[];
  published: Bolucompra[];
};

export function getCatalog(now = new Date()): Catalogo {
  const today = todayISO(now);
  const published = products
    .filter((product) => product.fecha <= today)
    .sort((a, b) => b.fecha.localeCompare(a.fecha) || b.id - a.id);
  const featured = published.find((product) => product.fecha === today) ?? published[0] ?? null;
  const anteriores = published.filter(
    (product) => product.fecha < today && product.id !== featured?.id,
  );
  return { today, featured, anteriores, published };
}

export function getPublishedBySlug(slug: string, now = new Date()): Bolucompra | null {
  const product = bySlug.get(slug);
  if (!product) return null;
  if (product.fecha > todayISO(now)) return null;
  return product;
}

export function getAllSlugs(): string[] {
  return products.map((product) => product.slug);
}

export function getNextPublicationDate(today: string): string | null {
  return (
    products
      .filter((product) => product.fecha > today)
      .sort((a, b) => a.fecha.localeCompare(b.fecha))[0]?.fecha ?? null
  );
}
