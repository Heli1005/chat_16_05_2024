import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // port: 3000, // Set the port to 5000

    proxy: {
      // Proxy '/api' requests to 'http://localhost:5000'
      '/api': {
        target: 'http://192.168.170.219:5000',
        port:5000,
      },
    },
  },
  plugins: [react()],
})
