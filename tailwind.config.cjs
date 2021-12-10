const typography = require('@tailwindcss/typography')
const forms = require('@tailwindcss/forms')
const colors = require('tailwindcss/colors')

const config = {
  mode: 'jit',
  purge: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        gray: colors.blueGray,
        sky: colors.sky,
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      listStyleType: {
        square: 'square',
      },
    },
  },
  plugins: [forms, typography],
}

module.exports = config
