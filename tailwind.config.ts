import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: "#040711",
          900: "#070D1F",
          850: "#0B142F",
          800: "#0F1C3F",
          700: "#182C5E",
        },
        charcoal: {
          900: "#10141D",
          800: "#181E2B",
          700: "#222A3A",
          600: "#323D52",
        },
        gold: {
          300: "#F7E1A0",
          400: "#E6C673",
          500: "#D4AF37",
          600: "#B89222",
          700: "#8C6E14",
        },
        ivory: {
          50: "#FDFCF9",
          100: "#FAF7F0",
          200: "#F2ECE0",
          300: "#E5DAC8",
          400: "#CFC0A8",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "gold-glow": "0 0 35px -5px rgba(212, 175, 55, 0.25)",
        "gold-subtle": "0 4px 20px -2px rgba(212, 175, 55, 0.15)",
        "luxury-dark": "0 20px 40px -15px rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
};

export default config;
