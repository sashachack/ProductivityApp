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
                'todo': '#6C364C',
                'doing': '#6C4A1C',
                'done': '#486044',
                'l1': '#0f766e',
                'l2': '#f87171',
                'l3': '#fb923c',
                'l4': '#fde047',
                'l5': '#4ade80',
                'l6': '#38bdf8',
                'l7': '#8b5cf6',
                'l8': '#ec4899'
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