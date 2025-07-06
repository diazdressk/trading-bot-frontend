import { z } from 'zod'

export const botSchema = z.object({
  name: z
    .string()
    .min(1, 'Bot name is required')
    .max(100, 'Bot name must be less than 100 characters'),
  symbol: z
    .string()
    .min(1, 'Trading pair is required')
    .regex(/^[A-Z0-9]{2,20}$/, 'Invalid trading pair format (e.g. BTCUSDT)'),
  deposit: z
    .number()
    .min(1, 'Deposit must be greater than 0')
    .max(1000000, 'Deposit is too large'),
  profit_percentage: z
    .number()
    .min(0.01, 'Profit percentage must be at least 0.01%')
    .max(100, 'Profit percentage cannot exceed 100%'),
  num_orders: z
    .number()
    .int('Number of orders must be an integer')
    .min(2, 'There must be at least 2 orders')
    .max(100, 'Cannot exceed 100 orders'),
  grid_length: z
    .number()
    .min(0.1, 'Grid length must be at least 0.1%')
    .max(99.9, 'Grid length cannot exceed 99.9%'),
})

export const botCreateSchema = botSchema
export const botUpdateSchema = botSchema.extend({
  id: z.string(),
})

export type BotCreateFormData = z.infer<typeof botCreateSchema>
export type BotUpdateFormData = z.infer<typeof botUpdateSchema> 