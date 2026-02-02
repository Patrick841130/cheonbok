/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#E60013',
            },
            fontFamily: {
                sans: ['"Noto Sans KR"', '"Nunito Sans"', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
