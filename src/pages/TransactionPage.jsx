import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTransaction } from '../context/TransactionContext.jsx'
import { formatCurrency } from '../utils/formatCurrency.js'
import { formatOrderDate } from '../utils/generateOrderId.js'
import { gameEmojis } from '../data/gameData.js'
import { StatusBadge } from '../components/ui/Badge.jsx'
import Modal from '../components/ui/Modal.jsx'
import Button from '../components/ui/Button.jsx'
import { Link } from 'react-router-dom'

const ITEMS_PER_PAGE = 10
const FILTERS = ['Semua', 'Sukses', 'Pending', 'Gagal']

const TransactionPage = () => {
  const { transactions } = useTransaction()
  const [filter, setFilter] = useState('Semua')
  const [page, setPage] = useState(1)
  const [selectedTx, setSelectedTx] = useState(null)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const filtered = useMemo(() => {
    let result = [...transactions]
    if (filter !== 'Semua') result = result.filter((t) => t.status === filter.toLowerCase())
    if (dateFrom) result = result.filter((t) => new Date(t.createdAt) >= new Date(dateFrom))
    if (dateTo) result = result.filter((t) => new Date(t.createdAt) <= new Date(dateTo + 'T23:59:59'))
    return result
  }, [transactions, filter, dateFrom, dateTo])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-bg-primary pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="mb-8">
          <p className="text-accent-cyan text-sm font-medium tracking-widest uppercase mb-1">— Akun</p>
          <h1 className="font-orbitron font-bold text-2xl text-white">Riwayat Transaksi</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setPage(1) }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-accent-cyan/20 border border-accent-cyan/50 text-accent-cyan'
                    : 'bg-bg-surface border border-cyan-500/10 text-text-secondary hover:border-accent-cyan/30 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex gap-2 ml-auto">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => { setDateFrom(e.target.value); setPage(1) }}
              className="bg-bg-surface border border-cyan-500/15 text-text-secondary text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-accent-cyan/60 font-sora"
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => { setDateTo(e.target.value); setPage(1) }}
              className="bg-bg-surface border border-cyan-500/15 text-text-secondary text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-accent-cyan/60 font-sora"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-bg-card border border-cyan-500/10 rounded-2xl overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cyan-500/10">
                  {['No. Order', 'Game', 'Nominal', 'Total', 'Metode', 'Status', 'Tanggal'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16">
                      <div className="text-4xl mb-3">📋</div>
                      <p className="text-text-secondary text-sm">Belum ada transaksi</p>
                      <Link to="/catalog">
                        <Button variant="secondary" size="sm" className="mt-4">Mulai Top Up</Button>
                      </Link>
                    </td>
                  </tr>
                ) : paginated.map((t) => (
                  <tr
                    key={t.orderId}
                    onClick={() => setSelectedTx(t)}
                    className="border-b border-cyan-500/10 last:border-0 hover:bg-white/2 cursor-pointer transition-colors"
                  >
                    <td className="px-5 py-4">
                      <span className="font-mono text-accent-cyan text-xs">{t.orderId}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{gameEmojis[t.gameId] || '🎮'}</span>
                        <span className="text-white text-sm truncate max-w-[120px]">{t.game}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-text-secondary text-sm">{t.item}</td>
                    <td className="px-5 py-4 text-white text-sm font-semibold">{formatCurrency(t.total)}</td>
                    <td className="px-5 py-4 text-text-secondary text-sm uppercase">{t.paymentMethod}</td>
                    <td className="px-5 py-4"><StatusBadge status={t.status} /></td>
                    <td className="px-5 py-4 text-text-secondary text-xs">{formatOrderDate(t.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile list */}
          <div className="sm:hidden">
            {paginated.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">📋</div>
                <p className="text-text-secondary text-sm">Belum ada transaksi</p>
              </div>
            ) : paginated.map((t) => (
              <div
                key={t.orderId}
                onClick={() => setSelectedTx(t)}
                className="flex items-center gap-3 px-4 py-4 border-b border-cyan-500/10 last:border-0 hover:bg-white/2 cursor-pointer"
              >
                <span className="text-2xl">{gameEmojis[t.gameId] || '🎮'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{t.game}</p>
                  <p className="text-text-secondary text-xs">{t.item} • {t.paymentMethod?.toUpperCase()}</p>
                  <p className="text-text-secondary text-xs mt-0.5">{formatOrderDate(t.createdAt)}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-white text-sm font-bold">{formatCurrency(t.total)}</p>
                  <StatusBadge status={t.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl bg-bg-surface border border-cyan-500/10 text-text-secondary text-sm hover:border-accent-cyan/30 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                  p === page
                    ? 'bg-accent-cyan/20 border border-accent-cyan/50 text-accent-cyan'
                    : 'bg-bg-surface border border-cyan-500/10 text-text-secondary hover:border-accent-cyan/30 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl bg-bg-surface border border-cyan-500/10 text-text-secondary text-sm hover:border-accent-cyan/30 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal isOpen={!!selectedTx} onClose={() => setSelectedTx(null)} title="Detail Transaksi" size="sm">
        {selectedTx && (
          <div className="space-y-3 text-sm">
            {[
              { label: 'Order ID', value: selectedTx.orderId, mono: true },
              { label: 'Game', value: selectedTx.game },
              { label: 'Nominal', value: selectedTx.item },
              { label: 'Harga Item', value: formatCurrency(selectedTx.itemPrice) },
              { label: 'Biaya Admin', value: formatCurrency(selectedTx.adminFee) },
              selectedTx.discount > 0 && { label: 'Diskon', value: `-${formatCurrency(selectedTx.discount)}` },
              { label: 'Total', value: formatCurrency(selectedTx.total), accent: true },
              { label: 'Metode', value: selectedTx.paymentMethod?.toUpperCase() },
              { label: 'Status', value: <StatusBadge status={selectedTx.status} /> },
              { label: 'Tanggal', value: formatOrderDate(selectedTx.createdAt) },
            ].filter(Boolean).map(({ label, value, mono, accent }) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-text-secondary">{label}</span>
                {typeof value === 'string'
                  ? <span className={`${mono ? 'font-mono text-xs' : ''} ${accent ? 'text-accent-cyan font-bold' : 'text-white'}`}>{value}</span>
                  : value
                }
              </div>
            ))}
          </div>
        )}
      </Modal>
    </motion.div>
  )
}

export default TransactionPage
