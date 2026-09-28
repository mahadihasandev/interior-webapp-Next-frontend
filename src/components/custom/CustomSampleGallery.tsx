'use client';

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Layers,
  Armchair,
  CheckCircle2,
  ArrowRight,
  Sun,
  ShieldCheck,
  Maximize2,
  X,
  Sliders,
  Compass,
} from 'lucide-react';
import { useGetVillaDesignsQuery } from '@/store/services/productsApi';

export interface CustomSample {
  id: string;
  dbId?: number;
  type: 'fitting' | 'sofa';
  titleEn: string;
  titleAr: string;
  tagline: string;
  roomCategory: 'majlis' | 'thermal_window' | 'privacy_partition' | 'family_living' | string;
  roomCategoryLabel: string;
  categoryNameAr?: string;
  locationTag: string; // e.g., 'Riyadh Villa · Hittin District', 'Jeddah Seafront Villa', 'Dammam Executive Majlis'
  photoUrl: string;
  detailPhotoUrl: string;
  priceSAR: number;
  priceUSD: number;
  advanceDepositSAR: number;
  advanceDepositUSD: number;
  saudiFeatures: string[]; // e.g. '50°C Thermal Break', 'Double Dust Seal', 'Majlis Acoustic Privacy'
  specs: {
    dimensions: string;
    finishOrFabric: string;
    coreMaterial: string;
    hardware: string;
  };
  configData: {
    finishId?: string;
    glassId?: string;
    heightInches?: number;
    widthInches?: number;
    gauge?: '1.5mm' | '2.0mm' | '2.5mm';
    mullionStyle?: 'minimal' | 'grid_3x2' | 'single_cross';
    addons?: { [key: string]: boolean };
    layoutId?: string;
    fabricId?: string;
    legId?: string;
    seatDepth?: 'standard' | 'deep_lounge';
    cushionCore?: 'cloud_plush' | 'down_blend' | 'firm_foam';
  };
}

