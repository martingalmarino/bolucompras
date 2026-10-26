import { PaginaTexto } from "@/components/PaginaTexto";
import { canonicalUrl, pageOpenGraph } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Términos",
  description:
    "Bolucompras no es la tienda. Precios orientativos, links de afiliados y un sitio para mirar boludeces.",
  alternates: { canonical: canonicalUrl("/terminos") },
  openGraph: pageOpenGraph(
    "/terminos",
    "Términos",
    "No vendemos nada. Te acercamos la boludez y la tienda hace el resto.",
  ),
};

export default function TerminosPage() {
  return (
    <PaginaTexto
      title="Términos"
      intro="Reglas cortas, para que sepas qué es esto y qué no."
    >
      <h2 className="font-impact text-3xl leading-none">No somos la tienda</h2>
      <p>
        Bolucompras muestra una compra innecesaria por día. No vendemos, no cobramos y no
        despachamos. El botón te lleva a Mercado Libre, Amazon, Temu o Shein. La compra, el envío y
        la devolución los resuelve esa tienda, con sus propias reglas.
      </p>
      <h2 className="font-impact text-3xl leading-none">Precios</h2>
      <p>
        Si ves un precio, es una referencia del día en que lo miramos. Puede cambiar, quedarse sin
        stock o desaparecer. Manda lo que diga la publicación cuando entrás.
      </p>
      <h2 className="font-impact text-3xl leading-none">Afiliados</h2>
      <p>
        Parte de los links son de afiliados. Si comprás desde ahí, podemos cobrar una comisión sin
        que a vos te salga más caro. El aviso también está en el pie de cada página. Más detalle en{" "}
        <Link className="font-extrabold underline decoration-2 underline-offset-4" href="/privacidad">
          Privacidad
        </Link>
        .
      </p>
      <h2 className="font-impact text-3xl leading-none">El contenido</h2>
      <p>
        Los textos y el nivel de boludez son de opinión, para reírse. No son una recomendación de
        compra ni un consejo financiero. Usá el sitio con la billetera despierta.
      </p>
      <h2 className="font-impact text-3xl leading-none">Anuncios</h2>
      <p>
        El sitio puede mostrar anuncios de Google AdSense. Esos anuncios los elige Google, no
        nosotros, y se rigen por las políticas de Google.
      </p>
    </PaginaTexto>
  );
}
