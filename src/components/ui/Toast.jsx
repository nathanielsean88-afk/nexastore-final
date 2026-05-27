// Toast.jsx
// NexaStore menggunakan react-hot-toast untuk notifikasi.
// File ini berisi helper functions dan custom toast styles
// yang konsisten dengan design system NexaStore.

import toast from 'react-hot-toast'
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react'

// Custom toast helpers
export const showToast = {
  success: (message) =>
    toast.success(message, {
      icon: '✅',
      style: {
        background: '#0D1117',
        color: '#00FF87',
        border: '1px solid rgba(0, 255, 135, 0.2)',
        borderRadius: '12px',
        fontFamily: 'Sora, sans-serif',
        fontSize: '14px',
      },
    }),

  error: (message) =>
    toast.error(message, {
      icon: '❌',
      style: {
        background: '#0D1117',
        color: '#FF3B5C',
        border: '1px solid rgba(255, 59, 92, 0.2)',
        borderRadius: '12px',
        fontFamily: 'Sora, sans-serif',
        fontSize: '14px',
      },
    }),

  warning: (message) =>
    toast(message, {
      icon: '⚠️',
      style: {
        background: '#0D1117',
        color: '#FFB800',
        border: '1px solid rgba(255, 184, 0, 0.2)',
        borderRadius: '12px',
        fontFamily: 'Sora, sans-serif',
        fontSize: '14px',
      },
    }),

  info: (message) =>
    toast(message, {
      icon: 'ℹ️',
      style: {
        background: '#0D1117',
        color: '#00D4FF',
        border: '1px solid rgba(0, 212, 255, 0.2)',
        borderRadius: '12px',
        fontFamily: 'Sora, sans-serif',
        fontSize: '14px',
      },
    }),

  loading: (message) =>
    toast.loading(message, {
      style: {
        background: '#0D1117',
        color: '#FFFFFF',
        border: '1px solid rgba(0, 212, 255, 0.2)',
        borderRadius: '12px',
        fontFamily: 'Sora, sans-serif',
        fontSize: '14px',
      },
    }),

  dismiss: (id) => toast.dismiss(id),
}

export default showToast
