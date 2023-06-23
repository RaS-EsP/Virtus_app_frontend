/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@rewind-ui/core/dist/theme/styles/*.js",
  ],
  theme: {
    extend: {
      brightness: ["hover"],
      colors: {
        FirstColor: "#27374D",
        SecondColor: "#526D82",
        ThirdColor: "#9DB2BF",
        FourthColor: "#DDE6ED",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("@tailwindcss/forms")({
      strategy: "class", // only generate classes
    }),
  ],
};
