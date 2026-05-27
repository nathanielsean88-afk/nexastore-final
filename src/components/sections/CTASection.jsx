import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, ArrowRight } from 'lucide-react'
import Button from '../ui/Button.jsx'

const CTASection = () => {
  return (
    <section className="py-20 bg-bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-br from-accent-cyan/10 via-accent-blue/5 to-transparent border border-accent-cyan/20 rounded-3xl p-10 sm:p-14 text-center overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0 cyber-grid opacity-20 rounded-3xl" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-accent-cyan/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-accent-cyan/20 border border-accent-cyan/30 flex items-center justify-center mx-auto mb-6">
              <Zap size={28} className="text-accent-cyan" />
            </div>

            <h2 className="font-orbitron font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
              Siap Untuk <span className="gradient-text">Top Up?</span>
            </h2>

            <p className="text-text-secondary text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Daftar sekarang <span className="text-success font-medium">gratis</span> dan nikmati promo eksklusif member baru. Proses instan, aman, dan terpercaya!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalog">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<Zap size={18} />}
                  className="min-w-[200px]"
                >
                  Mulai Top Up
                </Button>
              </Link>
              <Link to="/catalog">
                <Button
                  variant="secondary"
                  size="lg"
                  iconRight={<ArrowRight size={18} />}
                  className="min-w-[200px]"
                >
                  Lihat Katalog
                </Button>
              </Link>
            </div>

            <p className="text-text-secondary text-xs mt-6">
              Sudah bergabung dengan <span className="text-accent-cyan font-medium">50.000+</span> gamer Indonesia 🎮
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection
