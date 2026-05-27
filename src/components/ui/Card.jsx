import React from 'react'
import { motion } from 'framer-motion'

const Card = ({
  children,
  className = '',
  hover = true,
  glow = false,
  glass = false,
  onClick,
  padding = true,
  ...props
}) => {
  const baseClass = `
    rounded-2xl border transition-all duration-300
    ${glass
      ? 'bg-bg-card/70 backdrop-blur-md border-white/10'
      : 'bg-bg-card border-cyan-500/10'
    }
    ${padding ? 'p-5' : ''}
    ${hover ? 'hover:border-accent-cyan/30 hover:shadow-cyan-sm hover:-translate-y-0.5' : ''}
    ${glow ? 'border-accent-cyan/30 shadow-cyan-sm' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `

  return (
    <motion.div
      className={baseClass}
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const GameCard = ({ game, onClick, className = '' }) => {
  const { gameEmojis, gameGradients } = require('../../data/gameData.js')

  return (
    <motion.div
      className={`
        relative rounded-2xl overflow-hidden cursor-pointer
        bg-bg-card border border-cyan-500/10
        transition-all duration-300
        hover:border-accent-cyan/40 hover:shadow-cyan
        group ${className}
      `}
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Game banner area */}
      <div
        className={`h-28 bg-gradient-to-br ${
          gameGradients[game.id] || 'from-bg-surface to-bg-card'
        } flex items-center justify-center relative overflow-hidden`}
      >
        {/* Grid pattern */}
        <div className="absolute inset-0 cyber-grid opacity-30" />
        {/* Glow overlay on hover */}
        <div className="absolute inset-0 bg-accent-cyan/0 group-hover:bg-accent-cyan/5 transition-all duration-300" />
        {/* Game emoji */}
        <span className="text-5xl relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
          {gameEmojis[game.id] || '🎮'}
        </span>
        {/* Badge */}
        {game.badge && (
          <span
            className={`
              absolute top-2 right-2 px-2 py-0.5 text-xs font-bold rounded-md
              ${game.badge === 'HOT' ? 'bg-danger/20 text-danger border border-danger/30' : ''}
              ${game.badge === 'NEW' ? 'bg-success/20 text-success border border-success/30' : ''}
            `}
          >
            {game.badge}
          </span>
        )}
      </div>

      {/* Game info */}
      <div className="p-4">
        <h3 className="font-semibold text-white text-sm leading-tight mb-1 truncate">
          {game.name}
        </h3>
        <p className="text-text-secondary text-xs mb-3 capitalize">{game.category}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-secondary">Mulai dari</span>
          <span className="text-accent-cyan text-xs font-semibold">
            Rp{game.minPrice.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  )
}

export default Card
