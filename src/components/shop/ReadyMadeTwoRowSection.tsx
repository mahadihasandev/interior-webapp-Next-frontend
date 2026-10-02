'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, SlidersHorizontal, Check } from 'lucide-react';
import { Product } from '@/types';
import { useGetFeaturedProductsQuery, useGetProductsQuery } from '@/store/services/productsApi';
import { ProductCard } from './ProductCard';

export const FALLBACK_READY_MADE_PRODUCTS: Product[] = [
  {
    id: 1,
    category_id: 1,
    name: 'Aura Bouclé Curved Lounge Chair',
    slug: 'aura-boucle-curved-lounge-chair',
    tagline: 'Organic contours wrapped in textured warm cream bouclé fabric',
    description:
      'The Aura Lounge Chair pairs architectural flow with plush, cloud-like comfort. Sculpted with a kiln-dried hardwood frame and upholstered in premium textured bouclé, it serves as a commanding centerpiece.',
    price: 780.0,
    compare_at_price: 950.0,
    dimensions: '36"W x 34"D x 30"H',
    materials: 'Textured Bouclé, Hardwood Frame',
    color: 'Warm Cream / Alabaster',
    stock: 14,
    in_stock: true,
    is_featured: true,
    rating: 4.95,
    reviews_count: 38,
    image_url:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80',
    ],
    category: {
      id: 1,
      name: 'Living Room',
      slug: 'living-room',
    },
  },
  {
    id: 2,
    category_id: 4,
    name: 'Nordic Minimalist Oak Dining Table',
    slug: 'nordic-minimalist-oak-dining-table',
    tagline: 'Solid European white oak with soft chamfered edge profiling',
    description:
      'Designed with timeless Scandinavian restraint, this solid European oak dining table comfortably seats 8. Finished with a subtle matte polyurethane seal that preserves the raw tactile grain.',
    price: 1250.0,
    compare_at_price: 1490.0,
    dimensions: '84"L x 38"W x 30"H',
    materials: 'Solid White European Oak',
    color: 'Natural Pale Oak',
    stock: 8,
    in_stock: true,
    is_featured: true,
    rating: 4.9,
    reviews_count: 24,
    image_url:
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80',
    ],
    category: {
      id: 4,
      name: 'Dining & Kitchen',
      slug: 'dining',
    },
  },
  {
    id: 3,
    category_id: 3,
    name: 'Solstice Spun Brass Chandelier',
    slug: 'solstice-spun-brass-chandelier',
    tagline: 'Hand-spun brushed brass with frosted opal glass globes',
    description:
      'Suspended like a celestial harmony, the Solstice fixture casts warm, diffused illumination across open living or dining volumes. Dimmable warm-dim LED modules.',
    price: 460.0,
    compare_at_price: 580.0,
    dimensions: '42"Dia x 24"H',
    materials: 'Solid Spun Brass, Handblown Opal Glass',
    color: 'Brushed Satin Brass',
    stock: 20,
    in_stock: true,
    is_featured: true,
    rating: 4.88,
    reviews_count: 19,
    image_url:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
    ],
    category: {
      id: 3,
      name: 'Lighting & Fixtures',
      slug: 'lighting',
    },
  },
  {
    id: 4,
    category_id: 2,
    name: 'Kyoto Low Platform King Bed',
    slug: 'kyoto-low-platform-king-bed',
    tagline: 'Japandi aesthetic with floating bedside cantilever ledges',
    description:
      'Inspired by traditional Japanese ryokan architecture, the Kyoto King Bed features integrated floating side nightstands and solid walnut joinery built to endure generations.',
    price: 1890.0,
    compare_at_price: 2200.0,
    dimensions: '92"W x 88"L x 28"H',
    materials: 'Solid American Walnut, Engineered Slat Base',
    color: 'Deep Warm Walnut',
    stock: 5,
    in_stock: true,
    is_featured: true,
    rating: 4.97,
    reviews_count: 42,
    image_url:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80',
    ],
    category: {
      id: 2,
      name: 'Bedroom & Suites',
      slug: 'bedroom',
    },
  },
  {
    id: 5,
    category_id: 1,
    name: 'Sora Travertine & Walnut Coffee Table',
    slug: 'sora-travertine-walnut-coffee-table',
    tagline: 'Honed Italian Roman travertine slab on fluted walnut pedestals',
    description:
      'A sculptural dialogue between warm textured wood and cool natural stone. Each travertine top displays unique natural veining and porous cavities filled with transparent resin.',
    price: 920.0,
    compare_at_price: 1100.0,
    dimensions: '48"L x 28"W x 15"H',
    materials: 'Honed Italian Travertine, Fluted American Walnut',
    color: 'Ivory Stone / Walnut',
    stock: 9,
    in_stock: true,
    is_featured: true,
    rating: 4.92,
    reviews_count: 28,
    image_url:
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80',
    ],
    category: {
      id: 1,
      name: 'Living Room',
      slug: 'living-room',
    },
  },
  {
    id: 6,
    category_id: 5,
    name: 'Kanso Matte Ceramic Sculptural Vase',
    slug: 'kanso-matte-ceramic-sculptural-vase',
    tagline: 'Earthen terracotta clay with matte chalk texture',
    description:
      'Individually wheel-thrown and wood-fired by master ceramicists, the Kanso vase exhibits organic micro-imperfections that honor the Japanese philosophy of wabi-sabi.',
    price: 140.0,
    compare_at_price: 175.0,
    dimensions: '8.5"Dia x 14"H',
    materials: 'Handmade Terracotta, Mineral Matte Glaze',
    color: 'Sand Beige',
    stock: 30,
    in_stock: true,
    is_featured: true,
    rating: 4.75,
    reviews_count: 15,
    image_url:
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
    ],
    category: {
      id: 5,
      name: 'Decor & Objects',
      slug: 'decor',
    },
  },
  {
    id: 7,
    category_id: 3,
    name: 'Alabaster & Brushed Brass Architectural Sconce',
    slug: 'alabaster-brushed-brass-architectural-sconce',
    tagline: 'Carved natural Spanish alabaster with satin brushed brass frame',
    description:
      'Hand-carved translucent alabaster stone plate softly diffuses warm ambient light. Mounted on an architectural satin brass backplate for understated luxury corridors and suites.',
    price: 320.0,
    compare_at_price: 410.0,
    dimensions: '10"W x 18"H x 4"D',
    materials: 'Spanish Alabaster, Satin Brushed Brass',
    color: 'Champagne Brass / Translucent White',
    stock: 16,
    in_stock: true,
    is_featured: true,
    rating: 4.91,
    reviews_count: 21,
    image_url:
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80',
    ],
    category: {
      id: 3,
      name: 'Lighting & Fixtures',
      slug: 'lighting',
    },
  },
  {
    id: 8,
    category_id: 1,
    name: 'Riyadh Minimalist Ribbed Velvet Armchair',
    slug: 'riyadh-minimalist-ribbed-velvet-armchair',
    tagline: 'Desert sand ribbed architectural velvet on matte bronze cantilever frame',
    description:
      'Sculptural accent armchair crafted for modern Saudi salons. Features deep ergonomic cushioning wrapped in dirt-resistant architectural ribbed velvet, resting upon a floating bronze steel silhouette.',
    price: 850.0,
    compare_at_price: 1050.0,
    dimensions: '34"W x 32"D x 31"H',
    materials: 'Ribbed Performance Velvet, Bronze Coated Steel',
    color: 'Desert Sand / Warm Dune',
    stock: 11,
    in_stock: true,
    is_featured: true,
    rating: 4.93,
    reviews_count: 27,
    image_url:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
    ],
    category: {
      id: 1,
      name: 'Living Room',
      slug: 'living-room',
    },
  },
];

