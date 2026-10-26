import { BolucompraCard } from "@/components/BolucompraCard";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { formatLongDate } from "@/lib/dates";
import { productJsonLd } from "@/lib/jsonld";
import { getAllSlugs, getCatalog, getPublishedBySlug } from "@/lib/products";
import { getSiteUrl } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 86400;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getPublishedBySlug(slug);
  if (!product) {
    return {
      title: "Todavía no salió",
      robots: { index: false, follow: false },
    };
  }

  const site = getSiteUrl();
  return {
    title: product.nombre,
    description: product.descripcion,
    alternates: { canonical: `/b/${product.slug}` },
    openGraph: {
      type: "website",
      locale: "es_AR",
      url: `${site}/b/${product.slug}`,
      title: product.nombre,
      description: product.descripcion,
      images: product.imagenUrl ? [{ url: product.imagenUrl, alt: product.nombre }] : undefined,
    },
    twitter: {
      card: product.imagenUrl ? "summary_large_image" : "summary",
      title: product.nombre,
      description: product.descripcion,
      images: product.imagenUrl ? [product.imagenUrl] : undefined,
    },
  };
}

export default async function BolucompraPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getPublishedBySlug(slug);
  if (!product) notFound();

  const { today, published } = getCatalog();
  const others = published.filter((item) => item.id !== product.id).slice(0, 4);
  const site = getSiteUrl();

  return (
    <article className="px-5 py-8">
      <JsonLd data={productJsonLd(product, site)} />
      <div className="mx-auto w-full max-w-[1160px]">
        <nav aria-label="Migas" className="mb-5">
          <ol className="flex flex-wrap items-center gap-2 text-sm font-extrabold">
            <li>
              <Link href="/" className="text-ink underline decoration-2 underline-offset-4">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/archivo" className="text-ink underline decoration-2 underline-offset-4">
                Archivo
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="max-w-[18rem] truncate">
              {product.nombre}
            </li>
          </ol>
        </nav>
        <p className="mb-4 text-center font-extrabold">
          {product.fecha === today
            ? "Es la bolucompra del día. Aprovechá, mañana hay otra."
            : `Salió el ${formatLongDate(product.fecha)}. Sigue dando vergüenza ajena.`}
        </p>
        <BolucompraCard product={product} today={today} heading="h1" priorityImage />
        {others.length > 0 ? (
          <section className="mt-12" aria-labelledby="otras-titulo">
            <h2 id="otras-titulo" className="mb-5 font-impact text-[30px] leading-none min-[701px]:text-[40px]">
              Otras que ya salieron
            </h2>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((item, index) => (
                <li key={item.id}>
                  <ProductCard product={item} index={index} layout="grid" />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}
