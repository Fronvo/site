import preprocess from 'svelte-preprocess';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
import adapter from '@sveltejs/adapter-node';

const config = {
    kit: {
        adapter: adapter({
            out: 'build',
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

        csp: {
            directives: {
                'script-src': ['self'],
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
