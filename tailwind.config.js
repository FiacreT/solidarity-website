/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7B2558',
        'primary-dark': '#5E1A42',
        secondary: '#8B9B6B',
        'secondary-dark': '#6E7D52',
        accent: '#F3EEF1',
        dark: '#1A1A1A',
        'light-bg': '#F7F4F6',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1C1917',
          },
        },
      },
    },
  },
  plugins: [],
};
