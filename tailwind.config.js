/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#646cff',
        secondary: '#535bf2',
        backgroundDark: '#242424',
        backgroundLight: '#ffffff',
        textDark: 'rgba(255, 255, 255, 0.87)',
        textLight: '#213547',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        '3xl': '3.2em',
      },
      borderRadius: {
        'xl': '8px',
      },
    },
  },
  plugins: [],
}
