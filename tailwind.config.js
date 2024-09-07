/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      screens: {
         xs: '480px',
         maxXs: {
            max: '640px',
         },
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
      extend: {
         fontFamily: {
            Dana: 'Dana',
            DanaMedium: 'Dana Medium',
            DanaDemiBold: 'Dana DemiBold',
            MorabbaLight: 'Morabba Light',
            MorabbaMedium: 'Morabba Medium',
            MorabbaBold: 'Morabba Bold',
         },
         container: {
            center: true,
            padding: '1rem',
         },
         colors: {
            myBlue: {
               500: '#61B4E4',
               700: '#005CB9',
            },
            myYellow: {
               200: '#FEE050',
            },
            myBrown: {
               400: '#7E650D',
            },
            myGreen: {
               100: '#c5d5d0',
               200: '#5ee7d8',
               260: '#5baaa1',
               300: '#1cad9c',
               400: '#00a693',
               500: '#42504c',
            },
         },
         spacing: {
            4.5: '1.125rem',
            5.5: '1.375rem',
            6.5: '1.625rem',
            7.5: '1.875rem',
            8.5: '2.125rem',
            9.5: '2.375rem',
         },
      },
   },
   plugins: [
      function ({ addUtilities }) {
         const newUtilities = {
            '.scrollbar-thin': {
               scrollbarWidth: 'thin',
               scrollbarColor: 'rgb(99 99 99) white',
            },
            '.scrollbar-webkit': {
               '&::-webkit-scrollbar': {
                  width: '6px',
               },
               '&::-webkit-scrollbar-track': {
                  background: '',
               },
               '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#802348',
                  borderRadius: '20px',
               },
            },
         };
         addUtilities(newUtilities, ['responsive', 'hover']);
      },
   ],
};
