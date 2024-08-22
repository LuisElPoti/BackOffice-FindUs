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
    },
  },
  plugins: [],
}
};