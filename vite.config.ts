import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import solidPlugin from 'vite-plugin-solid'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
	plugins: [
		solidPlugin(),
		tsconfigPaths(),

		viteStaticCopy({
			targets: [
				{
					src: 'node_modules/@matrix-org/olm/olm.wasm',
					dest: '.',
				},
			],
		}),
	],
	server: {
		port: 3000,
	},
	define: {
		global: 'globalThis',
	},
	build: {
		target: 'esnext',
	},
})
