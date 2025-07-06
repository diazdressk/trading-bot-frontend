import { Button } from '@/components/ui/button'
import ConfirmationDialog from '@/components/ui/confirmation-dialog'
import { useAuthStore } from '@/stores'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const { logout } = useAuthStore()
  const navigate = useNavigate()
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false)

  const handleLogoutClick = () => {
    setLogoutConfirmOpen(true)
  }

  const confirmLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      <header className="border-b bg-background">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-lg sm:text-xl font-bold">Trading Bots Dashboard</h1>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" onClick={() => navigate('/bots')} className="cursor-pointer text-sm sm:text-base h-8 sm:h-10 px-2 sm:px-4">
              Bots
            </Button>
            <Button variant="ghost" onClick={() => navigate('/stats')} className="cursor-pointer text-sm sm:text-base h-8 sm:h-10 px-2 sm:px-4">
              Statistics
            </Button>
            <Button variant="outline" onClick={handleLogoutClick} className="cursor-pointer text-sm sm:text-base h-8 sm:h-10 px-2 sm:px-4">
              Logout
            </Button>
          </nav>
        </div>
      </header>

      <ConfirmationDialog
        open={logoutConfirmOpen}
        onOpenChange={setLogoutConfirmOpen}
        title="Confirm Logout"
        description="Are you sure you want to logout? You will need to sign in again to access your trading bots."
        confirmText="Logout"
        cancelText="Cancel"
        variant="default"
        onConfirm={confirmLogout}
      />
    </>
  )
}

export default Header 