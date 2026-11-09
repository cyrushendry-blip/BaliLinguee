/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lagoon: { 50: "#ecfeff", 100: "#cffafe", 500: "#0891b2", 600: "#0e7490", 700: "#155e75", 900: "#164e63" },
        frangipani: { 100: "#fef9c3", 400: "#facc15", 500: "#eab308" },
        hibiscus: { 100: "#ffe4e6", 500: "#e11d48", 600: "#be123c" },
      },
    },
  },
  plugins: [],
};
