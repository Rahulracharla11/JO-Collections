/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jo: {
          pink: '#f372ac',
          pinkHover: '#e05996',
          dark: '#222222',
          gray: '#666666',
          lightGray: '#f8f8f8',
          border: '#e5e5e5',
          amber: '#fcb900',
          red: '#cf2e2e'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      maxWidth: {
        'site': '1440px',
      }
    },
  },
  plugins: [],
}
