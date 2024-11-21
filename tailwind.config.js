/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    spacing: Array.from({ length: 1000 }).reduce((map, _, i) => {
      map[i] = `${i}px`;
      return map;
    }, {}),
    extend: {},
  },
  plugins: [],
};
