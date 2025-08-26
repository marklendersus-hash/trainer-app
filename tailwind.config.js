/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./{app,api,render,state,utils,views}/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
