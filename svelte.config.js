import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

/** @type {import('@sveltejs/kit').Config} */
import adapter from '@sveltejs/adapter-node';
const config = {
	kit: {
		target: '#fronvo',
		adapter: adapter({
					out: 'build'
		})
	},

	preprocess: preprocess({
		postcss: {
			plugins: [autoprefixer()]
		}
	}),
};

export default config;