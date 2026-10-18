export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        hp: {
          black: '#0b0b0b',
          ink: '#151515',
          coal: '#1f1f1f',
          gold: '#c9a227',
          'gold-light': '#e7c75f',
          yellow: '#ffcc00',
          'yellow-hover': '#f0bf00',
          red: '#c8102e',
          green: '#15803d',
          gray: '#6b6b6b',
          line: '#e6e6e6',
          mist: '#f4f4f2',
        },
      },
      fontFamily: {
        display: ['Oswald', 'Impact', 'Arial Narrow', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        store: '1320px',
      },
    },
  },
};
