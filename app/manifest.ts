import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Bolucompras",
    description: SITE_TAGLINE,
    start_url: "/",
    display: "standalone",
    background_color: "#FFF4D6",
    theme_color: "#FF3E9A",
    lang: "es-AR",
    icons: [
      { src: "/icon", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
