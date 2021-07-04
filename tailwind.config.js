module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // "anime-prim": "#150017",
        // "anime-sec": "#170019",
        // "anime-ter": "#26002b",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
      },
    },
  },
  variants: {
    extend: {
      rotate: ["group-hover"],
    },
  },
  plugins: [],
};
