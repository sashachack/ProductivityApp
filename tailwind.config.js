const plugin = require('tailwindcss/plugin')

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'card-grey': '#25262B',
                'day-grey': '#212225',
                'light-grey': '#2F2F36',
                'todo': '#ff3665',
                'doing': '#f09a26',
                'done': '#7ced68',
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