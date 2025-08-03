import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Handle SPA routing - serve index.html for all routes
    historyApiFallback: true,
  },
  preview: {
    // Handle SPA routing in preview mode
    historyApiFallback: true,
  },
})
