/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '360px',
        'md': '1024px',
        // => @media (min-width: 375px) { ... }
      },
    },
  },
  plugins: [],
}

