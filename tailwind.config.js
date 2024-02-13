/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  mode: 'jit',
  theme: {
    extend: {      
      height: {
      '600': '37.5rem',
      '400': '25rem',
      '500px': '500px',
    },
    width: {
      '500px': '500px',
    },
    borderRadius: {
      '50p': '50%',
    },
      colors: {
        'color0': '#242424',
        'color1': '#5C5B5B',
      },
      spacing: {
        '28p': '28%',
        '29p': '29%',
        '30p': '30%',
        '50px': '50px',
        '70px': '70px',
        '60px': '60px',
        '93p': '93%',
        '3p': '3%',
        'n12px': '-12px',
        '80p': '80%',
        'n7px': '-7px',
        '42p': '42%',
        '20p': '20%',
        '5p': '5%',
      },
      skew: {
        20: '20deg',
     },
     rotate: {
        110: '110deg',
        270: '270deg',
     },
    },
  },
  plugins: [],
}