export const PAYMENT_METHODS = [
  {
    id: 'dana',
    name: 'DANA',
    logo: '💙',
    color: '#118EEA',
    number: '0812-3456-7890',
    instructions: [
      'Buka aplikasi DANA di smartphone kamu',
      'Pilih menu "Transfer" atau "Kirim Uang"',
      'Masukkan nomor tujuan: 0812-3456-7890',
      'Masukkan nominal sesuai tagihan',
      'Tambahkan catatan dengan Order ID',
      'Konfirmasi dan selesaikan pembayaran',
    ],
  },
  {
    id: 'ovo',
    name: 'OVO',
    logo: '💜',
    color: '#4C3494',
    number: '0856-7890-1234',
    instructions: [
      'Buka aplikasi OVO di smartphone kamu',
      'Pilih menu "Transfer" di halaman utama',
      'Masukkan nomor tujuan: 0856-7890-1234',
      'Masukkan nominal sesuai tagihan',
      'Cek kembali detail transfer',
      'Konfirmasi dengan PIN OVO kamu',
    ],
  },
  {
    id: 'gopay',
    name: 'GoPay',
    logo: '💚',
    color: '#00AED6',
    number: '0878-9012-3456',
    instructions: [
      'Buka aplikasi Gojek atau GoPay',
      'Pilih menu "Bayar" atau "Transfer"',
      'Scan QR Code atau masukkan nomor: 0878-9012-3456',
      'Masukkan nominal sesuai tagihan',
      'Periksa detail pembayaran dengan teliti',
      'Konfirmasi pembayaran dengan PIN GoPay',
    ],
  },
]

export const ADMIN_FEES = {
  dana: 1000,
  ovo: 1500,
  gopay: 1000,
}

export const MEMBER_LEVELS = [
  {
    level: 'Bronze',
    minSpend: 0,
    maxSpend: 500000,
    color: '#CD7F32',
    icon: '🥉',
    benefits: ['Akses semua game', 'Notifikasi promo'],
  },
  {
    level: 'Silver',
    minSpend: 500000,
    maxSpend: 2000000,
    color: '#C0C0C0',
    icon: '🥈',
    benefits: ['Bonus 5% poin', 'Prioritas CS', 'Promo eksklusif'],
  },
  {
    level: 'Gold',
    minSpend: 2000000,
    maxSpend: 5000000,
    color: '#FFD700',
    icon: '🥇',
    benefits: ['Bonus 10% poin', 'Cashback 2%', 'Early access promo'],
  },
  {
    level: 'Platinum',
    minSpend: 5000000,
    maxSpend: Infinity,
    color: '#E5E4E2',
    icon: '💎',
    benefits: ['Bonus 15% poin', 'Cashback 5%', 'VIP CS 24/7', 'Hadiah bulanan'],
  },
]

export const getMemberLevel = (totalSpend) => {
  return (
    MEMBER_LEVELS.find(
      (l) => totalSpend >= l.minSpend && totalSpend < l.maxSpend
    ) || MEMBER_LEVELS[0]
  )
}

export const TRANSACTION_STATUS = {
  SUCCESS: 'sukses',
  PENDING: 'pending',
  FAILED: 'gagal',
}

export const APP_NAME = 'NexaStore'
export const APP_TAGLINE = 'Top Up Cepat, Main Tanpa Batas'
