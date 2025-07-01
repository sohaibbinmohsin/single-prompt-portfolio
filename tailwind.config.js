/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'black': {
          DEFAULT: '#000500',
          100: '#000100',
          200: '#000200',
          300: '#000300',
          400: '#000400',
          500: '#000500',
          600: '#006a00',
          700: '#00cf00',
          800: '#35ff35',
          900: '#9aff9a'
        },
        'bistre': {
          DEFAULT: '#362417',
          100: '#0b0705',
          200: '#150e09',
          300: '#20150e',
          400: '#2b1d12',
          500: '#362417',
          600: '#724c31',
          700: '#af754b',
          800: '#cba386',
          900: '#e5d1c2'
        },
        'cinereous': {
          DEFAULT: '#92817a',
          100: '#1e1a18',
          200: '#3b3431',
          300: '#594e49',
          400: '#776761',
          500: '#92817a',
          600: '#a99b96',
          700: '#beb4b0',
          800: '#d4cdca',
          900: '#e9e6e5'
        },
        'almond': {
          DEFAULT: '#f1dabf',
          100: '#472d10',
          200: '#8e5a1f',
          300: '#d28732',
          400: '#e2b179',
          500: '#f1dabf',
          600: '#f4e2cd',
          700: '#f7e9d9',
          800: '#f9f0e6',
          900: '#fcf8f2'
        },
        'snow': {
          DEFAULT: '#fffbff',
          100: '#650065',
          200: '#ca00ca',
          300: '#ff30ff',
          400: '#ff95ff',
          500: '#fffbff',
          600: '#fffbff',
          700: '#fffcff',
          800: '#fffdff',
          900: '#fffeff'
        }
      }
    },
  },
  plugins: [],
};