'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Sliders,
  Layers,
  Armchair,
  CheckCircle,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { useGetFeaturedProductsQuery, useGetCategoriesQuery } from '@/store/services/productsApi';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { CustomFittingVisualizer } from '@/components/custom/CustomFittingVisualizer';
import { CustomSofaVisualizer } from '@/components/custom/CustomSofaVisualizer';
import { CustomSampleGallery, CustomSample } from '@/components/custom/CustomSampleGallery';
import { CustomOrderShowcase } from '@/components/custom/CustomOrderShowcase';
import { SaudiMaterialShowcase } from '@/components/custom/SaudiMaterialShowcase';
import {
  HeroCustomProductCardsGrid,
} from '@/components/custom/HeroCustomProductSection';
import { useAppDispatch } from '@/store/hooks';
import { openConsultationModal } from '@/store/slices/uiSlice';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { data: featuredProducts, isLoading: isFeaturedLoading } = useGetFeaturedProductsQuery(6);
  const { data: categories } = useGetCategoriesQuery();

  const [studioTab, setStudioTab] = useState<'fitting' | 'sofa'>('fitting');
  const [selectedSample, setSelectedSample] = useState<CustomSample | null>(null);

  const handleSelectSample = (sample: CustomSample) => {
    setSelectedSample(sample);
    setStudioTab(sample.type);
    const el = document.getElementById('custom-studio-canvas');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pb-40">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#111] min-h-[76vh] mb-16 flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85"
          alt="Saudi Luxury Villa Interior"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 py-20 space-y-6 text-center flex flex-col items-center justify-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#d4b06a]">
            L&apos;Atelier Architectural Studio · الرياض
          </p>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white leading-tight max-w-3xl text-center">
            Crafted in Form,<br />
            <span className="text-[#d4b06a]">Built in Material</span>
          </h1>
          <p className="text-sm sm:text-base text-white/70 max-w-xl leading-relaxed text-center mx-auto">
            Bespoke architectural windows, acoustic privacy partitions, and modular Majlis seating — engineered for Saudi villas and royal salons.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
            <Link
              href="/#custom-designs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1a1815] text-sm font-semibold rounded-full hover:bg-[#f3ede4] transition-colors"
            >
              Design Studio
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white text-sm font-semibold rounded-full border border-white/20 hover:bg-white/15 transition-colors"
            >
              Browse Collection
            </Link>
          </div>
        </div>
      </section>

  

      {/* ── NEW FEATURED CUSTOM PRODUCTS CARDS SECTION ────────────────── */}
      <div id="custom-products-showcase" className="mt-4 scroll-mt-24">
        <HeroCustomProductCardsGrid />
      </div>

      <div className="space-y-20 sm:space-y-28 mt-16 sm:mt-20">
        {/* ── CUSTOM DESIGNS & STUDIO GROUP ─────────────────────────── */}
        <div className="space-y-6 sm:space-y-8">
          {/* ── SELLER CUSTOM DESIGNS SHOWCASE ─────────────────────────── */}
      <section id="custom-designs" className="max-w-7xl mx-auto px-6 sm:px-10 scroll-mt-24 space-y-4">
        <div className="pb-1">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#b8933f] mb-1">
            Seller&apos;s Custom Designs · تصاميم مخصصة من البائع
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1a1815]">
              Pick a Design — Order or Call the Seller
            </h2>
            <p className="text-sm text-[#7a7166] max-w-md">
              Real installations uploaded by our seller. Select one, then customise dimensions or contact us directly.
            </p>
          </div>
        </div>
        <CustomOrderShowcase onStartOrder={handleSelectSample} />
      </section>

      {/* ── SAMPLE GALLERY + STUDIO ───────────────────────────────────── */}
      <section id="custom-fitting-studio" className="max-w-7xl mx-auto px-6 sm:px-10 scroll-mt-24 space-y-10">

        {/* Section header */}
        <div className="border-b border-[#e2d9cc] pb-4">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#b8933f] mb-1">
            Bespoke Studio · استوديو التخصيص
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1a1815]">
            Browse All Samples &amp; Customise
          </h2>
          <p className="text-sm text-[#7a7166] mt-1 max-w-2xl">
            Select a real Saudi villa installation below to pre-load its specs into the live simulator.
          </p>
        </div>

        <CustomSampleGallery
          onSelectSample={handleSelectSample}
          selectedSampleId={selectedSample?.id}
        />

        {/* Studio Canvas */}
        <div id="custom-studio-canvas" className="scroll-mt-24 space-y-5 pt-4 border-t border-[#e2d9cc]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#b8933f] mb-1">
                <Sliders className="w-3.5 h-3.5" />
                Live Configurator
              </div>
              <h2 className="text-xl font-serif font-bold text-[#1a1815]">
                Fine-Tune Colours, Materials &amp; Dimensions
              </h2>
            </div>

            {/* Tab switcher */}
            <div className="flex items-center p-1 bg-[#f3ede4] border border-[#e2d9cc] rounded-xl gap-1 self-start">
              <button
                type="button"
                onClick={() => setStudioTab('fitting')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  studioTab === 'fitting'
                    ? 'bg-white text-[#1a1815] shadow-sm border border-[#e2d9cc]'
                    : 'text-[#7a7166] hover:text-[#1a1815]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Windows &amp; Fittings
              </button>
              <button
                type="button"
                onClick={() => setStudioTab('sofa')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  studioTab === 'sofa'
                    ? 'bg-white text-[#1a1815] shadow-sm border border-[#e2d9cc]'
                    : 'text-[#7a7166] hover:text-[#1a1815]'
                }`}
              >
                <Armchair className="w-3.5 h-3.5" />
                Majlis &amp; Sofas
              </button>
            </div>
          </div>

          {/* Loaded preset banner */}
          {selectedSample && (
            <div className="flex items-center gap-2.5 px-4 py-3 bg-[#edf4f0] border border-[#1a3d30]/20 rounded-xl text-xs">
              <span className="w-2 h-2 rounded-full bg-[#1a3d30] animate-pulse shrink-0" />
              <span className="font-semibold text-[#1a3d30]">Loaded:</span>
              <span className="text-[#1a3d30]">{selectedSample.titleEn}</span>
              <span className="ml-auto text-[#7a7166] hidden sm:inline">Adjust any option below.</span>
            </div>
          )}

          {studioTab === 'fitting' ? <CustomFittingVisualizer /> : <CustomSofaVisualizer />}
        </div>
      </section>
        </div>

      {/* ── MATERIAL SHOWCASE ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10">
        <SaudiMaterialShowcase />
      </section>

      {/* ── READY-MADE COLLECTION ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#e2d9cc]">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#b8933f] mb-1">
              Ready-Made Editions
            </p>
            <h2 className="text-2xl font-serif font-bold text-[#1a1815]">
              Curated Furniture &amp; Lighting
            </h2>
            <p className="text-sm text-[#7a7166] mt-1">
              Limited seasonal batches — sustainably harvested hardwoods and hand-spun brass.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a1815] hover:text-[#b8933f] transition-colors shrink-0"
          >
            Full Catalog
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <ProductGrid products={featuredProducts} isLoading={isFeaturedLoading} />
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────────────── */}
      {categories && categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 sm:px-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#e2d9cc]">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#b8933f] mb-1">
                Departments
              </p>
              <h2 className="text-2xl font-serif font-bold text-[#1a1815]">Browse by Room</h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a1815] hover:text-[#b8933f] transition-colors shrink-0"
            >
              All Collections
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#f3ede4] block"
              >
                <Image
                  src={cat.image_url || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80'}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-3">
                  <p className="text-sm font-serif font-semibold text-white leading-tight">{cat.name}</p>
                  <p className="text-[11px] text-white/60 mt-0.5">
                    {cat.products_count ? `${cat.products_count} pieces` : 'Explore'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── CONSULTATION BANNER ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="bg-white border border-[#e2d9cc] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Text side */}
            <div className="p-8 sm:p-10 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f3ede4] border border-[#e2d9cc] text-[#b8933f] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Design Consultation · استشارات معمارية
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1a1815] leading-tight">
                Full-Service Interior &amp;<br />Residential Architecture
              </h2>
              <p className="text-sm text-[#7a7166] leading-relaxed">
                From royal Majlis in Riyadh to coastal residences in Jeddah — comprehensive 3D spatial planning, custom millwork, and climate-engineered material palettes.
              </p>
              <ul className="space-y-2.5">
                {[
                  'CAD Spatial Planning & Lighting Schedules',
                  'Direct Factory Hardwood, Travertine & Alloy Sourcing',
                  'Turnkey White-Glove Installation in KSA',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#1a1815]">
                    <CheckCircle className="w-4 h-4 text-[#1a3d30] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => dispatch(openConsultationModal('Full Villa Interior'))}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a3d30] text-white text-sm font-semibold rounded-full hover:bg-[#1f4e3f] transition-colors cursor-pointer"
                >
                  Book Consultation
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    const text = encodeURIComponent('Hello, I would like to book an interior design consultation.');
                    window.open(`https://wa.me/966501234567?text=${text}`, '_blank');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-full hover:bg-emerald-500 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </button>
              </div>
            </div>

            {/* Image side */}
            <div className="relative min-h-72 lg:min-h-full">
              <Image
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
                alt="Interior design consultation"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 border border-[#e2d9cc]">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#b8933f]">
                    📍 Hittin District, Riyadh
                  </p>
                  <p className="text-sm font-serif font-bold text-[#1a1815] mt-0.5">
                    The Hittin Royal Majlis &amp; Solarium
                  </p>
                  <p className="text-xs text-[#7a7166]">Architectural partition · fluted privacy glass</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
