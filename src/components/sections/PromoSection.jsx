import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Tag } from 'lucide-react'
import { bannerPromos } from '../../data/promoData.js'

const PromoSection = () => {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % bannerPromos.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => {
    setDirection(-1)
    setCurrent((p) => (p - 1 + bannerPromos.length) % bannerPromos.length)
  }

  const next = () => {
    setDirection(1)
    setCurrent((p) => (p + 1) % bannerPromos.length)
  }

  const promo = bannerPromos[current]

  return (
    <section className="py-16 bg-bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-accent-cyan text-sm font-medium tracking-widest uppercase mb-2">— Penawaran Terbatas</p>
          <h2 className="font-orbitron font-bold text-3xl sm:text-4xl text-white">
            Promo <span className="gradient-text">Spesial</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -80 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className={`bg-gradient-to-br ${promo.color} border border-cyan-500/20 rounded-2xl p-8 sm:p-10 relative overflow-hidden`}
            >
              {/* Background grid */}
              <div className="absolute inset-0 cyber-grid opacity-20" />

              <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Emoji */}
                <div className="w-24 h-24 flex-shrink-0 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-5xl">
                  {promo.emoji}
                </div>

                {/* Content */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white mb-3">
                    <Tag size={12} />
                    {promo.badge}
                  </div>
                  <h3 className="font-orbitron font-bold text-2xl sm:text-3xl text-white mb-1">
                    {promo.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-3">{promo.subtitle}</p>
                  <p className="text-white/80 text-base mb-4">{promo.description}</p>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                    <div className="px-4 py-2.5 rounded-xl bg-black/30 border border-white/20 font-mono text-lg font-bold tracking-widest text-white">
                      {promo.code}
                    </div>
                    <div className="text-xs text-white/50 self-center">
                      Berlaku hingga {promo.validUntil}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-all backdrop-blur-sm"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-all backdrop-blur-sm"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {bannerPromos.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
              className={`rounded-full transition-all duration-300 ${
                i === current ? 'w-6 h-2 bg-accent-cyan' : 'w-2 h-2 bg-text-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PromoSection
