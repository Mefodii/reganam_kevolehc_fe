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
    },
  },
  variants: {
    extend: {
      rotate: ["group-hover"],
      scale: ["group-hover", "group-focus"],
      backgroundColor: ["active"],
      textColor: ["active"],
      brightness: ["hover", "active"],
    },
  },
  plugins: [],
};
