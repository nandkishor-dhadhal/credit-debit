module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('custom-dark', '&:where(.dark, .dark *)');
    }
  ]
};