const CATEGORY_TABS = [
  { id: 'all', label: 'All Pieces' },
  { id: 'living-room', label: 'Living Room' },
  { id: 'dining', label: 'Dining' },
  { id: 'lighting', label: 'Lighting' },
  { id: 'bedroom', label: 'Bedroom' },
  { id: 'decor', label: 'Decor' },
];

export function ReadyMadeTwoRowSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Query up to 8 featured products from backend
  const { data: apiProducts, isLoading } = useGetFeaturedProductsQuery(8);

  // Combine or fallback to ensure exactly 8 high quality ready-made products
  const allProducts: Product[] = useMemo(() => {
    if (apiProducts && apiProducts.length >= 8) {
      return apiProducts.slice(0, 8);
    }
    if (apiProducts && apiProducts.length > 0) {
      // Merge apiProducts with remaining fallback products to make at least 8
      const apiSlugs = new Set(apiProducts.map((p) => p.slug));
      const remainingFallbacks = FALLBACK_READY_MADE_PRODUCTS.filter(
        (p) => !apiSlugs.has(p.slug)
      );
      return [...apiProducts, ...remainingFallbacks].slice(0, 8);
    }
    return FALLBACK_READY_MADE_PRODUCTS;
  }, [apiProducts]);

  // Filter by category if selected
  const displayedProducts = useMemo(() => {
    if (selectedCategory === 'all') return allProducts.slice(0, 8);

    const filtered = allProducts.filter((p) => {
      const catSlug = p.category?.slug?.toLowerCase() || '';
      const catName = p.category?.name?.toLowerCase() || '';
      return (
        catSlug.includes(selectedCategory.toLowerCase()) ||
        catName.includes(selectedCategory.toLowerCase())
      );
    });

    // If specific filter returned items, return them; otherwise fallback to all so it never looks broken
    return filtered.length > 0 ? filtered : allProducts.slice(0, 8);
  }, [allProducts, selectedCategory]);

  return (
    <section id="ready-made-collection" className="max-w-7xl mx-auto px-6 sm:px-10 scroll-mt-24 space-y-8">
      {/* ── SECTION HEADER ──────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#e2d9cc]">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f3ede4] border border-[#d4b06a]/40 text-[#8f7033] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Ready-Made Editions · تشكيلة المنتجات الجاهزة</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1a1815] tracking-tight">
            Curated In-Stock Furniture &amp; Lighting
          </h2>

          <p className="text-xs sm:text-sm text-[#7a7166] leading-relaxed">
            Limited seasonal batches crafted from European white oak, natural Roman travertine, and hand-spun brass. In stock for immediate white-glove dispatch across Saudi Arabia.
          </p>
        </div>

        {/* Action Link to Full Shop */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1a1815] text-white hover:bg-[#332f2b] active:scale-95 text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            <span>Explore All Pieces</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#d4b06a]" />
          </Link>
        </div>
      </div>

      {/* ── CATEGORY FILTER TABS ────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-2">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#1a3d30] text-white shadow-sm scale-[1.02]'
                    : 'bg-white hover:bg-[#f3ede4] text-[#7a7166] hover:text-[#1a1815] border border-[#e2d9cc]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <span className="hidden sm:inline-block text-[11px] font-mono text-[#8f7033] bg-[#f9f6f0] px-3 py-1.5 rounded-full border border-[#e2d9cc]">
          2-Row Gallery · {displayedProducts.length} In Stock
        </span>
      </div>

      {/* ── 2-ROW RESPONSIVE GRID (4 COLUMNS × 2 ROWS = 8 ITEMS) ─────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id || product.slug} product={product} />
        ))}
      </div>

      {/* ── BOTTOM BANNER / WHITE GLOVE COURIER PROMISE ─────────────────── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#faf7f2] border border-[#e8dfd3] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6e665b]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1a3d30]/10 flex items-center justify-center text-[#1a3d30] shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-[#1a1815]">White-Glove Express Delivery</p>
            <p className="text-[11px] text-[#7a7166]">Direct delivery into your room of choice, unpackaged and inspected.</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-[11px] font-medium shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Riyadh &amp; Jeddah: 24–48 hrs
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Eastern Province: 3–4 days
          </span>
        </div>
      </div>
    </section>
  );
}
