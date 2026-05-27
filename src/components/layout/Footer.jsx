import React from 'react'
import { Link } from 'react-router-dom'
import { Zap, MessageCircle, Mail, Phone, Shield, Clock, Star } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const gameLinks = [
    { label: 'Mobile Legends', to: '/game/mobile-legends' },
    { label: 'Free Fire', to: '/game/free-fire' },
    { label: 'PUBG Mobile', to: '/game/pubg-mobile' },
    { label: 'Genshin Impact', to: '/game/genshin-impact' },
    { label: 'Valorant', to: '/game/valorant' },
    { label: 'Honkai: Star Rail', to: '/game/honkai-star-rail' },
  ]

  const infoLinks = [
    { label: 'Tentang Kami', to: '/faq' },
    { label: 'FAQ & Bantuan', to: '/faq' },
    { label: 'Kebijakan Privasi', to: '/faq' },
    { label: 'Syarat & Ketentuan', to: '/faq' },
    { label: 'Hubungi Kami', to: '/faq' },
  ]

  const paymentMethods = ['DANA', 'OVO', 'GoPay']

  return (
    <footer className="bg-bg-card border-t border-cyan-500/10 mt-auto">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-accent-cyan/20 border border-accent-cyan/30 flex items-center justify-center">
                <Zap size={18} className="text-accent-cyan" />
              </div>
              <span className="font-orbitron font-bold text-xl text-white">
                Nexa<span className="text-accent-cyan">Store</span>
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-5">
              Platform top up game terpercaya dengan proses instan, harga terjangkau, dan layanan 24/7.
            </p>

            {/* Features */}
            <div className="flex flex-col gap-2.5">
              {[
                { icon: Shield, text: 'Transaksi 100% Aman' },
                { icon: Clock, text: 'Proses Instan 24/7' },
                { icon: Star, text: '99.9% Tingkat Sukses' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-text-secondary">
                  <Icon size={13} className="text-accent-cyan flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Game Links */}
          <div>
            <h3 className="font-orbitron font-semibold text-white text-sm mb-4 tracking-wide">
              GAME POPULER
            </h3>
            <ul className="flex flex-col gap-2.5">
              {gameLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-text-secondary text-sm hover:text-accent-cyan transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h3 className="font-orbitron font-semibold text-white text-sm mb-4 tracking-wide">
              INFORMASI
            </h3>
            <ul className="flex flex-col gap-2.5">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-text-secondary text-sm hover:text-accent-cyan transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-orbitron font-semibold text-white text-sm mb-4 tracking-wide">
              HUBUNGI KAMI
            </h3>
            <div className="flex flex-col gap-3 mb-6">
              {[
                { icon: MessageCircle, label: 'WhatsApp CS', value: '+62 812-3456-7890', color: 'text-success' },
                { icon: Mail, label: 'Email', value: 'cs@nexastore.id', color: 'text-accent-cyan' },
                { icon: Phone, label: 'Telepon', value: '021-1234-5678', color: 'text-warning' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon size={15} className={`${color} flex-shrink-0 mt-0.5`} />
                  <div>
                    <p className="text-xs text-text-secondary">{label}</p>
                    <p className="text-sm text-white">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment methods */}
            <div>
              <p className="text-xs text-text-secondary mb-2 font-medium uppercase tracking-wide">
                Metode Pembayaran
              </p>
              <div className="flex gap-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method}
                    className="px-2.5 py-1 rounded-lg bg-bg-surface border border-cyan-500/10 text-xs text-text-secondary"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-text-secondary text-xs">
            © {currentYear} NexaStore. All rights reserved.
          </p>
          <p className="text-text-secondary text-xs flex items-center gap-1">
            Made with <span className="text-danger">❤️</span> for gamers Indonesia
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
