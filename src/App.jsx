import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './context/CartContext.jsx'
import { TransactionProvider } from './context/TransactionContext.jsx'
import ProtectedRoute from './components/layout/ProtectedRoute.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Skeleton from './components/ui/Skeleton.jsx'

// Lazy-load pages
const LandingPage = lazy(() => import('./pages/LandingPage.jsx'))
const CatalogPage = lazy(() => import('./pages/CatalogPage.jsx'))
const GameDetailPage = lazy(() => import('./pages/GameDetailPage.jsx'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage.jsx'))
const PaymentPage = lazy(() => import('./pages/PaymentPage.jsx'))
const PaymentStatusPage = lazy(() => import('./pages/PaymentStatusPage.jsx'))
const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'))
const TransactionPage = lazy(() => import('./pages/TransactionPage.jsx'))
const ProfilePage = lazy(() => import('./pages/ProfilePage.jsx'))
const FAQPage = lazy(() => import('./pages/FAQPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

const PageLoader = () => (
  <div className="min-h-screen bg-bg-primary flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 rounded-full border-2 border-accent-cyan border-t-transparent animate-spin" />
      <p className="font-orbitron text-accent-cyan text-sm tracking-wider">LOADING...</p>
    </div>
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <TransactionProvider>
          <div className="min-h-screen bg-bg-primary font-sora">
            <Navbar />
            <main>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/catalog" element={<CatalogPage />} />
                  <Route path="/game/:id" element={<GameDetailPage />} />
                  <Route path="/faq" element={<FAQPage />} />

                  {/* Protected Routes */}
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <CheckoutPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/payment"
                    element={
                      <ProtectedRoute>
                        <PaymentPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/payment/status"
                    element={
                      <ProtectedRoute>
                        <PaymentStatusPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/transactions"
                    element={
                      <ProtectedRoute>
                        <TransactionPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>

          {/* Toast Notifications */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#0D1117',
                color: '#FFFFFF',
                border: '1px solid rgba(0, 212, 255, 0.2)',
                borderRadius: '12px',
                fontFamily: 'Sora, sans-serif',
                fontSize: '14px',
              },
              success: {
                iconTheme: { primary: '#00FF87', secondary: '#0D1117' },
              },
              error: {
                iconTheme: { primary: '#FF3B5C', secondary: '#0D1117' },
              },
            }}
          />
        </TransactionProvider>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
