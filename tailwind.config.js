module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Poppins", "Roboto", "ui-sans-serif", "system-ui"],
    },
    minHeight: {
      70: "75vh",
      60: "60vh",
      50: "50vh",
      40: "40vh",
      30: "30vh",
    },
    maxHeight: {
      70: "75vh",
      60: "60vh",
      50: "50vh",
      40: "40vh",
      30: "30vh",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
