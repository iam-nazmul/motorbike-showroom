/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#ff5f1f',
        midnight: '#070b14',
      },
      boxShadow: {
        glow: '0 0 40px rgba(255, 95, 31, 0.25)',
      },
    },
  },
  plugins: [],
};
