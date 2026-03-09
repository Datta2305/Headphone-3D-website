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
        brand: {
          dark: "#050505",
          darker: "#0A0A0C",
          blue: "#0050FF",
          cyan: "#00D6FF"
        }
      },
    },
  },
  plugins: [],
};
export default config;
