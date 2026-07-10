import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/L.O.S-London/',
  plugins: [react()],
  server: { port: 5173, open: true },
})
