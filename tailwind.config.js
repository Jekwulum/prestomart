/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    mode: "jit",
    theme: {
        extend: {
            colors: {
                primary: "#D13D19"
            }
        },
    },
    plugins: [
        require('tailwind-scrollbar')
    ],
}