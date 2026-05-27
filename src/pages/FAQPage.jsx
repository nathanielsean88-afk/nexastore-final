import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, MessageCircle, Mail, Phone, Wifi, WifiOff } from 'lucide-react'
import { faqs, faqCategories, serverStatus } from '../data/faqData.js'
import Input from '../components/ui/Input.jsx'

const FAQPage = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Semua')
  const [openId, setOpenId] = useState(null)

  const filtered = useMemo(() => {
    let result = [...faqs]
    if (category !== 'Semua') result = result.filter((f) => f.category === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q))
    }
    return result
  }, [category, search])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-bg-primary pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-accent-cyan text-sm font-medium tracking-widest uppercase mb-2">— Pusat Bantuan</p>
          <h1 className="font-orbitron font-bold text-3xl sm:text-4xl text-white mb-3">
            FAQ & <span className="gradient-text">Bantuan</span>
          </h1>
          <p className="text-text-secondary text-sm max-w-md mx-auto">
            Temukan jawaban dari pertanyaan yang sering ditanyakan
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Cari pertanyaan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search size={16} />}
            size="lg"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setOpenId(null) }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                category === cat
                  ? 'bg-accent-cyan/20 border border-accent-cyan/50 text-accent-cyan'
                  : 'bg-bg-surface border border-cyan-500/10 text-text-secondary hover:border-accent-cyan/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-2 mb-12">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-text-secondary">Pertanyaan tidak ditemukan</p>
            </div>
          ) : filtered.map((faq) => (
            <div
              key={faq.id}
              className={`bg-bg-card border rounded-xl overflow-hidden transition-all duration-300 ${
                openId === faq.id ? 'border-accent-cyan/30 shadow-cyan-sm' : 'border-cyan-500/10 hover:border-accent-cyan/20'
              }`}
            >
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              >
                <div className="flex items-start gap-3 flex-1 pr-4">
                  <span className="w-6 h-6 rounded-lg bg-accent-cyan/15 border border-accent-cyan/25 text-accent-cyan text-xs flex items-center justify-center flex-shrink-0 font-bold mt-0.5">
                    Q
                  </span>
                  <span className={`text-sm font-medium ${openId === faq.id ? 'text-accent-cyan' : 'text-white'}`}>
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-text-secondary flex-shrink-0 transition-transform duration-300 ${openId === faq.id ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4 flex gap-3">
                      <span className="w-6 h-6 rounded-lg bg-success/15 border border-success/25 text-success text-xs flex items-center justify-center flex-shrink-0 font-bold mt-0.5">
                        A
                      </span>
                      <p className="text-text-secondary text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Contact Cards */}
        <div className="mb-10">
          <h2 className="font-orbitron font-semibold text-white text-lg mb-4">Masih Ada Pertanyaan?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: MessageCircle, label: 'WhatsApp CS', value: '+62 812-3456-7890', color: 'text-success', bg: 'bg-success/10', border: 'border-success/20', href: 'https://wa.me/6281234567890' },
              { icon: Mail, label: 'Email Support', value: 'cs@nexastore.id', color: 'text-accent-cyan', bg: 'bg-accent-cyan/10', border: 'border-accent-cyan/20', href: 'mailto:cs@nexastore.id' },
              { icon: Phone, label: 'Live Chat', value: 'Tersedia 24/7', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20', href: '#' },
            ].map(({ icon: Icon, label, value, color, bg, border, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${bg} border ${border} rounded-2xl p-5 flex items-center gap-4 hover:opacity-80 transition-all`}
              >
                <div className={`w-12 h-12 rounded-xl ${bg} border ${border} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={20} className={color} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{label}</p>
                  <p className="text-text-secondary text-xs">{value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Server Status */}
        <div className="bg-bg-card border border-cyan-500/10 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-cyan-500/10">
            <h2 className="font-orbitron font-semibold text-white text-sm">Status Server Game</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {serverStatus.map((s, i) => (
              <div
                key={s.game}
                className={`flex items-center justify-between px-5 py-3.5 border-b border-cyan-500/10 ${i % 2 === 0 ? 'sm:border-r' : ''} last:border-0`}
              >
                <span className="text-white text-sm">{s.game}</span>
                <div className="flex items-center gap-2">
                  {s.status === 'online'
                    ? <><Wifi size={13} className="text-success" /><span className="text-success text-xs font-medium">Online</span><span className="text-text-secondary text-xs">{s.ping}</span></>
                    : <><WifiOff size={13} className="text-danger" /><span className="text-danger text-xs font-medium">Maintenance</span></>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default FAQPage
