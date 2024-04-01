/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        "!./node_modules/**", // Exclude everything in node_modules
    ],
    theme: {
        extend: {
            colors: {
                'light-color': '#708090',
                'primary-button-color': '#4682B4',
                'primary-button-border-color': '#708090',
            },
            boxShadow: {
                menu: '0px 159px 95px rgba(13,12,34,0.01), 0px 71px 71px rgba(13,12,34,0.02), 0px 18px 39px rgba(13,12,34,0.02), 0px 0px 0px rgba(13,12,34,0.02)',
            },
            screens: {
                xs: '400px',
            },
            maxWidth: {
                '10xl': '1680px',
            },
        },
    },
    plugins: [],
}
