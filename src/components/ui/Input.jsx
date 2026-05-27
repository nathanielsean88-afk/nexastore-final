import React, { useState } from 'react'

const Input = React.forwardRef(({
  label,
  error,
  hint,
  className = '',
  containerClassName = '',
  icon,
  iconRight,
  onIconRightClick,
  size = 'md',
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false)

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-4 py-4 text-base',
  }

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label className="text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">
            {icon}
          </div>
        )}

        <input
          ref={ref}
          className={`
            w-full bg-bg-surface rounded-xl
            border transition-all duration-300
            text-white placeholder-text-muted
            font-sora
            focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
            ${sizes[size]}
            ${icon ? 'pl-10' : ''}
            ${iconRight ? 'pr-10' : ''}
            ${error
              ? 'border-danger/50 focus:border-danger focus:ring-2 focus:ring-danger/20'
              : focused
                ? 'border-accent-cyan/60 ring-2 ring-accent-cyan/15 shadow-cyan-sm'
                : 'border-cyan-500/15 hover:border-cyan-500/30'
            }
            ${className}
          `}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />

        {iconRight && (
          <button
            type="button"
            className={`
              absolute right-3.5 top-1/2 -translate-y-1/2
              text-text-secondary hover:text-white transition-colors
              ${onIconRightClick ? 'cursor-pointer' : 'pointer-events-none'}
            `}
            onClick={onIconRightClick}
          >
            {iconRight}
          </button>
        )}
      </div>

      {error && (
        <p className="text-danger text-xs flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-text-secondary text-xs">{hint}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export const Textarea = React.forwardRef(({
  label,
  error,
  hint,
  className = '',
  containerClassName = '',
  rows = 4,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false)

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label className="text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}

      <textarea
        ref={ref}
        rows={rows}
        className={`
          w-full bg-bg-surface rounded-xl px-4 py-3
          border transition-all duration-300
          text-white placeholder-text-muted
          font-sora text-sm resize-none
          focus:outline-none
          ${error
            ? 'border-danger/50 focus:border-danger'
            : focused
              ? 'border-accent-cyan/60 ring-2 ring-accent-cyan/15'
              : 'border-cyan-500/15 hover:border-cyan-500/30'
          }
          ${className}
        `}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />

      {error && (
        <p className="text-danger text-xs flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-text-secondary text-xs">{hint}</p>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export default Input
