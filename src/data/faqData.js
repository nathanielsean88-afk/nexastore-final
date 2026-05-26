export const faqCategories = ['Semua', 'Pembayaran', 'Akun', 'Top Up', 'Teknis']

export const faqs = [
  // Pembayaran
  {
    id: 1,
    category: 'Pembayaran',
    question: 'Metode pembayaran apa saja yang tersedia?',
    answer:
      'NexaStore mendukung pembayaran via DANA, OVO, dan GoPay. Semua metode pembayaran diproses secara real-time dan aman.',
  },
  {
    id: 2,
    category: 'Pembayaran',
    question: 'Apakah ada biaya admin untuk setiap transaksi?',
    answer:
      'Kami mengenakan biaya admin sebesar Rp1.000 - Rp2.500 per transaksi tergantung metode pembayaran yang dipilih. Biaya ini sudah tertera di halaman checkout.',
  },
  {
    id: 3,
    category: 'Pembayaran',
    question: 'Berapa lama proses pembayaran?',
    answer:
      'Pembayaran diproses secara instan. Setelah kamu mengkonfirmasi pembayaran, sistem kami akan memverifikasi dalam 1-3 menit.',
  },
  {
    id: 4,
    category: 'Pembayaran',
    question: 'Apakah bisa refund jika transaksi gagal?',
    answer:
      'Ya, jika transaksi gagal karena kesalahan sistem, dana akan dikembalikan otomatis dalam 1x24 jam. Hubungi CS kami jika belum diterima.',
  },
  {
    id: 5,
    category: 'Pembayaran',
    question: 'Apakah kode promo bisa dikombinasikan?',
    answer:
      'Tidak, hanya satu kode promo yang bisa digunakan per transaksi. Pilih promo dengan nilai diskon terbesar yang sesuai.',
  },

  // Akun
  {
    id: 6,
    category: 'Akun',
    question: 'Bagaimana cara mendaftar akun NexaStore?',
    answer:
      'Klik tombol "Daftar" di navbar, masukkan email dan buat password. Kamu juga bisa daftar menggunakan akun Google untuk kemudahan.',
  },
  {
    id: 7,
    category: 'Akun',
    question: 'Apakah data akun saya aman?',
    answer:
      'Keamanan data pengguna adalah prioritas kami. NexaStore menggunakan enkripsi SSL dan sistem autentikasi Clerk yang telah tersertifikasi SOC 2.',
  },
  {
    id: 8,
    category: 'Akun',
    question: 'Saya lupa password, bagaimana cara reset?',
    answer:
      'Klik "Masuk" lalu pilih "Lupa Password?". Masukkan email yang terdaftar dan kami akan mengirim link reset password ke email kamu.',
  },
  {
    id: 9,
    category: 'Akun',
    question: 'Apakah ada program loyalty atau poin reward?',
    answer:
      'Ya! Setiap transaksi berhasil memberikan poin reward. Kumpulkan poin untuk naik level member dari Bronze hingga Platinum dan nikmati benefit eksklusif.',
  },

  // Top Up
  {
    id: 10,
    category: 'Top Up',
    question: 'Berapa lama item top up masuk ke akun game?',
    answer:
      'Item akan masuk ke akun game kamu dalam 1-5 menit setelah pembayaran berhasil diverifikasi. Untuk beberapa game bisa lebih cepat, instan!',
  },
  {
    id: 11,
    category: 'Top Up',
    question: 'Bagaimana cara menemukan User ID/Player ID saya?',
    answer:
      'Setiap game berbeda. Biasanya bisa ditemukan di profil game, pengaturan akun, atau menu sosial. Kami menyediakan panduan khusus di halaman setiap game.',
  },
  {
    id: 12,
    category: 'Top Up',
    question: 'Apakah top up bisa dilakukan untuk akun orang lain?',
    answer:
      'Tentu bisa! Masukkan User ID milik akun yang ingin kamu top up. Pastikan ID yang dimasukkan sudah benar sebelum konfirmasi pembayaran.',
  },
  {
    id: 13,
    category: 'Top Up',
    question: 'Item top up tidak masuk setelah 30 menit, apa yang harus dilakukan?',
    answer:
      'Pertama, cek riwayat transaksi untuk memastikan status pembayaran berhasil. Jika sudah sukses tapi item belum masuk, hubungi CS kami dengan menyertakan Order ID transaksi.',
  },

  // Teknis
  {
    id: 14,
    category: 'Teknis',
    question: 'Website NexaStore tidak bisa dibuka, kenapa?',
    answer:
      'Coba clear cache browser, ganti jaringan internet, atau buka di browser berbeda. Jika masih bermasalah, cek status server di bagian bawah halaman FAQ ini.',
  },
  {
    id: 15,
    category: 'Teknis',
    question: 'Apakah NexaStore memiliki aplikasi mobile?',
    answer:
      'Saat ini NexaStore tersedia sebagai web app yang mobile-friendly. Kamu bisa "Add to Home Screen" untuk pengalaman seperti aplikasi native.',
  },
  {
    id: 16,
    category: 'Teknis',
    question: 'Mengapa verifikasi ID game saya gagal?',
    answer:
      'Pastikan ID yang dimasukkan sudah benar (tidak ada spasi berlebih). Beberapa game memisahkan User ID dan Zone/Server ID. Ikuti format yang tertera di halaman game.',
  },
]

export const serverStatus = [
  { game: 'Mobile Legends', status: 'online', ping: '12ms' },
  { game: 'Free Fire', status: 'online', ping: '8ms' },
  { game: 'PUBG Mobile', status: 'online', ping: '15ms' },
  { game: 'Genshin Impact', status: 'online', ping: '22ms' },
  { game: 'Valorant', status: 'maintenance', ping: '-' },
  { game: 'Honkai: Star Rail', status: 'online', ping: '18ms' },
  { game: 'Call of Duty Mobile', status: 'online', ping: '11ms' },
  { game: 'Clash of Clans', status: 'online', ping: '9ms' },
]
