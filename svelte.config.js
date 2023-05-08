import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
    preprocess: vitePreprocess(),
    server: {
        // Allow serving files from one level up to the project root
        allow: ['../']
    }
}
