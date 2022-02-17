import preprocess from 'svelte-preprocess';

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
		postcss: true
	})
};

export default config;