import preprocess from 'svelte-preprocess';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
import vercel from '@sveltejs/adapter-vercel';

const config = {
    kit: {
        adapter: vercel({
            edge: false,
            external: [],
            split: false,
        }),
        vite: {
            resolve: {
                alias: {
                    src: resolve('./src'),
                    interfaces: resolve('./src/interfaces'),
                    stores: resolve('./src/stores'),
                    utilities: resolve('./src/utilities'),
                    lib: resolve('./src/lib'),
                },
            },
        },
    },

    preprocess: preprocess({
        postcss: true,
        typescript: {
            tsconfigFile: true,
        },
    }),
};

export default config;
