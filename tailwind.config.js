/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50:  '#fef9f3',
          100: '#fdebd0',
          200: '#fad7a0',
          300: '#f5cba7',
          400: '#e59866',
          500: '#ca8a4b',
        },
        ink: {
          DEFAULT: '#2C1A0E',
          light: '#4a2f1a',
          faint: '#7a5c3e',
        },
        seal: '#8B4513',
        wax:  '#C0392B',
        night: {
          DEFAULT: '#1A0F0A',
          card:    '#231208',
          border:  '#3d2010',
        },
      },
      fontFamily: {
        calligraphy: ['"IM Fell English SC"', 'serif'],
        body:        ['"Cormorant Garamond"', 'serif'],
        fraktur:     ['"UnifrakturMaguntia"', 'cursive'],
      },
      backgroundImage: {
        'parchment-texture': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in':    'fadeIn 0.8s ease forwards',
        'slide-up':   'slideUp 0.7s ease forwards',
        'wax-drop':   'waxDrop 1s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'quill-draw': 'quillDraw 1.2s ease forwards',
        'flicker':    'flicker 3s infinite',
      },
      keyframes: {
        fadeIn:   { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:  { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        waxDrop:  { from: { opacity: '0', transform: 'scale(0.3) rotate(-20deg)' }, to: { opacity: '1', transform: 'scale(1) rotate(0deg)' } },
        quillDraw:{ from: { strokeDashoffset: '1000' }, to: { strokeDashoffset: '0' } },
        flicker:  {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.85' },
          '75%':      { opacity: '0.95' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '1.2rem',
            lineHeight: '1.9',
          },
        },
      },
    },
  },
  plugins: [],
}
