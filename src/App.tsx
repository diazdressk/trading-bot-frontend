import ProtectedRoute from '@/components/ProtectedRoute'
import LoadingSpinner from '@/components/ui/loading-spinner'
import React, { Suspense, lazy } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

const LoginForm = lazy(() => import('@/components/auth/LoginForm'))
const RegisterForm = lazy(() => import('@/components/auth/RegisterForm'))
const BotsPage = lazy(() => import('@/pages/BotsPage'))
const StatsPage = lazy(() => import('@/pages/StatsPage'))

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner size="lg" text="Loading page..." />
  </div>
)

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/bots"
            element={
              <ProtectedRoute>
                <BotsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stats"
            element={
              <ProtectedRoute>
                <StatsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/bots" replace />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
