/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#3A3F77',
        sub: '#404258',
        aaa: '#F49D1A',
        bbb: '#B2B2B2',
        ccc: '#242530'
      },
    },
  },
  plugins: [],
}
