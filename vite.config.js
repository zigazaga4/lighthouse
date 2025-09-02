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
    minify: false,
    target: 'es2015',
    rollupOptions: {
      output: {
        format: 'iife',
        name: 'LighthouseChurch',
        inlineDynamicImports: true,
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  base: './',
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.global.js'
    }
  }
})
