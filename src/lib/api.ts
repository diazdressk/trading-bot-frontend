import { type LoginRequest, type RegisterRequest, type TokenData } from '@/types/auth'
import { type Bot, type BotCreate, type BotStatistic } from '@/types/bot'
import axios, { type AxiosResponse } from 'axios'
import { clearAuthTokens, getAccessToken, getRefreshToken, setAuthTokens } from './auth'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: any) => void
  reject: (error?: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })
  failedQueue = []
}

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/register') ||
      originalRequest.url?.includes('/auth/refresh')) {
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = getRefreshToken()

        if (!refreshToken) {
          throw new Error('No refresh token available')
        }

        console.log('🔄 Refreshing tokens...')

        const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refresh_token: refreshToken
        }, {
          timeout: 5000,
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const tokenData = refreshResponse.data
        console.log('✅ Tokens refreshed successfully')

        setAuthTokens(tokenData)

        processQueue(null, tokenData.access_token)

        originalRequest.headers.Authorization = `Bearer ${tokenData.access_token}`
        return api(originalRequest)

      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError)

        processQueue(refreshError, null)

        clearAuthTokens()

        if (typeof window !== 'undefined' &&
          !window.location.pathname.includes('/login') &&
          !window.location.pathname.includes('/register')) {
          window.location.href = '/login'
        }

        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export const authApi = {
  login: async (data: LoginRequest): Promise<TokenData> => {
    const response: AxiosResponse<TokenData> = await api.post('/auth/login', data)
    return response.data
  },

  register: async (data: RegisterRequest): Promise<TokenData> => {
    const response: AxiosResponse<TokenData> = await api.post('/auth/register', data)
    return response.data
  },

  logout: () => {
    clearAuthTokens()
  },
}

export const botsApi = {
  getAll: async (): Promise<Bot[]> => {
    const response: AxiosResponse<Bot[]> = await api.get('/bots')
    return response.data
  },

  create: async (data: BotCreate): Promise<Bot> => {
    const response: AxiosResponse<Bot> = await api.post('/bots', data)
    return response.data
  },

  update: async (data: Partial<Bot> & { id: string }): Promise<Bot> => {
    const response: AxiosResponse<Bot> = await api.put('/bots', data)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/bots/${id}`)
  },

  getStatistics: async (): Promise<BotStatistic[]> => {
    const response: AxiosResponse<BotStatistic[]> = await api.get('/bots/statistics')
    return response.data
  },
}

export const getBots = botsApi.getAll
export const createBot = botsApi.create
export const updateBot = botsApi.update
export const deleteBot = botsApi.delete
export const getBotStatistics = botsApi.getStatistics

export default api 