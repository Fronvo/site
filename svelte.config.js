import preprocess from 'svelte-preprocess';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
import adapter from '@sveltejs/adapter-node';

const config = {
	kit: {
		target: '#fronvo',
		adapter: adapter({
					out: 'build'
		}),
		vite: {
			resolve: {
				alias: {
					src: resolve('./src'),
					styles: resolve('./src/styles'),
					interfaces: resolve('./src/interfaces')
				}
			}
		}
	},

	preprocess: preprocess({
		postcss: true,
		typescript: {
			tsconfigFile: true
		}
	})
};

export default config;