/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#080C14',
        'bg-card': '#0D1117',
        'bg-surface': '#111827',
        'accent-cyan': '#00D4FF',
        'accent-blue': '#0066FF',
        'text-primary': '#FFFFFF',
        'text-secondary': '#6B7280',
        'text-muted': '#374151',
        'success': '#00FF87',
        'warning': '#FFB800',
        'danger': '#FF3B5C',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #00D4FF 0%, #0066FF 100%)',
        'gradient-card': 'linear-gradient(145deg, #0D1117 0%, #111827 100%)',
      },
      boxShadow: {
        'cyan': '0 0 20px rgba(0, 212, 255, 0.3)',
        'cyan-sm': '0 0 10px rgba(0, 212, 255, 0.2)',
        'cyan-lg': '0 0 40px rgba(0, 212, 255, 0.4)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'pulse-cyan': 'pulseCyan 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'grid-move': 'gridMove 20s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'glitch': 'glitch 1s steps(2, end) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
      },
      keyframes: {
        pulseCyan: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0, 212, 255, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 212, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gridMove: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(60px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glitch: {
          '0%': { textShadow: '2px 0 #00D4FF, -2px 0 #FF3B5C' },
          '25%': { textShadow: '-2px 0 #00D4FF, 2px 0 #FF3B5C' },
          '50%': { textShadow: '2px 2px #00D4FF, -2px -2px #FF3B5C' },
          '75%': { textShadow: '-2px -2px #00D4FF, 2px 2px #FF3B5C' },
          '100%': { textShadow: '2px 0 #00D4FF, -2px 0 #FF3B5C' },
        },
      },
      borderColor: {
        'cyan-border': 'rgba(0, 212, 255, 0.15)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
