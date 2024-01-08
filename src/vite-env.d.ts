/// <reference types="vite/client" />
declare namespace NodeJS {
  type ProcessEnv = {
    VITE_API_URL: string
    VITE_API_KEY: string
    VITE_AUTH_DOMAIN: string
    VITE_PROJECT_ID: string
    VITE_STORAGE_BUCKED: string
    VITE_MESSAGING_SENDER_ID: string
    VITE_APP_ID: string
    VITE_MEASUREMENT_ID: string
    NODE_ENV: 'development' | 'production'
  }
}
