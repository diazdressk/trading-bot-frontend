import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createBot, updateBot } from '@/lib/api'
import { botSchema } from '@/schemas/bot'
import type { Bot, BotCreate } from '@/types/bot'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

interface BotFormProps {
  bot?: Bot | null
  onClose: () => void
  onSuccess: () => void
}

const BotForm: React.FC<BotFormProps> = ({ bot, onClose, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isEditing = !!bot

  const form = useForm<BotCreate>({
    resolver: zodResolver(botSchema),
    defaultValues: isEditing && bot
      ? {
          name: bot.name,
          symbol: bot.symbol,
          deposit: bot.deposit,
          profit_percentage: bot.profit_percentage,
          num_orders: bot.num_orders,
          grid_length: bot.grid_length,
        }
      : {
          name: '',
          symbol: '',
          deposit: 100,
          profit_percentage: 1,
          num_orders: 10,
          grid_length: 10,
        },
  })

  const handleSubmit = async (data: BotCreate) => {
    try {
      setIsLoading(true)
      setError(null)

      if (isEditing && bot) {
        await updateBot({ ...data, id: bot.id })
      } else {
        await createBot(data)
      }

      onSuccess()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save bot')
      console.error('Error saving bot:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit bot' : 'Create new bot'}
          </DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bot name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter bot name" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="symbol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trading pair</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. BTCUSDT" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="deposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deposit (USDT)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="100"
                        value={field.value || ''}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="profit_percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profit (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="1.0"
                        value={field.value || ''}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="num_orders"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of orders</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="10"
                        value={field.value || ''}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="grid_length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grid length (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="10.0"
                        value={field.value || ''}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="bg-slate-700 hover:bg-slate-800 text-white font-medium">
                {isLoading ? 
                  (isEditing ? 'Updating...' : 'Creating...') : 
                  (isEditing ? 'Update bot' : 'Create bot')
                }
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default BotForm 