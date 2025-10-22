/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-plum': '#4A0E4E',
        'brand-rose': '#D9A7B0',
        'brand-lavender': '#E0CFFF',
        'brand-charcoal': '#333333',
        'brand-cream': '#FAF6F0',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Good for styling inputs
  ],
};