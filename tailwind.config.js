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
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "theme-1": wrapColor("theme-1RGB"),
        "theme-2": wrapColor("theme-2RGB"),
        "theme-3": wrapColor("theme-3RGB"),
        "active-1": wrapColor("active-1RGB"),
        "text-1": wrapColor("text-1RGB"),
      },
      outline: {
        red: ["2px solid #ad0d02", "1px"],
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1.5s ease-in-out infinite",
      },
      spacing: {
        100: "25rem",
        120: "30rem",
        140: "35rem",
        160: "40rem",
        180: "45rem",
        200: "50rem",
        220: "55rem",
        240: "60rem",
      },
      transitionProperty: {
        height: "height",
        width: "width",
      },
    },
  },
  plugins: [],
};
