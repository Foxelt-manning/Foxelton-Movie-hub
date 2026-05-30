import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss(),
  VitePWA({
    registerType: 'autoUpdate',
     workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
    manifest:{
      name: 'Foxelton Movie Hub',
      short_name: ' Foxelton MovieHub',
      description: 'Your Ultimate Movie Streaming and Downloading Platform',
      short_url:'/',
      display: 'standalone',
      background_color: '#030014',
        theme_color: '#6b21a8',
        
    },
    devOptions: {
      enabled: true
    }
  })]
})
