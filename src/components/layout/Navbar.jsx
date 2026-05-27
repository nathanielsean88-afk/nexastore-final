import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap, ChevronDown, History, User, LayoutDashboard, LogOut, HelpCircle } from 'lucide-react'
import { useAuth, useUser, UserButton, SignInButton, SignUpButton } from '@clerk/clerk-react'
import Button from '../ui/Button.jsx'

const navLinks = [
  { to: '/', label: 'Beranda', exact: true },
  { to: '/catalog', label: 'Game' },
  { to: '/faq', label: 'Bantuan', icon: HelpCircle },
]

const authNavLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Riwayat', icon: History },
  { to: '/profile', label: 'Profil', icon: User },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isSignedIn, isLoaded } = useAuth()
  const { user } = useUser()
  const navigate = useNavigate()

  const hasClerk = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  const navLinkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-all duration-300 py-1 group
     ${isActive ? 'text-accent-cyan' : 'text-text-secondary hover:text-white'}`

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-40
        transition-all duration-300
        ${scrolled
          ? 'bg-bg-primary/90 backdrop-blur-xl border-b border-cyan-500/15 shadow-lg shadow-black/20'
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => setIsOpen(false)}
          >
            <div className="w-8 h-8 rounded-lg bg-accent-cyan/20 border border-accent-cyan/30 flex items-center justify-center group-hover:bg-accent-cyan/30 transition-all">
              <Zap size={16} className="text-accent-cyan" />
            </div>
            <span className="font-orbitron font-bold text-lg text-white group-hover:text-accent-cyan transition-colors">
              Nexa<span className="text-accent-cyan">Store</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                className={navLinkClass}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`
                        absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full
                        bg-accent-cyan transition-all duration-300
                        ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
                        group-hover:opacity-100 group-hover:scale-x-100
                      `}
                    />
                  </>
                )}
              </NavLink>
            ))}
            {isSignedIn && authNavLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={navLinkClass}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`
                        absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full
                        bg-accent-cyan transition-all duration-300
                        ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
                        group-hover:opacity-100 group-hover:scale-x-100
                      `}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {!isLoaded && hasClerk ? (
              <div className="w-8 h-8 rounded-full bg-bg-surface animate-pulse" />
            ) : isSignedIn ? (
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 text-xs font-medium text-accent-cyan">
                  👋 {user?.firstName || 'User'}
                </div>
                {hasClerk && <UserButton afterSignOutUrl="/" />}
              </div>
            ) : hasClerk ? (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">Masuk</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button variant="primary" size="sm">Daftar</Button>
                </SignUpButton>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
                  Masuk
                </Button>
                <Button variant="primary" size="sm" onClick={() => navigate('/dashboard')}>
                  Daftar
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition-all"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-bg-primary/95 backdrop-blur-xl border-b border-cyan-500/15"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.exact}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                     ${isActive
                       ? 'text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20'
                       : 'text-text-secondary hover:text-white hover:bg-white/5'
                     }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {isSignedIn && (
                <>
                  <div className="border-t border-cyan-500/10 my-2" />
                  {authNavLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                         ${isActive
                           ? 'text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20'
                           : 'text-text-secondary hover:text-white hover:bg-white/5'
                         }`
                      }
                    >
                      {link.icon && <link.icon size={16} />}
                      {link.label}
                    </NavLink>
                  ))}
                </>
              )}

              <div className="border-t border-cyan-500/10 my-2 pt-2">
                {isSignedIn ? (
                  <div className="flex items-center gap-3 px-4 py-2">
                    {hasClerk && <UserButton afterSignOutUrl="/" />}
                    <span className="text-sm text-white">{user?.fullName || user?.firstName || 'User'}</span>
                  </div>
                ) : hasClerk ? (
                  <div className="flex flex-col gap-2">
                    <SignInButton mode="modal">
                      <Button variant="ghost" fullWidth onClick={() => setIsOpen(false)}>
                        Masuk
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button variant="primary" fullWidth onClick={() => setIsOpen(false)}>
                        Daftar Sekarang
                      </Button>
                    </SignUpButton>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button variant="ghost" fullWidth onClick={() => { navigate('/dashboard'); setIsOpen(false) }}>
                      Masuk
                    </Button>
                    <Button variant="primary" fullWidth onClick={() => { navigate('/dashboard'); setIsOpen(false) }}>
                      Daftar Sekarang
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
