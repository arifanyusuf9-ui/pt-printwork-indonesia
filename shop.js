// ── SCROLL REVEAL
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── PRODUCT DATA
// priceMatrix: { "size|material|print|laminasi": { qty: pricePerPcs } }
// For Polos rows qty tiers use 50-pack pricing shown in PDF (price is per pcs)
const PRODUCTS = [
  {
    id: 1, category: 'lunchbox', name: 'Lunch Box Selip Eco-Kraft (S-L)', emoji: '🍱',
    badge: 'badge-stock', badgeText: 'Ready Stock',
    image: 'media/products/lunch box eco-kraft 1.jpeg',
    material: 'Eco-Kraft', desc: 'Custom lunch box model selip model kunci. Cocok untuk makanan kering: nasi goreng, kwetiau, ayam goreng. Material Kraft 275gr.',
    sizes: ['S (A:150x105, B:125x83, T:45)', 'M (A:175x110, B:150x85, T:50)', 'L (A:185x130, B:160x105, T:50)'],
    materials: ['Eco-Kraft (275gr)'],
    prints: ['1 Warna', '2 Warna'],
    laminasi: ['Tanpa Laminasi', 'Laminasi Dalam'],
    minOrder: 500,
    priceMatrix: {
      'S (A:150x105, B:125x83, T:45)|Eco-Kraft (275gr)|1 Warna|Tanpa Laminasi': { 500: 1280, 1000: 920, 2000: 790 },
      'S (A:150x105, B:125x83, T:45)|Eco-Kraft (275gr)|1 Warna|Laminasi Dalam': { 500: 1505, 1000: 1145, 2000: 1015 },
      'S (A:150x105, B:125x83, T:45)|Eco-Kraft (275gr)|2 Warna|Tanpa Laminasi': { 500: 1510, 1000: 1060, 2000: 880 },
      'S (A:150x105, B:125x83, T:45)|Eco-Kraft (275gr)|2 Warna|Laminasi Dalam': { 500: 1735, 1000: 1285, 2000: 1105 },
      'M (A:175x110, B:150x85, T:50)|Eco-Kraft (275gr)|1 Warna|Tanpa Laminasi': { 500: 1390, 1000: 1020, 2000: 890 },
      'M (A:175x110, B:150x85, T:50)|Eco-Kraft (275gr)|1 Warna|Laminasi Dalam': { 500: 1640, 1000: 1270, 2000: 1140 },
      'M (A:175x110, B:150x85, T:50)|Eco-Kraft (275gr)|2 Warna|Tanpa Laminasi': { 500: 1620, 1000: 1160, 2000: 980 },
      'M (A:175x110, B:150x85, T:50)|Eco-Kraft (275gr)|2 Warna|Laminasi Dalam': { 500: 1770, 1000: 1410, 2000: 1230 },
      'L (A:185x130, B:160x105, T:50)|Eco-Kraft (275gr)|1 Warna|Tanpa Laminasi': { 500: 1450, 1000: 1070, 2000: 940 },
      'L (A:185x130, B:160x105, T:50)|Eco-Kraft (275gr)|1 Warna|Laminasi Dalam': { 500: 1800, 1000: 1420, 2000: 1290 },
      'L (A:185x130, B:160x105, T:50)|Eco-Kraft (275gr)|2 Warna|Tanpa Laminasi': { 500: 1680, 1000: 1210, 2000: 1020 },
      'L (A:185x130, B:160x105, T:50)|Eco-Kraft (275gr)|2 Warna|Laminasi Dalam': { 500: 1930, 1000: 1560, 2000: 1370 },
    }
  },
  {
    id: 2, category: 'lunchbox', name: 'Lunch Box Selip Food Grade (S-L)', emoji: '🍱',
    badge: 'badge-stock', badgeText: 'Ready Stock',
    image: 'media/products/lunch box food grade.jpeg',
    material: 'Food Grade', desc: 'Custom lunch box model selip. Material Food Grade Foopak 275gr, aman untuk makanan berminyak.',
    sizes: ['S (A:150x105, B:125x83, T:45)', 'M (A:175x110, B:150x85, T:50)', 'L (A:185x130, B:160x105, T:50)'],
    materials: ['Food Grade (Foopak 275)'],
    prints: ['1 Warna', 'Full Color'],
    laminasi: ['Laminasi Dalam'],
    minOrder: 500,
    priceMatrix: {
      'S (A:150x105, B:125x83, T:45)|Food Grade (Foopak 275)|1 Warna|Laminasi Dalam': { 500: 1850, 1000: 1430, 2000: 1380 },
      'S (A:150x105, B:125x83, T:45)|Food Grade (Foopak 275)|Full Color|Laminasi Dalam': { 500: 2140, 1000: 1600, 2000: 1390 },
      'M (A:175x110, B:150x85, T:50)|Food Grade (Foopak 275)|1 Warna|Laminasi Dalam': { 500: 1950, 1000: 1530, 2000: 1370 },
      'M (A:175x110, B:150x85, T:50)|Food Grade (Foopak 275)|Full Color|Laminasi Dalam': { 500: 2140, 1000: 1700, 2000: 1480 },
      'L (A:185x130, B:160x105, T:50)|Food Grade (Foopak 275)|1 Warna|Laminasi Dalam': { 500: 2080, 1000: 1650, 2000: 1480 },
      'L (A:185x130, B:160x105, T:50)|Food Grade (Foopak 275)|Full Color|Laminasi Dalam': { 500: 2280, 1000: 1820, 2000: 1590 },
    }
  },
  {
    id: 3, category: 'lunchbox', name: 'Lunch Box Selip Eco-Kraft (XL-Jumbo)', emoji: '📦',
    badge: 'badge-new', badgeText: 'New Size',
    image: 'media/products/lunch box eco-kraft 2.jpeg',
    material: 'Eco-Kraft', desc: 'Ukuran XL dan Jumbo untuk porsi besar. Ideal untuk katering premium. Material Kraft 275gr.',
    sizes: ['XL (A:205x140, B:170x115, T:50)', 'Jumbo (A:205x160, B:180x140, T:50)'],
    materials: ['Eco-Kraft (275gr)'],
    prints: ['1 Warna', '2 Warna'],
    laminasi: ['Tanpa Laminasi', 'Laminasi Dalam'],
    minOrder: 500,
    priceMatrix: {
      'XL (A:205x140, B:170x115, T:50)|Eco-Kraft (275gr)|1 Warna|Tanpa Laminasi': { 500: 1470, 1000: 1090, 2000: 960 },
      'XL (A:205x140, B:170x115, T:50)|Eco-Kraft (275gr)|1 Warna|Laminasi Dalam': { 500: 1820, 1000: 1440, 2000: 1310 },
      'XL (A:205x140, B:170x115, T:50)|Eco-Kraft (275gr)|2 Warna|Tanpa Laminasi': { 500: 1700, 1000: 1230, 2000: 1040 },
      'XL (A:205x140, B:170x115, T:50)|Eco-Kraft (275gr)|2 Warna|Laminasi Dalam': { 500: 2050, 1000: 1580, 2000: 1390 },
      'Jumbo (A:205x160, B:180x140, T:50)|Eco-Kraft (275gr)|1 Warna|Tanpa Laminasi': { 500: 1740, 1000: 1340, 2000: 1190 },
      'Jumbo (A:205x160, B:180x140, T:50)|Eco-Kraft (275gr)|1 Warna|Laminasi Dalam': { 500: 2040, 1000: 1840, 2000: 1590 },
      'Jumbo (A:205x160, B:180x140, T:50)|Eco-Kraft (275gr)|2 Warna|Tanpa Laminasi': { 500: 1870, 1000: 1470, 2000: 1280 },
      'Jumbo (A:205x160, B:180x140, T:50)|Eco-Kraft (275gr)|2 Warna|Laminasi Dalam': { 500: 2370, 1000: 1870, 2000: 1680 },
    }
  },
  {
    id: 4, category: 'lunchbox', name: 'Lunch Box Selip Food Grade (XL-Jumbo)', emoji: '📦',
    badge: 'badge-new', badgeText: 'New Size',
    image: 'media/products/lunch box food grade xl jumbo.jpeg',
    material: 'Food Grade', desc: 'Ukuran XL dan Jumbo Food Grade. Cocok untuk katering besar. Material Foopak 275gr.',
    sizes: ['XL (A:205x140, B:170x115, T:50)', 'Jumbo (A:205x160, B:180x140, T:50)'],
    materials: ['Food Grade (Foopak 275)'],
    prints: ['1 Warna', 'Full Color'],
    laminasi: ['Laminasi Dalam'],
    minOrder: 500,
    priceMatrix: {
      'XL (A:205x140, B:170x115, T:50)|Food Grade (Foopak 275)|1 Warna|Laminasi Dalam': { 500: 2500, 1000: 2020, 2000: 1830 },
      'XL (A:205x140, B:170x115, T:50)|Food Grade (Foopak 275)|Full Color|Laminasi Dalam': { 500: 2790, 1000: 2190, 2000: 1940 },
      'Jumbo (A:205x160, B:180x140, T:50)|Food Grade (Foopak 275)|1 Warna|Laminasi Dalam': { 500: 2810, 1000: 2300, 2000: 2100 },
      'Jumbo (A:205x160, B:180x140, T:50)|Food Grade (Foopak 275)|Full Color|Laminasi Dalam': { 500: 3100, 1000: 2470, 2000: 2210 },
    }
  },
  {
    id: 5, category: 'lunchbox', name: 'Lunch Box XS Eco-Kraft', emoji: '🥡',
    badge: 'badge-stock', badgeText: 'Ready Stock',
    image: 'media/products/lunch box xs eco-kraft.jpeg',
    material: 'Eco-Kraft', desc: 'Ukuran XS untuk snack, taco, dan porsi kecil. Atas 115x115mm, Bawah 90x90mm, Tinggi 45mm.',
    sizes: ['XS (A:115x115, B:90x90, T:45)'],
    materials: ['Eco-Kraft (275gr)'],
    prints: ['1 Warna', '2 Warna'],
    laminasi: ['Tanpa Laminasi', 'Laminasi Dalam'],
    minOrder: 500,
    priceMatrix: {
      'XS (A:115x115, B:90x90, T:45)|Eco-Kraft (275gr)|1 Warna|Tanpa Laminasi': { 500: 1230, 1000: 880, 2000: 750 },
      'XS (A:115x115, B:90x90, T:45)|Eco-Kraft (275gr)|1 Warna|Laminasi Dalam': { 500: 1455, 1000: 1105, 2000: 975 },
      'XS (A:115x115, B:90x90, T:45)|Eco-Kraft (275gr)|2 Warna|Tanpa Laminasi': { 500: 1360, 1000: 1010, 2000: 840 },
      'XS (A:115x115, B:90x90, T:45)|Eco-Kraft (275gr)|2 Warna|Laminasi Dalam': { 500: 1685, 1000: 1235, 2000: 1065 },
    }
  },
  {
    id: 6, category: 'lunchbox', name: 'Lunch Box XS Food Grade', emoji: '🥡',
    badge: 'badge-stock', badgeText: 'Ready Stock',
    image: 'media/products/lunch box xs food grade.jpeg',
    material: 'Food Grade', desc: 'Ukuran XS Food Grade untuk snack premium. Atas 115x115mm, Bawah 90x90mm, Tinggi 45mm.',
    sizes: ['XS (A:115x115, B:90x90, T:45)'],
    materials: ['Food Grade (Foopak 275)'],
    prints: ['1 Warna', 'Full Color'],
    laminasi: ['Laminasi Dalam'],
    minOrder: 500,
    priceMatrix: {
      'XS (A:115x115, B:90x90, T:45)|Food Grade (Foopak 275)|1 Warna|Laminasi Dalam': { 500: 1600, 1000: 1200, 2000: 1060 },
      'XS (A:115x115, B:90x90, T:45)|Food Grade (Foopak 275)|Full Color|Laminasi Dalam': { 500: 1900, 1000: 1380, 2000: 1170 },
    }
  },
  {
    id: 7, category: 'lunchbox', name: 'Lunch Box Yamie Eco-Kraft (S-L)', emoji: '🍜',
    badge: 'badge-stock', badgeText: 'Tahan Air',
    image: 'media/products/lunch box yamie eco-kraft 1.jpeg',
    material: 'Eco-Kraft', desc: 'Model yamie dengan lapisan tahan air. Cocok untuk yamie dan bubur ayam. Material Kraft 290gr dengan laminasi.',
    sizes: ['S (A:150x105, B:125x83, T:45)', 'M (A:175x110, B:150x85, T:50)', 'L (A:185x130, B:160x105, T:50)'],
    materials: ['Eco-Kraft (290gr Lam)'],
    prints: ['1 Warna', '2 Warna'],
    laminasi: ['Laminasi Dalam'],
    minOrder: 500,
    priceMatrix: {
      'S (A:150x105, B:125x83, T:45)|Eco-Kraft (290gr Lam)|1 Warna|Laminasi Dalam': { 500: 1755, 1000: 1195, 2000: 1065 },
      'S (A:150x105, B:125x83, T:45)|Eco-Kraft (290gr Lam)|2 Warna|Laminasi Dalam': { 500: 1685, 1000: 1235, 2000: 1055 },
      'M (A:175x110, B:150x85, T:50)|Eco-Kraft (290gr Lam)|1 Warna|Laminasi Dalam': { 500: 1690, 1000: 1320, 2000: 1190 },
      'M (A:175x110, B:150x85, T:50)|Eco-Kraft (290gr Lam)|2 Warna|Laminasi Dalam': { 500: 1820, 1000: 1360, 2000: 1180 },
      'L (A:185x130, B:160x105, T:50)|Eco-Kraft (290gr Lam)|1 Warna|Laminasi Dalam': { 500: 1850, 1000: 1570, 2000: 1340 },
      'L (A:185x130, B:160x105, T:50)|Eco-Kraft (290gr Lam)|2 Warna|Laminasi Dalam': { 500: 2080, 1000: 1610, 2000: 1420 },
    }
  },
  {
    id: 8, category: 'lunchbox', name: 'Lunch Box Yamie Food Grade (S-L)', emoji: '🍜',
    badge: 'badge-stock', badgeText: 'Tahan Air',
    image: 'media/products/lunch box yamie food grade.jpeg',
    material: 'Food Grade', desc: 'Model yamie Food Grade Foopak 275gr. Cocok untuk mie panas dan makanan berkuah kental.',
    sizes: ['S (A:150x105, B:125x83, T:45)', 'M (A:175x110, B:150x85, T:50)', 'L (A:185x130, B:160x105, T:50)'],
    materials: ['Food Grade (Foopak 275)'],
    prints: ['1 Warna', 'Full Color'],
    laminasi: ['Laminasi Dalam'],
    minOrder: 500,
    priceMatrix: {
      'S (A:150x105, B:125x83, T:45)|Food Grade (Foopak 275)|1 Warna|Laminasi Dalam': { 500: 1900, 1000: 1480, 2000: 1330 },
      'S (A:150x105, B:125x83, T:45)|Food Grade (Foopak 275)|Full Color|Laminasi Dalam': { 500: 2190, 1000: 1650, 2000: 1440 },
      'M (A:175x110, B:150x85, T:50)|Food Grade (Foopak 275)|1 Warna|Laminasi Dalam': { 500: 2000, 1000: 1580, 2000: 1420 },
      'M (A:175x110, B:150x85, T:50)|Food Grade (Foopak 275)|Full Color|Laminasi Dalam': { 500: 2290, 1000: 1750, 2000: 1530 },
      'L (A:185x130, B:160x105, T:50)|Food Grade (Foopak 275)|1 Warna|Laminasi Dalam': { 500: 2130, 1000: 1700, 2000: 1530 },
      'L (A:185x130, B:160x105, T:50)|Food Grade (Foopak 275)|Full Color|Laminasi Dalam': { 500: 2330, 1000: 1870, 2000: 1640 },
    }
  },
  {
    id: 9, category: 'pail', name: 'Food Pail Eco-Kraft (M-L)', emoji: '🥡',
    badge: 'badge-stock', badgeText: 'Ready Stock',
    image: 'media/products/food pail eco-kraft.jpeg',
    material: 'Eco-Kraft', desc: 'Food pail material Eco-Kraft 290gr. Model tekuk, cocok untuk rice box.',
    sizes: ['M (A:95x84, B:80x65, T:80)', 'L (A:95x85, B:80x65, T:100)'],
    materials: ['Eco-Kraft (290gr Lam)'],
    prints: ['1 Warna', '2 Warna'],
    laminasi: ['Laminasi Dalam'],
    minOrder: 500,
    priceMatrix: {
      'M (A:95x84, B:80x65, T:80)|Eco-Kraft (290gr Lam)|1 Warna|Laminasi Dalam': { 500: 1570, 1000: 1210, 2000: 1080 },
      'M (A:95x84, B:80x65, T:80)|Eco-Kraft (290gr Lam)|2 Warna|Laminasi Dalam': { 500: 1800, 1000: 1350, 2000: 1170 },
      'L (A:95x85, B:80x65, T:100)|Eco-Kraft (290gr Lam)|1 Warna|Laminasi Dalam': { 500: 2040, 1000: 1640, 2000: 1490 },
      'L (A:95x85, B:80x65, T:100)|Eco-Kraft (290gr Lam)|2 Warna|Laminasi Dalam': { 500: 2270, 1000: 1770, 2000: 1580 },
    }
  },
  {
    id: 10, category: 'pail', name: 'Food Pail Food Grade (M-L)', emoji: '🥡',
    badge: 'badge-stock', badgeText: 'Ready Stock',
    image: 'media/products/food pail food grade.jpeg',
    material: 'Food Grade', desc: 'Food pail material Food Grade Foopak 275gr. Tahan minyak dan aman untuk makanan basah.',
    sizes: ['M (A:95x84, B:80x65, T:80)', 'L (A:95x85, B:80x65, T:100)'],
    materials: ['Food Grade (Foopak 275)'],
    prints: ['1 Warna', 'Full Color'],
    laminasi: ['Laminasi Dalam'],
    minOrder: 500,
    priceMatrix: {
      'M (A:95x84, B:80x65, T:80)|Food Grade (Foopak 275)|1 Warna|Laminasi Dalam': { 500: 2240, 1000: 1790, 2000: 1610 },
      'M (A:95x84, B:80x65, T:80)|Food Grade (Foopak 275)|Full Color|Laminasi Dalam': { 500: 2530, 1000: 1960, 2000: 1720 },
      'L (A:95x85, B:80x65, T:100)|Food Grade (Foopak 275)|1 Warna|Laminasi Dalam': { 500: 2260, 1000: 1810, 2000: 1630 },
      'L (A:95x85, B:80x65, T:100)|Food Grade (Foopak 275)|Full Color|Laminasi Dalam': { 500: 2450, 1000: 1980, 2000: 1740 },
    }
  },
  {
    id: 11, category: 'other', name: 'Burger Box Eco-Kraft', emoji: '🍔',
    badge: 'badge-stock', badgeText: 'Ready Stock',
    image: 'media/products/burger box eco-kraft.jpeg',
    material: 'Eco-Kraft', desc: 'Burger box 100x85x80mm material Eco-Kraft 290gr Lam.',
    sizes: ['100x85x80'],
    materials: ['Eco-Kraft (290gr Lam)'],
    prints: ['1 Warna', '2 Warna'],
    laminasi: ['Laminasi Dalam'],
    minOrder: 500,
    priceMatrix: {
      '100x85x80|Eco-Kraft (290gr Lam)|1 Warna|Laminasi Dalam': { 500: 1560, 1000: 1300, 2000: 1170 },
      '100x85x80|Eco-Kraft (290gr Lam)|2 Warna|Laminasi Dalam': { 500: 1890, 1000: 1540, 2000: 1260 },
    }
  },
  {
    id: 12, category: 'other', name: 'Burger Box Food Grade', emoji: '🍔',
    badge: 'badge-stock', badgeText: 'Ready Stock',
    image: 'media/products/burger box food grade.jpeg',
    material: 'Food Grade', desc: 'Burger box Food Grade Foopak 275gr. Aman dan higienis.',
    sizes: ['100x85x80'],
    materials: ['Food Grade (Foopak 275)'],
    prints: ['1 Warna', 'Full Color'],
    laminasi: ['Laminasi Dalam'],
    minOrder: 500,
    priceMatrix: {
      '100x85x80|Food Grade (Foopak 275)|1 Warna|Laminasi Dalam': { 500: 1960, 1000: 1560, 2000: 1200 },
      '100x85x80|Food Grade (Foopak 275)|Full Color|Laminasi Dalam': { 500: 2150, 1000: 1730, 2000: 1410 },
    }
  },
  {
    id: 13, category: 'other', name: 'Food Tray Eco-Kraft (M-L)', emoji: '🥗',
    badge: 'badge-stock', badgeText: 'Ready Stock',
    image: 'media/products/food tray eco kraft.jpeg',
    material: 'Eco-Kraft', desc: 'Food tray terbuka Eco-Kraft 275gr. Cocok untuk gorengan dan sushi.',
    sizes: ['M (150x80x50)', 'L (160x105x50)'],
    materials: ['Eco-Kraft (275gr)'],
    prints: ['1 Warna', '2 Warna'],
    laminasi: ['Laminasi Dalam'],
    minOrder: 500,
    priceMatrix: {
      'M (150x80x50)|Eco-Kraft (275gr)|1 Warna|Laminasi Dalam': { 500: 1285, 1000: 835, 2000: 715 },
      'M (150x80x50)|Eco-Kraft (275gr)|2 Warna|Laminasi Dalam': { 500: 1515, 1000: 975, 2000: 805 },
      'L (160x105x50)|Eco-Kraft (275gr)|1 Warna|Laminasi Dalam': { 500: 1435, 1000: 995, 2000: 875 },
      'L (160x105x50)|Eco-Kraft (275gr)|2 Warna|Laminasi Dalam': { 500: 1665, 1000: 1125, 2000: 955 },
    }
  },
  {
    id: 14, category: 'other', name: 'Food Tray Food Grade (M-L)', emoji: '🥗',
    badge: 'badge-stock', badgeText: 'Ready Stock',
    image: 'media/products/food tray foodgrade.jpeg',
    material: 'Food Grade', desc: 'Food tray terbuka Food Grade Foopak 275gr.',
    sizes: ['M (150x80x50)', 'L (160x105x50)'],
    materials: ['Food Grade (Foopak 275)'],
    prints: ['1 Warna', 'Full Color'],
    laminasi: ['Laminasi Dalam'],
    minOrder: 500,
    priceMatrix: {
      'M (150x80x50)|Food Grade (Foopak 275)|1 Warna|Laminasi Dalam': { 500: 1575, 1000: 1095, 2000: 965 },
      'M (150x80x50)|Food Grade (Foopak 275)|Full Color|Laminasi Dalam': { 500: 1765, 1000: 1275, 2000: 1075 },
      'L (160x105x50)|Food Grade (Foopak 275)|1 Warna|Laminasi Dalam': { 500: 1615, 1000: 1135, 2000: 995 },
      'L (160x105x50)|Food Grade (Foopak 275)|Full Color|Laminasi Dalam': { 500: 1905, 1000: 1305, 2000: 1005 },
    }
  },
  {
    id: 15, category: 'chicken', name: 'Dus Fried Chicken Eco-Kraft', emoji: '🍗',
    badge: 'badge-stock', badgeText: 'Ready Stock',
    image: 'media/products/dus fried chicken eco-kraft 275 gr.jpeg',
    material: 'Eco-Kraft', desc: 'Dus fried chicken 170x107x60mm material Kraftline. Cocok untuk porsi standar.',
    sizes: ['170x107x60'],
    materials: ['Kraftline 275gr', 'Kraftline 290gr Lam'],
    prints: ['1 Warna', '2 Warna'],
    laminasi: ['Tanpa Laminasi', 'Laminasi Dalam ½'],
    minOrder: 500,
    priceMatrix: {
      '170x107x60|Kraftline 275gr|1 Warna|Tanpa Laminasi': { 500: 1450, 1000: 1070, 2000: 940 },
      '170x107x60|Kraftline 275gr|1 Warna|Laminasi Dalam ½': { 500: 1655, 1000: 1275, 2000: 1145 },
      '170x107x60|Kraftline 275gr|2 Warna|Tanpa Laminasi': { 500: 1680, 1000: 1210, 2000: 1020 },
      '170x107x60|Kraftline 275gr|2 Warna|Laminasi Dalam ½': { 500: 1885, 1000: 1415, 2000: 1225 },
    }
  },
  {
    id: 16, category: 'chicken', name: 'Dus Fried Chicken Duplex 310gr', emoji: '🍗',
    badge: 'badge-hot', badgeText: 'Popular',
    image: 'media/products/dus fried chicken duplex 310 gr.jpeg',
    material: 'Duplex', desc: 'Duplex 310gr, tampilan premium dan kokoh untuk brand fried chicken Anda.',
    sizes: ['170x107x60'],
    materials: ['Duplex 310gr'],
    prints: ['1 Warna', 'Full Color'],
    laminasi: ['Tanpa Laminasi', 'Laminasi Dalam ½'],
    minOrder: 500,
    priceMatrix: {
      '170x107x60|Duplex 310gr|1 Warna|Tanpa Laminasi': { 500: 1830, 1000: 1330, 2000: 1170 },
      '170x107x60|Duplex 310gr|1 Warna|Laminasi Dalam ½': { 500: 1935, 1000: 1535, 2000: 1375 },
      '170x107x60|Duplex 310gr|Full Color|Tanpa Laminasi': { 500: 2020, 1000: 1500, 2000: 1290 },
      '170x107x60|Duplex 310gr|Full Color|Laminasi Dalam ½': { 500: 2225, 1000: 1705, 2000: 1495 },
    }
  },
  {
    id: 17, category: 'chicken', name: 'Dus Fried Chicken Duplex 250gr', emoji: '🍗',
    badge: 'badge-stock', badgeText: 'Ready Stock',
    image: 'media/products/dus fried chicken duplex 250 gr.jpeg',
    material: 'Duplex', desc: 'Duplex 250gr, opsi ekonomis namun tetap terlihat profesional.',
    sizes: ['170x107x60'],
    materials: ['Duplex 250gr'],
    prints: ['1 Warna', 'Full Color'],
    laminasi: ['Tanpa Laminasi', 'Laminasi Dalam ½'],
    minOrder: 500,
    priceMatrix: {
      '170x107x60|Duplex 250gr|1 Warna|Tanpa Laminasi': { 500: 1730, 1000: 1240, 2000: 1090 },
      '170x107x60|Duplex 250gr|1 Warna|Laminasi Dalam ½': { 500: 1935, 1000: 1445, 2000: 1295 },
      '170x107x60|Duplex 250gr|Full Color|Tanpa Laminasi': { 500: 2020, 1000: 1410, 2000: 1200 },
      '170x107x60|Duplex 250gr|Full Color|Laminasi Dalam ½': { 500: 2225, 1000: 1615, 2000: 1405 },
    }
  },
  {
    id: 18, category: 'chicken', name: 'Dus Ayam Geprek Eco-Kraft', emoji: '🌶️',
    badge: 'badge-stock', badgeText: 'Ready Stock',
    image: 'media/products/dus ayam goreng eco-kraft.jpeg',
    material: 'Eco-Kraft', desc: 'Dus khusus ayam geprek material Kraft 275gr. Bawah 125x83mm.',
    sizes: ['125x83x45'],
    materials: ['Eco-Kraft (275gr)'],
    prints: ['1 Warna', '2 Warna'],
    laminasi: ['Tanpa Laminasi', 'Laminasi Dalam'],
    minOrder: 500,
    priceMatrix: {
      '125x83x45|Eco-Kraft (275gr)|1 Warna|Tanpa Laminasi': { 500: 1380, 1000: 920, 2000: 790 },
      '125x83x45|Eco-Kraft (275gr)|1 Warna|Laminasi Dalam': { 500: 1605, 1000: 1145, 2000: 1015 },
      '125x83x45|Eco-Kraft (275gr)|2 Warna|Tanpa Laminasi': { 500: 1610, 1000: 1060, 2000: 880 },
      '125x83x45|Eco-Kraft (275gr)|2 Warna|Laminasi Dalam': { 500: 1835, 1000: 1285, 2000: 1105 },
    }
  },
  {
    id: 19, category: 'chicken', name: 'Dus Ayam Geprek Food Grade', emoji: '🌶️',
    badge: 'badge-stock', badgeText: 'Ready Stock',
    image: 'media/products/dus ayam geprek food grade.jpeg',
    material: 'Food Grade', desc: 'Dus ayam geprek Food Grade Foopak 275gr. Aman untuk sambal berminyak.',
    sizes: ['125x83x45'],
    materials: ['Food Grade (Foopak 275)'],
    prints: ['1 Warna', 'Full Color'],
    laminasi: ['Laminasi Dalam'],
    minOrder: 500,
    priceMatrix: {
      '125x83x45|Food Grade (Foopak 275)|1 Warna|Laminasi Dalam': { 500: 1950, 1000: 1430, 2000: 1280 },
      '125x83x45|Food Grade (Foopak 275)|Full Color|Laminasi Dalam': { 500: 2140, 1000: 1600, 2000: 1390 },
    }
  },
  {
    id: 20, category: 'other', name: 'Dus Kentang Goreng Kraftline', emoji: '🍟',
    badge: 'badge-stock', badgeText: 'Ready Stock',
    image: 'media/products/dus kentang goreng 1.jpeg',
    material: 'Eco-Kraft', desc: 'Dus kentang goreng material Kraftline 275gr.',
    sizes: ['85x45x100'],
    materials: ['Kraftline 275gr'],
    prints: ['1 Warna', '2 Warna'],
    laminasi: ['Tanpa Laminasi', 'Laminasi Dalam'],
    minOrder: 500,
    priceMatrix: {
      '85x45x100|Kraftline 275gr|1 Warna|Tanpa Laminasi': { 500: 1390, 1000: 980, 2000: 820 },
      '85x45x100|Kraftline 275gr|1 Warna|Laminasi Dalam': { 500: 1640, 1000: 1230, 2000: 1070 },
      '85x45x100|Kraftline 275gr|2 Warna|Tanpa Laminasi': { 500: 1600, 1000: 1090, 2000: 890 },
      '85x45x100|Kraftline 275gr|2 Warna|Laminasi Dalam': { 500: 1850, 1000: 1340, 2000: 1140 },
    }
  },
  {
    id: 21, category: 'other', name: 'Dus Kentang Goreng Ivory', emoji: '🍟',
    badge: 'badge-stock', badgeText: 'Ready Stock',
    image: 'media/products/dus kentang goreng 2.jpeg',
    material: 'Ivory', desc: 'Dus kentang goreng material Ivory 230gr (Putih).',
    sizes: ['85x45x100'],
    materials: ['Ivory 230gr'],
    prints: ['1 Warna', 'Full Color'],
    laminasi: ['Tanpa Laminasi', 'Laminasi Dalam'],
    minOrder: 500,
    priceMatrix: {
      '85x45x100|Ivory 230gr|1 Warna|Tanpa Laminasi': { 500: 1440, 1000: 1000, 2000: 830 },
      '85x45x100|Ivory 230gr|1 Warna|Laminasi Dalam': { 500: 1690, 1000: 1250, 2000: 1080 },
      '85x45x100|Ivory 230gr|Full Color|Tanpa Laminasi': { 500: 1710, 1000: 1150, 2000: 920 },
      '85x45x100|Ivory 230gr|Full Color|Laminasi Dalam': { 500: 1960, 1000: 1400, 2000: 1170 },
    }
  },
  {
    id: 22, category: 'other', name: 'Dus Kentang Goreng Food Grade', emoji: '🍟',
    badge: 'badge-stock', badgeText: 'Ready Stock',
    image: 'media/products/dus kentang goreng 3.jpeg',
    material: 'Food Grade', desc: 'Dus kentang goreng material Food Grade Foopak 275gr.',
    sizes: ['85x45x100'],
    materials: ['Foopak 275gr'],
    prints: ['1 Warna', 'Full Color'],
    laminasi: ['Laminasi Dalam'],
    minOrder: 500,
    priceMatrix: {
      '85x45x100|Foopak 275gr|1 Warna|Laminasi Dalam': { 500: 1620, 1000: 1150, 2000: 970 },
      '85x45x100|Foopak 275gr|Full Color|Laminasi Dalam': { 500: 1890, 1000: 1300, 2000: 1060 },
    }
  },
  {
    id: 23, category: 'nasi', name: 'Dus Nasi Atasan 310gr (Pendek)', emoji: '🍚',
    badge: 'badge-stock', badgeText: 'Duplex 310',
    image: 'media/products/dus nasi atasan 1.jpeg',
    material: 'Duplex', desc: 'Dus nasi atasan Duplex 310gr tinggi pendek (30-35mm). Ukuran 150x150 s/d 220x220.',
    sizes: ['150x150x30', '180x180x35', '200x200x35', '220x220x35'],
    materials: ['Duplex 310gr'],
    prints: ['1 Warna', 'Full Color'],
    laminasi: ['Tanpa Laminasi'],
    minOrder: 500,
    priceMatrix: {
      '150x150x30|Duplex 310gr|1 Warna|Tanpa Laminasi': { 500: 1170, 1000: 920, 2000: 790 },
      '150x150x30|Duplex 310gr|Full Color|Tanpa Laminasi': { 500: 1470, 1000: 1090, 2000: 900 },
      '180x180x35|Duplex 310gr|1 Warna|Tanpa Laminasi': { 500: 1500, 1000: 930, 2000: 790 },
      '180x180x35|Duplex 310gr|Full Color|Tanpa Laminasi': { 500: 1590, 1000: 1100, 2000: 900 },
      '200x200x35|Duplex 310gr|1 Warna|Tanpa Laminasi': { 500: 1420, 1000: 1040, 2000: 900 },
      '200x200x35|Duplex 310gr|Full Color|Tanpa Laminasi': { 500: 1710, 1000: 1210, 2000: 1010 },
      '220x220x35|Duplex 310gr|1 Warna|Tanpa Laminasi': { 500: 1440, 1000: 1060, 2000: 820 },
      '220x220x35|Duplex 310gr|Full Color|Tanpa Laminasi': { 500: 1730, 1000: 1230, 2000: 930 },
    }
  },
  {
    id: 24, category: 'nasi', name: 'Dus Nasi Atasan 310gr (Tinggi)', emoji: '🍚',
    badge: 'badge-stock', badgeText: 'Duplex 310',
    image: 'media/products/dus nasi atasan 2.jpeg',
    material: 'Duplex', desc: 'Dus nasi atasan Duplex 310gr tinggi (50-55mm). Ukuran 150x150 s/d 220x220.',
    sizes: ['150x150x50', '180x180x55', '200x200x55', '220x220x55'],
    materials: ['Duplex 310gr'],
    prints: ['1 Warna', 'Full Color'],
    laminasi: ['Tanpa Laminasi'],
    minOrder: 500,
    priceMatrix: {
      '150x150x50|Duplex 310gr|1 Warna|Tanpa Laminasi': { 500: 1300, 1000: 1030, 2000: 890 },
      '150x150x50|Duplex 310gr|Full Color|Tanpa Laminasi': { 500: 1590, 1000: 1200, 2000: 1000 },
      '180x180x55|Duplex 310gr|1 Warna|Tanpa Laminasi': { 500: 1420, 1000: 1040, 2000: 900 },
      '180x180x55|Duplex 310gr|Full Color|Tanpa Laminasi': { 500: 1710, 1000: 1210, 2000: 1010 },
      '200x200x55|Duplex 310gr|1 Warna|Tanpa Laminasi': { 500: 1620, 1000: 1220, 2000: 970 },
      '200x200x55|Duplex 310gr|Full Color|Tanpa Laminasi': { 500: 1910, 1000: 1390, 2000: 1080 },
      '220x220x55|Duplex 310gr|1 Warna|Tanpa Laminasi': { 500: 1540, 1000: 1240, 2000: 990 },
      '220x220x55|Duplex 310gr|Full Color|Tanpa Laminasi': { 500: 1930, 1000: 1510, 2000: 1100 },
    }
  },
  {
    id: 25, category: 'nasi', name: 'Dus Nasi Bawahan 310gr', emoji: '🍚',
    badge: 'badge-stock', badgeText: 'Duplex 310',
    image: 'media/products/dus nasi bawahan.jpeg',
    material: 'Duplex', desc: 'Dus nasi bawahan Duplex 310gr (70-75mm). Ukuran 150x150 s/d 220x220.',
    sizes: ['150x150x70', '180x180x75', '200x200x75', '220x220x75'],
    materials: ['Duplex 310gr'],
    prints: ['1 Warna', 'Full Color'],
    laminasi: ['Tanpa Laminasi'],
    minOrder: 500,
    priceMatrix: {
      '150x150x70|Duplex 310gr|1 Warna|Tanpa Laminasi': { 500: 1320, 1000: 1040, 2000: 900 },
      '150x150x70|Duplex 310gr|Full Color|Tanpa Laminasi': { 500: 1610, 1000: 1210, 2000: 1010 },
      '180x180x75|Duplex 310gr|1 Warna|Tanpa Laminasi': { 500: 1620, 1000: 1220, 2000: 970 },
      '180x180x75|Duplex 310gr|Full Color|Tanpa Laminasi': { 500: 1910, 1000: 1390, 2000: 1080 },
      '200x200x75|Duplex 310gr|1 Warna|Tanpa Laminasi': { 500: 1790, 1000: 1370, 2000: 1110 },
      '200x200x75|Duplex 310gr|Full Color|Tanpa Laminasi': { 500: 2080, 1000: 1640, 2000: 1220 },
      '220x220x75|Duplex 310gr|1 Warna|Tanpa Laminasi': { 500: 2570, 1000: 1930, 2000: 1550 },
      '220x220x75|Duplex 310gr|Full Color|Tanpa Laminasi': { 500: 2930, 1000: 2150, 2000: 1720 },
    }
  },
  {
    id: 26, category: 'nasi', name: 'Dus Nasi Tebal Atasan 350gr (Pendek)', emoji: '🍚',
    badge: 'badge-hot', badgeText: 'Duplex 350',
    image: 'media/products/dus nasi atasan 3.jpeg',
    material: 'Duplex', desc: 'Dus nasi atasan Duplex 350gr (Tebal) tinggi pendek (30-35mm). Ukuran 150x150 s/d 220x220.',
    sizes: ['150x150x30', '180x180x35', '200x200x35', '220x220x35'],
    materials: ['Duplex 350gr'],
    prints: ['1 Warna', 'Full Color'],
    laminasi: ['Tanpa Laminasi'],
    minOrder: 500,
    priceMatrix: {
      '150x150x30|Duplex 350gr|1 Warna|Tanpa Laminasi': { 500: 1200, 1000: 940, 2000: 820 },
      '150x150x30|Duplex 350gr|Full Color|Tanpa Laminasi': { 500: 1500, 1000: 1120, 2000: 930 },
      '180x180x35|Duplex 350gr|1 Warna|Tanpa Laminasi': { 500: 1340, 1000: 960, 2000: 730 },
      '180x180x35|Duplex 350gr|Full Color|Tanpa Laminasi': { 500: 1630, 1000: 1140, 2000: 840 },
      '200x200x35|Duplex 350gr|1 Warna|Tanpa Laminasi': { 500: 1470, 1000: 1090, 2000: 840 },
      '200x200x35|Duplex 350gr|Full Color|Tanpa Laminasi': { 500: 1760, 1000: 1260, 2000: 950 },
      '220x220x35|Duplex 350gr|1 Warna|Tanpa Laminasi': { 500: 1490, 1000: 1110, 2000: 860 },
      '220x220x35|Duplex 350gr|Full Color|Tanpa Laminasi': { 500: 1780, 1000: 1280, 2000: 970 },
    }
  },
  {
    id: 27, category: 'nasi', name: 'Dus Nasi Tebal Atasan 350gr (Tinggi)', emoji: '🍚',
    badge: 'badge-hot', badgeText: 'Duplex 350',
    image: 'media/products/dus nasi atasan 4.jpeg',
    material: 'Duplex', desc: 'Dus nasi atasan Duplex 350gr (Tebal) tinggi (50-55mm). Ukuran 150x150 s/d 220x220.',
    sizes: ['150x150x50', '180x180x55', '200x200x55', '220x220x55'],
    materials: ['Duplex 350gr'],
    prints: ['1 Warna', 'Full Color'],
    laminasi: ['Tanpa Laminasi'],
    minOrder: 500,
    priceMatrix: {
      '150x150x50|Duplex 350gr|1 Warna|Tanpa Laminasi': { 500: 1340, 1000: 1060, 2000: 930 },
      '150x150x50|Duplex 350gr|Full Color|Tanpa Laminasi': { 500: 1630, 1000: 1240, 2000: 1040 },
      '180x180x55|Duplex 350gr|1 Warna|Tanpa Laminasi': { 500: 1470, 1000: 1090, 2000: 840 },
      '180x180x55|Duplex 350gr|Full Color|Tanpa Laminasi': { 500: 1760, 1000: 1260, 2000: 950 },
      '200x200x55|Duplex 350gr|1 Warna|Tanpa Laminasi': { 500: 1690, 1000: 1280, 2000: 1030 },
      '200x200x55|Duplex 350gr|Full Color|Tanpa Laminasi': { 500: 1980, 1000: 1450, 2000: 1140 },
      '220x220x55|Duplex 350gr|1 Warna|Tanpa Laminasi': { 500: 1710, 1000: 1300, 2000: 1050 },
      '220x220x55|Duplex 350gr|Full Color|Tanpa Laminasi': { 500: 2000, 1000: 1470, 2000: 1160 },
    }
  },
  {
    id: 28, category: 'nasi', name: 'Dus Nasi Tebal Bawahan 350gr', emoji: '🍚',
    badge: 'badge-hot', badgeText: 'Duplex 350',
    image: 'media/products/dus nasi bawahan 2.jpeg',
    material: 'Duplex', desc: 'Dus nasi bawahan Duplex 350gr (Tebal, 70-75mm). Ukuran 150x150 s/d 220x220.',
    sizes: ['150x150x70', '180x180x75', '200x200x75', '220x220x75'],
    materials: ['Duplex 350gr'],
    prints: ['1 Warna', 'Full Color'],
    laminasi: ['Tanpa Laminasi'],
    minOrder: 500,
    priceMatrix: {
      '150x150x70|Duplex 350gr|1 Warna|Tanpa Laminasi': { 500: 1470, 1000: 1190, 2000: 1040 },
      '150x150x70|Duplex 350gr|Full Color|Tanpa Laminasi': { 500: 1760, 1000: 1360, 2000: 1150 },
      '180x180x75|Duplex 350gr|1 Warna|Tanpa Laminasi': { 500: 1690, 1000: 1280, 2000: 1030 },
      '180x180x75|Duplex 350gr|Full Color|Tanpa Laminasi': { 500: 1980, 1000: 1450, 2000: 1140 },
      '200x200x75|Duplex 350gr|1 Warna|Tanpa Laminasi': { 500: 1870, 1000: 1450, 2000: 1180 },
      '200x200x75|Duplex 350gr|Full Color|Tanpa Laminasi': { 500: 2060, 1000: 1620, 2000: 1290 },
      '220x220x75|Duplex 350gr|1 Warna|Tanpa Laminasi': { 500: 2580, 1000: 2020, 2000: 1640 },
      '220x220x75|Duplex 350gr|Full Color|Tanpa Laminasi': { 500: 3130, 1000: 2250, 2000: 1800 },
    }
  },
  {
    id: 29, category: 'martabak', name: 'Dus Martabak Duplex (Uk. 1-4)', emoji: '🥞',
    badge: 'badge-stock', badgeText: 'Ready Stock',
    image: 'media/products/dus martabak duplex.jpeg',
    material: 'Duplex', desc: 'Dus martabak Duplex 310gr. UK 1 (210x135x40) s/d UK 4 (250x150x47).',
    sizes: ['Uk. 1 (210x135x40)', 'Uk. 2 (240x135x50)', 'Uk. 3 (245x150x50)', 'Uk. 4 (250x150x47)'],
    materials: ['Duplex 310gr'],
    prints: ['1 Warna', 'Full Color'],
    laminasi: ['Tanpa Laminasi', 'Laminasi Dalam'],
    minOrder: 500,
    priceMatrix: {
      'Uk. 1 (210x135x40)|Duplex 310gr|1 Warna|Tanpa Laminasi': { 500: 1550, 1000: 1250, 2000: 1090 },
      'Uk. 2 (240x135x50)|Duplex 310gr|1 Warna|Tanpa Laminasi': { 500: 1870, 1000: 1520, 2000: 1340 },
      'Uk. 3 (245x150x50)|Duplex 310gr|1 Warna|Tanpa Laminasi': { 500: 1970, 1000: 1620, 2000: 1440 },
      'Uk. 4 (250x150x47)|Duplex 310gr|1 Warna|Tanpa Laminasi': { 500: 1870, 1000: 1520, 2000: 1340 },
    }
  },
  {
    id: 30, category: 'martabak', name: 'Dus Martabak Food Grade (Uk. 1-4)', emoji: '🥞',
    badge: 'badge-stock', badgeText: 'Food Grade',
    image: 'media/products/dus martabak food grade.jpeg',
    material: 'Food Grade', desc: 'Dus martabak Food Grade Foopak 275gr. UK 1 (210x135x40) s/d UK 4 (250x150x47).',
    sizes: ['Uk. 1 (210x135x40)', 'Uk. 2 (240x135x50)', 'Uk. 3 (245x150x50)', 'Uk. 4 (250x150x47)'],
    materials: ['Food Grade (Foopak 275)'],
    prints: ['1 Warna', 'Full Color'],
    laminasi: ['Laminasi Dalam'],
    minOrder: 500,
    priceMatrix: {
      'Uk. 1 (210x135x40)|Food Grade (Foopak 275)|1 Warna|Laminasi Dalam': { 500: 2300, 1000: 1920, 2000: 1730 },
      'Uk. 2 (240x135x50)|Food Grade (Foopak 275)|1 Warna|Laminasi Dalam': { 500: 2520, 1000: 2100, 2000: 1900 },
      'Uk. 3 (245x150x50)|Food Grade (Foopak 275)|1 Warna|Laminasi Dalam': { 500: 2730, 1000: 2310, 2000: 2100 },
      'Uk. 4 (250x150x47)|Food Grade (Foopak 275)|1 Warna|Laminasi Dalam': { 500: 2990, 1000: 2530, 2000: 2300 },
    }
  },
  {
    id: 31, category: 'paper', name: 'Kertas Nasi 220×270mm', emoji: '📄',
    badge: 'badge-stock', badgeText: 'Ready Stock',
    image: 'media/products/kertas nasi.jpeg',
    material: 'Kertas', desc: 'Kertas nasi food grade untuk membungkus nasi.',
    sizes: ['220x270mm'],
    materials: ['Plain Paper'],
    prints: ['1 Warna', 'Full Color'],
    laminasi: ['Non Blok'],
    minOrder: 1000,
    priceMatrix: {
      '220x270mm|Plain Paper|1 Warna|Non Blok': { 1000: 690, 2000: 490 },
    }
  },
  {
    id: 32, category: 'paper', name: 'Food Wrapping Paper 250×350mm', emoji: '🧻',
    badge: 'badge-stock', badgeText: 'Custom Size',
    image: 'media/products/food wrapping paper.jpeg',
    material: 'Foopak/Grease', desc: 'Food wrapping paper Foopak/Grease 40gr.',
    sizes: ['250x350mm'],
    materials: ['Foopak/Grease Paper 40gr'],
    prints: ['1 Warna', 'Full Color'],
    laminasi: ['Non Blok'],
    minOrder: 1000,
    priceMatrix: {
      '250x350mm|Foopak/Grease Paper 40gr|1 Warna|Non Blok': { 1000: 890, 2000: 690 },
    }
  },
  {
    id: 33, category: 'paper', name: 'Standing Pouch Paper Metalized', emoji: '🛍️',
    badge: 'badge-new', badgeText: 'Premium',
    image: 'media/products/standing pouch paper metalized.jpeg',
    material: 'Paper Metalized', desc: 'Standing pouch AP120 Metalized Gloss/Doff.',
    sizes: ['130x170mm', '130x200mm', '140x220mm', '160x250mm', '180x280mm', '200x300mm'],
    materials: ['AP120 Metalized Glosst', 'AP120 Metalized Doff'],
    prints: ['Full Color'],
    laminasi: ['Glosst', 'Doff'],
    minOrder: 100,
    priceMatrix: {
      '130x170mm|AP120 Metalized Glosst|Full Color|Glosst': { 500: 2725 },
    }
  },
  {
    id: 34, category: 'paper', name: 'Kantong Ayam Goreng', emoji: '🛍️',
    badge: 'badge-stock', badgeText: 'Isi 500',
    image: 'media/products/kantong ayam goreng s.jpeg',
    material: 'Grease Paper', desc: 'Kantong ayam goreng Foopak/Grease 40gr.',
    sizes: ['S (120x160mm)', 'L (140x200mm)'],
    materials: ['Foopak/Grease Paper 40gr'],
    prints: ['1 Warna', '2 Warna', 'Full Color'],
    laminasi: ['Cetak Non-blok'],
    minOrder: 1000,
    priceMatrix: {
      'S (120x160mm)|Foopak/Grease Paper 40gr|1 Warna|Cetak Non-blok': { 1000: 1055 },
    }
  },
  {
    id: 35, category: 'paper', name: 'Sachet Paper Metalized', emoji: '💊',
    badge: 'badge-new', badgeText: 'Premium',
    image: 'media/products/sachet paper metalized.jpeg',
    material: 'Paper Metalized', desc: 'Sachet AP120 Metalized.',
    sizes: ['70x100mm', '90x130mm', '100x150mm', '120x170mm'],
    materials: ['AP120 Metalized Glosst', 'AP120 Metalized Doff'],
    prints: ['Full Color'],
    laminasi: ['Glosst', 'Doff'],
    minOrder: 1000,
    priceMatrix: {
      '70x100mm|AP120 Metalized Glosst|Full Color|Glosst': { 1000: 1600 },
    }
  },
  {
    id: 36, category: 'paper', name: 'Gusset Paper Metalized', emoji: '🛍️',
    badge: 'badge-new', badgeText: 'Premium',
    image: 'media/products/gusset paper metalized.jpeg',
    material: 'Paper Metalized', desc: 'Kemasan Gusset AP120 Metalized untuk kopi giling, teh, coklat bubuk. Min. order 100pcs.',
    sizes: ['10x20x6cm', '12x25x7cm'],
    materials: ['AP120 Metalized Glosst', 'AP120 Metalized Doff'],
    prints: ['Full Color'],
    laminasi: ['Glosst', 'Doff'],
    minOrder: 100,
    priceMatrix: {
      '10x20x6cm|AP120 Metalized Glosst|Full Color|Glosst': { 500: 2500, 1000: 1800, 2000: 1500, 5000: 1200 },
      '10x20x6cm|AP120 Metalized Doff|Full Color|Doff': { 500: 2500, 1000: 1800, 2000: 1500, 5000: 1200 },
      '12x25x7cm|AP120 Metalized Glosst|Full Color|Glosst': { 500: 3000, 1000: 2200, 2000: 1900, 5000: 1500 },
      '12x25x7cm|AP120 Metalized Doff|Full Color|Doff': { 500: 3000, 1000: 2200, 2000: 1900, 5000: 1500 },
    }
  },
  {
    id: 37, category: 'paper', name: 'Gift Wrap / Wrapping Kado', emoji: '🎁',
    badge: 'badge-stock', badgeText: 'Souvenir',
    image: 'media/products/gift wrap (non-food).jpeg',
    material: 'Art Paper', desc: 'Kertas kado eksklusif custom cetak full color. Ukuran 510x360mm. Bahan Art Paper 120gr.',
    sizes: ['510x360mm'],
    materials: ['Art Paper 120gr'],
    prints: ['Full Color'],
    laminasi: ['Tanpa Laminasi'],
    minOrder: 1000,
    priceMatrix: {
      '510x360mm|Art Paper 120gr|Full Color|Tanpa Laminasi': { 1000: 3300, 2000: 1650, 5000: 1050 }
    }
  }
];

