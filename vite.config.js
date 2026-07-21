import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  base: '/Sahils-Website/docs/',
  plugins: [react()],
  build: {
  outDir: 'docs',
  rollupOptions: {
    input: {
      main: 'index.html',
      app: 'app.html'
      }
    }
  }
})