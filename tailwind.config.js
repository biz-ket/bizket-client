/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        primary: {
          10: '#FFEFE4',
          20: '#FFBF00',
          30: '#FFAE00',
          40: '#FF9000',
          50: '#FF7900',
          60: '#F6630E',
          70: '#E54A04',
        },

        font: {
          10: '#fff',
          20: '#999999',
          30: '#666666',
          40: '#333333',
          50: '#191919',
          60: '#000000',
        },

        line: {
          10: '#f1f1f1',
          20: '#eeeeee',
          30: '#dddddd',
          40: '#cfcfcf',
          50: '#000000',
        },
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
        4: '6px',
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

  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        // Heading 스타일
        '.heading-xl': {
          fontSize: '65px',
          lineHeight: '130%',
          fontWeight: '700',
        },
        '.heading-lg': {
          fontSize: '46px',
          lineHeight: '130%',
          fontWeight: '600',
        },
        '.heading-md': {
          fontSize: '36px',
          lineHeight: '130%',
          fontWeight: '600',
        },
        '.heading-sm': {
          fontSize: '35px',
          lineHeight: '130%',
          fontWeight: '700',
        },

        // Title 스타일
        '.title-xl2-semibold': {
          fontSize: '30px',
          lineHeight: '130%',
          fontWeight: '600',
        },
        '.title-xl-semibold': {
          fontSize: '28px',
          lineHeight: '130%',
          fontWeight: '600',
        },
        '.title-xl-bold': {
          fontSize: '28px',
          lineHeight: '130%',
          fontWeight: '700',
        },
        '.title-lg': {
          fontSize: '26px',
          lineHeight: '130%',
          fontWeight: '400',
        },
        '.title-md': {
          fontSize: '24px',
          lineHeight: '130%',
          fontWeight: '600',
        },
        '.title-sm': {
          fontSize: '22px',
          lineHeight: '150%',
          fontWeight: '600',
        },

        // Body 스타일
        '.body-xl-regular': {
          fontSize: '20px',
          lineHeight: '150%',
          fontWeight: '400',
        },
        '.body-lg-regular': {
          fontSize: '18px',
          lineHeight: '150%',
          fontWeight: '400',
        },
        '.body-lg-semibold': {
          fontSize: '18px',
          lineHeight: '150%',
          fontWeight: '600',
        },
        '.body-lg-bold': {
          fontSize: '18px',
          lineHeight: '150%',
          fontWeight: '700',
        },
        '.body-md-medium': {
          fontSize: '16px',
          lineHeight: '150%',
          fontWeight: '500',
        },
        '.body-md-regular': {
          fontSize: '16px',
          lineHeight: '150%',
          fontWeight: '400',
        },
        '.body-md-light': {
          fontSize: '16px',
          lineHeight: '150%',
          fontWeight: '300',
        },
        '.body-sm-regular': {
          fontSize: '14px',
          lineHeight: '150%',
          fontWeight: '400',
        },
        '.body-sm-semibold': {
          fontSize: '14px',
          lineHeight: '150%',
          fontWeight: '600',
        },

        // Label 스타일
        '.label-xl-semibold': {
          fontSize: '18px',
          lineHeight: '150%',
          fontWeight: '600',
        },
        '.label-xl-medium': {
          fontSize: '18px',
          lineHeight: '150%',
          fontWeight: '500',
        },
        '.label-lg-medium': {
          fontSize: '16px',
          lineHeight: '150%',
          fontWeight: '500',
        },
        '.label-lg-semibold': {
          fontSize: '16px',
          lineHeight: '150%',
          fontWeight: '600',
        },
        '.label-md-medium': {
          fontSize: '14px',
          lineHeight: '150%',
          fontWeight: '500',
        },
        '.label-md-semibold': {
          fontSize: '14px',
          lineHeight: '150%',
          fontWeight: '600',
        },
        '.label-sm-medium': {
          fontSize: '12px',
          lineHeight: '130%',
          fontWeight: '500',
        },
        '.label-sm-semibold': {
          fontSize: '12px',
          lineHeight: '130%',
          fontWeight: '600',
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
