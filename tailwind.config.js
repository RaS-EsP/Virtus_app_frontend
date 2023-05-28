/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      customGray: "#9BA4B5",
      customDark: "#212A3E",
      customBlue: "#394867",
      customLight: "#F1F6F9",
    },
  },
  plugins: [import("flowbite/plugin")],
};
