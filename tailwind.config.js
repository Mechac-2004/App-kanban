/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mainBackgroundColor": '#001117',
        "ColumnBackgroundColor": '#161C22',
      },
    },
  },
  plugins: [],
}
