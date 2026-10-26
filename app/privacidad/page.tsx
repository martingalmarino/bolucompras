import { PaginaTexto } from "@/components/PaginaTexto";
import { canonicalUrl, pageOpenGraph } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Privacidad",
  description:
    "Qué datos mira Bolucompras: cookies, Google AdSense, el newsletter y los links de afiliados.",
  alternates: { canonical: canonicalUrl("/privacidad") },
  openGraph: pageOpenGraph(
    "/privacidad",
    "Privacidad",
    "Cookies, Google AdSense y links de afiliados. Sin vueltas.",
  ),
};

export default function PrivacidadPage() {
  return (
    <PaginaTexto
      title="Privacidad"
      intro="Acá no hay letra chica escondida. Si algo guarda un dato, te lo decimos."
    >
      <h2 className="font-impact text-3xl leading-none">Qué guardamos nosotros</h2>
      <p>
        Bolucompras no te pide una cuenta. Si te anotás al newsletter, el mail viaja a Kit
        (ConvertKit) para mandarte la boludez del día. No armamos un perfil ni vendemos esa lista.
      </p>
      <h2 className="font-impact text-3xl leading-none">Cookies</h2>
      <p>
        El sitio puede guardar cookies técnicas para que la página funcione. Cuando haya anuncios,
        Google y otros proveedores pueden dejar cookies propias para medir y mostrar publicidad.
        Podés borrarlas o bloquearlas desde el navegador.
      </p>
      <h2 className="font-impact text-3xl leading-none">Google AdSense</h2>
      <p>
        Este sitio está preparado para mostrar anuncios de Google AdSense. Google, como proveedor
        externo, usa cookies para publicar anuncios según tus visitas a este y otros sitios. La
        publicidad puede estar personalizada. Podés revisar y ajustar eso en la{" "}
        <a
          className="font-extrabold text-ink underline decoration-2 underline-offset-4"
          href="https://adssettings.google.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          configuración de anuncios de Google
        </a>{" "}
        y leer{" "}
        <a
          className="font-extrabold text-ink underline decoration-2 underline-offset-4"
          href="https://policies.google.com/technologies/ads"
          rel="noopener noreferrer"
          target="_blank"
        >
          cómo usa Google las cookies publicitarias
        </a>
        .
      </p>
      <h2 className="font-impact text-3xl leading-none">Links de afiliados</h2>
      <p>
        Algunos botones van a Mercado Libre, Amazon, Temu o Shein con un link de afiliado. Si
        comprás, podemos recibir una comisión sin costo extra para vos. Esos sitios tienen su propia
        política de privacidad: a partir del click, los datos los manejan ellos.
      </p>
      <p>
        ¿Dudas? Escribinos desde la{" "}
        <Link className="font-extrabold underline decoration-2 underline-offset-4" href="/contacto">
          página de contacto
        </Link>
        .
      </p>
    </PaginaTexto>
  );
}
