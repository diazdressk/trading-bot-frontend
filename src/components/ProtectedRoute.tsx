import DashboardLayout from '@/components/layout/DashboardLayout'
import { useAuthStore } from '@/stores'
import React from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { hasTokens } = useAuthStore()

  if (!hasTokens()) {
    return <Navigate to="/login" replace />
  }

  return <DashboardLayout>{children}</DashboardLayout>
}

export default ProtectedRoute