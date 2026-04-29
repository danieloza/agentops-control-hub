/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 55px rgba(59, 130, 246, 0.28)",
        violet: "0 0 55px rgba(139, 92, 246, 0.24)",
      },
    },
  },
  plugins: [],
};
