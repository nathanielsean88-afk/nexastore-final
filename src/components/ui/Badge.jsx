import React from 'react'

const variants = {
  hot: 'bg-danger/15 text-danger border-danger/30',
  new: 'bg-success/15 text-success border-success/30',
  cyan: 'bg-accent-cyan/15 text-accent-cyan border-accent-cyan/30',
  warning: 'bg-warning/15 text-warning border-warning/30',
  success: 'bg-success/15 text-success border-success/30',
  danger: 'bg-danger/15 text-danger border-danger/30',
  muted: 'bg-text-muted/20 text-text-secondary border-text-muted/30',
  purple: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
}

const sizes = {
  xs: 'px-1.5 py-0.5 text-xs',
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs',
  lg: 'px-3 py-1 text-sm',
}

const Badge = ({
  children,
  variant = 'cyan',
  size = 'sm',
  className = '',
  dot = false,
  pulse = false,
}) => {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-semibold rounded-md border
        font-sora tracking-wide uppercase
        ${variants[variant] || variants.cyan}
        ${sizes[size] || sizes.sm}
        ${className}
      `}
    >
      {dot && (
        <span
          className={`
            w-1.5 h-1.5 rounded-full flex-shrink-0
            ${pulse ? 'animate-pulse' : ''}
            ${variant === 'success' || variant === 'new' ? 'bg-success' : ''}
            ${variant === 'danger' || variant === 'hot' ? 'bg-danger' : ''}
            ${variant === 'warning' ? 'bg-warning' : ''}
            ${variant === 'cyan' ? 'bg-accent-cyan' : ''}
            ${variant === 'muted' ? 'bg-text-secondary' : ''}
          `}
        />
      )}
      {children}
    </span>
  )
}

export const StatusBadge = ({ status }) => {
  const configs = {
    sukses: { variant: 'success', label: 'Sukses', dot: true, pulse: false },
    pending: { variant: 'warning', label: 'Pending', dot: true, pulse: true },
    gagal: { variant: 'danger', label: 'Gagal', dot: true, pulse: false },
  }

  const config = configs[status] || configs.pending

  return (
    <Badge variant={config.variant} dot={config.dot} pulse={config.pulse}>
      {config.label}
    </Badge>
  )
}

export default Badge
