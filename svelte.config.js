import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
import vercel from '@sveltejs/adapter-vercel';

const config = {
    kit: {
        adapter: vercel(),
    },

    preprocess: preprocess({
        typescript: {
            tsconfigFile: true,
        },
    }),

    onwarn: () => {},
};

export default config;
