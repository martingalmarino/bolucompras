import { ImageResponse } from "next/og";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFD23F",
          color: "#1d1d1b",
          border: "12px solid #1d1d1b",
          fontSize: 120,
        }}
      >
        🛒
      </div>
    ),
    { ...size },
  );
}
