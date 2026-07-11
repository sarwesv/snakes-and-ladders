import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/snakes-and-ladders/',
  plugins: [react()],
  server: {
    port: 5173,
  },
})
