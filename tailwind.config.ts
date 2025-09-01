import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: "#E6F5F9",
          300: "#6FBAD0",
          500: "#1E7F9A",
          700: "#175E73",
          900: "#0F3C4C"
        },
        accent: "#1E7F9A"
      },
      fontFamily: {
        heading: ["var(--font-cormorant)"],
        sans: ["var(--font-inter)"]
      }
    },
  },
  plugins: [],
};
export default config;