import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://10.0.0.144:5173',
  },
})
