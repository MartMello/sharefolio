import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Add the Tremor node_modules path
   "./node_modules/@tremor/react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        primary: "#005F73",   // Deep Blue
        accent: "#0A9396",    // Seafoam Green
        neutral: {
          light: "#F0F2F5",  // Light Gray Background
          medium: "#6B7280",  // Muted Text
          dark: "#111827",   // Dark Text
        },
      },
    },
  },
  plugins: [],
}

export default config