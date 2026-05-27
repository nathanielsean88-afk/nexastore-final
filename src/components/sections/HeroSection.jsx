import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react'
import Button from '../ui/Button.jsx'

// Floating particle component
const Particle = ({ style }) => (
  <div
    className="absolute w-1 h-1 rounded-full bg-accent-cyan/40"
    style={style}
  />
)

const HeroSection = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animation: `particleFloat ${6 + Math.random() * 8}s ${Math.random() * 5}s linear infinite`,
      width: `${2 + Math.random() * 3}px`,
      height: `${2 + Math.random() * 3}px`,
      opacity: 0.3 + Math.random() * 0.4,
    },
  }))

  const floatingIcons = [
    { emoji: '⚔️', delay: 0, x: '15%', y: '25%' },
    { emoji: '🔥', delay: 1.5, x: '80%', y: '20%' },
    { emoji: '💎', delay: 0.8, x: '75%', y: '65%' },
    { emoji: '🎯', delay: 2, x: '10%', y: '70%' },
    { emoji: '🏆', delay: 1.2, x: '50%', y: '15%' },
    { emoji: '🚀', delay: 0.5, x: '88%', y: '45%' },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-40" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-transparent to-bg-primary" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-transparent to-bg-primary" />

      {/* Radial glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-cyan/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-accent-blue/5 blur-3xl pointer-events-none" />

      {/* Floating particles */}
      {particles.map((p) => (
        <Particle key={p.id} style={p.style} />
      ))}

      {/* Floating game icons */}
      {floatingIcons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:flex items-center justify-center w-12 h-12 rounded-xl bg-bg-card/80 border border-cyan-500/20 backdrop-blur-sm text-2xl shadow-cyan-sm pointer-events-none"
          style={{ left: icon.x, top: icon.y }}
          animate={{
            y: [0, -15, 0],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 6 + i,
            delay: icon.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {icon.emoji}
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-sm font-medium mb-6"
        >
          <Zap size={14} className="animate-pulse" />
          Platform Top Up #1 di Indonesia
          <Zap size={14} className="animate-pulse" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-orbitron font-black text-4xl sm:text-5xl lg:text-7xl leading-tight mb-6"
        >
          <span className="text-white">Top Up Game</span>
          <br />
          <span className="gradient-text">Tercepat & Termurah</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Proses instan, 100+ game tersedia, pembayaran mudah via{' '}
          <span className="text-accent-cyan font-medium">DANA</span>,{' '}
          <span className="text-purple-400 font-medium">OVO</span>, dan{' '}
          <span className="text-success font-medium">GoPay</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Link to="/catalog">
            <Button
              variant="primary"
              size="lg"
              icon={<Zap size={18} />}
              className="min-w-[200px]"
            >
              Top Up Sekarang
            </Button>
          </Link>
          <Link to="/catalog">
            <Button
              variant="secondary"
              size="lg"
              iconRight={<ArrowRight size={18} />}
              className="min-w-[200px]"
            >
              Lihat Semua Game
            </Button>
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8"
        >
          {[
            { icon: Shield, text: '100% Aman & Terpercaya' },
            { icon: Clock, text: 'Proses < 5 Menit' },
            { icon: Zap, text: 'Aktif 24/7' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-text-secondary">
              <Icon size={15} className="text-accent-cyan" />
              {text}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  )
}

export default HeroSection
