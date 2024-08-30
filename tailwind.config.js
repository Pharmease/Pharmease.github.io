/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0ABF55',
        },
        secondary: {
          magenta: '#BF0A6F',
          blue: '#0A55BF',
        },
        analogous: {
          mint: '#0ABF89',
          lime: '#0ABF1C',
        },
        neutral: {
          lightGray: '#F5F5F5',
          darkCharcoal: '#2C2C2C',
        },
        accent: {
          gold: '#FFD700',
          orange: '#FF6F00',
        },
      },
    },
  },
  plugins: [],
};
