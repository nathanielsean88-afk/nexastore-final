import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth, SignIn } from '@clerk/clerk-react'

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth()
  const location = useLocation()

  // If Clerk is not configured, allow access (dev mode)
  if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
    return children
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-accent-cyan border-t-transparent animate-spin" />
          <p className="font-orbitron text-accent-cyan text-sm tracking-wider">MEMUAT...</p>
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-orbitron text-2xl text-white mb-2">
              Masuk Diperlukan
            </h1>
            <p className="text-text-secondary text-sm">
              Silakan masuk untuk mengakses halaman ini
            </p>
          </div>
          <SignIn
            afterSignInUrl={location.pathname}
            redirectUrl={location.pathname}
          />
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute
