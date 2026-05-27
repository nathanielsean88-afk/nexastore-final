import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useUser, useClerk } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Phone, Calendar, LogOut, Edit2, Save, X } from 'lucide-react'
import { useTransaction } from '../context/TransactionContext.jsx'
import { formatCurrency } from '../utils/formatCurrency.js'
import { getMemberLevel, MEMBER_LEVELS } from '../utils/constants.js'
import Button from '../components/ui/Button.jsx'
import Input from '../components/ui/Input.jsx'
import toast from 'react-hot-toast'

const ProfilePage = () => {
  const { user } = useUser()
  const { signOut } = useClerk()
  const navigate = useNavigate()
  const { transactions } = useTransaction()
  const hasClerk = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  const [editing, setEditing] = useState(false)
  const [phone, setPhone] = useState('+62 812-3456-7890')
  const [displayName, setDisplayName] = useState(hasClerk ? (user?.firstName || 'Gamer') : 'Gamer')

  const totalSpend = transactions.filter((t) => t.status === 'sukses').reduce((s, t) => s + (t.total || 0), 0)
  const memberLevel = getMemberLevel(totalSpend)
  const nextLevelIdx = MEMBER_LEVELS.findIndex((l) => l.level === memberLevel.level) + 1
  const nextLevel = MEMBER_LEVELS[nextLevelIdx]
  const progressPct = nextLevel
    ? Math.min(100, ((totalSpend - memberLevel.minSpend) / (nextLevel.minSpend - memberLevel.minSpend)) * 100)
    : 100

  const handleSave = async () => {
    if (hasClerk && user) {
      try {
        await user.update({ firstName: displayName })
        toast.success('Profil berhasil diperbarui!')
      } catch {
        toast.error('Gagal memperbarui profil')
      }
    } else {
      toast.success('Profil berhasil diperbarui!')
    }
    setEditing(false)
  }

  const handleSignOut = async () => {
    if (hasClerk) {
      await signOut()
      navigate('/')
    } else {
      navigate('/')
    }
  }

  const joinDate = hasClerk && user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
    : '1 Januari 2024'

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-bg-primary pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="mb-8">
          <p className="text-accent-cyan text-sm font-medium tracking-widest uppercase mb-1">— Akun</p>
          <h1 className="font-orbitron font-bold text-2xl text-white">Profil Saya</h1>
        </div>

        {/* Avatar & Name */}
        <div className="bg-bg-card border border-cyan-500/10 rounded-2xl p-6 mb-5 text-center">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-accent-cyan/20 border-2 border-accent-cyan/30 flex items-center justify-center mx-auto">
              {hasClerk && user?.imageUrl
                ? <img src={user.imageUrl} alt="avatar" className="w-full h-full object-cover" />
                : <span className="text-5xl">👾</span>
              }
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-accent-cyan flex items-center justify-center cursor-pointer hover:bg-cyan-300 transition-colors">
              <Edit2 size={13} className="text-black" />
            </div>
          </div>
          <h2 className="font-orbitron font-bold text-xl text-white">{hasClerk ? (user?.fullName || displayName) : displayName}</h2>
          <p className="text-text-secondary text-sm">{hasClerk ? user?.primaryEmailAddress?.emailAddress : 'user@nexastore.id'}</p>
          <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: `${memberLevel.color}20`, color: memberLevel.color, border: `1px solid ${memberLevel.color}40` }}>
            {memberLevel.icon} {memberLevel.level} Member
          </div>
        </div>

        {/* Member Level Progress */}
        <div className="bg-bg-card border border-cyan-500/10 rounded-2xl p-5 mb-5">
          <h3 className="font-orbitron font-semibold text-white text-sm mb-4">Level Member</h3>
          <div className="flex items-center justify-between mb-2 text-xs text-text-secondary">
            <span>{memberLevel.level}</span>
            <span>{nextLevel ? nextLevel.level : 'MAX LEVEL'}</span>
          </div>
          <div className="w-full bg-bg-surface rounded-full h-3 overflow-hidden mb-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-blue"
            />
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-text-secondary">Total Spend: <span className="text-white font-semibold">{formatCurrency(totalSpend)}</span></span>
            {nextLevel && <span className="text-text-secondary">Target: <span className="text-accent-cyan font-semibold">{formatCurrency(nextLevel.minSpend)}</span></span>}
          </div>
          <div className="mt-4 pt-4 border-t border-cyan-500/10">
            <p className="text-text-secondary text-xs mb-2 font-medium">Benefit Level Ini:</p>
            <div className="flex flex-wrap gap-2">
              {memberLevel.benefits.map((b) => (
                <span key={b} className="px-2.5 py-1 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-xs">{b}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="bg-bg-card border border-cyan-500/10 rounded-2xl p-5 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-orbitron font-semibold text-white text-sm">Informasi Akun</h3>
            {!editing
              ? <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 text-accent-cyan text-xs hover:text-cyan-300 transition-colors">
                  <Edit2 size={13} /> Edit
                </button>
              : <div className="flex gap-2">
                  <button onClick={handleSave} className="flex items-center gap-1 text-success text-xs hover:text-green-300 transition-colors"><Save size={13} /> Simpan</button>
                  <button onClick={() => setEditing(false)} className="flex items-center gap-1 text-danger text-xs hover:text-red-300 transition-colors"><X size={13} /> Batal</button>
                </div>
            }
          </div>

          <div className="space-y-4">
            {editing ? (
              <>
                <Input label="Nama Tampil" value={displayName} onChange={(e) => setDisplayName(e.target.value)} icon={<User size={15} />} />
                <Input label="No. Telepon" value={phone} onChange={(e) => setPhone(e.target.value)} icon={<Phone size={15} />} />
              </>
            ) : (
              [
                { icon: User, label: 'Nama', value: hasClerk ? (user?.fullName || displayName) : displayName },
                { icon: Mail, label: 'Email', value: hasClerk ? user?.primaryEmailAddress?.emailAddress : 'user@nexastore.id' },
                { icon: Phone, label: 'No. Telepon', value: phone },
                { icon: Calendar, label: 'Bergabung Sejak', value: joinDate },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-bg-surface border border-cyan-500/10">
                  <Icon size={15} className="text-accent-cyan flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-text-secondary text-xs">{label}</p>
                    <p className="text-white text-sm truncate">{value}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-bg-card border border-cyan-500/10 rounded-2xl p-4 text-center">
            <p className="font-orbitron font-bold text-2xl text-accent-cyan">{transactions.length}</p>
            <p className="text-text-secondary text-xs mt-1">Total Transaksi</p>
          </div>
          <div className="bg-bg-card border border-cyan-500/10 rounded-2xl p-4 text-center">
            <p className="font-orbitron font-bold text-xl text-warning">{formatCurrency(totalSpend)}</p>
            <p className="text-text-secondary text-xs mt-1">Total Spending</p>
          </div>
        </div>

        {/* Sign Out */}
        <Button variant="danger" fullWidth size="md" onClick={handleSignOut} icon={<LogOut size={16} />}>
          Keluar dari Akun
        </Button>
      </div>
    </motion.div>
  )
}

export default ProfilePage
