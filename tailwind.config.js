/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tech: ["'Space Grotesk'", 'sans-serif'],
        cinematic: ["'Instrument Serif'", 'serif'],
        body: ["'Inter'", 'sans-serif'],
        "ms-heading": ["'Cormorant Garamond'", 'serif'],
        "ms-body": ["'Montserrat'", 'sans-serif'],
      },
      colors: {
        brand: {
          abyss: '#010103',
          surface: '#0A0A0E',
          amethyst: '#6D28D9',
          bioglow: '#9333EA',
          neon: '#C084FC',
          mercury: '#E2E8F0',
          mutedsilver: '#64748B',
          "ms-obsidian": '#121212',
          "ms-graphite": '#1C1C1C',
          "ms-bronze": '#B89768',
          "ms-bronzeGlow": '#D4B890',
          "ms-alabaster": '#F5F5F0',
          "ms-linen": '#E8E5DF'
        },
      },
    },
  },
  plugins: [],
};
