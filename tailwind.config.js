const wrapColor =
  (colorRGBVariable) =>
  ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(--${colorRGBVariable}), ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(--${colorRGBVariable}), var(${opacityVariable}, 1))`;
    }
    return `rgb(var(--${colorRGBVariable}))`;
  };

module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
      },
      colors: {
        'theme-1': wrapColor('theme-1RGB'),
        'theme-2': wrapColor('theme-2RGB'),
        'theme-3': wrapColor('theme-3RGB'),
        'theme-4': wrapColor('theme-4RGB'),
        'theme-5': wrapColor('theme-5RGB'),
        'active-1': wrapColor('active-1RGB'),
        'active-2': wrapColor('active-2RGB'),
        'warning-1': wrapColor('warning-1RGB'),
        'error-1': wrapColor('error-1RGB'),
        'text-1': wrapColor('text-1RGB'),
      },
      outline: {
        red: ['2px solid #ad0d02', '1px'],
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadein: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        wiggle: 'wiggle 1.5s ease-in-out infinite',
        fadein: 'fadein .1s ease-in-out',
      },
      spacing: {
        100: '25rem',
        120: '30rem',
        140: '35rem',
        160: '40rem',
        180: '45rem',
        200: '50rem',
        220: '55rem',
        240: '60rem',
      },
      transitionProperty: {
        height: 'height',
        width: 'width',
      },
      boxShadow: {
        glow: '0 0 .35em .1em, 0 0 .5em .1em',
      },
    },
  },
  plugins: [],
};
