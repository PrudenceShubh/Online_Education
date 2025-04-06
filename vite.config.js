import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5004',
        changeOrigin: true,
        secure: false,
      }
    },
    allowedHosts: [
      'shubham.loca.lt',
      'grumpy-teeth-prove.loca.lt',
      'https://green-ducks-lose.loca.lt',
      'https://wise-queens-warn.loca.lt',
      "e48b-27-59-116-90.ngrok-free.app",
      '.ngrok-free.app', // Allow all ngrok subdomains
    ],
  },
})

