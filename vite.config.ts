import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { sharedArrayBuffer } from './server/middleware/sharedArrayBuffer';

export default defineConfig({
	plugins: [{
		name: 'add middleware',
		configureServer: server => {
			server.middlewares.use(sharedArrayBuffer);
		}
	}, sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
