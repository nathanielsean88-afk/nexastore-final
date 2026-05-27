import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button.jsx'

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-bg-primary flex items-center justify-center pt-16 px-4 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-transparent to-bg-primary" />

      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-danger/40"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}

      <div className="relative z-10 text-center max-w-lg">
        {/* 404 Glitch Text */}
        <div className="relative mb-6 inline-block">
          <h1
            className="font-orbitron font-black text-[120px] sm:text-[160px] leading-none text-white glitch-text select-none"
            data-text="404"
            style={{ textShadow: '0 0 30px rgba(255, 59, 92, 0.4)' }}
          >
            404
          </h1>
          {/* Glitch layers */}
          <div
            className="absolute inset-0 font-orbitron font-black text-[120px] sm:text-[160px] leading-none text-accent-cyan opacity-70 pointer-events-none select-none"
            style={{
              animation: 'glitch-1 3s infinite linear',
              clipPath: 'inset(40% 0 50% 0)',
            }}
          >
            404
          </div>
          <div
            className="absolute inset-0 font-orbitron font-black text-[120px] sm:text-[160px] leading-none text-danger opacity-70 pointer-events-none select-none"
            style={{
              animation: 'glitch-2 3s infinite linear',
              clipPath: 'inset(60% 0 20% 0)',
            }}
          >
            404
          </div>
        </div>

        {/* Game Over text */}
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="font-orbitron font-bold text-danger text-lg mb-4 tracking-widest"
        >
          — GAME OVER —
        </motion.div>

        <h2 className="font-orbitron font-semibold text-white text-2xl mb-3">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-text-secondary text-sm mb-8 leading-relaxed">
          Sepertinya kamu nyasar ke area yang tidak terpetakan. Halaman yang kamu cari mungkin sudah dipindahkan atau tidak pernah ada.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button variant="primary" size="lg" icon={<Home size={18} />}>
              Kembali ke Beranda
            </Button>
          </Link>
          <Button variant="secondary" size="lg" icon={<ArrowLeft size={18} />} onClick={() => window.history.back()}>
            Halaman Sebelumnya
          </Button>
        </div>

        {/* Decorative bottom text */}
        <p className="font-mono text-text-muted text-xs mt-8 tracking-widest">
          ERROR_CODE: PAGE_NOT_FOUND :: 0x404
        </p>
      </div>
    </motion.div>
  )
}

export default NotFoundPage
