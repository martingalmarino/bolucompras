import { PaginaTexto } from "@/components/PaginaTexto";
import { canonicalUrl, pageOpenGraph } from "@/lib/site";
import type { Metadata } from "next";

export const revalidate = 86400;

const MAIL = "hola@nolonecesitas.com.ar";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escribinos a hola@nolonecesitas.com.ar. Ideas, errores y boludeces que no pueden esperar.",
  alternates: { canonical: canonicalUrl("/contacto") },
  openGraph: pageOpenGraph("/contacto", "Contacto", "Un mail, sin formulario eterno."),
};

export default function ContactoPage() {
  return (
    <PaginaTexto
      title="Contacto"
      intro="¿Viste un precio raro, un link roto o una boludez que merece salir? Escribinos."
    >
      <p>
        <a
          href={`mailto:${MAIL}`}
          className="inline-block rounded-[18px] border-4 border-ink bg-sun px-5 py-3 font-impact text-[26px] text-ink no-underline shadow-[6px_6px_0_#1d1d1b]"
        >
          {MAIL}
        </a>
      </p>
      <p>Leemos cuando podemos. No es un canal de la tienda: el pedido lo resuelve quien te vende.</p>
    </PaginaTexto>
  );
}
