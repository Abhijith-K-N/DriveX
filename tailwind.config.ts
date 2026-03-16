import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        dm: ["DM Sans", "sans-serif"],
      },
      colors: {
        navy: {
          DEFAULT: "#0A0E1A",
          2: "#111827",
          3: "#1C2537",
          4: "#243048",
        },
        gold: {
          DEFAULT: "#C9A84C",
          2: "#E8C547",
        },
      },
    },
  },
  plugins: [],
};
export default config;
