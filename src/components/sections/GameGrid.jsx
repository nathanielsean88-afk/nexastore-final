import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { games, gameEmojis, gameGradients } from '../../data/gameData.js'
import Button from '../ui/Button.jsx'
import Badge from '../ui/Badge.jsx'

const GameCard = ({ game, index }) => {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative rounded-2xl overflow-hidden bg-bg-card border border-cyan-500/10 hover:border-accent-cyan/40 hover:shadow-cyan transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/game/${game.id}`)}
      whileHover={{ y: -4 }}
    >
      {/* Banner area */}
      <div
        className={`h-32 bg-gradient-to-br ${gameGradients[game.id] || 'from-bg-surface to-bg-card'} relative flex items-center justify-center overflow-hidden`}
      >
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="absolute inset-0 bg-accent-cyan/0 group-hover:bg-accent-cyan/5 transition-all duration-300" />

        {/* Glow circle behind emoji */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-accent-cyan/5 blur-xl group-hover:bg-accent-cyan/15 transition-all duration-300" />
        </div>

        <span className="text-5xl relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
          {gameEmojis[game.id] || '🎮'}
        </span>

        {game.badge && (
          <div className="absolute top-2 right-2">
            <Badge variant={game.badge === 'HOT' ? 'hot' : 'new'} size="xs">
              {game.badge}
            </Badge>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-white text-sm leading-tight mb-1 group-hover:text-accent-cyan transition-colors">
          {game.name}
        </h3>
        <p className="text-text-secondary text-xs mb-3 capitalize">{game.category}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-secondary">Mulai dari</span>
          <span className="text-accent-cyan text-xs font-bold">
            Rp{game.minPrice.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      {/* Hover bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  )
}

const GameGrid = () => {
  const navigate = useNavigate()
  const displayGames = games.slice(0, 8)

  return (
    <section className="py-20 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-accent-cyan text-sm font-medium tracking-widest uppercase mb-2">
              — Game Tersedia
            </p>
            <h2 className="font-orbitron font-bold text-3xl sm:text-4xl text-white">
              Game <span className="gradient-text">Populer</span>
            </h2>
            <p className="text-text-secondary text-sm mt-2 max-w-md">
              Pilih game favoritmu dan top up dengan harga terbaik, proses cepat dan aman
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            iconRight={<ArrowRight size={15} />}
            onClick={() => navigate('/catalog')}
            className="flex-shrink-0"
          >
            Lihat Semua
          </Button>
        </motion.div>

        {/* Game Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayGames.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default GameGrid
