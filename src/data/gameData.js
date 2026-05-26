export const games = [
  {
    id: 'mobile-legends',
    name: 'Mobile Legends: Bang Bang',
    category: 'MOBA',
    badge: 'HOT',
    description: 'Top up Diamond ML instan langsung ke akun kamu. Dapatkan hero, skin, dan item favorit dengan harga terjangkau.',
    color: '#4FC3F7',
    inputFields: ['User ID', 'Zone ID'],
    minPrice: 19000,
    items: [
      { id: 'ml-1', label: '86 Diamond', price: 19000, popular: false },
      { id: 'ml-2', label: '172 Diamond', price: 38000, popular: false },
      { id: 'ml-3', label: '257 Diamond', price: 57000, popular: false },
      { id: 'ml-4', label: '514 Diamond', price: 114000, popular: true },
      { id: 'ml-5', label: '1070 Diamond', price: 228000, popular: false },
      { id: 'ml-6', label: '2195 Diamond', price: 456000, popular: false },
      { id: 'ml-7', label: '5750 Diamond', price: 1140000, popular: false },
    ],
  },
  {
    id: 'free-fire',
    name: 'Free Fire',
    category: 'Battle Royale',
    badge: 'HOT',
    description: 'Top up Diamond FF cepat dan terpercaya. Beli skin senjata, karakter, dan bundle eksklusif.',
    color: '#FF7043',
    inputFields: ['Player ID'],
    minPrice: 15000,
    items: [
      { id: 'ff-1', label: '70 Diamond', price: 15000, popular: false },
      { id: 'ff-2', label: '140 Diamond', price: 29000, popular: false },
      { id: 'ff-3', label: '355 Diamond', price: 74000, popular: true },
      { id: 'ff-4', label: '720 Diamond', price: 145000, popular: false },
      { id: 'ff-5', label: '1450 Diamond', price: 289000, popular: false },
      { id: 'ff-6', label: '5000 Diamond', price: 999000, popular: false },
    ],
  },
  {
    id: 'pubg-mobile',
    name: 'PUBG Mobile',
    category: 'Battle Royale',
    badge: null,
    description: 'Top up UC PUBG Mobile harga terjangkau. Beli Royal Pass, skin, dan item premium.',
    color: '#FFC107',
    inputFields: ['Player ID'],
    minPrice: 15000,
    items: [
      { id: 'pubg-1', label: '60 UC', price: 15000, popular: false },
      { id: 'pubg-2', label: '325 UC', price: 75000, popular: true },
      { id: 'pubg-3', label: '660 UC', price: 149000, popular: false },
      { id: 'pubg-4', label: '1800 UC', price: 399000, popular: false },
      { id: 'pubg-5', label: '3850 UC', price: 799000, popular: false },
      { id: 'pubg-6', label: '6000 UC', price: 1199000, popular: false },
    ],
  },
  {
    id: 'genshin-impact',
    name: 'Genshin Impact',
    category: 'RPG',
    badge: 'NEW',
    description: 'Top up Genesis Crystal Genshin Impact. Dapatkan Primogem dan roll karakter 5 bintang favoritmu.',
    color: '#AB47BC',
    inputFields: ['UID'],
    minPrice: 15000,
    items: [
      { id: 'gi-1', label: '60 Genesis Crystal', price: 15000, popular: false },
      { id: 'gi-2', label: '330 Genesis Crystal', price: 75000, popular: false },
      { id: 'gi-3', label: '1090 Genesis Crystal', price: 229000, popular: true },
      { id: 'gi-4', label: '2240 Genesis Crystal', price: 459000, popular: false },
      { id: 'gi-5', label: '3880 Genesis Crystal', price: 769000, popular: false },
      { id: 'gi-6', label: '6480 Genesis Crystal', price: 1289000, popular: false },
    ],
  },
  {
    id: 'valorant',
    name: 'Valorant',
    category: 'FPS',
    badge: null,
    description: 'Top up Valorant Points untuk skin impianmu. Beli knife, gun buddy, dan player card eksklusif.',
    color: '#EF5350',
    inputFields: ['Riot ID', 'Tagline'],
    minPrice: 55000,
    items: [
      { id: 'val-1', label: '420 VP', price: 55000, popular: false },
      { id: 'val-2', label: '1000 VP', price: 129000, popular: false },
      { id: 'val-3', label: '2050 VP', price: 259000, popular: true },
      { id: 'val-4', label: '3650 VP', price: 459000, popular: false },
      { id: 'val-5', label: '5350 VP', price: 649000, popular: false },
      { id: 'val-6', label: '7100 VP', price: 849000, popular: false },
    ],
  },
  {
    id: 'honkai-star-rail',
    name: 'Honkai: Star Rail',
    category: 'RPG',
    badge: 'NEW',
    description: 'Top up Oneiric Shard Honkai Star Rail. Roll karakter dan light cone terbaru dari Express Crew.',
    color: '#7E57C2',
    inputFields: ['UID'],
    minPrice: 15000,
    items: [
      { id: 'hsr-1', label: '60 Oneiric Shard', price: 15000, popular: false },
      { id: 'hsr-2', label: '330 Oneiric Shard', price: 75000, popular: false },
      { id: 'hsr-3', label: '1090 Oneiric Shard', price: 229000, popular: true },
      { id: 'hsr-4', label: '2240 Oneiric Shard', price: 459000, popular: false },
    ],
  },
  {
    id: 'codm',
    name: 'Call of Duty Mobile',
    category: 'FPS',
    badge: null,
    description: 'Top up CP CODM untuk operator skin terbaik. Unlock battle pass dan item seasonal.',
    color: '#78909C',
    inputFields: ['Player ID'],
    minPrice: 15000,
    items: [
      { id: 'codm-1', label: '80 CP', price: 15000, popular: false },
      { id: 'codm-2', label: '400 CP', price: 69000, popular: true },
      { id: 'codm-3', label: '800 CP', price: 129000, popular: false },
      { id: 'codm-4', label: '2000 CP', price: 319000, popular: false },
    ],
  },
  {
    id: 'clash-of-clans',
    name: 'Clash of Clans',
    category: 'Strategy',
    badge: null,
    description: 'Top up Gems CoC untuk percepat pembangunan. Serang, bangun, dan rajai leaderboard.',
    color: '#43A047',
    inputFields: ['Player Tag'],
    minPrice: 15000,
    items: [
      { id: 'coc-1', label: '80 Gems', price: 15000, popular: false },
      { id: 'coc-2', label: '500 Gems', price: 79000, popular: false },
      { id: 'coc-3', label: '1200 Gems', price: 169000, popular: true },
      { id: 'coc-4', label: '2500 Gems', price: 339000, popular: false },
      { id: 'coc-5', label: '6500 Gems', price: 849000, popular: false },
    ],
  },
]

