/**
 * Login request body
 */
export interface LoginRequest {
  /**
   * Username
   * @example "john_doe"
   */
  username: string

  /**
   * Password
   * @example "password"
   */
  password: string
}

/**
 * Registration request body
 */
export interface RegisterRequest {
  /**
   * Username
   * @example "john_doe"
   */
  username: string

  /**
   * Password
   * @example "password"
   */
  password: string
}

/**
 * User data
 */
export interface User {
  /**
   * User ID
   */
  id: string

  /**
   * Username
   */
  username: string
}

/**
 * Data returned after successful login
 */
export interface TokenData {
  /**
   * JWT for access to protected endpoints
   */
  access_token: string

  /**
   * JWT for refreshing access_token
   */
  refresh_token?: string

  /**
   * Token type — always "Bearer"
   */
  token_type: 'Bearer'
}

/**
 * API Error Response
 */
export interface ApiErrorResponse {
  /**
   * Error message
   */
  message: string

  /**
   * Error code or type
   */
  error?: string

  /**
   * HTTP status code
   */
  statusCode?: number
} 