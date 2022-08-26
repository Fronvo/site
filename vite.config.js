import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit()],
    resolve: {
        alias: {
            src: resolve('./src'),
            interfaces: resolve('./src/interfaces'),
            stores: resolve('./src/stores'),
            utilities: resolve('./src/utilities'),
            lib: resolve('./src/lib'),
        },
    },
};

export default config;
