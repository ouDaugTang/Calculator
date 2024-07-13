/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: '0 4px 4px rgba(0, 0, 0, 0.25)',
        
      },
      borderRadius: {
        main_sub: '20px',
        aaa: '50%',
        bbb: '100px',
        
      },
      colors: {
        main: '#3A3F77',
        sub: '#404258',
        option: '#F49D1A',
        equal: '#B2B2B2',
        background: '#242530'

      },
    },
  },
  plugins: [],
}
