/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mirari: {
          black: '#050505',
          midnight: '#0a0a1a', // Example midnight blue
          silver: '#C0C0C0',   // Example silver
          chrome: '#E8E8E8',   // Lighter silver/chrome
          'deep-purple': '#1a0b2e',
          'fog-purple': '#2e1065',
          'fog-grey': '#374151',
        }
      },
      fontFamily: {
        heading: ['Mokoto', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle, rgba(10,10,26,1) 0%, rgba(5,5,5,1) 100%)',
      }
    },
  },
  plugins: [],
}
