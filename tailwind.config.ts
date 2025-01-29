import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        sn: {
          min: "0px",
          max: "320px",
        },
        sp: {
          min: "321px",
          max: "410px",
        },
        se: {
          min: "411px",
          max: "699px",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
