/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
    "./public/**/*.html",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./styles/**/*.{ts,tsx}",
    "./utils/**/*.{ts,tsx}",
  ],
  plugins: [require("flowbite/plugin")],
  theme: {
    fontFamily: {
      heading: ["Rajdhani", "sans-serif"],
      body: ["Poppins", "sans-serif"],
    },
  },
};
