import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
    }
  }

  revalidatePath("/", "layout");
  revalidatePath("/b/[slug]", "page");
  revalidatePath("/sitemap.xml");
  revalidatePath("/rss.xml");

  return NextResponse.json({
    ok: true,
    revalidado: true,
    ahora: new Date().toISOString(),
  });
}
