export const categoriesData = [
  { id: 'alam', name: 'Alam', icon: '🌲', color: '#E6F4EA' },
  { id: 'pantai', name: 'Pantai', icon: '🌴', color: '#E8F0FE' },
  { id: 'gunung', name: 'Gunung', icon: '🌋', color: '#FCE8E6' },
  { id: 'kuliner', name: 'Kuliner', icon: '🍜', color: '#FEF7E0' },
  { id: 'budaya', name: 'Budaya', icon: '🎭', color: '#F3E8FD' },
  { id: 'sejarah', name: 'Sejarah', icon: '🏛️', color: '#E8EAED' }
];

export const destinationsData = [
  {
    id: 1,
    name: 'Situ Patenggang',
    category_id: 'alam',
    category_name: 'Alam',
    location: 'Ciwidey, Bandung',
    address: 'Jl. Raya Ciwidey - Rancabali, Patengan, Kec. Rancabali, Kabupaten Bandung, Jawa Barat',
    rating: 4.8,
    reviews_count: 124,
    ticket_price: 25000,
    price_formatted: 'Rp25.000',
    latitude: -7.1664,
    longitude: 107.3582,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Situ Patenggang adalah sebuah danau alami yang terletak di kawasan wisata Ciwidey, Bandung Selatan. Dikelilingi oleh hamparan kebun teh yang hijau, danau ini menawarkan pemandangan menakjubkan dan udara pegunungan yang sangat sejuk.',
    opening_hours: {
      open: '05:00',
      close: '17:00',
      days: [
        { day: 'Senin', hours: '05.00 - 17.00' },
        { day: 'Selasa', hours: '05.00 - 17.00' },
        { day: 'Rabu', hours: '05.00 - 17.00' },
        { day: 'Kamis', hours: '05.00 - 17.00' },
        { day: 'Jumat', hours: '05.00 - 17.00' },
        { day: 'Sabtu', hours: '05.00 - 18.00' },
        { day: 'Minggu', hours: '05.00 - 18.00' }
      ]
    },
    facilities: ['Area Parkir', 'Toilet Clean', 'Perahu Wisata', 'Musholla', 'Warung Makan']
  },
  {
    id: 2,
    name: 'Pantai Tanjung Tinggi',
    category_id: 'pantai',
    category_name: 'Pantai',
    location: 'Belitung',
    address: 'Kecamatan Sijuk, Kabupaten Belitung, Kepulauan Bangka Belitung',
    rating: 4.8,
    reviews_count: 98,
    ticket_price: 25000,
    price_formatted: 'Rp25.000',
    latitude: -2.5714,
    longitude: 107.6833,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Pantai eksotis dengan hamparan pasir putih bersih dan bebatuan granit raksasa yang unik. Air lautnya yang jernih sangat cocok untuk berenang dan berfoto.',
    opening_hours: {
      open: '06:00',
      close: '18:00',
      days: [
        { day: 'Senin - Minggu', hours: '06.00 - 18.00' }
      ]
    },
    facilities: ['Spot Foto', 'Sewa Perahu', 'Kuliner Seafood', 'Kamar Mandi']
  },
  {
    id: 3,
    name: 'Mount Bromo',
    category_id: 'gunung',
    category_name: 'Gunung',
    location: 'Probolinggo, Jatim',
    address: 'Kawasan Taman Nasional Bromo Tengger Semeru, Jawa Timur',
    rating: 4.9,
    reviews_count: 310,
    ticket_price: 34000,
    price_formatted: 'Rp34.000',
    latitude: -7.9425,
    longitude: 112.9530,
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Gunung berapi aktif dengan pemandangan lautan pasir dan keindahan matahari terbit (sunrise) yang sangat fenomenal dan terkenal hingga mancanegara.',
    opening_hours: {
      open: '00:00',
      close: '23:59',
      days: [{ day: 'Setiap Hari', hours: '24 Jam' }]
    },
    facilities: ['Sewa Jeep', 'Sewa Kuda', 'Penginapan', 'Warung Kopi']
  },
  {
    id: 4,
    name: 'Tari Kecak Uluwatu',
    category_id: 'budaya',
    category_name: 'Budaya',
    location: 'Badung, Bali',
    address: 'Kawasan Pura Uluwatu, Pecatu, Kuta Selatan, Badung, Bali',
    rating: 4.8,
    reviews_count: 215,
    ticket_price: 150000,
    price_formatted: 'Rp150.000',
    latitude: -8.8291,
    longitude: 115.0849,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Pertunjukan seni tari tradisional Bali di tebing batu karang dengan latar belakang pemandangan matahari terbenam samudra Hindia.',
    opening_hours: {
      open: '17:00',
      close: '19:00',
      days: [{ day: 'Setiap Hari', hours: '17.00 - 19.00' }]
    },
    facilities: ['Area Panggung Outdoor', 'Parkir Luas', 'Spot Sunset']
  },
  {
    id: 5,
    name: 'Kawah Putih',
    category_id: 'alam',
    category_name: 'Alam',
    location: 'Ciwidey, Bandung',
    address: 'Sugihmukti, Pasirwangi, Bandung, Jawa Barat',
    rating: 4.7,
    reviews_count: 175,
    ticket_price: 28000,
    price_formatted: 'Rp28.000',
    latitude: -7.1661,
    longitude: 107.4021,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Danau kawah vulkanik yang indah dengan air kehijauan dan tanah kapur berwarna putih di ketinggian pegunungan Ciwidey.',
    opening_hours: {
      open: '07:00',
      close: '17:00',
      days: [{ day: 'Setiap Hari', hours: '07.00 - 17.00' }]
    },
    facilities: ['Shuttle Ontang-Anting', 'Masker', 'Rest Area']
  },
  {
    id: 6,
    name: 'Candi Prambanan',
    category_id: 'sejarah',
    category_name: 'Sejarah',
    location: 'Sleman, DIY',
    address: 'Jl. Raya Solo - Yogyakarta No.16, Kranggan, Bokoharjo, Kalasan, Sleman, DIY',
    rating: 4.8,
    reviews_count: 420,
    ticket_price: 50000,
    price_formatted: 'Rp50.000',
    latitude: -7.7520,
    longitude: 110.4914,
    image: 'https://images.unsplash.com/photo-1609949279531-cf48d64bed89?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1609949279531-cf48d64bed89?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Kompleks candi Hindu terbesar di Indonesia berarsitektur tinggi spektakuler yang menyimpan nilai sejarah abad ke-9.',
    opening_hours: {
      open: '06:30',
      close: '17:00',
      days: [{ day: 'Setiap Hari', hours: '06.30 - 17.00' }]
    },
    facilities: ['Pemandu Wisata', 'Museum', 'Sewa Sepeda', 'Toko Souvenir']
  }
];

export const initialReviewsData = [
  {
    id: 1,
    destination_id: 1,
    user_name: 'Juram Sorm',
    user_avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    comment: 'Pemandangan sangat indah dan udara sejuk! Pengalaman berlayar dengan perahu di tengah danau sangat berkesan.',
    date: '12 Feb 2026'
  },
  {
    id: 2,
    destination_id: 1,
    user_name: 'Bomm Santor',
    user_avatar: 'https://i.pravatar.cc/150?img=33',
    rating: 5,
    comment: 'Destinasi rekomendasi untuk keluarga. Parkiran luas, akses jalan cukup baik, dan banyak spot foto menarik.',
    date: '02 Jan 2026'
  }
];