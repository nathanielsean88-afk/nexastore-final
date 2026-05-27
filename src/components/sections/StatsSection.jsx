import React from 'react'
import { motion } from 'framer-motion'
import { Users, ShoppingBag, Gamepad2, CheckCircle } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '50.000+',
    label: 'Pengguna Aktif',
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
    border: 'border-accent-cyan/20',
  },
  {
    icon: ShoppingBag,
    value: '1 Juta+',
    label: 'Transaksi Sukses',
    color: 'text-success',
    bg: 'bg-success/10',
    border: 'border-success/20',
  },
  {
    icon: Gamepad2,
    value: '100+',
    label: 'Game Tersedia',
    color: 'text-warning',
    bg: 'bg-warning/10',
    border: 'border-warning/20',
  },
  {
    icon: CheckCircle,
    value: '99.9%',
    label: 'Tingkat Sukses',
    color: 'text-accent-blue',
    bg: 'bg-accent-blue/10',
    border: 'border-accent-blue/20',
  },
]

const howItWorks = [
  {
    step: '01',
    title: 'Pilih Game',
    description: 'Pilih game dan nominal top up yang kamu inginkan dari 100+ pilihan tersedia.',
    emoji: '🎮',
  },
  {
    step: '02',
    title: 'Bayar',
    description: 'Bayar dengan DANA, OVO, atau GoPay. Cepat, mudah, dan aman.',
    emoji: '💳',
  },
  {
    step: '03',
    title: 'Terima Item',
    description: 'Item langsung masuk ke akun game kamu dalam hitungan menit!',
    emoji: '⚡',
  },
]

const StatsSection = () => {
  return (
    <>
      {/* Stats */}
      <section className="py-16 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`${stat.bg} border ${stat.border} rounded-2xl p-6 text-center`}
              >
                <div className={`w-12 h-12 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon size={22} className={stat.color} />
                </div>
                <div className={`font-orbitron font-black text-2xl sm:text-3xl ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-text-secondary text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-accent-cyan text-sm font-medium tracking-widest uppercase mb-2">— Mudah & Cepat</p>
            <h2 className="font-orbitron font-bold text-3xl sm:text-4xl text-white">
              Cara <span className="gradient-text">Kerja</span>
            </h2>
            <p className="text-text-secondary text-sm mt-3 max-w-md mx-auto">
              Hanya 3 langkah mudah untuk top up game favorit kamu
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden sm:block absolute top-14 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />

            {howItWorks.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="relative bg-bg-card border border-cyan-500/10 rounded-2xl p-6 text-center hover:border-accent-cyan/30 transition-all"
              >
                {/* Step number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent-cyan/20 border border-accent-cyan/40 text-accent-cyan font-orbitron text-xs font-bold">
                  {item.step}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mx-auto mb-4 text-3xl mt-3">
                  {item.emoji}
                </div>
                <h3 className="font-orbitron font-semibold text-white text-base mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default StatsSection
