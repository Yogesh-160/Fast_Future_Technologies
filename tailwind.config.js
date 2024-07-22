/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './dist/index.html',
    './dist/loginPage.html',
  ],
  theme: {
    extend: {
      colors : {
        'primary-background-color': 'rgb(167, 231, 255)',
        'primary-text-color': 'rgb(0, 0, 0)',
        'secondary-text-color' : 'rgb(255, 255, 255)',
        'icon-color-text': '#4070F4',
        'white-text-color': '#fff',
        'background-cursor-color': '#4CAAE4'
      },
    },
  },
  plugins: [],
}

