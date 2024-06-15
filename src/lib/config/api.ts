import axios from 'axios'
import { logger } from '../utils/Logger'

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? import.meta.env.VITE_API_URL
      : import.meta.env.VITE_API_URL,
})

export const setAuthToken = (token: string): void => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

api.interceptors.request.use(
  (config) => {
    return config
  },
  async (error) => {
    logger.error(error as Error)
    return Promise.reject(error)
  },
)

export default api
