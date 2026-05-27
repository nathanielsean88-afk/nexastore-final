import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useUser } from '@clerk/clerk-react'
import { ShoppingBag, TrendingUp, Gamepad2, ArrowRight, Zap } from 'lucide-react'
import { useTransaction } from '../context/TransactionContext.jsx'
import { games, gameEmojis, gameGradients } from '../data/gameData.js'
import { bannerPromos } from '../data/promoData.js'
import { formatCurrency } from '../utils/formatCurrency.js'
import { formatOrderDate } from '../utils/generateOrderId.js'
import { getMemberLevel } from '../utils/constants.js'
import { StatusBadge } from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'

const favoriteGames = games.slice(0, 4)

const DashboardPage = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const { transactions } = useTransaction()

  const hasClerk = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
  const userName = hasClerk ? (user?.firstName || user?.fullName || 'Gamer') : 'Gamer'
  const userAvatar = hasClerk ? user?.imageUrl : null

  const totalSpend = transactions.filter((t) => t.status === 'sukses').reduce((sum, t) => sum + (t.total || 0), 0)
  const thisMonth = transactions.filter((t) => {
    const d = new Date(t.createdAt)
    const now = new Date()
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() && t.status === 'sukses'
  })
  const memberLevel = getMemberLevel(totalSpend)
  const nextLevel = getMemberLevel(totalSpend + 1)
  const recentTransactions = transactions.slice(0, 5)

  const promo = bannerPromos[0]

  const stats = [
    { icon: ShoppingBag, label: 'Total Transaksi', value: transactions.length, color: 'text-accent-cyan', bg: 'bg-accent-cyan/10', border: 'border-accent-cyan/20' },
    { icon: TrendingUp, label: 'Bulan Ini', value: thisMonth.length, color: 'text-success', bg: 'bg-success/10', border: 'border-success/20' },
    { icon: Gamepad2, label: 'Total Spend', value: formatCurrency(totalSpend), color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20' },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-bg-primary pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">

        {/* Greeting */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-accent-cyan/20 border border-accent-cyan/30 flex items-center justify-center flex-shrink-0">
            {userAvatar
              ? <img src={userAvatar} alt="avatar" className="w-full h-full object-cover" />
              : <span className="text-2xl">👾</span>
            }
          </div>
          <div>
            <p className="text-text-secondary text-sm">Selamat datang kembali,</p>
            <h1 className="font-orbitron font-bold text-xl text-white">{userName}! 👋</h1>
          </div>
        </div>

        {/* Member Level */}
        <div className="bg-bg-card border border-cyan-500/10 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{memberLevel.icon}</span>
              <div>
                <p className="text-white font-semibold text-sm">{memberLevel.level} Member</p>
                <p className="text-text-secondary text-xs">Total spend: {formatCurrency(totalSpend)}</p>
              </div>
            </div>
            <span className="text-xs text-text-secondary">Next: {nextLevel?.level || 'MAX'}</span>
          </div>
          <div className="w-full bg-bg-surface rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-blue transition-all duration-700"
              style={{
                width: `${Math.min(100, ((totalSpend - memberLevel.minSpend) / ((memberLevel.maxSpend === Infinity ? totalSpend + 100000 : memberLevel.maxSpend) - memberLevel.minSpend)) * 100)}%`
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${s.bg} border ${s.border} rounded-2xl p-5`}
            >
              <div className={`w-10 h-10 rounded-xl ${s.bg} border ${s.border} flex items-center justify-center mb-3`}>
                <s.icon size={18} className={s.color} />
              </div>
              <p className={`font-orbitron font-bold text-xl ${s.color}`}>{s.value}</p>
              <p className="text-text-secondary text-xs mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <div className="bg-bg-card border border-cyan-500/10 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-cyan-500/10">
                <h2 className="font-orbitron font-semibold text-white text-sm">Transaksi Terakhir</h2>
                <Link to="/transactions" className="text-accent-cyan text-xs hover:underline flex items-center gap-1">
                  Lihat semua <ArrowRight size={12} />
                </Link>
              </div>
              {recentTransactions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-3">📋</div>
                  <p className="text-text-secondary text-sm">Belum ada transaksi</p>
                  <Link to="/catalog">
                    <Button variant="secondary" size="sm" className="mt-4">Top Up Sekarang</Button>
                  </Link>
                </div>
              ) : (
                <div>
                  {recentTransactions.map((t, i) => (
                    <div key={t.orderId} className="flex items-center gap-4 px-5 py-4 border-b border-cyan-500/10 last:border-0 hover:bg-white/2 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-xl flex-shrink-0">
                        {gameEmojis[t.gameId] || '🎮'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{t.game}</p>
                        <p className="text-text-secondary text-xs">{t.item}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-white text-sm font-semibold">{formatCurrency(t.total)}</p>
                        <StatusBadge status={t.status} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="space-y-4">
            {/* Promo Banner */}
            <div className={`bg-gradient-to-br ${promo.color} border border-cyan-500/10 rounded-2xl p-5 relative overflow-hidden`}>
              <div className="absolute inset-0 cyber-grid opacity-20" />
              <div className="relative z-10">
                <span className="text-3xl">{promo.emoji}</span>
                <h3 className="font-orbitron font-bold text-white text-base mt-2">{promo.title}</h3>
                <p className="text-white/70 text-xs mt-1 mb-3">{promo.description}</p>
                <div className="font-mono text-sm font-bold text-white bg-black/30 border border-white/20 px-3 py-1.5 rounded-lg inline-block tracking-widest">
                  {promo.code}
                </div>
              </div>
            </div>

            {/* Favorite Games */}
            <div className="bg-bg-card border border-cyan-500/10 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-cyan-500/10">
                <h2 className="font-orbitron font-semibold text-white text-sm">Game Favorit</h2>
              </div>
              <div className="p-3 grid grid-cols-2 gap-2">
                {favoriteGames.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => navigate(`/game/${game.id}`)}
                    className="flex items-center gap-2 p-3 rounded-xl bg-bg-surface border border-cyan-500/10 hover:border-accent-cyan/30 hover:bg-accent-cyan/5 transition-all text-left"
                  >
                    <span className="text-xl">{gameEmojis[game.id]}</span>
                    <span className="text-white text-xs font-medium truncate">{game.name.split(':')[0].trim()}</span>
                  </button>
                ))}
              </div>
            </div>

            <Link to="/catalog">
              <Button variant="primary" fullWidth icon={<Zap size={16} />}>Top Up Sekarang</Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default DashboardPage
