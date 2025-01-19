/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-300": "repeat(auto-fill, minmax(300px, 1fr))",
      },
      keyframes: {
        "3-5-1-y16": {
          "0%, 28%": { transform: "translateY(0)" },
          "33%, 61%": { transform: "translateY(-2rem)" },
          "67%, 94%": { transform: "translateY(-4rem)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "index-cw-tip": "3-5-1-y16 7.2s linear infinite",
      },
    },
  },
  plugins: [],
};
