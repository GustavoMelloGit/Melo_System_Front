import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
  },
  env: {
    auth_nickname: 'Admin',
    auth_password: '123456',
    api_base: 'http://localhost:3333',
  },
})
