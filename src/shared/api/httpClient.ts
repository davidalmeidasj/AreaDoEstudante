import axios, { type AxiosInstance } from 'axios'

let authTokenGetter: () => string | null = () => null
let onUnauthorized: () => void = () => {}

export function setAuthTokenGetter(getter: () => string | null): void {
  authTokenGetter = getter
}

export function setUnauthorizedHandler(handler: () => void): void {
  onUnauthorized = handler
}

export const httpClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
})

httpClient.interceptors.request.use((config) => {
  const token = authTokenGetter()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      onUnauthorized()
    }
    return Promise.reject(error)
  },
)
