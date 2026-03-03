/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas:  '#F5F0E8',
        parchment: '#EDE6D6',
        linen: '#E8DFD0',
        charcoal: '#1C1A18',
        ash: '#3D3A36',
        dust: '#7A7570',
        terracotta: '#8B5E3C',
        warmwhite: '#FAF8F4',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
        tight: '-0.02em',
        widest: '0.25em',
      },
      lineHeight: {
        prose: '1.75',
      },
    },
  },
  plugins: [],
}
