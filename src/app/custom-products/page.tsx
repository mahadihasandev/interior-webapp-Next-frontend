'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  ArrowRight,
  Layers,
  Ruler,
  Star,
  CheckCircle2,
  Clock,
  MessageCircle,
  Phone,
  Compass,
  Building,
  HelpCircle,
} from 'lucide-react';
import { Product } from '@/types';
import { useGetCustomFitProductsQuery } from '@/store/services/productsApi';
import {
  FALLBACK_CUSTOM_PRODUCTS,
  resolveImageUrl,
} from '@/components/custom/HeroCustomProductSection';
import { useAppDispatch } from '@/store/hooks';
import { openConsultationModal } from '@/store/slices/uiSlice';

const WHATSAPP_NUMBER = '966501234567';

type CategoryFilter = 'all' | 'windows' | 'sliding' | 'acoustic' | 'mashrabiya' | 'doors' | 'skylights';

export default function CustomProductsPage() {
  const dispatch = useAppDispatch();
  const { data: apiProducts, isLoading } = useGetCustomFitProductsQuery(50);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'rating'>('featured');

  const allProducts: Product[] = useMemo(() => {
    if (apiProducts && apiProducts.length > 0) return apiProducts;
    return FALLBACK_CUSTOM_PRODUCTS;
  }, [apiProducts]);

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((p) => {
        // Category filtering
        if (selectedCategory !== 'all') {
          const name = p.name.toLowerCase();
          const desc = (p.description || '').toLowerCase();
          if (selectedCategory === 'windows' && !name.includes('window') && !name.includes('glazed')) return false;
          if (selectedCategory === 'sliding' && !name.includes('sliding') && !name.includes('patio')) return false;
          if (selectedCategory === 'acoustic' && !name.includes('acoustic') && !name.includes('partition')) return false;
          if (selectedCategory === 'mashrabiya' && !name.includes('mashrabiya')) return false;
          if (selectedCategory === 'doors' && !name.includes('door') && !name.includes('pivot')) return false;
          if (selectedCategory === 'skylights' && !name.includes('skylight') && !name.includes('louver')) return false;
        }

        // Search filtering
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(term);
          const matchesDesc = (p.description || '').toLowerCase().includes(term);
          const matchesTagline = (p.tagline || '').toLowerCase().includes(term);
          const matchesMat = (p.materials || '').toLowerCase().includes(term);
          if (!matchesName && !matchesDesc && !matchesTagline && !matchesMat) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') {
          return (a.price || 0) - (b.price || 0);
        }
        if (sortBy === 'price_desc') {
          return (b.price || 0) - (a.price || 0);
        }
        if (sortBy === 'rating') {
          return (b.rating || 0) - (a.rating || 0);
        }
        return 0;
      });
  }, [allProducts, selectedCategory, searchTerm, sortBy]);

  const getPriceRange = (product: Product) => {
    const min = product.price_min ?? product.price ?? 800;
    const max = product.price_max ?? product.compare_at_price ?? (min * 1.25);
    if (max > min) {
      return `${Math.round(min).toLocaleString()} – ${Math.round(max).toLocaleString()} SAR`;
    }
    return `${Math.round(min).toLocaleString()} SAR`;
  };

  const handleWhatsAppInquiry = (product: Product) => {
    const text = encodeURIComponent(
      `مرحباً L'Atelier، أود الاستفسار عن تفصيل وطلب: ${product.name} (السعر: ${getPriceRange(product)})`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1815] pb-28">

      {/* ── BREADCRUMB NAVIGATION ─────────────────────────────────────── */}
      <div className="border-b border-[#e2d9cc]/70 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-[#7a7166]">
            <Link href="/" className="hover:text-[#1a1815] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#b8933f] font-semibold">
              Bespoke Made-to-Measure Editions
            </span>
          </nav>
        </div>
      </div>

      {/* ── HERO BANNER ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#161412] text-white py-16 sm:py-24">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4b06a]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1a3d30]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#d4b06a]/30 text-[#d4b06a] text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bespoke Architectural Collection · منتجات التصنيع حسب الطلب</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight max-w-4xl leading-tight">
            Custom Architectural Products &amp; Made-to-Measure Systems
          </h1>

          <p className="text-sm sm:text-base text-white/70 max-w-3xl leading-relaxed">
            Engineered to resist external desert temperatures up to 50°C while isolating acoustics up to 42dB. Choose a profile below, enter your opening dimensions (H × W), select your shutter configuration, and place your custom order directly.
          </p>

          {/* Value Badges Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10">
              <ShieldCheck className="w-5 h-5 text-[#d4b06a] shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-white">50°C Thermal Break</p>
                <p className="text-[11px] text-white/60">SASO Certified Isolators</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10">
              <Ruler className="w-5 h-5 text-[#d4b06a] shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-white">Millimetric Custom Fit</p>
                <p className="text-[11px] text-white/60">Any Height &amp; Width</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10">
              <Clock className="w-5 h-5 text-[#d4b06a] shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-white">7–10 Days Fabrication</p>
                <p className="text-[11px] text-white/60">Saudi Direct Dispatch</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10">
              <Compass className="w-5 h-5 text-[#d4b06a] shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-white">Free Consultation</p>
                <p className="text-[11px] text-white/60">Site Survey &amp; CAD</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT AREA ────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">

        {/* ── FILTER & SEARCH TOOLBAR ─────────────────────────────────── */}
        <section className="bg-white rounded-3xl border border-[#e2d9cc] p-6 shadow-sm space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a7166]" />
              <input
                type="text"
                placeholder="Search models, materials (Alupco, acoustic, double glazed)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e2d9cc] text-xs sm:text-sm text-[#1a1815] placeholder:text-[#a89f91] focus:outline-none focus:border-[#b8933f] transition-colors"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7a7166] hover:text-[#1a1815]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
              <span className="text-xs text-[#7a7166] font-medium hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-[#faf8f5] border border-[#e2d9cc] text-xs font-semibold text-[#1a1815] focus:outline-none focus:border-[#b8933f] cursor-pointer"
              >
                <option value="featured">Featured &amp; Recommended</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-[#e2d9cc]/60 pt-4">
            {[
              { id: 'all', label: 'All Custom Works' },
              { id: 'windows', label: 'Thermal Windows' },
              { id: 'sliding', label: 'Sliding Patio Systems' },
              { id: 'acoustic', label: 'Acoustic Partitions' },
              { id: 'mashrabiya', label: 'Heritage Mashrabiya' },
              { id: 'doors', label: 'Pivot & Entrance Doors' },
              { id: 'skylights', label: 'Skylights & Louvers' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#1a1815] text-[#d4b06a] shadow-xs'
                    : 'bg-[#faf8f5] text-[#7a7166] hover:text-[#1a1815] hover:bg-[#f3ede4] border border-[#e2d9cc]/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* ── PRODUCTS RESULT HEADER ───────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <p className="text-xs sm:text-sm text-[#7a7166]">
            Showing <span className="font-bold text-[#1a1815]">{filteredProducts.length}</span> bespoke custom products
            {selectedCategory !== 'all' && ` in "${selectedCategory}"`}
          </p>

          <button
            type="button"
            onClick={() => dispatch(openConsultationModal())}
            className="text-xs font-semibold text-[#b8933f] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Have custom CAD blueprints? Request site survey</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* ── PRODUCTS GRID ────────────────────────────────────────────── */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#e2d9cc] p-12 text-center space-y-4 max-w-lg mx-auto">
            <HelpCircle className="w-12 h-12 text-[#b8933f] mx-auto opacity-70" />
            <h3 className="text-lg font-serif font-bold text-[#1a1815]">No custom products found</h3>
            <p className="text-xs text-[#7a7166]">
              We couldn&apos;t find any made-to-measure products matching &quot;{searchTerm}&quot;. Try resetting your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2 rounded-xl bg-[#1a1815] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#b8933f] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const priceRange = getPriceRange(product);
              const targetUrl = `/custom-order/${product.slug || product.id}`;

              return (
                <div
                  key={product.id}
                  className="group rounded-3xl bg-white hover:bg-[#fdfcfb] border border-[#e2d9cc] hover:border-[#b8933f]/70 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Product Image Frame */}
                  <Link href={targetUrl} className="relative aspect-[4/3] w-full overflow-hidden bg-[#e8ddd0] block">
                    <img
                      src={resolveImageUrl(product.image_url)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-75 group-hover:opacity-60 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[#1a1815] text-[10px] font-bold uppercase tracking-wider shadow">
                        Made to Order
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium border border-white/20">
                        ★ {product.rating || 4.9} ({product.reviews_count || 24})
                      </span>
                    </div>

                    {/* Multiple Gallery Photos Pill */}
                    {product.gallery && product.gallery.length > 0 && (
                      <div className="absolute bottom-2.5 left-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white/90 text-[10px] font-mono">
                          <Layers className="w-2.5 h-2.5 text-[#d4b06a]" />
                          {product.gallery.length} Photos
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#b8933f]">
                          Architectural Fitting
                        </span>
                        <span className="text-[10px] text-[#7a7166]">
                          7–10 Days
                        </span>
                      </div>

                      <Link href={targetUrl} className="block">
                        <h3 className="text-base font-serif font-bold text-[#1a1815] group-hover:text-[#b8933f] transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-xs text-[#7a7166] line-clamp-2 leading-relaxed">
                        {product.tagline || product.description}
                      </p>
                    </div>

                    {/* Specs Tags */}
                    <div className="pt-2 border-t border-[#e2d9cc]/60 space-y-1.5 text-[11px] text-[#3d3833]">
                      <div className="flex items-center gap-1.5 text-[#1a3d30]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1a3d30] shrink-0" />
                        <span className="line-clamp-1">{product.materials || 'SASO 50°C Thermal Break'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#7a7166]">
                        <Ruler className="w-3.5 h-3.5 text-[#b8933f] shrink-0" />
                        <span>{product.dimensions || 'Fully Customizable Dimensions'}</span>
                      </div>
                    </div>

                    {/* Price & Action Buttons */}
                    <div className="pt-3 border-t border-[#e2d9cc]/60 space-y-2.5">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] text-[#7a7166] uppercase font-semibold">
                          Custom Range:
                        </span>
                        <span className="text-base font-serif font-bold text-[#1a3d30]">
                          {priceRange}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={targetUrl}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-[#1a1815] hover:bg-[#b8933f] hover:text-[#1a1815] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm"
                        >
                          <span>Order Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleWhatsAppInquiry(product)}
                          title="Inquire on WhatsApp"
                          className="p-2.5 rounded-xl border border-[#e2d9cc] bg-[#faf8f5] hover:bg-[#e7f5ec] hover:border-[#25D366] text-[#25D366] transition-colors cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── HOW IT WORKS: 4-STEP CUSTOM GUIDE ────────────────────────── */}
        <section className="bg-white rounded-3xl border border-[#e2d9cc] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-[0.16em] uppercase text-[#b8933f]">
              Easy Millimetric Process · خطوات الطلب حسب المقاس
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1a1815]">
              How Made-to-Measure Ordering Works
            </h2>
            <p className="text-xs sm:text-sm text-[#7a7166]">
              We handle the entire journey from your rough masonry measurements to final factory precision fabrication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#e2d9cc] space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#1a1815] text-[#d4b06a] flex items-center justify-center font-bold text-xs">
                01
              </span>
              <h3 className="font-serif font-bold text-sm text-[#1a1815]">Select Profile Design</h3>
              <p className="text-xs text-[#7a7166] leading-relaxed">
                Choose between double glazed thermal break windows, sliding patio walls, Mashrabiya bays, or entrance doors.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#e2d9cc] space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#1a1815] text-[#d4b06a] flex items-center justify-center font-bold text-xs">
                02
              </span>
              <h3 className="font-serif font-bold text-sm text-[#1a1815]">Enter Precise Dimensions</h3>
              <p className="text-xs text-[#7a7166] leading-relaxed">
                Enter your wall opening height &amp; width in centimeters or millimeters. The live builder instantly calculates cost.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#e2d9cc] space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#1a1815] text-[#d4b06a] flex items-center justify-center font-bold text-xs">
                03
              </span>
              <h3 className="font-serif font-bold text-sm text-[#1a1815]">Pick Glass, Color &amp; Shutters</h3>
              <p className="text-xs text-[#7a7166] leading-relaxed">
                Choose 1–4 shutters, reflective bronze or acoustic clear glass, Alupco aluminum thickness, and hardware addons.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#e2d9cc] space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#1a1815] text-[#d4b06a] flex items-center justify-center font-bold text-xs">
                04
              </span>
              <h3 className="font-serif font-bold text-sm text-[#1a1815]">Direct Factory Dispatch</h3>
              <p className="text-xs text-[#7a7166] leading-relaxed">
                Fabricated in our Saudi workshop within 7–10 days with optional certified installation across the Kingdom.
              </p>
            </div>
          </div>
        </section>

        {/* ── BESPOKE CONSULTATION CALLOUT ─────────────────────────────── */}
        <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#1a1815] via-[#241f1b] to-[#1a1815] p-8 sm:p-12 text-white border border-[#d4b06a]/30 shadow-xl">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4b06a]/20 text-[#d4b06a] text-xs font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                Architectural Consulting
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                Have Villa Blueprints or Special Custom Specs?
              </h2>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Our master Saudi architectural team can review your CAD blueprints, perform on-site laser surveys in Riyadh, Jeddah &amp; Dammam, and supply custom SASO test certificates.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => dispatch(openConsultationModal())}
                className="px-6 py-3.5 rounded-full bg-[#d4b06a] hover:bg-[#e0c283] text-[#1a1815] text-xs font-bold uppercase tracking-wider transition-all shadow-lg cursor-pointer text-center"
              >
                Schedule Site Visit / Survey
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('مرحباً L\'Atelier، أود مناقشة مخططات معمارية وتفصيل نوافذ وأبواب مخصصة لفيلا.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider border border-white/20 transition-all text-center"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
