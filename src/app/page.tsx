'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Sliders,
  CheckCircle,
  Palette,
  Armchair,
  Layers,
} from 'lucide-react';
import { useGetFeaturedProductsQuery, useGetCategoriesQuery } from '@/store/services/productsApi';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { CustomFittingVisualizer } from '@/components/custom/CustomFittingVisualizer';
import { CustomSofaVisualizer } from '@/components/custom/CustomSofaVisualizer';
import { CustomSampleGallery, CustomSample } from '@/components/custom/CustomSampleGallery';
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
    const canvasEl = document.getElementById('custom-studio-canvas');
    if (canvasEl) {
      canvasEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-stone-50 text-stone-900 antialiased font-sans">
      {/* 1. HERO BANNER */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Background Editorial Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85"
            alt="Minimalist luxury interior"
            className="w-full h-full object-cover object-center filter brightness-[0.38]"
          />
          <div className="absolute inset-0 bg-stone-950/70" />
        </div>

        {/* Hero Content - Crisp High-Contrast White Typography */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/80 border border-stone-700 text-stone-100 text-xs font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-stone-100" />
            <span>Saudi Arabia Architectural Interiors & Bespoke Majlis</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.15] drop-shadow-md">
            Spatial Poetry in <span className="italic font-serif text-white">Form</span> &{' '}
            <span className="italic font-serif text-white">Material</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-100 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Crafted for Saudi villas and royal Majlis salons: 50°C thermal break architectural windows, fluted privacy partitions, and bespoke modular seating engineered to order.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <a
              href="#custom-fitting-studio"
              className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-stone-100 active:bg-stone-200 text-stone-950 text-xs font-bold uppercase tracking-widest rounded-full shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 cursor-pointer"
            >
              <Palette className="w-4 h-4 text-stone-950" />
              <span>Explore Saudi Villa Inspiration Gallery</span>
              <ArrowRight className="w-4 h-4 text-stone-950" />
            </a>

            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-3.5 bg-stone-900/90 hover:bg-stone-800 text-white border border-stone-700 text-xs font-bold uppercase tracking-widest rounded-full shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Explore Ready-Made Catalog</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. PRIMARY FEATURED SECTION: SAUDI VILLA SAMPLES & CUSTOM ORDER VISUALIZER */}
      <section id="custom-fitting-studio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 space-y-12">
        {/* Step A: Visual Sample Gallery for Normal Customer */}
        <CustomSampleGallery
          onSelectSample={handleSelectSample}
          selectedSampleId={selectedSample?.id}
        />

        {/* Step B: Live Interactive Studio Canvas */}
        <div id="custom-studio-canvas" className="scroll-mt-28 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-6 border-t border-stone-200">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-900 mb-1">
                <Sliders className="w-3.5 h-3.5 text-amber-700" />
                <span>Live Interactive Simulator · محاكي التصميم الحي</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
                Fine-Tune Colors, Dimensions & Hardware
              </h2>
              <p className="text-sm text-stone-700 font-normal mt-1 max-w-2xl leading-relaxed">
                Watch your architectural windows, privacy partitions, or Majlis modular sofa morph in real time.
              </p>
            </div>

            {/* STUDIO SWITCHER TABS: Fittings vs Sofa */}
            <div className="flex items-center p-1.5 bg-stone-200 border border-stone-300 rounded-2xl gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setStudioTab('fitting')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  studioTab === 'fitting'
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Architectural Fittings & Windows</span>
              </button>

              <button
                type="button"
                onClick={() => setStudioTab('sofa')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  studioTab === 'sofa'
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <Armchair className="w-4 h-4" />
                <span>Custom Majlis & Sofa</span>
              </button>
            </div>
          </div>

          {/* Active Preset Notification Banner */}
          {selectedSample && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs animate-in fade-in">
              <div className="flex items-center gap-2 text-emerald-950 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>Active Loaded Design: {selectedSample.titleEn} ({selectedSample.titleAr})</span>
              </div>
              <span className="text-emerald-800 text-[11px] font-medium hidden sm:inline">
                Scroll below to adjust finish, glass, fabric, or dimensions.
              </span>
            </div>
          )}

          {/* Visualizer Display (Tabbed) */}
          {studioTab === 'fitting' ? (
            <CustomFittingVisualizer />
          ) : (
            <CustomSofaVisualizer />
          )}
        </div>
      </section>

      {/* 3. SIGNATURE READY-MADE EDITIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-stone-900 font-bold">
              Signature Ready-Made Editions
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight mt-1">
              Curated Furniture & Lighting
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 font-normal mt-1 leading-relaxed">
              Crafted in limited seasonal batches using sustainably harvested European hardwoods and hand-spun brass.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-stone-700 flex items-center gap-1.5 transition-colors"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ProductGrid products={featuredProducts} isLoading={isFeaturedLoading} />
      </section>

      {/* 4. CURATED DEPARTMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-stone-900 font-bold">
              Spatial Disciplines
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight mt-1">
              Curated by Department
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-stone-700 flex items-center gap-1.5 transition-colors"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories?.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group relative aspect-3/4 rounded-2xl overflow-hidden border border-stone-300/80 bg-stone-100 block shadow-2xs hover:shadow-md transition-all"
            >
              <img
                src={cat.image_url || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80'}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out brightness-90 group-hover:brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              <div className="absolute inset-x-3 bottom-3 p-2">
                <h3 className="text-sm font-serif font-bold text-white group-hover:text-stone-200 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-stone-200 font-medium mt-0.5">
                  {cat.products_count ? `${cat.products_count} designs` : 'Explore Pieces'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. DESIGN STUDIO CONSULTATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-stone-200 bg-white p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-100 border border-stone-300 text-stone-900 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-stone-900" />
                <span>Interior Architecture Practice</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                Full-Service Interior Design & Residential Architecture
              </h2>

              <p className="text-sm text-stone-700 font-normal leading-relaxed">
                Whether you are redesigning a single primary lounge or outfitting an expansive private residence, our architects produce comprehensive 3D spatial elevations, bespoke millwork, and custom material palettes.
              </p>

              <div className="space-y-3 pt-1">
                {[
                  'Custom CAD Spatial Planning & Lighting Schedules',
                  'Direct Factory Artisan Hardwood & Stone Sourcing',
                  'Turnkey White-Glove Installation & Styling',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-xs sm:text-sm text-stone-800 font-semibold">
                    <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => dispatch(openConsultationModal('Full Apartment'))}
                  className="px-8 py-3.5 bg-stone-900 hover:bg-stone-800 active:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <span>Book Initial Consultation</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Visual showcase */}
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 border border-stone-200 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
                alt="Interior design studio consultation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white text-xs">
                  <p className="font-serif font-bold text-sm">Tribeca Penthouse Residence</p>
                  <p className="text-stone-300 text-[11px] mt-0.5">Architectural partition & custom fluted walnut millwork</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
