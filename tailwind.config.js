/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#254E70',
        lightblueBackground: '#F3F7FD',
        blueInactive: '#3E86B9',
        blueActive: '#89B8DA',
        greenBackground: '#228689',
        blueSidebar: "#E4EDFB",
        blueSelect: "#CBDEF0",
        letterColor: "#F3F7FD",
        greenLetter: "#19A274",
        greenLetter2: "#BEBFC0",
        redLetter: "#FF4A4A",
        redReport: "#FE4A6E",
        orangeReport: "#FF4A4A",
        blueReport: "#3D7FFE",
        colorResumen: "#F3F7FD",
        blueBorder: "#2E5AAC",
        blueInside: "#F3F7FD",
    },
  },
  plugins: [],
}
};