export const getGameById = (id) => games.find((g) => g.id === id)

export const getGamesByCategory = (category) => {
  if (category === 'Semua') return games
  return games.filter((g) => g.category === category)
}

export const categories = ['Semua', 'MOBA', 'Battle Royale', 'RPG', 'FPS', 'Strategy']

// Emoji icons for games (used as placeholder thumbnails)
export const gameEmojis = {
  'mobile-legends': '⚔️',
  'free-fire': '🔥',
  'pubg-mobile': '🪖',
  'genshin-impact': '🌸',
  valorant: '🎯',
  'honkai-star-rail': '🚂',
  codm: '🔫',
  'clash-of-clans': '🏰',
}

// Game gradient colors for card backgrounds
export const gameGradients = {
  'mobile-legends': 'from-blue-900/40 to-cyan-900/20',
  'free-fire': 'from-orange-900/40 to-red-900/20',
  'pubg-mobile': 'from-yellow-900/40 to-orange-900/20',
  'genshin-impact': 'from-purple-900/40 to-pink-900/20',
  valorant: 'from-red-900/40 to-rose-900/20',
  'honkai-star-rail': 'from-violet-900/40 to-indigo-900/20',
  codm: 'from-slate-800/40 to-gray-900/20',
  'clash-of-clans': 'from-green-900/40 to-emerald-900/20',
}
