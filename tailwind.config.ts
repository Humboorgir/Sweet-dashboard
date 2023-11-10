import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#9333ea", soft: "#a855f7" },
        foreground: { DEFAULT: "#f5f5f5", soft: "#adadad" },
        background: "#101010",
      },
      animation: {
        ripple: "ripple 600ms linear",
      },

      keyframes: {
        ripple: {
          "0%": { opacity: "40%", transform: "scale(0)" },
          "100%": { opacity: "0%", transform: "scale(3)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
