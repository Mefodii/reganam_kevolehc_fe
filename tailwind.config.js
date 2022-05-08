module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
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
      minWidth: {
        60: "15rem",
      },
    },
  },
  variants: {
    extend: {
      animation: ["group-hover", "hover"],
      rotate: ["group-hover"],
      scale: ["group-hover", "group-focus"],
      backgroundColor: ["active"],
      backgroundOpacity: ["active"],
      textColor: ["active"],
      brightness: ["hover", "active"],
    },
  },
  plugins: [],
};
