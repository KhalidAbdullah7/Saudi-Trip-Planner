import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Saudi-inspired palette
        sand: {
          50: "#fdf8f0",
          100: "#f9edd9",
          200: "#f2d9b0",
          300: "#e9be7e",
          400: "#dfa04e",
          500: "#d68833",
          600: "#c06e28",
          700: "#a05423",
          800: "#834422",
          900: "#6c391f",
          950: "#3b1c0e",
        },
        oasis: {
          50: "#edfcf2",
          100: "#d4f7de",
          200: "#aceec2",
          300: "#75df9e",
          400: "#3ec976",
          500: "#1aae5a",
          600: "#0e8d47",
          700: "#0c713b",
          800: "#0d5931",
          900: "#0b4929",
          950: "#042917",
        },
        desert: {
          50: "#fef6ee",
          100: "#fcebd7",
          200: "#f8d3ae",
          300: "#f3b57b",
          400: "#ed8d46",
          500: "#e97122",
          600: "#da5918",
          700: "#b54216",
          800: "#903519",
          900: "#742e18",
          950: "#3e150a",
        },
        royal: {
          50: "#f0f5f0",
          100: "#d9e6d9",
          200: "#b5cdb5",
          300: "#87ad87",
          400: "#5e8d5e",
          500: "#165d31",
          600: "#0f4d28",
          700: "#0c3e20",
          800: "#0a321a",
          900: "#082915",
          950: "#04170b",
        },
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans Arabic", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "Noto Sans Arabic", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
