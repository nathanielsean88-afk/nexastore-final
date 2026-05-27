import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, Loader2, ShieldCheck, Zap } from 'lucide-react'
import { getGameById, gameEmojis, gameGradients } from '../data/gameData.js'
import { useCart } from '../context/CartContext.jsx'
import { formatCurrency } from '../utils/formatCurrency.js'
import Button from '../components/ui/Button.jsx'
import Input from '../components/ui/Input.jsx'
import Badge from '../components/ui/Badge.jsx'
import toast from 'react-hot-toast'

const GameDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setCart } = useCart()
  const game = getGameById(id)

  const [selectedItem, setSelectedItem] = useState(null)
  const [formData, setFormData] = useState({})
  const [verifying, setVerifying] = useState(false)
  const [verifiedName, setVerifiedName] = useState('')
  const [errors, setErrors] = useState({})

  if (!game) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="text-6xl mb-4">🎮</div>
          <h2 className="font-orbitron text-white text-xl mb-2">Game tidak ditemukan</h2>
          <Button variant="secondary" onClick={() => navigate('/catalog')}>Kembali ke Katalog</Button>
        </div>
      </div>
    )
  }

  const handleVerify = async () => {
    const newErrors = {}
    game.inputFields.forEach((field) => {
      if (!formData[field]?.trim()) newErrors[field] = `${field} wajib diisi`
    })
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }

    setVerifying(true)
    setVerifiedName('')
    await new Promise((r) => setTimeout(r, 1500))
    const mockNames = ['GamerPro', 'NightWolf', 'StarPlayer', 'DragonSlayer', 'CyberHero']
    setVerifiedName(mockNames[Math.floor(Math.random() * mockNames.length)])
    setVerifying(false)
    toast.success('ID berhasil diverifikasi!')
  }

  const handleCheckout = () => {
    if (!selectedItem) { toast.error('Pilih nominal terlebih dahulu'); return }
    const newErrors = {}
    game.inputFields.forEach((field) => {
      if (!formData[field]?.trim()) newErrors[field] = `${field} wajib diisi`
    })
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); toast.error('Lengkapi data akun'); return }
    if (!verifiedName) { toast.error('Verifikasi ID terlebih dahulu'); return }

    setCart({
      game,
      item: selectedItem,
      accountData: formData,
      accountName: verifiedName,
    })
    navigate('/checkout')
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-bg-primary pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <button onClick={() => navigate('/catalog')} className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-6 mt-4">
          <ArrowLeft size={16} /> Kembali ke Katalog
        </button>

        {/* Banner */}
        <div className={`relative h-48 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-br ${gameGradients[game.id] || 'from-bg-surface to-bg-card'} mb-8 flex items-center justify-center`}>
          <div className="absolute inset-0 cyber-grid opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 to-transparent" />
          <div className="relative z-10 text-center">
            <div className="text-7xl mb-3">{gameEmojis[game.id] || '🎮'}</div>
            <div className="flex items-center justify-center gap-2">
              <h1 className="font-orbitron font-bold text-2xl sm:text-3xl text-white">{game.name}</h1>
              {game.badge && <Badge variant={game.badge === 'HOT' ? 'hot' : 'new'}>{game.badge}</Badge>}
            </div>
            <p className="text-text-secondary text-sm mt-1">{game.category}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Nominals + Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-bg-card border border-cyan-500/10 rounded-2xl p-5">
              <h2 className="font-orbitron font-semibold text-white text-base mb-2">Tentang Game</h2>
              <p className="text-text-secondary text-sm leading-relaxed">{game.description}</p>
            </div>

            {/* Nominals */}
            <div className="bg-bg-card border border-cyan-500/10 rounded-2xl p-5">
              <h2 className="font-orbitron font-semibold text-white text-base mb-4">Pilih Nominal</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {game.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`relative p-4 rounded-xl border text-left transition-all duration-200 ${
                      selectedItem?.id === item.id
                        ? 'border-accent-cyan/60 bg-accent-cyan/10 shadow-cyan-sm'
                        : 'border-cyan-500/10 bg-bg-surface hover:border-accent-cyan/30'
                    }`}
                  >
                    {item.popular && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-warning/20 border border-warning/40 text-warning text-xs font-bold">
                        POPULER
                      </span>
                    )}
                    <div className={`font-semibold text-sm mb-1 ${selectedItem?.id === item.id ? 'text-accent-cyan' : 'text-white'}`}>
                      {item.label}
                    </div>
                    <div className="text-text-secondary text-xs">{formatCurrency(item.price)}</div>
                    {selectedItem?.id === item.id && (
                      <CheckCircle size={14} className="absolute top-2 right-2 text-accent-cyan" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Account Form */}
            <div className="bg-bg-card border border-cyan-500/10 rounded-2xl p-5">
              <h2 className="font-orbitron font-semibold text-white text-base mb-4">Data Akun</h2>
              <div className="space-y-4">
                {game.inputFields.map((field) => (
                  <Input
                    key={field}
                    label={field}
                    placeholder={`Masukkan ${field}`}
                    value={formData[field] || ''}
                    onChange={(e) => {
                      setFormData((p) => ({ ...p, [field]: e.target.value }))
                      setErrors((p) => ({ ...p, [field]: '' }))
                      setVerifiedName('')
                    }}
                    error={errors[field]}
                  />
                ))}
              </div>

              <Button
                variant="secondary"
                size="sm"
                className="mt-4"
                onClick={handleVerify}
                loading={verifying}
                icon={<ShieldCheck size={15} />}
              >
                Verifikasi ID
              </Button>

              {verifiedName && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-center gap-2 px-4 py-3 rounded-xl bg-success/10 border border-success/30"
                >
                  <CheckCircle size={16} className="text-success" />
                  <span className="text-success text-sm font-medium">Nama Akun: <strong>{verifiedName}</strong></span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-bg-card border border-cyan-500/10 rounded-2xl p-5 sticky top-24">
              <h2 className="font-orbitron font-semibold text-white text-base mb-4">Ringkasan Order</h2>
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Game</span>
                  <span className="text-white text-right text-xs ml-2 max-w-[140px] truncate">{game.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Nominal</span>
                  <span className={selectedItem ? 'text-accent-cyan font-medium' : 'text-text-muted'}>
                    {selectedItem ? selectedItem.label : 'Belum dipilih'}
                  </span>
                </div>
                {game.inputFields.map((field) => (
                  <div key={field} className="flex justify-between text-sm">
                    <span className="text-text-secondary">{field}</span>
                    <span className="text-white text-xs max-w-[140px] truncate">{formData[field] || '-'}</span>
                  </div>
                ))}
                {verifiedName && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Nama Akun</span>
                    <span className="text-success text-xs font-medium">{verifiedName}</span>
                  </div>
                )}
                <div className="border-t border-cyan-500/10 pt-3">
                  <div className="flex justify-between">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-accent-cyan font-bold text-lg">
                      {selectedItem ? formatCurrency(selectedItem.price) : 'Rp0'}
                    </span>
                  </div>
                </div>
              </div>

              <Button variant="primary" fullWidth size="md" onClick={handleCheckout} icon={<Zap size={16} />}>
                Lanjut ke Checkout
              </Button>

              <div className="flex items-center justify-center gap-2 mt-3 text-xs text-text-secondary">
                <ShieldCheck size={13} className="text-success" />
                Transaksi aman & terenkripsi
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default GameDetailPage
