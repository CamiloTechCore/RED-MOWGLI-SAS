/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        titulo: '#A1135B',
        fondoAnimacion: '#F59FC7',
        customFondo: '#F59FC7',
        sombreado: '#F2D3EF',
        inicioParrafo: '#FA4BE9',
        textoNormal: '#525151',
      },
      fontFamily: {
        titulo: ['Oi', 'serif'],
        sans: ['Encode Sans Semi Expanded', 'sans-serif'],
      },
    },
  },
  plugins: [],
}