"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="px-5 py-16 text-center">
      <p className="text-7xl" role="img" aria-label="Explosión">
        💥
      </p>
      <h1 className="mt-4 font-impact text-4xl leading-none">Se nos cayó la bolsa</h1>
      <p className="mx-auto mt-3 max-w-md text-lg">
        Algo se rompió de este lado. Probá de nuevo, que a veces alcanza con eso.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-[18px] border-4 border-ink bg-sun px-6 py-3 font-impact text-2xl shadow-[6px_6px_0_#1d1d1b]"
      >
        Reintentar
      </button>
    </section>
  );
}
