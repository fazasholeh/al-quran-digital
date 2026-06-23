import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50:  "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          500: "#22c55e",
          600: "#16a34a",
          700: "#2D6A4F",
          800: "#166534",
          900: "#14532d",
        },
        stone: {
          50:  "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        arabic: ["var(--font-amiri)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "arabic-base": ["1.375rem", { lineHeight: "2.5rem" }],
        "arabic-lg":   ["1.625rem", { lineHeight: "3rem" }],
        "arabic-xl":   ["2rem",     { lineHeight: "3.5rem" }],
      },
    },
  },
  plugins: [],
};
export default config;
