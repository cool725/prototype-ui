import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
  },
  plugins: [svelte()],
	optimizeDeps: { exclude: ["svelte-navigator"] },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  }
})
