/**
 * Main information about a specific bot
 */
export interface Bot {
  /** Unique identifier */
  id: string

  /** Readable name */
  name: string

  /** Bot status */
  status: 'ACTIVE' | 'PAUSE' | 'ERROR'

  /** Trading pair, e.g. "BTCUSDT" */
  symbol: string

  /** Deposit in the quoted currency (e.g. USDT) */
  deposit: number

  /** Desired profit percentage (e.g. 0.5 = 0.5%) */
  profit_percentage: number

  /** Number of grid orders (integer > 0) */
  num_orders: number

  /** Grid length (%) between the first and last order (0 < grid_length < 100) */
  grid_length: number

  /** Public status */
  isPublic: boolean
}

export type BotCreate = Omit<Bot, 'id' | 'status' | 'isPublic'>
export type BotCreateRequest = BotCreate
export type BotUpdateRequest = Omit<Bot, 'status'>

/**
* Short statistics for a specific bot
 */
export interface BotStatistic {
  /** Bot ID */
  id: string
  /** Readable bot name */
  name: string
  /** Trading pair, e.g. "BTCUSDT" */
  symbol: string
  /** How many cycles have been completed */
  cycles_completed: number
  /** Total deposit in USDT */
  deposit_usdt: number
  /** Total profit in USDT */
  profit_usdt: number
  /** Profit percentage: profit / deposit * 100 */
  profit_percentage: number
}

// Alias for backward compatibility
export type BotStatisticData = BotStatistic 