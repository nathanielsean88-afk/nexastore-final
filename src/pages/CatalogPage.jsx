import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { games, gameEmojis, gameGradients, categories } from '../data/gameData.js'
import Badge from '../components/ui/Badge.jsx'
import Input from '../components/ui/Input.jsx'
import { GameCardSkeleton } from '../components/ui/Skeleton.jsx'

const sortOptions = ['Terpopuler', 'Terbaru', 'A-Z', 'Harga Terendah']

const CatalogPage = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [category, setCategory] = useState('Semua')
  const [sort, setSort] = useState('Terpopuler')
  const [loading, setLoading] = useState(true)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  // Simulate loading
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [category, sort])

  const filtered = useMemo(() => {
    let result = [...games]

    // Search filter
    if (debouncedSearch) {
      result = result.filter(
        (g) =>
          g.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          g.category.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    }

    // Category filter
    if (category !== 'Semua') {
      result = result.filter((g) => g.category === category)
    }

    // Sort
    switch (sort) {
      case 'A-Z':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'Harga Terendah':
        result.sort((a, b) => a.minPrice - b.minPrice)
        break
      case 'Terbaru':
        result.sort((a, b) => (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0))
        break
      default:
        result.sort((a, b) => (b.badge === 'HOT' ? 1 : 0) - (a.badge === 'HOT' ? 1 : 0))
    }

    return result
  }, [debouncedSearch, category, sort])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-bg-primary pt-24 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-accent-cyan text-sm font-medium tracking-widest uppercase mb-2">— Semua Game</p>
          <h1 className="font-orbitron font-bold text-3xl sm:text-4xl text-white mb-2">
            Katalog <span className="gradient-text">Game</span>
          </h1>
          <p className="text-text-secondary text-sm">
            {filtered.length} game tersedia untuk di-top up
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Cari nama game..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search size={16} />}
              iconRight={search ? <X size={16} /> : null}
              onIconRightClick={() => setSearch('')}
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-bg-surface border border-cyan-500/15 text-white text-sm rounded-xl px-4 py-3 font-sora focus:outline-none focus:border-accent-cyan/60 focus:ring-2 focus:ring-accent-cyan/15 hover:border-cyan-500/30 transition-all"
          >
            {sortOptions.map((s) => (
              <option key={s} value={s} className="bg-bg-surface">{s}</option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                category === cat
                  ? 'bg-accent-cyan/20 border border-accent-cyan/50 text-accent-cyan shadow-cyan-sm'
                  : 'bg-bg-surface border border-cyan-500/10 text-text-secondary hover:border-accent-cyan/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Game Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <GameCardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-orbitron text-white text-xl mb-2">Game Tidak Ditemukan</h3>
            <p className="text-text-secondary text-sm mb-6">
              Tidak ada game yang cocok dengan pencarian "{debouncedSearch}"
            </p>
            <button
              onClick={() => { setSearch(''); setCategory('Semua') }}
              className="px-6 py-3 rounded-xl bg-accent-cyan/20 border border-accent-cyan/30 text-accent-cyan text-sm hover:bg-accent-cyan/30 transition-all"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((game, i) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group relative rounded-2xl overflow-hidden bg-bg-card border border-cyan-500/10 hover:border-accent-cyan/40 hover:shadow-cyan transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/game/${game.id}`)}
                whileHover={{ y: -4 }}
              >
                <div
                  className={`h-32 bg-gradient-to-br ${gameGradients[game.id] || 'from-bg-surface to-bg-card'} relative flex items-center justify-center overflow-hidden`}
                >
                  <div className="absolute inset-0 cyber-grid opacity-20" />
                  <div className="absolute inset-0 bg-accent-cyan/0 group-hover:bg-accent-cyan/5 transition-all" />
                  <span className="text-5xl relative z-10 group-hover:scale-110 transition-transform drop-shadow-lg">
                    {gameEmojis[game.id] || '🎮'}
                  </span>
                  {game.badge && (
                    <div className="absolute top-2 right-2">
                      <Badge variant={game.badge === 'HOT' ? 'hot' : 'new'} size="xs">{game.badge}</Badge>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white text-sm leading-tight mb-1 group-hover:text-accent-cyan transition-colors truncate">
                    {game.name}
                  </h3>
                  <p className="text-text-secondary text-xs mb-3 capitalize">{game.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">Mulai</span>
                    <span className="text-accent-cyan text-xs font-bold">Rp{game.minPrice.toLocaleString('id-ID')}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default CatalogPage
