/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- Make sure this line is exactly like this
  ],
  theme: {
    extend: {
      colors: {
        'church-blue': '#182C5B',
        'church-gold': '#C69C3A',
      }
    },
  },
  plugins: [],
}