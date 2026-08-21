import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Use base path for GitHub Pages web deployment
  // For Capacitor/Android, the base path will be handled by the app itself
  base: process.env.VITE_APP_MODE === 'capacitor' ? '/' : '/my-routine/',
})
