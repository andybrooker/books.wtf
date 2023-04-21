/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        lapiz: {
          primary: "#0085FF",
        },
        sand: {
          100: "hsl(50, 20.0%, 99.0%)",
          200: "hsl(60, 7.7%, 97.5%)",
          300: "hsl(59, 6.5%, 95.1%)",
          400: "hsl(58, 6.1%, 92.9%)",
          500: "hsl(57, 6.0%, 90.7%)",
          600: "hsl(56, 5.9%, 88.4%)",
          700: "hsl(55, 5.9%, 85.2%)",
          800: "hsl(51, 6.0%, 77.1%)",
          900: "hsl(50, 2.0%, 55.7%)",
          1000: "hsl(55, 1.7%, 51.9%)",
          1100: "hsl(50, 2.0%, 43.1%)",
          1200: "hsl(50, 6.0%, 10.0%)",
        },
      },
    },
  },
  plugins: [],
};
