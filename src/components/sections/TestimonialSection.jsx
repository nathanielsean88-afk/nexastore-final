import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Rizky Pratama',
    username: '@rizky_ml',
    avatar: '🧑',
    game: 'Mobile Legends',
    rating: 5,
    text: 'Top up ML di NexaStore super cepet! Diamond langsung masuk kurang dari 2 menit. Harga juga lebih murah dari tempat lain. Recommended banget!',
  },
  {
    id: 2,
    name: 'Ayu Maharani',
    username: '@ayu_ff',
    avatar: '👩',
    game: 'Free Fire',
    rating: 5,
    text: 'Udah langganan di sini 6 bulan, belum pernah gagal sekalipun. Customer service juga cepat respons. Paling suka promo cashback OVO-nya!',
  },
  {
    id: 3,
    name: 'Dimas Saputra',
    username: '@dimas_pubg',
    avatar: '🧔',
    game: 'PUBG Mobile',
    rating: 5,
    text: 'Interface-nya keren banget, mudah dipakai. Top up UC PUBG gak sampe 5 menit udah bisa masuk game. Paling trusted!',
  },
]

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-accent-cyan text-sm font-medium tracking-widest uppercase mb-2">— Apa Kata Mereka</p>
          <h2 className="font-orbitron font-bold text-3xl sm:text-4xl text-white">
            Testimoni <span className="gradient-text">Pengguna</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-bg-card border border-cyan-500/10 rounded-2xl p-5 hover:border-accent-cyan/30 hover:shadow-cyan-sm transition-all duration-300 relative overflow-hidden"
            >
              {/* Quote mark */}
              <div className="absolute -top-2 -right-2 text-7xl text-accent-cyan/10 font-orbitron pointer-events-none select-none">
                "
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-warning text-warning" />
                ))}
              </div>

              {/* Text */}
              <p className="text-text-secondary text-sm leading-relaxed mb-5 relative z-10">
                "{t.text}"
              </p>

              {/* User */}
              <div className="flex items-center gap-3 pt-4 border-t border-cyan-500/10">
                <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-xl flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-text-secondary text-xs">{t.username} • {t.game}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
