/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-pink': {
          50: '#fdf8f7',
          100: '#fce8e5',
          200: '#f9d1cc',
          300: '#f5b9b2',
          400: '#f29c8e',
          500: '#ef8070',
          600: '#ec6352',
        },
        'lavender': {
          50: '#faf8fc',
          100: '#f0e8f8',
          200: '#dcc7ed',
          300: '#c8a6e3',
          400: '#b485d8',
          500: '#a064ce',
          600: '#8b43c4',
        },
        'baby-blue': {
          50: '#f7fbfc',
          100: '#e6f3f9',
          200: '#c7e3f0',
          300: '#a8d3e8',
          400: '#89c3df',
          500: '#6ab3d7',
          600: '#4ba3ce',
        },
        'sage-green': {
          50: '#f7faf9',
          100: '#e8f1ef',
          200: '#d1e4de',
          300: '#bad6ce',
          400: '#a3c8bd',
          500: '#8cbaa7',
          600: '#7aac96',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-soft': 'bounceSoft 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}