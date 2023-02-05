/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'signup': "url(assets/login_wallpaper.jpg)"
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
