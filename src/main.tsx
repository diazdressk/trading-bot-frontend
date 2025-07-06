import ErrorBoundary from '@/components/ui/error-boundary'
import LoadingSpinner from '@/components/ui/loading-spinner'
import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const GlobalLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <LoadingSpinner size="lg" text="Loading application..." />
  </div>
)

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <Suspense fallback={<GlobalLoader />}>
      <App />
    </Suspense>
  </ErrorBoundary>
)
