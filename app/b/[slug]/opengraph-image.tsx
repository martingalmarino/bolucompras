import { ImageResponse } from "next/og";
import { getPublishedBySlug } from "@/lib/products";

export const alt = "Bolucompra";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 86400;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getPublishedBySlug(slug);
  const title = product?.tituloSeo || product?.nombre || "Esta boludez todavía no salió";
  const kicker = product
    ? `${product.tienda} · nivel ${product.nivel}/10`
    : "Bolucompras · sin spoilers";

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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 28,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 32, marginTop: 24 }}>{kicker}</div>
      </div>
    ),
    { ...size },
  );
}
