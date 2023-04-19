import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      },
      {
        find: './runtimeConfig',
        replacement: './runtimeConfig.browser',
      },
    ]
  },
  pwa: {
    name: 'TM App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      icons: [
        {
          "src": "./assets/icons/tm-icon-72x72.png",
          "sizes": "72x72",
          "type": "image/png"
        },
        {
          "src": "./assets/icons/tm-icon-96x96.png",
          "sizes": "96x96",
          "type": "image/png"
        },
        {
          "src": "./assets/icons/tm-icon-128x128.png",
          "sizes": "128x128",
          "type": "image/png"
        },
        {
          "src": "./assets/icons/tm-icon-144x144.png",
          "sizes": "144x144",
          "type": "image/png"
        },
        {
          "src": "./assets/icons/tm-icon-152x152.png",
          "sizes": "152x152",
          "type": "image/png"
        },
        {
          "src": "./assets/icons/tm-icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "./assets/icons/tm-icon-384x384.png",
          "sizes": "384x384",
          "type": "image/png"
        },
        {
          "src": "./assets/icons/tm-icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ],
    },
  }
})
