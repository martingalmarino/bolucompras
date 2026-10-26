import { getPublishedBySlug } from "@/lib/products";
import { ImageResponse } from "next/og";

export const alt = "Bolucompra";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 86400;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getPublishedBySlug(slug);
  const emoji = product?.emoji || "🛒";
  const nombre = product?.nombre || "Esta boludez todavía no salió";
  const nivel = product ? `Nivel de boludez ${product.nivel}/10` : "Bolucompras · sin spoilers";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#FFF4D6",
          color: "#1d1d1b",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            background: "#FF3E9A",
            color: "#ffffff",
            border: "6px solid #1d1d1b",
            borderRadius: 16,
            padding: "8px 18px",
            fontSize: 32,
            fontWeight: 800,
          }}
        >
          BOLUCOMPRAS
        </div>
        <div style={{ display: "flex", fontSize: 120, lineHeight: 1, marginTop: 28 }}>{emoji}</div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 56,
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 16,
            maxWidth: 1000,
          }}
        >
          {nombre}
        </div>
        <div style={{ display: "flex", fontSize: 36, marginTop: 22 }}>{nivel}</div>
      </div>
    ),
    { ...size },
  );
}
