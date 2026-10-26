import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF4D6",
        ink: "#1d1d1b",
        fucsia: "#FF3E9A",
        "fucsia-deep": "#D41478",
        sun: "#FFD23F",
        mint: "#7CF5D0",
        sky: "#5AB0FF",
        violet: "#7B2FF7",
        grass: "#00C46A",
        "grass-deep": "#00A85C",
      },
      fontFamily: {
        impact: ["Impact", "Arial Black", "sans-serif"],
        rounded: [
          "Arial Rounded MT Bold",
          "Trebuchet MS",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        sticker: "6px 6px 0 #1d1d1b",
        "sticker-lg": "12px 12px 0 #1d1d1b",
      },
    },
  },
  plugins: [],
};

export default config;
