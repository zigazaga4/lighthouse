import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    target: 'es2015',
    rollupOptions: {
      external: [],
      output: {
        manualChunks: undefined,
        format: 'iife',
        name: 'LighthouseChurch'
      }
    }
  },
  base: './'
})
