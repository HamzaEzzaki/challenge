import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './pages/**/*.{js,ts,vue}',    // Include pages
    './components/**/*.{js,ts,vue}',  // Include components
    './store/**/*.{js,ts}',         // Include store
    './layouts/**/*.{js,ts,vue}',   // Include layouts (if you use any)
    './assets/**/*.{js,ts,vue}'     // If you have assets like images, etc.
  ],
  theme: {
    extend: {
      colors: {
        customPrimary: {
          50: '#e6e7e8',
          100: '#cfd1d2',
          200: '#aeb0b1',
          300: '#8c8e90',
          400: '#686b6d',
          500: '#1E1F25', // You can adjust shades for contrast
          600: '#2f3133',
          700: '#1f2021',
          800: '#171819',
          900: '#131517',
          950: '#0a0b0c'
        },
        customSecondary: {
          50: '#e6e7e8',
          100: '#cfd1d2',
          200: '#aeb0b1',
          300: '#8c8e90',
          400: '#686b6d',
          500: '#1E1F25', // You can adjust shades for contrast
          600: '#29BB89',
          700: '#307BF4',
          800: '#FF0073',
          900: '#724EE6',
          950: '#F6C059'
        }

      },
      fontFamily: {
        sans: ['Avenir'],  // Apply Avenir as the default sans font
      },
    }
  }
}
