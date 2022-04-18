const plugin = require('tailwindcss/plugin')

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'card-grey': '#25262B'
            }
        },
    },
    plugins: [
        plugin(function({ addUtilities }) {
            addUtilities({
                '.no-scrollbar': {
                    '-ms-overflow-style': 'none',
                    'scrollbar-width': 'none'
                },
                '.no-scrollbar::-webkit-scrollbar': {
                    display: 'none'
                }
            })
        })
    ],
}