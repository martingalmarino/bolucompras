import { ImageResponse } from "next/og";

export const alt = "Bolucompras: la boludez del día";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
            background: "#FFD23F",
            border: "6px solid #1d1d1b",
            borderRadius: 16,
            padding: "8px 18px",
            fontSize: 36,
            fontWeight: 800,
          }}
        >
          BOLUCOMPRAS
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1,
            marginTop: 28,
          }}
        >
          La boludez del día
        </div>
        <div style={{ display: "flex", fontSize: 34, marginTop: 22 }}>
          No lo necesitás, pero igual lo querés.
        </div>
      </div>
    ),
    { ...size },
  );
}
