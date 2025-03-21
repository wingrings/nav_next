import type { Config } from "tailwindcss";
import {heroui} from "@heroui/react";
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui(),
    function ({ addComponents }: any) {
      addComponents({
        ".btn-pink": {
          color: "#ec4899 !important", // text-pink-500
          backgroundColor: "#ffffff !important", // bg-white
          border: "2px solid #ec4899", // border border-pink-500
          "&:hover": {
            backgroundColor: "#ec4899 !important", // hover:bg-pink-500
            color: "#ffffff !important", // hover:text-white
          },
        },
      });
    },

  ],
} satisfies Config;
