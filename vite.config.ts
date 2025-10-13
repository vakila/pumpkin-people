import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.bin'],
  plugins: [],
  build: {
    sourcemap: true,
  },
})
