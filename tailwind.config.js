/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        nightBlue: "#171a21",
        aquaBlue: "#1b2838",
        lightBlue: "#60B3E4",
      },
    },
    fontFamily: {
      roboto: ["roboto", "sans-serif"],
      robotoBold: ["robotoBold", "sans-serif"],
      robotoLight: ["robotoLight", "sans-serif"],
    },
  },
  plugins: [],
};
// 60B3E4
