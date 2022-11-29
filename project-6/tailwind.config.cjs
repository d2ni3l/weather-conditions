/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        night: {
          ...require("daisyui/src/colors/themes")["[data-theme=night]"],
          primary: "#0072f1",
        },
        winter: {
          ...require("daisyui/src/colors/themes")["[data-theme=winter]"],
          primary: "#192848",
          secondary:'#0f1729',
          
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}

const hello = 'hello'