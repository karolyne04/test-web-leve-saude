/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#f6f6f6',
        backgroundLight: '#F0F4F8',
        backgrounds: '#F6F6F6',
        dark: '#242424',
        text: '#212121',
        textSecondary: '#797979',
        error: '#FF5252',
        errors: '#FF6B6B',
        star: '#FFC107',
        primary: '#0EB27B',
        secondary: '#57B6A4',
        light: '#B0E7CA',
      },
    },
  },
  plugins: [],
}
