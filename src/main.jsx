import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import App from './App.jsx'
import './index.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  console.warn('Missing Clerk Publishable Key. Auth features will be disabled.')
}

const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: '#00D4FF',
    colorBackground: '#0D1117',
    colorInputBackground: '#111827',
    colorText: '#FFFFFF',
    colorTextSecondary: '#6B7280',
    colorDanger: '#FF3B5C',
    colorSuccess: '#00FF87',
    borderRadius: '12px',
    fontFamily: 'Sora, sans-serif',
    fontSize: '14px',
  },
  elements: {
    card: 'shadow-2xl border border-cyan-500/20 bg-bg-card',
    formButtonPrimary:
      'bg-accent-cyan hover:bg-cyan-400 text-black font-semibold transition-all duration-300',
    formFieldInput:
      'bg-bg-surface border-cyan-500/20 text-white focus:border-accent-cyan',
    footerActionLink: 'text-accent-cyan hover:text-cyan-300',
    headerTitle: 'font-orbitron text-white',
    socialButtonsBlockButton:
      'border-cyan-500/20 bg-bg-surface hover:bg-bg-card text-white',
    dividerLine: 'bg-cyan-500/20',
    formFieldLabel: 'text-text-secondary',
  },
}

const AppWrapper = () => {
  if (!PUBLISHABLE_KEY) {
    return <App />
  }

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={clerkAppearance}
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
    >
      <App />
    </ClerkProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
)
