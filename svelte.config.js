/** @type {import('@sveltejs/kit').Config} */
import adapter from '@sveltejs/adapter-static';

const config = {
	kit: {
		target: '#fronvo',
		adapter: adapter({
					pages: 'build/assets/pages',
					fallback: null
		})
	}
};

export default config;