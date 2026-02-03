/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mono: {
          0: '#000000',      // Pure black
          50: '#0a0a0a',     // Near black
          100: '#1a1a1a',    // Very dark gray
          200: '#2d2d2d',    // Dark gray
          300: '#404040',    // Medium-dark gray
          400: '#525252',    // Medium gray
          500: '#737373',    // Mid gray
          600: '#a3a3a3',    // Light-medium gray
          700: '#d4d4d4',    // Light gray
          800: '#e5e5e5',    // Very light gray
          900: '#f5f5f5',    // Almost white
          950: '#ffffff',    // Pure white
        },
      },
    },
  },
  plugins: [],
}
