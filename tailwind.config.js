/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.jsx",
    "./*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["Manrope", "sans-serif"]
      },
      colors: {
        cyber: {
          50: "#ecfdf5",
          100: "#d1fae5",
          500: "#0f766e",
          700: "#115e59",
          900: "#134e4a"
        }
      },
      boxShadow: {
        panel: "0 14px 36px rgba(13, 45, 41, 0.16)"
      }
    }
  },
  plugins: []
};


