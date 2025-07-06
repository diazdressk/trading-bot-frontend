import { authApi } from '@/lib/api'
import { clearAuthTokens, getAccessToken, getRefreshToken, setAuthTokens } from '@/lib/auth'
import { getErrorMessage } from '@/lib/utils'
import { type LoginRequest, type RegisterRequest, type User } from '@/types/auth'
import { create } from 'zustand'

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
  hasTokens: () => boolean
  login: (credentials: LoginRequest) => Promise<void>
  register: (userData: RegisterRequest) => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),

  logout: () => {
    clearAuthTokens()
    set({ user: null })
  },

  hasTokens: () => {
    const accessToken = getAccessToken()
    const refreshToken = getRefreshToken()
    return !!(accessToken || refreshToken)
  },

  login: async (credentials: LoginRequest) => {
    set({ isLoading: true, error: null })

    try {
      const response = await authApi.login(credentials)

      if (setAuthTokens(response)) {
        set({ user: { id: '', username: credentials.username }, isLoading: false })
      } else {
        throw new Error('Failed to save tokens')
      }
    } catch (error: unknown) {
      set({
        error: getErrorMessage(error),
        isLoading: false
      })
      throw error
    }
  },

  register: async (userData: RegisterRequest) => {
    set({ isLoading: true, error: null })

    try {
      const response = await authApi.register(userData)

      if (setAuthTokens(response)) {
        set({ user: { id: '', username: userData.username }, isLoading: false })
      } else {
        throw new Error('Failed to save tokens')
      }
    } catch (error: unknown) {
      set({
        error: getErrorMessage(error),
        isLoading: false
      })
      throw error
    }
  },

  clearError: () => set({ error: null })
})) 