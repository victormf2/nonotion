import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/nonotion/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            handler: 'NetworkOnly',
            urlPattern: (options) => {
              console.log(options.url)
              return (
                options.url.hostname ===
                'nonotion.victormachadodefranca.workers.dev'
              )
            },
            method: 'POST',
            options: {
              backgroundSync: {
                name: 'myQueueName',
                options: {
                  maxRetentionTime: 7 * 24 * 60, // retry for 7 days (specified in minutes)
                },
              },
            },
          },
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
