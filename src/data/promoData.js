export const promoCodes = [
  {
    code: 'NEXANEW',
    discount: 10,
    type: 'percentage',
    description: 'Diskon 10% untuk pengguna baru',
    minPurchase: 20000,
    maxDiscount: 25000,
  },
  {
    code: 'HEMAT50K',
    discount: 50000,
    type: 'fixed',
    description: 'Potongan Rp50.000 untuk pembelian min. Rp200.000',
    minPurchase: 200000,
    maxDiscount: 50000,
  },
  {
    code: 'MLBB15',
    discount: 15,
    type: 'percentage',
    description: 'Diskon 15% top up Mobile Legends',
    minPurchase: 50000,
    maxDiscount: 30000,
  },
  {
    code: 'FRIDAY20',
    discount: 20,
    type: 'percentage',
    description: 'Diskon 20% setiap hari Jumat',
    minPurchase: 100000,
    maxDiscount: 50000,
  },
]

export const bannerPromos = [
  {
    id: 1,
    title: 'Bonus 20% Diamond',
    subtitle: 'Mobile Legends',
    description: 'Top up minimal 500 Diamond, bonus langsung masuk!',
    badge: 'LIMITED',
    color: 'from-blue-600/30 to-cyan-600/30',
    accentColor: '#00D4FF',
    emoji: '⚔️',
    validUntil: '31 Juli 2024',
    code: 'MLBB15',
  },
  {
    id: 2,
    title: 'Cashback 15% OVO',
    subtitle: 'Semua Game',
    description: 'Bayar via OVO, cashback masuk ke dompetmu!',
    badge: 'HOT',
    color: 'from-purple-600/30 to-violet-600/30',
    accentColor: '#AB47BC',
    emoji: '💎',
    validUntil: '15 Agustus 2024',
    code: 'FRIDAY20',
  },
  {
    id: 3,
    title: 'Diskon Rp50.000',
    subtitle: 'Pembelian ≥ Rp200K',
    description: 'Hemat lebih banyak untuk top up favoritmu!',
    badge: 'NEW',
    color: 'from-green-600/30 to-emerald-600/30',
    accentColor: '#00FF87',
    emoji: '🎮',
    validUntil: '30 September 2024',
    code: 'HEMAT50K',
  },
]

export const getPromoByCode = (code) => {
  return promoCodes.find(
    (p) => p.code.toUpperCase() === code.toUpperCase()
  ) || null
}

export const validatePromoCode = (code, amount) => {
  const promo = promoCodes.find(
    (p) => p.code.toUpperCase() === code.toUpperCase()
  )

  if (!promo) {
    return { valid: false, message: 'Kode promo tidak ditemukan' }
  }

  if (amount < promo.minPurchase) {
    return {
      valid: false,
      message: `Minimal pembelian Rp${promo.minPurchase.toLocaleString('id-ID')}`,
    }
  }

  let discountAmount = 0
  if (promo.type === 'percentage') {
    discountAmount = Math.min(
      Math.floor((amount * promo.discount) / 100),
      promo.maxDiscount
    )
  } else {
    discountAmount = Math.min(promo.discount, promo.maxDiscount)
  }

  return {
    valid: true,
    promo,
    discountAmount,
    message: `Promo berhasil! Hemat Rp${discountAmount.toLocaleString('id-ID')}`,
  }
}
