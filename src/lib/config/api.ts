import axios from 'axios'

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? import.meta.env.VITE_API_URL
      : import.meta.env.VITE_API_URL,
})

export const setAuthToken = (token: string): void => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
  localStorage.setItem('token', token)
}
export default api
