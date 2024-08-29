/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      maxSm: {
         max: '640px',
      },
      md: '768px',
      maxMd: {
         max: '768px',
      },
      lg: '1024px',
      maxLg: {
         max: '1024px',
      },
      xl: '1280px',
      gx: '1380px',
   },
    extend: {  container: {
      center: true,
      padding: '1rem',
   },},
  },
  plugins: [],
}

