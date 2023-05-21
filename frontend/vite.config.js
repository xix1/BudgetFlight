import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      "/getCityID": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/getFlightDetails": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/inspirationSearch": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
    
  },
})


