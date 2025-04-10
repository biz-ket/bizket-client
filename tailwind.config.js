/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        primary: '#f00',
      },
      backgroundColor: {},
      fontSize: (() => {
        const sizes = {};
        for (let i = 1; i <= 100; i++) {
          sizes[i] = `${i}px`;
        }
        return sizes;
      })(),
      gap: (() => {
        const gaps = {};
        for (let i = 1; i <= 100; i++) {
          gaps[i] = `${i}px`;
        }
        return gaps;
      })(),
      spacing: (() => {
        const Spacings = {};
        for (let i = 1; i <= 100; i++) {
          Spacings[i] = `${i}px`;
        }
        return Spacings;
      })(),
      boxShadow: {},
      backdropBlur: {
        10: '10px',
      },
      borderRadius: {
        4: '4px',
        8: '8px',
        10: '10px',
        12: '12px',
        14: '14px',
        16: '16px',
        20: '20px',
        24: '24px',
      },
      lineHeight: {
        12: '1.2',
        14: '1.4',
        16: '1.6',
        18: '1.8',
        20: '2.0',
      },
      zIndex: {
        auto: 'auto',
        base: '0',
        dropdown: '100',
        sticky: '200',
        backdrop: '900',
        modal: '1000',
        tooltip: '1200',
        important: '9999',
      },
    },
  },

  // plugins: [require('prettier-plugin-tailwindcss')],
};
