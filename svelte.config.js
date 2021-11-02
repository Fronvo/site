/** @type {import('@sveltejs/kit').Config} */
import adapter from '@sveltejs/adapter-node';
const config = {
	kit: {
		target: '#fronvo',
		adapter: adapter({
					out: 'build'
		})
	}
};

export default config;