/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          sky: '#80abff',    // Sky Blue
          crayola: '#477dfd', // Blue Crayola
          oxford: '#00142d',  // Oxford Blue
          blizzard: '#f5fdff' // Blizzard Blue
        },
        secondary: {
          coral: '#ff8b8b',
          white: '#fbf7eb',
          lavender: '#fbe9f3',
          azure: '#e9f7fb',    
          mint: '#a9ff99',     // Mint Green
          jasmine: '#ffe092',  
          plum: '#ffa3ff'      
        }
      },
      fontFamily: {
        'tt-trailers': ['"TT Trailers ExtraBold"', 'sans-serif'],
        'menco': ['Menco', 'sans-serif'],
        'fobble': ['Fobble', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};