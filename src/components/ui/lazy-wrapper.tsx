import React, { Suspense } from 'react'
import ErrorBoundary from './error-boundary'
import LoadingSpinner from './loading-spinner'

interface LazyWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
}

export const LazyWrapper: React.FC<LazyWrapperProps> = ({ 
  children, 
  fallback,
  className = "min-h-[200px]"
}) => {
  const defaultFallback = (
    <div className={`flex items-center justify-center ${className}`}>
      <LoadingSpinner size="md" />
    </div>
  )

  return (
    <ErrorBoundary>
      <Suspense fallback={fallback || defaultFallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}

export default LazyWrapper 