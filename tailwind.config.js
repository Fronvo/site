/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.svelte'],
    theme: {
        extend: {
            colors: {
                'index-bg': 'rgb(0, 0, 0, 0.1)',
            },

            screens: {
                mobile: {
                    max: '850px',
                },

                smobile: {
                    max: '600px',
                },
            },

            backgroundImage: {
                main: "url('/images/bg.jpg')",
            },
        },
    },
    plugins: [],
};
