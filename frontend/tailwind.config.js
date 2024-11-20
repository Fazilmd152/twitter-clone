import daisyUITHEMES from 'daisyui/src/theming/themes'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes: [{
      black:{
        ...daisyUITHEMES['black'],
        primary:"rgb(29,155,240)",
        secondary:"rgb(24,24,24)",
      }
    }],
  },
}

