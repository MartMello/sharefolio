import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        primary: "#0F172A",   // Slate dark
        accent: "#14B8A6",    // Teal
        neutral: {
          light: "#F8FAFC",
          medium: "#475569",
        },
      },
    },
  },
  plugins: [],
}

export default config