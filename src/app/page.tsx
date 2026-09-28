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
  Sun,
  ShieldCheck,
  VolumeX,
  Wind,
  Box,
  MessageCircle,
} from 'lucide-react';
import { useGetFeaturedProductsQuery, useGetCategoriesQuery } from '@/store/services/productsApi';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { CustomFittingVisualizer } from '@/components/custom/CustomFittingVisualizer';
import { CustomSofaVisualizer } from '@/components/custom/CustomSofaVisualizer';
import { CustomSampleGallery, CustomSample } from '@/components/custom/CustomSampleGallery';
import { SaudiMaterialShowcase } from '@/components/custom/SaudiMaterialShowcase';
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
    <div className="space-y-16 sm:space-y-24 pb-20 bg-[#faf8f5] text-stone-900 antialiased font-sans">
      {/* 1. HERO BANNER WITH SAUDI ARCHITECTURAL POETRY */}
      <section className="relative min-h-[82vh] flex items-center justify-center overflow-hidden bg-[#0c0a09]">
        {/* Background Editorial Image with Atmospheric Grade */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85"
            alt="Modern Saudi Luxury Villa Architecture"
            className="w-full h-full object-cover object-center filter brightness-[0.34] contrast-[1.08] scale-[1.02]"
          />
          {/* Subtle Mashrabiya Geometric Lattice Watermark */}
          <div className="absolute inset-0 bg-mashrabiya-dark opacity-35 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/50 to-transparent" />
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#c5a059]/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#163b2f]/35 blur-3xl pointer-events-none" />
        </div>

        {/* Hero Content - Crisp High-Contrast White & Gold Typography */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7 pt-12 pb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/85 border border-[#c5a059]/50 text-[#dfca92] text-xs font-bold uppercase tracking-widest shadow-md backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse"></span>
            <span>المملكة العربية السعودية · تصاميم معمارية نجدية ومعاصرة</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.12] drop-shadow-md">
            Spatial Poetry in <span className="italic font-serif text-white">Form</span> &amp;{' '}
            <span className="italic font-serif text-[#dfca92]">Material</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-200 font-normal max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Crafted for prestigious Saudi villas and royal Majlis salons: certified 50°C thermal-break architectural windows, acoustic fluted privacy partitions, and bespoke modular seating engineered to order.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#custom-fitting-studio"
              className="w-full sm:w-auto px-8 py-4 bg-[#c5a059] hover:bg-[#dfca92] active:bg-[#8f7033] text-stone-950 text-xs font-bold uppercase tracking-widest rounded-full shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <Palette className="w-4 h-4 text-stone-950" />
              <span>Explore Saudi Villa Inspiration Gallery</span>
              <ArrowRight className="w-4 h-4 text-stone-950" />
            </a>

            <button
              onClick={() => dispatch(openConsultationModal('Physical Swatch Box Request · عينات الأقمشة والمعادن'))}
              className="w-full sm:w-auto px-8 py-4 bg-stone-900/90 hover:bg-stone-800 text-white border border-[#c5a059]/40 text-xs font-bold uppercase tracking-widest rounded-full shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <Box className="w-4 h-4 text-[#dfca92]" />
              <span>Request Villa Swatch Box</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. SAUDI CLIMATE & ARCHITECTURAL TRUST RIBBON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20">
        <div className="bg-white rounded-3xl border border-[#c5a059]/30 shadow-xl p-5 sm:p-7 grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#163b2f]/10 border border-[#163b2f]/20 flex items-center justify-center text-[#163b2f] shrink-0">
              <Sun className="w-5 h-5 text-[#163b2f]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">50°C Thermal Break</h4>
              <p className="text-[11px] text-stone-600 mt-0.5">SASO certified desert solar barrier</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#8f7033] shrink-0">
              <Wind className="w-5 h-5 text-[#8f7033]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Hermetic Dust Seal</h4>
              <p className="text-[11px] text-stone-600 mt-0.5">Sandstorm & micro-particle proof</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#163b2f]/10 border border-[#163b2f]/20 flex items-center justify-center text-[#163b2f] shrink-0">
              <VolumeX className="w-5 h-5 text-[#163b2f]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">38dB Majlis Privacy</h4>
              <p className="text-[11px] text-stone-600 mt-0.5">Acoustic acoustic privacy glazing</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#8f7033] shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#8f7033]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">KSA White-Glove VIP</h4>
              <p className="text-[11px] text-stone-600 mt-0.5">Riyadh, Jeddah, Khobar & Neom</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRIMARY FEATURED SECTION: SAUDI VILLA SAMPLES & CUSTOM ORDER VISUALIZER */}
      <section id="custom-fitting-studio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 space-y-12">
        {/* Step A: Visual Sample Gallery for Normal Customer */}
        <CustomSampleGallery
          onSelectSample={handleSelectSample}
          selectedSampleId={selectedSample?.id}
        />

        {/* Step B: Live Interactive Studio Canvas */}
        <div id="custom-studio-canvas" className="scroll-mt-28 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-6 border-t border-[#c5a059]/30">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8f7033] mb-1">
                <Sliders className="w-3.5 h-3.5 text-[#8f7033]" />
                <span>Live Interactive Simulator · محاكي التصميم الحي</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
                Fine-Tune Colors, Dimensions &amp; Hardware
              </h2>
              <p className="text-sm text-stone-700 font-normal mt-1 max-w-2xl leading-relaxed">
                Watch your architectural windows, privacy partitions, or Majlis modular sofa morph in real time.
              </p>
            </div>

            {/* STUDIO SWITCHER TABS: Fittings vs Sofa */}
            <div className="flex items-center p-1.5 bg-[#f5f0e6] border border-[#c5a059]/30 rounded-2xl gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setStudioTab('fitting')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  studioTab === 'fitting'
                    ? 'bg-[#163b2f] text-white shadow-sm'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <Layers className="w-4 h-4 text-[#dfca92]" />
                <span>Architectural Fittings &amp; Windows</span>
              </button>

              <button
                type="button"
                onClick={() => setStudioTab('sofa')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  studioTab === 'sofa'
                    ? 'bg-[#163b2f] text-white shadow-sm'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <Armchair className="w-4 h-4 text-[#dfca92]" />
                <span>Custom Majlis &amp; Sofa</span>
              </button>
            </div>
          </div>

          {/* Active Preset Notification Banner */}
          {selectedSample && (
            <div className="p-4 bg-[#edf6f2] border border-[#163b2f]/30 rounded-2xl flex items-center justify-between text-xs animate-in fade-in">
              <div className="flex items-center gap-2 text-[#0e271f] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#163b2f] animate-pulse"></span>
                <span>Active Loaded Design: {selectedSample.titleEn} ({selectedSample.titleAr})</span>
              </div>
              <span className="text-[#163b2f] text-[11px] font-medium hidden sm:inline">
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

      {/* 4. TACTILE SAUDI VILLA MATERIAL LIBRARY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SaudiMaterialShowcase />
      </div>

      {/* 5. SIGNATURE READY-MADE EDITIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8f7033] font-bold">
              Signature Ready-Made Editions · قطع الأثاث الجاهزة
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight mt-1">
              Curated Furniture &amp; Architectural Lighting
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 font-normal mt-1 leading-relaxed">
              Crafted in limited seasonal batches using sustainably harvested hardwoods and hand-spun brass.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-[#8f7033] flex items-center gap-1.5 transition-colors"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#8f7033]" />
          </Link>
        </div>

        <ProductGrid products={featuredProducts} isLoading={isFeaturedLoading} />
      </section>

      {/* 6. CURATED DEPARTMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8f7033] font-bold">
              Spatial Disciplines · الأقسام المعمارية
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight mt-1">
              Curated by Department
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-[#8f7033] flex items-center gap-1.5 transition-colors"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#8f7033]" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories?.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group relative aspect-3/4 rounded-2xl overflow-hidden border border-[#c5a059]/30 bg-stone-100 block shadow-2xs hover:shadow-xl transition-all"
            >
              <img
                src={cat.image_url || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80'}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out brightness-90 group-hover:brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/40 to-transparent" />
              <div className="absolute inset-x-3 bottom-3 p-2">
                <h3 className="text-sm font-serif font-bold text-white group-hover:text-[#dfca92] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-stone-300 font-medium mt-0.5">
                  {cat.products_count ? `${cat.products_count} designs` : 'Explore Pieces'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. DESIGN STUDIO CONSULTATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-[#c5a059]/30 bg-white p-8 sm:p-12 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5f0e6] border border-[#c5a059]/40 text-[#8f7033] text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#8f7033]" />
                <span>Saudi Villa Architecture Practice · استشارات الفلل والمجالس</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                Full-Service Interior Design &amp; Residential Architecture
              </h2>

              <p className="text-sm text-stone-700 font-normal leading-relaxed">
                Whether you are designing a royal Majlis sanctuary in Riyadh or outfitting an expansive coastal residence in Jeddah, our architects produce comprehensive 3D spatial elevations, custom millwork, and climate-engineered material palettes.
              </p>

              <div className="space-y-3 pt-1">
                {[
                  'Custom CAD Spatial Planning & Lighting Schedules for Saudi Climate',
                  'Direct Factory Artisan Hardwood, Travertine & Alloy Sourcing',
                  'Turnkey White-Glove Installation & Styling in Riyadh, Jeddah & Khobar',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-xs sm:text-sm text-stone-800 font-semibold">
                    <CheckCircle className="w-4 h-4 text-[#163b2f] shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => dispatch(openConsultationModal('Full Villa Interior'))}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#163b2f] hover:bg-[#1f4e3f] active:bg-[#0e271f] text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-[#c5a059]/40"
                >
                  <span>Book Initial Consultation</span>
                  <ArrowRight className="w-4 h-4 text-[#dfca92]" />
                </button>

                <button
                  onClick={() => {
                    const text = encodeURIComponent(
                      'مرحباً، أود استشارة مهندس الديكور في لآتولييه بخصوص تصميم فيلا ومجلس (Hello, I would like to consult with the architect regarding villa interior design).'
                    );
                    window.open(`https://wa.me/966501234567?text=${text}`, '_blank');
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-200" />
                  <span>WhatsApp VIP Concierge</span>
                </button>
              </div>
            </div>

            {/* Visual showcase */}
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 border border-stone-200 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
                alt="Interior design studio consultation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent flex items-end p-6">
                <div className="text-white text-xs space-y-1">
                  <span className="px-2 py-0.5 rounded-md bg-[#c5a059]/30 text-[#dfca92] text-[10px] font-bold uppercase tracking-widest border border-[#c5a059]/40">
                    📍 Hittin District, Riyadh Villa
                  </span>
                  <p className="font-serif font-bold text-sm">The Hittin Royal Majlis &amp; Solarium</p>
                  <p className="text-stone-300 text-[11px]">Architectural partition, fluted privacy glass &amp; custom desert walnut</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