// ── RENDER PRODUCTS
function getBasePrice(p) {
  // Get the lowest price from priceMatrix across all combos at best qty tier
  let min = Infinity;
  Object.values(p.priceMatrix).forEach(tiers => {
    Object.values(tiers).forEach(v => { if (v < min) min = v; });
  });
  return min === Infinity ? 0 : min;
}

function renderProducts(filter = 'all') {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  PRODUCTS.forEach((p, i) => {
    const show = filter === 'all' || p.category === filter;
    const card = document.createElement('div');
    card.className = 'product-card reveal' + (show ? ' visible' : '');
    card.style.animationDelay = (i % 6 * 0.07) + 's';
    const base = getBasePrice(p);
    card.innerHTML = `
      <div class="glare"></div>
      <div class="card-image">
        <div class="card-image-inner">
          <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async">
        </div>
        <span class="card-badge ${p.badge}">${p.badgeText}</span>
      </div>
      <div class="card-body">
        <div class="card-category">${p.material}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-desc">${p.desc}</div>
        <div class="card-sizes">
          ${p.sizes.slice(0, 3).map(s => `<span class="size-tag">${s}</span>`).join('')}
          ${p.sizes.length > 3 ? `<span class="size-tag more-tag">+${p.sizes.length - 3} more</span>` : ''}
        </div>
        <div class="card-footer">
          <div class="card-price">
            <span class="price-from">From</span>
            <span class="price-value">Rp ${base.toLocaleString('id')}</span>
            <span class="price-unit">/ pcs</span>
          </div>
          <button class="add-btn" onclick="openModal(${p.id}, event)">+</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
    setTimeout(() => observer.observe(card), 50);
  });
}

renderProducts();

function filterProducts(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(cat);
}

// ── MODAL
let currentProduct = null;
let currentQty = 500;

function openModal(id, e) {
  e.stopPropagation();
  currentProduct = PRODUCTS.find(p => p.id === id);
  if (!currentProduct) return;

  document.getElementById('modalImage').innerHTML = `<img src="${currentProduct.image}" alt="${currentProduct.name}">`;
  document.getElementById('modalCat').textContent = currentProduct.material;
  document.getElementById('modalName').textContent = currentProduct.name;
  document.getElementById('modalDesc').textContent = currentProduct.desc;
  currentQty = currentProduct.minOrder;
  document.getElementById('qtyVal').textContent = currentQty;
  document.getElementById('qtyHint').textContent = `Min. order ${currentProduct.minOrder} pcs`;

  renderChips('sizeChips', currentProduct.sizes, 'size');
  renderChips('materialChips', currentProduct.materials, 'material');
  renderChips('printChips', currentProduct.prints, 'print');
  renderChips('laminasiChips', currentProduct.laminasi, 'laminasi');

  updatePrice();
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderChips(containerId, items, type) {
  const c = document.getElementById(containerId);
  c.innerHTML = items.map((item, i) =>
    `<button class="chip ${i === 0 ? 'active' : ''}" data-type="${type}" onclick="selectChip(this,'${type}')">${item}</button>`
  ).join('');
}

function selectChip(el, type) {
  document.querySelectorAll(`.chip[data-type="${type}"]`).forEach(c => c.classList.remove('active'));
  el.classList.add('active');

  if (type === 'material') {
    updateDynamicOptions(el.textContent);
  }

  updatePrice();
}

function updateDynamicOptions(material) {
  if (!currentProduct) return;

  const isFoodGrade = material.toLowerCase().includes('food grade') || material.toLowerCase().includes('foopak');

  // Update Print Options
  const printContainer = document.getElementById('printChips');
  if (printContainer) {
    const availablePrints = currentProduct.prints.filter(p => {
      if (isFoodGrade) {
        return p === '1 Warna' || p === 'Full Color';
      }
      return true; // Eco-Kraft has its own defined prints
    });

    const currentActivePrint = printContainer.querySelector('.chip.active')?.textContent;
    renderChips('printChips', availablePrints, 'print');

    // Maintain selection if still available
    const newPrints = printContainer.querySelectorAll('.chip');
    let found = false;
    newPrints.forEach(c => {
      if (c.textContent === currentActivePrint) {
        c.classList.add('active');
        found = true;
      } else {
        c.classList.remove('active');
      }
    });
    if (!found && newPrints.length > 0) newPrints[0].classList.add('active');
  }

  // Update Laminasi Options
  const lamContainer = document.getElementById('laminasiChips');
  if (lamContainer) {
    let availableLams = currentProduct.laminasi;
    if (isFoodGrade) {
      availableLams = ['Laminasi Dalam'];
    }

    const currentActiveLam = lamContainer.querySelector('.chip.active')?.textContent;
    renderChips('laminasiChips', availableLams, 'laminasi');

    const newLams = lamContainer.querySelectorAll('.chip');
    let found = false;
    newLams.forEach(c => {
      if (c.textContent === currentActiveLam) {
        c.classList.add('active');
        found = true;
      } else {
        c.classList.remove('active');
      }
    });
    if (!found && newLams.length > 0) newLams[0].classList.add('active');
  }
}

function getSelectedKey() {
  const size = document.querySelector('.chip[data-type="size"].active')?.textContent || '';
  const mat = document.querySelector('.chip[data-type="material"].active')?.textContent || '';
  const print = document.querySelector('.chip[data-type="print"].active')?.textContent || '';
  const lam = document.querySelector('.chip[data-type="laminasi"].active')?.textContent || '';
  return `${size}|${mat}|${print}|${lam}`;
}

function lookupPrice(key, qty) {
  if (!currentProduct) return 0;
  const matrix = currentProduct.priceMatrix;

  // Try exact match first
  if (matrix[key]) return lookupTier(matrix[key], qty);

  // Fallback logic for Food Grade (where laminasi is always 'Laminasi Dalam')
  if (key.includes('Food Grade') || key.includes('Foopak')) {
    const parts = key.split('|');
    // If user selected 'Tanpa Laminasi' but it's Food Grade, force 'Laminasi Dalam'
    const forcedKey = `${parts[0]}|${parts[1]}|${parts[2]}|Laminasi Dalam`;
    if (matrix[forcedKey]) return lookupTier(matrix[forcedKey], qty);

    // If 'Full Color' was selected for Food Grade but only '1 Warna' exists in matrix (or vice versa)
    // and they have the same price, we could add more logic here, but the data should be clean.
  }

  // General fallback: find closest key
  const fallbackKey = Object.keys(matrix).find(k => {
    const parts = k.split('|');
    const qparts = key.split('|');
    return parts[0] === qparts[0] && parts[1] === qparts[1] && parts[2] === qparts[2];
  });

  if (fallbackKey) return lookupTier(matrix[fallbackKey], qty);
  return 0;
}

function lookupTier(tiers, qty) {
  const keys = Object.keys(tiers).map(Number).sort((a, b) => a - b);
  let price = 0;
  for (const k of keys) {
    if (qty >= k) price = tiers[k];
  }
  // If qty < lowest tier, return the lowest tier price
  if (price === 0 && keys.length > 0) price = tiers[keys[0]];
  return price;
}

function updatePrice() {
  if (!currentProduct) return;
  const key = getSelectedKey();
  const perPcs = lookupPrice(key, currentQty);
  const total = perPcs * currentQty;
  const notAvail = perPcs === 0;
  document.getElementById('modalPriceUnit').textContent = notAvail ? 'Combination N/A' : `Rp ${perPcs.toLocaleString('id')} / pcs`;
  document.getElementById('modalPriceTotal').textContent = notAvail ? '—' : `Rp ${total.toLocaleString('id')}`;
}

function changeQty(dir) {
  if (!currentProduct) return;
  const step = currentProduct.minOrder;
  if (dir > 0) currentQty += step;
  else currentQty = Math.max(step, currentQty - step);
  document.getElementById('qtyVal').textContent = currentQty;
  updatePrice();
}

function closeModal(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModalDirect();
}
function closeModalDirect() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ── CART
let cartItems = JSON.parse(localStorage.getItem('printworkCart')) || [];

function addToCart() {
  if (!currentProduct) return;
  const size = document.querySelector('.chip[data-type="size"].active')?.textContent || currentProduct.sizes[0];
  const mat = document.querySelector('.chip[data-type="material"].active')?.textContent || currentProduct.materials[0];
  const print = document.querySelector('.chip[data-type="print"].active')?.textContent || currentProduct.prints[0];
  const lam = document.querySelector('.chip[data-type="laminasi"].active')?.textContent || currentProduct.laminasi[0];

  const key = getSelectedKey();
  const perPcs = lookupPrice(key, currentQty);
  if (!perPcs) { showToast('Kombinasi tidak tersedia'); return; }

  cartItems.push({
    id: Date.now(), product: currentProduct,
    size, material: mat, print, laminasi: lam, qty: currentQty,
    perPcs, total: perPcs * currentQty
  });

  updateCartUI();
  closeModalDirect();
  showToast(`${currentProduct.name} added!`);
}

function updateCartUI() {
  const count = cartItems.length;
  document.getElementById('cartCount').textContent = count;
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');

  if (count === 0) {
    container.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">🛒</div><div class="cart-empty-text">No items yet.<br>Start adding products!</div></div>`;
    footer.style.display = 'none';
    return;
  }

  container.innerHTML = cartItems.map(item => `
    <div class="cart-item" id="ci-${item.id}">
      <div class="cart-item-icon">
        <img src="${item.product.image}" alt="${item.product.name}">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.product.name}</div>
        <div class="cart-item-spec">${item.size} · ${item.print} · ${item.laminasi} · ${item.qty} pcs</div>
      </div>
      <div class="cart-item-price">Rp ${item.total.toLocaleString('id')}</div>
      <button class="cart-item-remove" onclick="removeCartItem(${item.id})">✕</button>
    </div>
  `).join('');

  const total = cartItems.reduce((s, i) => s + i.total, 0);
  document.getElementById('cartTotal').textContent = `Rp ${total.toLocaleString('id')}`;
  footer.style.display = 'block';

  // Save to local storage
  localStorage.setItem('printworkCart', JSON.stringify(cartItems));

  // Reattach checkout handler explicitly if needed, but it's done via HTML onclick.
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
});

