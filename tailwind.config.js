/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
primary: '#16519f',
secondary:'#f07e74',
tertiary: '#f8dd2e',
lightPrimary: '#4fcbe9',
      },
      fontFamily: {
        Title: ['Urbanist'],
        Menu: ['Roboto'],
        Text: ['Open Sans'],
      },
    },
  },
  plugins: [],
};