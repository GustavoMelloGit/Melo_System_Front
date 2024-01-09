import { sentryVitePlugin } from '@sentry/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: 'gustavo-f0',
      project: 'gustavo-f0',
    }),
  ],

  build: {
    sourcemap: true,
  },
})
