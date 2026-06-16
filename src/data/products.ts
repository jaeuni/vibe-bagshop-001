export interface ColorOption {
  name: string;
  value: string; // hex code
  threeColor: string; // three.js color string or hex for material
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  tag?: string;
  rating: number;
  reviewsCount: number;
  isMdPick?: boolean;
  colors?: ColorOption[];
}

export const mdPickProduct: Product = {
  id: "md-001",
  name: "Aurelia Caviar Bag",
  price: 2450000,
  originalPrice: 2890000,
  image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
  tag: "BEST SHOWCASE",
  rating: 4.9,
  reviewsCount: 142,
  isMdPick: true,
  colors: [
    { name: "Obsidian Black (블랙)", value: "#141414", threeColor: "#141414" },
    { name: "Royal Emerald (에메랄드)", value: "#0B4C3A", threeColor: "#052F22" },
    { name: "Crimson Red (클래식 레드)", value: "#8A1C14", threeColor: "#7A100A" },
    { name: "Champagne Cream (크림)", value: "#EEDCBE", threeColor: "#D4C2A4" },
    { name: "Sweet Lavender (라벤더)", value: "#BEAEE2", threeColor: "#AA99D2" }
  ]
};

export const popularProducts: Product[] = [
  {
    id: "pop-001",
    name: "Classic Leather Tote Bag",
    price: 1850000,
    originalPrice: 2100000,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
    tag: "BEST",
    rating: 4.8,
    reviewsCount: 98
  },
  {
    id: "pop-002",
    name: "Aura Chain Shoulder Bag",
    price: 1590000,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    tag: "NEW",
    rating: 4.7,
    reviewsCount: 64
  },
  {
    id: "pop-003",
    name: "Minimalist Mini Hobo Bag",
    price: 980000,
    originalPrice: 1200000,
    image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&w=600&q=80",
    tag: "15% OFF",
    rating: 4.6,
    reviewsCount: 112
  },
  {
    id: "pop-004",
    name: "Saffron Summer Clutch",
    price: 790000,
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc15a6a0?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    reviewsCount: 45
  },
  {
    id: "pop-005",
    name: "Alabaster Bucket Bag",
    price: 1350000,
    originalPrice: 1500000,
    image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=600&q=80",
    tag: "POPULAR",
    rating: 4.9,
    reviewsCount: 204
  },
  {
    id: "pop-006",
    name: "Metropolis Silver Pouch",
    price: 1150000,
    image: "https://images.unsplash.com/photo-1605733513597-a8f8d410cf3c?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    reviewsCount: 38
  },
  {
    id: "pop-007",
    name: "Crimson Elegance Satchel",
    price: 2200000,
    originalPrice: 2450000,
    image: "https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=600&q=80",
    tag: "LIMITED",
    rating: 4.9,
    reviewsCount: 56
  },
  {
    id: "pop-008",
    name: "Cognac Daily Shoulder Bag",
    price: 1420000,
    image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviewsCount: 89
  },
  {
    id: "pop-009",
    name: "Gilt-Edged Box Clutch",
    price: 1650000,
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=600&q=80",
    tag: "SPECIAL",
    rating: 4.8,
    reviewsCount: 42
  },
  {
    id: "pop-010",
    name: "Sage Micro Crossbody",
    price: 890000,
    originalPrice: 990000,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=300&q=80",
    rating: 4.5,
    reviewsCount: 29
  },
  {
    id: "pop-011",
    name: "Noir Croco Embossed Bag",
    price: 2750000,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=300&q=80",
    tag: "PREMIUM",
    rating: 5.0,
    reviewsCount: 15
  },
  {
    id: "pop-012",
    name: "Vanilla Crescent Bag",
    price: 1250000,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=300&q=80",
    rating: 4.7,
    reviewsCount: 71
  }
];
