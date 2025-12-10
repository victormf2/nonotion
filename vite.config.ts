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
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          // {
          //   handler: 'NetworkOnly',
          //   urlPattern: /\/api\/.*\.json/,
          //   method: 'POST',
          //   options: {
          //     backgroundSync: {
          //       name: 'myQueueName',
          //       options: {
          //         maxRetentionTime: 24 * 60,
          //       },
          //     },
          //   },
          // },
        ],
      },
      devOptions: {
        enabled: process.env.CI === 'true' ? false : true,
      },
      includeAssets: ['nonotion.png'],
      manifest: {
        name: 'nonotion',
        short_name: 'nonotion',
        description: 'nonotion add notions to your notion',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
