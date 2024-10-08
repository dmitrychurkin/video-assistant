// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			// $ui: './src/ui',
			// $stores: './src/stores',
			// $utils: './src/utils',
			// $styles: './src/styles',
			// $assets: './src/assets',
			// $routes: './src/routes',
			// $layouts: './src/layouts',
			// $services: './src/services',
			// $types: './src/types',
			// $hooks: './src/hooks',
			// $constants: './src/constants',
			// $api: './src/api',
			// $components: './src/components',
			// $config: './src/config',
		}
	}
};

export default config;
