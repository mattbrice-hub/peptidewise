import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#2c2418",
        "text-primary": "#5a4d3a",
        muted: "#8a7d6b",
        accent: {
          DEFAULT: "#b4784c",
          hover: "#9a6640",
          light: "#c4a882",
        },
        surface: "#faf7f2",
        card: "#f0ebe3",
        border: "#e8e0d4",
        "warm-white": "#fffdf9",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        warm: "0 1px 3px rgba(44, 36, 24, 0.06)",
        "warm-lg": "0 8px 24px rgba(44, 36, 24, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
