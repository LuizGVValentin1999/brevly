import { theme } from "tailwindcss/defaultConfig";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          base: "#2C46B1",
          dark: "#2C4091",
        },
        gray: {
          100: "#F9F9FB",
          200: "#E4E6EC",
          300: "#CDCFD5",
          400: "#74798B",
          500: "#4D505C",
          600: "#1F2025",
        },
        white: "#FFFFFF",
        danger: "#B12C4D",
      },
      opacity: {
        2: 0.02,
      },
      fontSize: {
        xl: ["1.5rem", { lineHeight: "2rem", fontWeight: "700" }],
        lg: ["1.125rem", { lineHeight: "1.5rem", fontWeight: "700" }],
        md: ["0.875rem", { lineHeight: "1.125rem", fontWeight: "600" }],
        sm: ["0.75rem", { lineHeight: "1rem" }],
        xs: ["0.625rem", { lineHeight: "1rem", fontWeight: "400" }],
        note: ["0.615rem", { lineHeight: "0.875rem", fontWeight: "400" }],
      },
      fontFamily: {
        sans: ["Open Sans", ...theme.fontFamily.sans],
      },
      boxShadow: {
        shape:
          "0px 8px 8px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.03), inset 0px 1px 0px rgba(255, 255, 255, 0.03)",
        "shape-content":
          "0px 0px 0px 1px rgba(0, 0, 0, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.02), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.02)",
      },
      animation: {
        border: "border 2s linear infinite",
      },
      keyframes: {
        border: {
          to: { "--border-angle": "360deg" },
        },
      },
    },
  },
  plugins: [],
};