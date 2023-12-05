import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const setAuthToken = (token: string): void => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}
export default api
