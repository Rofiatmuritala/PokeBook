/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "theme-pink": "#ff69b4",
        "theme-blue": "#1e90ff",
        "theme-green": "#32cd32",
      },
    },
  },
  plugins: [],
};
