import React from 'react'
import { motion } from 'framer-motion'
import HeroSection from '../components/sections/HeroSection.jsx'
import GameGrid from '../components/sections/GameGrid.jsx'
import PromoSection from '../components/sections/PromoSection.jsx'
import StatsSection from '../components/sections/StatsSection.jsx'
import TestimonialSection from '../components/sections/TestimonialSection.jsx'
import CTASection from '../components/sections/CTASection.jsx'

// Marquee logos
const gameLogos = [
  { emoji: '⚔️', name: 'Mobile Legends' },
  { emoji: '🔥', name: 'Free Fire' },
  { emoji: '🪖', name: 'PUBG Mobile' },
  { emoji: '🌸', name: 'Genshin Impact' },
  { emoji: '🎯', name: 'Valorant' },
  { emoji: '🚂', name: 'Honkai: Star Rail' },
  { emoji: '🔫', name: 'Call of Duty' },
  { emoji: '🏰', name: 'Clash of Clans' },
  { emoji: '⚽', name: 'FIFA Mobile' },
  { emoji: '🏈', name: 'NBA 2K' },
]

const MarqueeSection = () => {
  const doubled = [...gameLogos, ...gameLogos]

  return (
    <section className="py-10 bg-bg-surface overflow-hidden border-y border-cyan-500/10">
      <div className="flex">
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {doubled.map((logo, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-bg-card border border-cyan-500/10 flex-shrink-0 hover:border-accent-cyan/30 transition-colors"
            >
              <span className="text-xl">{logo.emoji}</span>
              <span className="text-text-secondary text-sm font-medium">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const LandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <HeroSection />
      <MarqueeSection />
      <GameGrid />
      <PromoSection />
      <StatsSection />
      <TestimonialSection />
      <CTASection />
    </motion.div>
  )
}

export default LandingPage
