import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Clock, Home, History, RefreshCw, MessageCircle } from 'lucide-react'
import { useTransaction } from '../context/TransactionContext.jsx'
import { formatCurrency } from '../utils/formatCurrency.js'
import { formatOrderDate } from '../utils/generateOrderId.js'
import Button from '../components/ui/Button.jsx'

// Confetti particle
const Confetti = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ['#00D4FF', '#00FF87', '#FFB800', '#0066FF', '#FF3B5C'][Math.floor(Math.random() * 5)],
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    size: 6 + Math.random() * 8,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.x}%`,
            top: '-20px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          animate={{
            y: ['0vh', '110vh'],
            rotate: [0, 720],
            opacity: [1, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  )
}

const PaymentStatusPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { getTransactionById } = useTransaction()
  const [pendingCount, setPendingCount] = useState(0)

  const state = location.state
  if (!state?.orderId) {
    navigate('/')
    return null
  }

  const { orderId, status } = state
  const transaction = getTransactionById(orderId)

  // Auto-refresh simulation for pending
  useEffect(() => {
    if (status !== 'pending') return
    if (pendingCount >= 3) return

    const timer = setTimeout(() => {
      setPendingCount((c) => c + 1)
    }, 5000)
    return () => clearTimeout(timer)
  }, [status, pendingCount])

  // Success view
  if (status === 'sukses') {
    return (
      <>
        <Confetti />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-bg-primary pt-20 pb-16 flex items-center"
        >
          <div className="max-w-lg mx-auto px-4 w-full">
            <div className="bg-bg-card border border-success/20 rounded-3xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-success/3 rounded-3xl" />

              {/* Checkmark animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-success/20 border-2 border-success/40 flex items-center justify-center mx-auto mb-6 relative z-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <CheckCircle size={48} className="text-success" />
                </motion.div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="relative z-10">
                <h1 className="font-orbitron font-bold text-2xl text-success mb-2">Pembayaran Berhasil!</h1>
                <p className="text-text-secondary text-sm mb-6">Item sedang diproses dan akan segera masuk ke akunmu</p>

                {transaction && (
                  <div className="bg-bg-surface rounded-2xl p-5 mb-6 text-left space-y-3">
                    <h3 className="font-semibold text-white text-sm mb-3">Detail Transaksi</h3>
                    {[
                      { label: 'Order ID', value: transaction.orderId, mono: true },
                      { label: 'Game', value: transaction.game },
                      { label: 'Nominal', value: transaction.item },
                      { label: 'Total', value: formatCurrency(transaction.total), accent: true },
                      { label: 'Metode', value: transaction.paymentMethod?.toUpperCase() },
                      { label: 'Waktu', value: formatOrderDate(transaction.createdAt) },
                    ].map(({ label, value, mono, accent }) => (
                      <div key={label} className="flex justify-between text-sm">
                        <span className="text-text-secondary">{label}</span>
                        <span className={`${mono ? 'font-mono text-xs' : ''} ${accent ? 'text-accent-cyan font-bold' : 'text-white'} text-right max-w-[200px]`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <Link to="/"><Button variant="primary" fullWidth icon={<Home size={16} />}>Kembali ke Beranda</Button></Link>
                  <Link to="/transactions"><Button variant="secondary" fullWidth icon={<History size={16} />}>Lihat Riwayat</Button></Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </>
    )
  }

  // Pending view
  if (status === 'pending') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-bg-primary pt-20 pb-16 flex items-center">
        <div className="max-w-lg mx-auto px-4 w-full">
          <div className="bg-bg-card border border-warning/20 rounded-3xl p-8 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-24 h-24 rounded-full bg-warning/10 border-2 border-warning/30 flex items-center justify-center mx-auto mb-6"
            >
              <Clock size={40} className="text-warning" />
            </motion.div>

            <h1 className="font-orbitron font-bold text-2xl text-warning mb-2">Menunggu Konfirmasi</h1>
            <p className="text-text-secondary text-sm mb-4">
              Pembayaran sedang diverifikasi. Proses ini biasanya memakan waktu 1-5 menit.
            </p>

            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-warning animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-warning animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-warning animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>

            <div className="bg-bg-surface rounded-xl p-4 mb-6 text-sm">
              <p className="text-text-secondary">Order ID</p>
              <p className="font-mono text-accent-cyan font-bold">{orderId}</p>
              {pendingCount > 0 && (
                <p className="text-text-secondary text-xs mt-2">Mengecek ulang... ({pendingCount}/3)</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Link to="/transactions"><Button variant="secondary" fullWidth icon={<History size={16} />}>Cek Riwayat Transaksi</Button></Link>
              <Link to="/"><Button variant="ghost" fullWidth icon={<Home size={16} />}>Kembali ke Beranda</Button></Link>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Failed view
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-bg-primary pt-20 pb-16 flex items-center">
      <div className="max-w-lg mx-auto px-4 w-full">
        <div className="bg-bg-card border border-danger/20 rounded-3xl p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200 }}
            className="w-24 h-24 rounded-full bg-danger/10 border-2 border-danger/30 flex items-center justify-center mx-auto mb-6"
          >
            <XCircle size={48} className="text-danger" />
          </motion.div>

          <h1 className="font-orbitron font-bold text-2xl text-danger mb-2">Pembayaran Gagal</h1>
          <p className="text-text-secondary text-sm mb-2">
            {state.reason || 'Terjadi kesalahan saat memproses pembayaran.'}
          </p>
          <p className="text-text-secondary text-xs mb-6">Jangan khawatir, tidak ada dana yang terpotong.</p>

          <div className="bg-bg-surface rounded-xl p-4 mb-6">
            <p className="text-text-secondary text-sm">Order ID</p>
            <p className="font-mono text-white font-bold text-sm">{orderId}</p>
          </div>

          <div className="flex flex-col gap-3">
            <Button variant="primary" fullWidth onClick={() => navigate(-3)} icon={<RefreshCw size={16} />}>
              Coba Lagi
            </Button>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" fullWidth icon={<MessageCircle size={16} />}>Hubungi CS</Button>
            </a>
            <Link to="/"><Button variant="ghost" fullWidth icon={<Home size={16} />}>Kembali ke Beranda</Button></Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PaymentStatusPage
