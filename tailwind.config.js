var _ = require('lodash');
var flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette')
  .default;

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        coolDark: {
          400: '#40444B',
          500: '#36393f',
          600: '#32353b',
        },
        primary: {
          50: '#fbeff3',
          100: '#60e17b',
          200: '#56d971',
          300: '#4dcf68',
          400: '#40c15b',
          500: '#3db757',
          600: '#319947',
          700: '#319947',
          800: '#2b893f',
          900: '#237434',
        },
      },
      boxShadow: {
        button: 'var(--shadow-button)',
        card: 'var(--shadow-card)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities, e, theme, variants }) {
      const colors = flattenColorPalette(theme('borderColor'));

      const utilities = _.flatMap(
        _.omit(colors, 'default'),
        (value, modifier) => ({
          [`.${e(`border-t-${modifier}`)}`]: { borderTopColor: `${value}` },
          [`.${e(`border-r-${modifier}`)}`]: { borderRightColor: `${value}` },
          [`.${e(`border-b-${modifier}`)}`]: { borderBottomColor: `${value}` },
          [`.${e(`border-l-${modifier}`)}`]: { borderLeftColor: `${value}` },
        })
      );

      addUtilities(utilities, variants('borderColor'));
    },
  ],
};
