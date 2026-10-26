import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_POR_VENTANA = 5;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ERROR = "Algo se rompió, probá de nuevo";

const intentos = new Map<string, number[]>();

function ipDe(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || request.headers.get("x-real-ip")?.trim() || "desconocida";
}

function limitado(ip: string): boolean {
  const ahora = Date.now();
  const recientes = (intentos.get(ip) ?? []).filter((marca) => ahora - marca < WINDOW_MS);
  if (recientes.length >= MAX_POR_VENTANA) {
    intentos.set(ip, recientes);
    return true;
  }
  recientes.push(ahora);
  intentos.set(ip, recientes);
  if (intentos.size > 2000) {
    const primero = intentos.keys().next().value;
    if (primero) intentos.delete(primero);
  }
  return false;
}

export async function POST(request: Request) {
  let body: { email?: unknown; bolu_extra?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: ERROR }, { status: 400 });
  }

  if (limitado(ipDe(request))) {
    return NextResponse.json(
      { ok: false, error: "Vas muy rápido. Esperá un toque y probá de nuevo." },
      { status: 429 },
    );
  }

  if (typeof body.bolu_extra === "string" && body.bolu_extra.trim()) {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Ese mail no cierra. Fijate que esté bien escrito." },
      { status: 400 },
    );
  }

  const apiKey = process.env.KIT_API_KEY?.trim();
  const formId = process.env.KIT_FORM_ID?.trim();
  if (!apiKey || !formId || !/^\d+$/.test(formId)) {
    return NextResponse.json({ ok: false, error: ERROR }, { status: 503 });
  }

  try {
    const respuesta = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ api_key: apiKey, email }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!respuesta.ok) {
      return NextResponse.json({ ok: false, error: ERROR }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: ERROR }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
