const konstaConfig = require('konsta/config');

/** @type {import('tailwindcss').Config} */
module.exports = konstaConfig({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  konsta: {
    colors: {
      primary: '#A91D3A',
      'brand-green': '#00ff00'
    }
  }
})