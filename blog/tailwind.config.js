/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "green": '#77875b',
      "black": '#000000',
      "grey": '#848484',
      "text": '#807f7f',
      "brown": '#eee6d6',

    },

    fontFamily: {
      sans: ['Open Sans', ' sans-serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }

    },
  },
  plugins: [],
}