function removeCartItem(id) {
  cartItems = cartItems.filter(i => i.id !== id);
  updateCartUI();
}

function toggleCart() {
  document.getElementById('cartOverlay').classList.toggle('open');
  document.body.style.overflow = document.getElementById('cartOverlay').classList.contains('open') ? 'hidden' : '';
}

function closeCartOnOverlay(e) {
  if (e.target === document.getElementById('cartOverlay')) toggleCart();
}

// ── TOAST
function showToast(msg) {
  const t = document.getElementById('toast');
  t.innerHTML = `✓ ${msg}`;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ── SIZE TAGS (card)
document.addEventListener('click', e => {
  if (e.target.classList.contains('size-tag')) {
    e.target.closest('.card-sizes').querySelectorAll('.size-tag').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
  }
});

// ── CARD 3D EFFECT
let lastCardMove = 0;
document.addEventListener('mousemove', e => {
  const now = performance.now();
  if (now - lastCardMove < 16) return; // Throttle to ~60fps
  lastCardMove = now;

  const card = e.target.closest('.product-card');
  if (!card) return;

  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const xc = rect.width / 2;
  const yc = rect.height / 2;
  const dx = x - xc;
  const dy = y - yc;
  const rx = -(dy / yc) * 10;
  const ry = (dx / xc) * 10;

  requestAnimationFrame(() => {
    card.style.transform = `translate3d(0, -10px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;
    card.style.setProperty('--mouse-x', (x / rect.width) * 100 + '%');
    card.style.setProperty('--mouse-y', (y / rect.height) * 100 + '%');
  });
});

function checkout() {
  if (cartItems.length === 0) return;
  const total = cartItems.reduce((s, i) => s + i.total, 0);
  document.getElementById('checkoutDisplayTotal').textContent = `Rp ${total.toLocaleString('id')}`;
  document.getElementById('checkoutModalOverlay').classList.add('open');
}

function closeCheckoutModal() {
  document.getElementById('checkoutModalOverlay').classList.remove('open');
}

async function confirmCheckout() {
  const name = document.getElementById('customerName').value;
  const email = document.getElementById('customerEmail').value;
  const whatsapp = document.getElementById('customerWA').value;

  if (!name || name.length < 2) {
    showToast('Nama tidak valid');
    return;
  }
  if (email && !email.includes('@')) {
    showToast('Format email tidak valid');
    return;
  }
  if (!whatsapp || whatsapp.length < 8) {
    showToast('Nomor WhatsApp tidak valid');
    return;
  }

  const btn = document.getElementById('confirmCheckoutBtn');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Menghubungkan ke Server...';

  try {
    const response = await fetch('/api/create-invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cartItems.map(item => ({
          name: `${item.product.name} (${item.size}, ${item.print})`,
          price: item.perPcs,
          quantity: item.qty
        })),
        customerName: name,
        customerEmail: email,
        customerWA: whatsapp
      })
    });

    const session = await response.json();
    if (session.url) {
      window.location.href = session.url;
    } else {
      throw new Error(session.error || 'Failed to create session');
    }
  } catch (err) {
    console.error('Checkout Error:', err);
    showToast('Error connecting to payment gateway');
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

document.addEventListener('mouseout', e => {
  const card = e.target.closest('.product-card');
  if (card && !card.contains(e.relatedTarget)) {
    card.style.transform = '';
  }
});

function closeSuccessModal() {
  document.getElementById('successModalOverlay').classList.remove('open');
  // Clean URL
  const url = new URL(window.location);
  url.searchParams.delete('success');
  window.history.replaceState({}, '', url);
}

// ── DETECT SUCCESS FROM URL
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('success') === 'true') {
    setTimeout(() => {
      document.getElementById('successModalOverlay').classList.add('open');
      cartItems = [];
      localStorage.removeItem('printworkCart');
      updateCartUI();
    }, 500);
  }
});