export const SAUDI_CUSTOM_SAMPLES: CustomSample[] = [
  // 1. Majlis Privacy Partition with Modern Mashrabiya
  {
    id: 'saudi-majlis-partition',
    type: 'fitting',
    titleEn: 'The Royal Majlis Privacy Partition',
    titleAr: 'فاصل الخصوصية للمجلس الملكي والمشربية العصرية',
    tagline: 'Warm champagne gold anodized aluminum with 10mm vertical fluted ribbed privacy glass and acoustic hermetic seal.',
    roomCategory: 'privacy_partition',
    roomCategoryLabel: 'Majlis Privacy Screen (فواصل الخصوصية)',
    locationTag: 'Riyadh Villa · Hittin District',
    photoUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    detailPhotoUrl: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80',
    priceUSD: 2840,
    priceSAR: 10650,
    advanceDepositUSD: 1136,
    advanceDepositSAR: 4260,
    saudiFeatures: [
      'Visual Privacy between Men’s Majlis & Dining Area',
      'Acoustic Sound Dampening (38dB noise barrier)',
      'Champagne Gold Electro-Sealed Anodization',
    ],
    specs: {
      dimensions: '96"H × 72"W (2.44m × 1.83m)',
      finishOrFabric: 'Champagne Gold Anodized (6063-T6 Structural Alloy)',
      coreMaterial: '10mm Fluted Ribbed Safety Glass',
      hardware: '3×2 Architectural Grid Mullions + Hydraulic Soft-Close Pivot',
    },
    configData: {
      finishId: 'champagne_gold',
      glassId: 'fluted_ribbed',
      heightInches: 96,
      widthInches: 72,
      gauge: '2.0mm',
      mullionStyle: 'grid_3x2',
      addons: { acoustic_seal: true, hydraulic_damper: true, thermal_barrier: false },
    },
  },

  // 2. Grand Royal Majlis Modular Salon Sofa
  {
    id: 'saudi-majlis-sofa-royal',
    type: 'sofa',
    titleEn: 'The Diwaniya Grand Modular Salon',
    titleAr: 'طقم كنب المجلس والديوانية الملكية المعيارية',
    tagline: 'Reconfigurable luxury 4-piece salon with generous 42" deep lounge seating wrapped in cognac full-grain Tuscan saddle leather.',
    roomCategory: 'majlis',
    roomCategoryLabel: 'Royal Majlis Salon (المجلس الفاخر)',
    locationTag: 'Riyadh Penthouse · Diplomatic Quarter',
    photoUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    detailPhotoUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    priceUSD: 4850,
    priceSAR: 18188,
    advanceDepositUSD: 1940,
    advanceDepositSAR: 7275,
    saudiFeatures: [
      'Deep 42" Lounge Depth for Generous Saudi Hospitality',
      'Full-Grain Leather that patinates richer with age',
      'Solid Hardwood Frame rated for 15+ years of gatherings',
    ],
    specs: {
      dimensions: '136"W × 42"D Lounge (3.45m Modular Width)',
      finishOrFabric: 'Cognac Saddle Full-Grain Tuscan Leather',
      coreMaterial: 'Multi-Density Resilience Core + Down-Feather Top Layer',
      hardware: 'Matte Architectural Black Powder-Coated Steel Plinth',
    },
    configData: {
      layoutId: 'grand_modular',
      fabricId: 'cognac_leather',
      legId: 'black',
      seatDepth: 'deep_lounge',
      cushionCore: 'down_blend',
    },
  },

  // 3. Riyadh Extreme Heat Thermal Break Casement Window
  {
    id: 'saudi-thermal-window',
    type: 'fitting',
    titleEn: 'Riyadh 50°C Thermal Break Window System',
    titleAr: 'نوافذ العزل الحراري الفائق لمناخ الرياض (مقاومة 50° مئوية)',
    tagline: 'Engineered with polyamide thermal barrier and double-glazed Low-E solar glass to block desert heat, UV radiation, and micro-sand.',
    roomCategory: 'thermal_window',
    roomCategoryLabel: 'Thermal Windows (عزل حراري للفلل)',
    locationTag: 'Central KSA · Riyadh Desert Climate Approved',
    photoUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    detailPhotoUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    priceUSD: 2420,
    priceSAR: 9075,
    advanceDepositUSD: 968,
    advanceDepositSAR: 3630,
    saudiFeatures: [
      'SASO-compliant U-Value < 1.4 W/m²K for Desert Heat',
      'Double EPDM Compression Gasket resists sandstorms',
      'Low-E Solar Guard blocks 98% of solar UV glare',
    ],
    specs: {
      dimensions: '84"H × 60"W (2.13m × 1.52m Casement)',
      finishOrFabric: 'Matte Architectural Black (Zero-Glare UV Anodized)',
      coreMaterial: 'Low-Iron Double-Glazed Argon Insulated Glass',
      hardware: 'Integrated Thermal Break Strip + Concealed Multi-Point Locks',
    },
    configData: {
      finishId: 'matte_black',
      glassId: 'ultra_clear',
      heightInches: 84,
      widthInches: 60,
      gauge: '2.0mm',
      mullionStyle: 'minimal',
      addons: { acoustic_seal: true, hydraulic_damper: false, thermal_barrier: true },
    },
  },

  // 4. Family Living Room Alabaster Cloud Sofa
  {
    id: 'saudi-family-sofa',
    type: 'sofa',
    titleEn: 'The Neom Alabaster Bouclé Sectional',
    titleAr: 'كنب صالة العائلة الفاخرة بقماش البوكليه العاجي',
    tagline: 'Sculptural organic silhouette wrapped in soft Italian bouclé with natural American walnut legs for serene family living.',
    roomCategory: 'family_living',
    roomCategoryLabel: 'Family Living Lounge (صالة العائلة)',
    locationTag: 'Jeddah Coastal Villa · Al-Shati',
    photoUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    detailPhotoUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    priceUSD: 2350,
    priceSAR: 8812,
    advanceDepositUSD: 940,
    advanceDepositSAR: 3525,
    saudiFeatures: [
      'Stain-Resistant Performance Treatment on Bouclé',
      'Ultra-Plush Cloud Cushions with high resilience memory foam',
      'Organic Rounded Form safe for children and modern aesthetics',
    ],
    specs: {
      dimensions: '88"W × 42"D Deep Lounge Proportions',
      finishOrFabric: 'Alabaster Textured Warm Cream Bouclé',
      coreMaterial: 'Kiln-Dried Beech Hardwood + Down-Feather Blend',
      hardware: 'Honed Solid American Walnut Plinth Legs',
    },
    configData: {
      layoutId: 'linear_3_seat',
      fabricId: 'cream_boucle',
      legId: 'walnut',
      seatDepth: 'deep_lounge',
      cushionCore: 'down_blend',
    },
  },

  // 5. Executive Smoked Bronze Courtyard Screen
  {
    id: 'saudi-courtyard-screen',
    type: 'fitting',
    titleEn: 'The Al-Khobar Smoked Bronze Solarium',
    titleAr: 'واجهة وفواصل الزجاج البرونزي المظلل للقصور',
    tagline: 'Statuary hand-brushed bronze frame with acoustic smoked bronze glass providing intimate glare-free outdoor courtyard views.',
    roomCategory: 'privacy_partition',
    roomCategoryLabel: 'Courtyard Facade (واجهات الفناء والحدائق)',
    locationTag: 'Eastern Province · Al-Khobar Villa',
    photoUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
    detailPhotoUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    priceUSD: 3420,
    priceSAR: 12825,
    advanceDepositUSD: 1368,
    advanceDepositSAR: 5130,
    saudiFeatures: [
      'Smoked Bronze Tint cuts midday solar desert glare by 65%',
      'Heavy 2.5mm Gauge Structural Aluminum Frame',
      'Acoustic Lamination eliminates exterior street & wind noise',
    ],
    specs: {
      dimensions: '108"H × 84"W (2.74m × 2.13m Double Height)',
      finishOrFabric: 'Brushed Statuary Bronze Patinated Alloy',
      coreMaterial: 'Smoked Bronze Acoustic Laminated Glass',
      hardware: 'Floor-Anchored Stainless Pivot Hardware + EPDM Seals',
    },
    configData: {
      finishId: 'brushed_bronze',
      glassId: 'smoked_bronze',
      heightInches: 108,
      widthInches: 84,
      gauge: '2.5mm',
      mullionStyle: 'minimal',
      addons: { acoustic_seal: true, hydraulic_damper: true, thermal_barrier: true },
    },
  },

  // 6. Emerald Velvet Crescent Salon Sofa
  {
    id: 'saudi-crescent-velvet',
    type: 'sofa',
    titleEn: 'The Royal Emerald Crescent Salon',
    titleAr: 'طقم كنب الصالون الملكي باللون الزمردي المخملي',
    tagline: 'Curved crescent geometry upholstered in rich forest emerald velvet on brushed champagne brass stiletto legs.',
    roomCategory: 'majlis',
    roomCategoryLabel: 'Women’s Salon & Reception (صالون الاستقبال)',
    locationTag: 'Riyadh · Al-Nakheel Luxury Villa',
    photoUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80',
    detailPhotoUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    priceUSD: 2980,
    priceSAR: 11175,
    advanceDepositUSD: 1192,
    advanceDepositSAR: 4470,
    saudiFeatures: [
      'Royal Emerald Velvet matching luxury Saudi reception aesthetics',
      'Serpentine Arc encouraging conversational hospitality',
      'Brushed Champagne Brass Base with scratch-proof floor protectors',
    ],
    specs: {
      dimensions: '96"W × 38"D Sculptural Crescent (2.44m Arc)',
      finishOrFabric: 'Low-Pile Forest Emerald Architectural Velvet',
      coreMaterial: 'High-Density Ergonomic Curve Form + Pocket Springs',
      hardware: 'Brushed Champagne Brass Stiletto Legs',
    },
    configData: {
      layoutId: 'curved_crescent',
      fabricId: 'emerald_velvet',
      legId: 'brass',
      seatDepth: 'standard',
      cushionCore: 'cloud_plush',
    },
  },
];

const resolveImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('/storage/')) {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://127.0.0.1:8000';
    return `${backendUrl}${url}`;
  }
  return url;
};

interface CustomSampleGalleryProps {
  onSelectSample: (sample: CustomSample) => void;
  selectedSampleId?: string;
}

export function CustomSampleGallery({ onSelectSample, selectedSampleId }: CustomSampleGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [previewSample, setPreviewSample] = useState<CustomSample | null>(null);

  // Dynamic API Fetch from Backend
  const { data: apiResponse } = useGetVillaDesignsQuery();

  const samples: CustomSample[] = useMemo(() => {
    if (apiResponse?.data && apiResponse.data.length > 0) {
      return apiResponse.data;
    }
    return SAUDI_CUSTOM_SAMPLES;
  }, [apiResponse]);

  const defaultCategoryTabs = [
    { id: 'all', nameEn: 'All Villa Designs', nameAr: 'جميع تصاميم الفلل' },
    { id: 'majlis', nameEn: 'Royal Majlis & Salons', nameAr: 'المجالس وصالونات الاستقبال' },
    { id: 'thermal_window', nameEn: '50°C Thermal Windows', nameAr: 'نوافذ العزل الحراري (مقاومة 50°م)' },
    { id: 'privacy_partition', nameEn: 'Privacy & Mashrabiya', nameAr: 'فواصل الخصوصية والمشربية' },
    { id: 'family_living', nameEn: 'Family Living Lounges', nameAr: 'صالات المعيشة العائلية' },
  ];

  const categories = useMemo(() => {
    if (!apiResponse?.categories || apiResponse.categories.length === 0) {
      return defaultCategoryTabs;
    }
    const catMap = new Map<string, { id: string; nameEn: string; nameAr: string }>();
    defaultCategoryTabs.forEach((c) => catMap.set(c.id, c));
    apiResponse.categories.forEach((c) => {
      if (!catMap.has(c.id)) {
        catMap.set(c.id, c);
      }
    });
    return Array.from(catMap.values());
  }, [apiResponse]);

  const filteredSamples = samples.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.roomCategory === activeCategory;
  });

  return (
    <div className="space-y-6">
      {/* Visual Header for Customer Who Wants Help Choosing */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 relative overflow-hidden shadow-lg">
        {/* Subtle decorative background pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>Saudi Arabia Architectural & Majlis Collection · مجموعة الفلل والمجالس السعودية</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
            Not sure what type to choose? <br />
            <span className="text-stone-300 font-sans text-xl sm:text-2xl font-normal">
              Select your room style below and watch the design come alive.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
            Whether you need <span className="text-white font-bold">50°C heat-insulated thermal break windows for Riyadh summers</span>, a <span className="text-white font-bold">fluted glass privacy partition separating your Majlis</span>, or a <span className="text-white font-bold">grand luxury modular salon sofa</span> — click any installed Saudi villa sample to load its exact specifications.
          </p>

          {/* Quick Feature Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] font-bold text-stone-200">
            <span className="flex items-center gap-1 bg-stone-800/80 px-3 py-1 rounded-lg border border-stone-700">
              ☀️ 50°C SASO Desert Thermal Rating
            </span>
            <span className="flex items-center gap-1 bg-stone-800/80 px-3 py-1 rounded-lg border border-stone-700">
              🌪️ Hermetic Micro-Sand & Dust Seal
            </span>
            <span className="flex items-center gap-1 bg-stone-800/80 px-3 py-1 rounded-lg border border-stone-700">
              🚚 Delivery to Riyadh, Jeddah, Khobar & Neom
            </span>
            <span className="flex items-center gap-1 bg-stone-800/80 px-3 py-1 rounded-lg border border-stone-700">
              💳 40% Advance · Balance on Site Handover
            </span>
          </div>
        </div>
      </div>

      {/* Room Category Tabs: Easy for Normal Customer */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer flex flex-col items-start ${
              activeCategory === cat.id
                ? 'bg-stone-900 text-white shadow-md'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            <span>{cat.nameEn}</span>
            <span className="text-[10px] font-normal opacity-80">{cat.nameAr}</span>
          </button>
        ))}
      </div>

      {/* Sample Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSamples.map((sample) => {
          const isSelected = selectedSampleId === sample.id;

          return (
            <div
              key={sample.id}
              className={`group bg-white rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-xl ${
                isSelected
                  ? 'border-stone-900 ring-2 ring-stone-900 shadow-md'
                  : 'border-stone-200 hover:border-stone-400'
              }`}
            >
              <div>
                {/* Photo with Overlay Badges */}
                <div className="relative aspect-16/10 overflow-hidden bg-stone-900">
                  <img
                    src={resolveImageUrl(sample.photoUrl)}
                    alt={sample.titleEn}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.92]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-stone-900 backdrop-blur-xs shadow-xs">
                      {sample.type === 'fitting' ? 'Architectural Fitting' : 'Bespoke Sofa'}
                    </span>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-stone-900/90 text-amber-300 border border-stone-700 backdrop-blur-xs truncate max-w-[190px]">
                      📍 {sample.locationTag}
                    </span>
                  </div>

                  {/* Blueprint & Inspect Trigger */}
                  <button
                    type="button"
                    onClick={() => setPreviewSample(sample)}
                    className="absolute bottom-3 right-3 p-2 rounded-xl bg-stone-900/80 hover:bg-stone-900 text-white backdrop-blur-xs transition-colors cursor-pointer"
                    title="Inspect Blueprint & Technical Specs"
                  >
                    <Maximize2 className="w-4 h-4 text-white" />
                  </button>

                  {/* Title overlay */}
                  <div className="absolute bottom-3 left-3 right-12 space-y-0.5">
                    <h4 className="text-base font-serif font-bold text-white leading-tight drop-shadow-md">
                      {sample.titleEn}
                    </h4>
                    <p className="text-[11px] text-amber-200/90 font-medium">
                      {sample.titleAr}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {sample.tagline}
                  </p>

                  {/* Key Saudi Villa Highlights */}
                  <div className="space-y-1.5 pt-1">
                    {sample.saudiFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-stone-800 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Specs Pill Box */}
                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-stone-500">Dimensions:</span>
                      <span className="font-bold text-stone-900">{sample.specs.dimensions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-stone-500">Finish / Fabric:</span>
                      <span className="font-bold text-stone-900 truncate max-w-[170px]" title={sample.specs.finishOrFabric}>
                        {sample.specs.finishOrFabric}
                      </span>
                    </div>
                  </div>

                  {/* Price in SAR (Saudi Riyals) & USD */}
                  <div className="flex items-baseline justify-between pt-1 border-t border-stone-100">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-500 block">
                        Estimated Custom Price
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-serif font-bold text-stone-900">
                          {sample.priceSAR.toLocaleString()} SAR
                        </span>
                        <span className="text-xs text-stone-500 font-medium">
                          (${sample.priceUSD.toLocaleString()})
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-amber-900 block">
                        40% Deposit to Build
                      </span>
                      <span className="text-xs font-bold text-stone-900">
                        {sample.advanceDepositSAR.toLocaleString()} SAR
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button: Choose This Sample */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectSample(sample)}
                  className={`w-full py-3.5 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md'
                      : 'bg-stone-900 hover:bg-stone-800 text-white shadow-xs hover:scale-[1.01]'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                      <span>Loaded in Studio · جاهز للتخصيص</span>
                    </>
                  ) : (
                    <>
                      <Sliders className="w-4 h-4 text-white" />
                      <span>Choose This Sample & Customize · اختر هذا التصميم</span>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-300" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* SAMPLE DETAIL PREVIEW MODAL */}
      {previewSample && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-5 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">
                  📍 {previewSample.locationTag}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                  {previewSample.titleEn}
                </h3>
                <p className="text-xs text-stone-600 font-medium">
                  {previewSample.titleAr}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewSample(null)}
                className="p-1.5 text-stone-400 hover:text-stone-900 text-xl font-bold cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Photos Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-2xl overflow-hidden bg-stone-900 h-56">
                <img
                  src={resolveImageUrl(previewSample.photoUrl)}
                  alt="Installed View"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden bg-stone-900 h-56">
                <img
                  src={resolveImageUrl(previewSample.detailPhotoUrl || previewSample.photoUrl)}
                  alt="Material Detail"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {previewSample.tagline} Engineered strictly to Gulf & Saudi architectural specifications with certified thermal barrier profiles, hermetic dust resistance, and luxury white-glove site delivery.
            </p>

            {/* Saudi Architecture Compliance Highlights */}
            <div className="space-y-2 p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-stone-800">
                Saudi Architectural & Climate Engineering
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {previewSample.saudiFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 font-medium text-stone-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Specs Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-500 block">Proportions</span>
                <span className="font-bold text-stone-900">{previewSample.specs.dimensions}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-500 block">Finish Specification</span>
                <span className="font-bold text-stone-900">{previewSample.specs.finishOrFabric}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-500 block">Core Structure</span>
                <span className="font-bold text-stone-900">{previewSample.specs.coreMaterial}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-500 block">Hardware / Frame</span>
                <span className="font-bold text-stone-900">{previewSample.specs.hardware}</span>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs text-stone-500 block">Custom Build Estimate</span>
                <span className="text-2xl font-serif font-bold text-stone-900">
                  {previewSample.priceSAR.toLocaleString()} SAR
                  <span className="text-xs font-sans font-medium text-stone-500 ml-2">
                    (40% Deposit: {previewSample.advanceDepositSAR.toLocaleString()} SAR / ${previewSample.advanceDepositUSD.toLocaleString()})
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setPreviewSample(null)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const chosen = previewSample;
                    setPreviewSample(null);
                    onSelectSample(chosen);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Load Sample Into Studio · تخصيص الآن</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
