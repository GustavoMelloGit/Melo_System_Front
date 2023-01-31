/// <reference types="vite/client" />
declare namespace NodeJS {
  type ProcessEnv = {
    VITE_API_URL: string
    NODE_ENV: 'development' | 'production'
  }
}
