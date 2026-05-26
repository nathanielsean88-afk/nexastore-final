# ⚡ NexaStore

> **Top Up Cepat, Main Tanpa Batas**

Platform top up game terpercaya dengan desain Cyber Cyan Dark, proses instan, dan 100+ game tersedia.

---

## 🎮 Tech Stack

- **React 18** + Vite
- **Tailwind CSS v3** — custom NexaStore theme
- **React Router DOM v6** — client-side routing
- **Clerk** — authentication
- **Framer Motion** — animations
- **Lucide React** — icons
- **React Hot Toast** — notifications

---

## 🚀 Cara Install & Run Lokal

```bash
# 1. Clone repo
git clone https://github.com/username/nexastore.git
cd nexastore

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# Edit .env dan isi VITE_CLERK_PUBLISHABLE_KEY

# 4. Run development
npm run dev
```

Buka `http://localhost:5173`

---

## 🔐 Setup Clerk

1. Daftar di [clerk.com](https://clerk.com)
2. Buat aplikasi baru
3. Copy **Publishable Key** dari dashboard
4. Paste ke `.env`:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
   ```
5. Di Clerk dashboard → **Paths**, set:
   - Sign-in URL: `/`
   - After sign-in: `/dashboard`
   - After sign-up: `/dashboard`

> **Tanpa Clerk key**, app tetap berjalan — auth features dinonaktifkan otomatis (mode dev).

---

## 🚂 Deploy ke Railway

### Via GitHub (Recommended)

1. Push code ke GitHub
2. Buka [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub**
3. Pilih repo `nexastore`
4. Set environment variable di Railway dashboard:
   ```
   VITE_CLERK_PUBLISHABLE_KEY = pk_live_xxxxx
   ```
5. Railway otomatis build & deploy via `railway.json`

### Manual

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

---

## 📁 Struktur Project

```
nexastore/
├── src/
│   ├── components/
│   │   ├── ui/          # Button, Card, Badge, Input, Modal, Skeleton
│   │   ├── layout/      # Navbar, Footer, ProtectedRoute
│   │   └── sections/    # Hero, GameGrid, Promo, Stats, Testimonial, CTA
│   ├── pages/           # 11 halaman lengkap
│   ├── context/         # CartContext, TransactionContext
│   ├── data/            # gameData, promoData, faqData
│   ├── utils/           # formatCurrency, generateOrderId, constants
│   ├── App.jsx
│   └── main.jsx
├── railway.json
├── vite.config.js
└── tailwind.config.js
```

---

## 🌐 Environment Variables

| Variable | Description |
|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key (dari dashboard Clerk) |

---

## 📄 Halaman

| Path | Halaman |
|---|---|
| `/` | Landing Page |
| `/catalog` | Katalog Game |
| `/game/:id` | Detail Game + Top Up |
| `/checkout` | Checkout *(protected)* |
| `/payment` | Payment Gateway *(protected)* |
| `/payment/status` | Status Pembayaran *(protected)* |
| `/dashboard` | Dashboard *(protected)* |
| `/transactions` | Riwayat Transaksi *(protected)* |
| `/profile` | Profil User *(protected)* |
| `/faq` | FAQ & Bantuan |
| `/*` | 404 Not Found |

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#080C14` |
| Card | `#0D1117` |
| Accent Cyan | `#00D4FF` |
| Success | `#00FF87` |
| Warning | `#FFB800` |
| Danger | `#FF3B5C` |

**Fonts**: Orbitron (heading) + Sora (body)

---

Made with ❤️ for gamers Indonesia 🎮
