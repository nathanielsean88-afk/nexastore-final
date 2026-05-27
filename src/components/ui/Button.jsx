import React from 'react'
import { motion } from 'framer-motion'

const variants = {
  primary: `
    bg-accent-cyan text-black font-semibold
    hover:bg-cyan-300 hover:shadow-cyan-lg
    active:scale-95
    shadow-cyan
  `,
  secondary: `
    bg-transparent text-accent-cyan font-semibold
    border border-accent-cyan/50
    hover:bg-accent-cyan/10 hover:border-accent-cyan hover:shadow-cyan-sm
    active:scale-95
  `,
  ghost: `
    bg-transparent text-text-secondary font-medium
    hover:text-white hover:bg-white/5
    active:scale-95
  `,
  danger: `
    bg-danger/20 text-danger font-semibold
    border border-danger/30
    hover:bg-danger/30 hover:border-danger/60
    active:scale-95
  `,
  success: `
    bg-success/20 text-success font-semibold
    border border-success/30
    hover:bg-success/30 hover:border-success/60
    active:scale-95
  `,
  glass: `
    bg-white/5 text-white font-medium
    border border-white/10 backdrop-blur-sm
    hover:bg-white/10 hover:border-white/20
    active:scale-95
  `,
}

const sizes = {
  xs: 'px-3 py-1.5 text-xs rounded-lg',
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-xl',
  xl: 'px-10 py-5 text-lg rounded-2xl',
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  fullWidth = false,
  icon,
  iconRight,
  ...props
}) => {
  const baseClass = `
    inline-flex items-center justify-center gap-2
    font-sora transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-accent-cyan/50
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    ${fullWidth ? 'w-full' : ''}
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.md}
    ${className}
  `

  return (
    <motion.button
      type={type}
      className={baseClass}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
          {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
        </>
      )}
    </motion.button>
  )
}

export default Button
