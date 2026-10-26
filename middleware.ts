import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_ORIGIN = "https://www.nolonecesitas.com.ar";
const CANONICAL_HOST = "www.nolonecesitas.com.ar";

export function middleware(request: NextRequest) {
  if (process.env.VERCEL_ENV === "preview") {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  if (process.env.VERCEL_ENV !== "production") {
    return NextResponse.next();
  }

  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const proto = (request.headers.get("x-forwarded-proto") ?? "https").split(",")[0].trim();
  const onVercel = host === "vercel.app" || host.endsWith(".vercel.app");
  const alreadyCanonical = host === CANONICAL_HOST && proto === "https";

  if (onVercel || !alreadyCanonical) {
    const destination = new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, CANONICAL_ORIGIN);
    return NextResponse.redirect(destination, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api/).*)"],
};
