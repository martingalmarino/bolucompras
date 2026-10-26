import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "No está",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="px-5 py-16 text-center">
      <p className="text-7xl" role="img" aria-label="Caja vacía">
        📦
      </p>
      <h1 className="mt-4 font-impact text-4xl leading-none min-[701px]:text-6xl">
        Esta boludez no está
      </h1>
      <p className="mx-auto mt-3 max-w-md text-lg">
        O nunca existió, o todavía no le toca salir. Acá no adelantamos estrenos.
      </p>
      <p className="mt-6">
        <Link
          href="/"
          className="inline-block rounded-[18px] border-4 border-ink bg-sun px-6 py-3 font-impact text-2xl text-ink no-underline shadow-[6px_6px_0_#1d1d1b]"
        >
          Volver al día
        </Link>
      </p>
    </section>
  );
}
