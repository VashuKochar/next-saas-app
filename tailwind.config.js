/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    darkMode: ["class", "class"],
    theme: {
        extend: {
        }
    },
    plugins: [require("tailwindcss-animate")],
  };
  