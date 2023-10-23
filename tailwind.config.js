/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        "branco":'#fcfcfc',
        "azul": '#092c4c',
        "verde":'#04A759'
      },
      fontFamily:{
        "alata": ['Alata', "sans-serif"],
        "chivo": ['Chivo', "sans-serif"],
        "montserrat": ['Montserrat', "sans-serif"]
      },
      boxShadow: {
        '10b': '0 0px 10px 0px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
