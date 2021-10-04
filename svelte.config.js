/** @type {import('@sveltejs/kit').Config} */
import adapter from '@sveltejs/adapter-node';

const config = {
	kit: {
		target: '#fronvo',
		adapter: adapter({
					out: 'build',
					env: {
						host: process.env.PORT || 5000
					}
		})
	}
};

export default config;