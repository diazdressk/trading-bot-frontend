import { RefreshCw } from 'lucide-react'
import React from 'react'
import { Alert, AlertDescription } from './alert'
import { Button } from './button'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="max-w-md w-full">
            <Alert variant="destructive">
              <AlertDescription>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Something went wrong</h3>
                    <p className="text-sm">
                      {this.state.error?.message || 'An unexpected error occurred'}
                    </p>
                  </div>
                  <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reload page
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary 