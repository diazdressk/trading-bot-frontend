import type { ApiErrorResponse } from '@/types/auth'
import { AxiosError } from 'axios'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const errorData = error.response?.data as ApiErrorResponse
    return errorData?.message ||
      errorData?.error ||
      error.message ||
      'Request failed'
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error occurred'
}
