/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./<custom directory>/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      roboto: ["roboto", "sans-serif"],
      robotoBold: ["robotoBold", "sans-serif"],
      robotoLight: ["robotoLight", "sans-serif"],
    },
  },
  plugins: [],
};
