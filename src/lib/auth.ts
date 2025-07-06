import { type TokenData } from '@/types/auth'
import Cookies from 'js-cookie'

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

export const setAuthTokens = (tokenData: TokenData) => {
  try {
    clearAuthTokens()

    // Save tokens in cookies with reasonable defaults
    Cookies.set(ACCESS_TOKEN_KEY, tokenData.access_token, {
      sameSite: 'strict',
      secure: window.location.protocol === 'https:',
      path: '/'
    })

    if (tokenData.refresh_token) {
      Cookies.set(REFRESH_TOKEN_KEY, tokenData.refresh_token, {
        sameSite: 'strict',
        secure: window.location.protocol === 'https:',
        path: '/'
      })
    }

    return true
  } catch (error) {
    console.error('Error saving tokens:', error)
    return false
  }
}

export const getAccessToken = (): string | undefined => {
  return Cookies.get(ACCESS_TOKEN_KEY)
}

export const getRefreshToken = (): string | undefined => {
  return Cookies.get(REFRESH_TOKEN_KEY)
}

export const isAuthenticated = (): boolean => {
  const hasAccessToken = !!getAccessToken()
  const hasRefreshToken = !!getRefreshToken()

  return hasAccessToken || hasRefreshToken
}

export const clearAuthTokens = () => {
  // Remove cookies with different parameter combinations for reliability
  Cookies.remove(ACCESS_TOKEN_KEY)
  Cookies.remove(REFRESH_TOKEN_KEY)

  Cookies.remove(ACCESS_TOKEN_KEY, { path: '/' })
  Cookies.remove(REFRESH_TOKEN_KEY, { path: '/' })

  Cookies.remove(ACCESS_TOKEN_KEY, { path: '', domain: window.location.hostname })
  Cookies.remove(REFRESH_TOKEN_KEY, { path: '', domain: window.location.hostname })
}

export const redirectToLogin = () => {
  clearAuthTokens()
  window.location.href = '/login'
}

