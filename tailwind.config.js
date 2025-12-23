/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{html,js}",
    "!./node_modules/**",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#af8b41",
        secondary: "#daccb8",
        white: "#ffffff",
        black: "#000000",
        "surface-dark": "#1a1a1a"
      },
      fontFamily: {
        display: "Plus Jakarta Sans, sans-serif",
        body: ["Noto Sans", "sans-serif"]
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
}
