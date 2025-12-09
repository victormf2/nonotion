import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/nonotion/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: process.env.CI === 'true' ? false : true,
      },
      manifest: {
        name: 'nonotion',
        short_name: 'nonotion',
        description: 'nonotion add notions to your notion',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'nonotion-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'nonotion-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
