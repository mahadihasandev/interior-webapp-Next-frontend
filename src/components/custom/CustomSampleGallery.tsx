'use client';

import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Maximize2,
  X,
  Sliders,
  Compass,
} from 'lucide-react';
import { useGetVillaDesignsQuery } from '@/store/services/productsApi';
import { CustomSample } from '@/types';
export type { CustomSample };

export const SAUDI_CUSTOM_SAMPLES: CustomSample[] = [
  {
    id: 'saudi-majlis-partition',
    type: 'fitting',
    titleEn: 'The Royal Majlis Privacy Partition',
    titleAr: 'فاصل الخصوصية للمجلس الملكي',
    tagline: 'Warm champagne gold anodized aluminum with 10mm vertical fluted ribbed privacy glass and acoustic hermetic seal.',
    roomCategory: 'privacy_partition',
    roomCategoryLabel: 'Majlis Privacy Screen',
    locationTag: 'Riyadh Villa · Hittin District',
    photoUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    detailPhotoUrl: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80',
    priceUSD: 2840,
    priceSAR: 10650,
    advanceDepositUSD: 1136,
    advanceDepositSAR: 4260,
    saudiFeatures: [
      'Visual Privacy between Majlis & Dining Area',
      'Acoustic Sound Dampening (38dB noise barrier)',
      'Champagne Gold Electro-Sealed Anodization',
    ],
    specs: {
      dimensions: '96"H × 72"W (2.44m × 1.83m)',
      finishOrFabric: 'Champagne Gold Anodized (6063-T6)',
      coreMaterial: '10mm Fluted Ribbed Safety Glass',
      hardware: '3×2 Grid Mullions + Hydraulic Soft-Close Pivot',
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
  {
    id: 'saudi-majlis-sofa-royal',
    type: 'sofa',
    titleEn: 'The Diwaniya Grand Modular Salon',
    titleAr: 'طقم كنب المجلس والديوانية الملكية',
    tagline: 'Reconfigurable luxury 4-piece salon with 42" deep lounge seating in cognac full-grain Tuscan saddle leather.',
    roomCategory: 'majlis',
    roomCategoryLabel: 'Royal Majlis Salon',
    locationTag: 'Riyadh Penthouse · Diplomatic Quarter',
    photoUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    detailPhotoUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    priceUSD: 4850,
    priceSAR: 18188,
    advanceDepositUSD: 1940,
    advanceDepositSAR: 7275,
    saudiFeatures: [
      'Deep 42" Lounge Depth for generous Saudi hospitality',
      'Full-Grain Leather that patinates richer with age',
      'Solid Hardwood Frame rated for 15+ years',
    ],
    specs: {
      dimensions: '136"W × 42"D (3.45m Modular Width)',
      finishOrFabric: 'Cognac Saddle Full-Grain Tuscan Leather',
      coreMaterial: 'Multi-Density Core + Down-Feather Top Layer',
      hardware: 'Matte Black Powder-Coated Steel Plinth',
    },
    configData: {
      layoutId: 'grand_modular',
      fabricId: 'cognac_leather',
      legId: 'black',
      seatDepth: 'deep_lounge',
      cushionCore: 'down_blend',
    },
  },
  {
    id: 'saudi-thermal-window',
    type: 'fitting',
    titleEn: 'Riyadh 50°C Thermal Break Window',
    titleAr: 'نوافذ العزل الحراري لمناخ الرياض',
    tagline: 'Polyamide thermal barrier and double-glazed Low-E solar glass to block desert heat, UV radiation, and micro-sand.',
    roomCategory: 'thermal_window',
    roomCategoryLabel: '50°C Thermal Windows',
    locationTag: 'Central KSA · Riyadh Approved',
    photoUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    detailPhotoUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    priceUSD: 2420,
    priceSAR: 9075,
    advanceDepositUSD: 968,
    advanceDepositSAR: 3630,
    saudiFeatures: [
      'SASO-compliant U-Value < 1.4 W/m²K',
      'Double EPDM Compression Gasket resists sandstorms',
      'Low-E Solar Guard blocks 98% of UV glare',
    ],
    specs: {
      dimensions: '84"H × 60"W (2.13m × 1.52m)',
      finishOrFabric: 'Matte Architectural Black (UV Anodized)',
      coreMaterial: 'Low-Iron Double-Glazed Argon Glass',
      hardware: 'Thermal Break Strip + Concealed Multi-Point Locks',
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
  {
    id: 'saudi-family-sofa',
    type: 'sofa',
    titleEn: 'The Neom Alabaster Bouclé Sectional',
    titleAr: 'كنب صالة العائلة بقماش البوكليه العاجي',
    tagline: 'Sculptural organic silhouette in soft Italian bouclé with natural American walnut legs for serene family living.',
    roomCategory: 'family_living',
    roomCategoryLabel: 'Family Living Lounge',
    locationTag: 'Jeddah Coastal Villa · Al-Shati',
    photoUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    detailPhotoUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    priceUSD: 2350,
    priceSAR: 8812,
    advanceDepositUSD: 940,
    advanceDepositSAR: 3525,
    saudiFeatures: [
      'Stain-Resistant Performance Treatment on Bouclé',
      'Ultra-Plush Cloud Cushions with high resilience foam',
      'Organic Rounded Form safe for children',
    ],
    specs: {
      dimensions: '88"W × 42"D Deep Lounge',
      finishOrFabric: 'Alabaster Textured Warm Cream Bouclé',
      coreMaterial: 'Kiln-Dried Beech Hardwood + Down-Feather',
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
  {
    id: 'saudi-courtyard-screen',
    type: 'fitting',
    titleEn: 'Al-Khobar Smoked Bronze Solarium',
    titleAr: 'واجهة الزجاج البرونزي المظلل للقصور',
    tagline: 'Hand-brushed bronze frame with acoustic smoked bronze glass for intimate glare-free courtyard views.',
    roomCategory: 'privacy_partition',
    roomCategoryLabel: 'Courtyard Facade',
    locationTag: 'Eastern Province · Al-Khobar Villa',
    photoUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
    detailPhotoUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    priceUSD: 3420,
    priceSAR: 12825,
    advanceDepositUSD: 1368,
    advanceDepositSAR: 5130,
    saudiFeatures: [
      'Smoked Bronze Tint cuts solar glare by 65%',
      'Heavy 2.5mm Gauge Structural Aluminum Frame',
      'Acoustic Lamination eliminates exterior noise',
    ],
    specs: {
      dimensions: '108"H × 84"W (2.74m × 2.13m)',
      finishOrFabric: 'Brushed Statuary Bronze Patinated Alloy',
      coreMaterial: 'Smoked Bronze Acoustic Laminated Glass',
      hardware: 'Floor-Anchored Stainless Pivot + EPDM Seals',
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
  {
    id: 'saudi-crescent-velvet',
    type: 'sofa',
    titleEn: 'The Royal Emerald Crescent Salon',
    titleAr: 'طقم كنب الصالون الملكي بالمخمل الزمردي',
    tagline: 'Curved crescent geometry upholstered in rich forest emerald velvet on brushed champagne brass stiletto legs.',
    roomCategory: 'majlis',
    roomCategoryLabel: "Women's Salon & Reception",
    locationTag: 'Riyadh · Al-Nakheel Luxury Villa',
    photoUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80',
    detailPhotoUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    priceUSD: 2980,
    priceSAR: 11175,
    advanceDepositUSD: 1192,
    advanceDepositSAR: 4470,
    saudiFeatures: [
      'Royal Emerald Velvet for luxury reception aesthetics',
      'Serpentine Arc encouraging conversational hospitality',
      'Brushed Champagne Brass with scratch-proof floor protectors',
    ],
    specs: {
      dimensions: '96"W × 38"D Sculptural Crescent',
      finishOrFabric: 'Low-Pile Forest Emerald Architectural Velvet',
      coreMaterial: 'High-Density Ergonomic Curve + Pocket Springs',
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
    const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://interior-webapp-php-backend.onrender.com';
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

  const { data: apiResponse } = useGetVillaDesignsQuery();

  const samples: CustomSample[] = useMemo(() => {
    if (apiResponse?.data && apiResponse.data.length > 0) return apiResponse.data;
    return SAUDI_CUSTOM_SAMPLES;
  }, [apiResponse]);

  const defaultCategoryTabs = [
    { id: 'all',               nameEn: 'All Designs',           nameAr: 'الكل' },
    { id: 'majlis',            nameEn: 'Royal Majlis & Salons', nameAr: 'المجالس' },
    { id: 'thermal_window',    nameEn: '50°C Thermal Windows',  nameAr: 'نوافذ حرارية' },
    { id: 'privacy_partition', nameEn: 'Privacy & Screens',     nameAr: 'فواصل الخصوصية' },
    { id: 'family_living',     nameEn: 'Family Lounges',        nameAr: 'صالات العائلة' },
  ];

  const categories = useMemo(() => {
    if (!apiResponse?.categories || apiResponse.categories.length === 0) return defaultCategoryTabs;
    const catMap = new Map<string, { id: string; nameEn: string; nameAr: string }>();
    defaultCategoryTabs.forEach((c) => catMap.set(c.id, c));
    apiResponse.categories.forEach((c) => { if (!catMap.has(c.id)) catMap.set(c.id, c); });
    return Array.from(catMap.values());
  }, [apiResponse]);

  const filteredSamples = samples.filter((s) =>
    activeCategory === 'all' ? true : s.roomCategory === activeCategory
  );

  return (
    <div className="space-y-5">
      {/* Category filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 cursor-pointer transition-colors border ${
              activeCategory === cat.id
                ? 'bg-[#1a3d30] text-white border-[#1a3d30]'
                : 'bg-white text-[#3d3833] border-[#e2d9cc] hover:border-[#b8933f] hover:text-[#1a1815]'
            }`}
          >
            {cat.nameEn}
          </button>
        ))}
      </div>

      {/* Sample cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSamples.map((sample) => {
          const isSelected = selectedSampleId === sample.id;
          return (
            <div
              key={sample.id}
              className={`group bg-white rounded-2xl border overflow-hidden flex flex-col transition-all duration-200 ${
                isSelected
                  ? 'border-[#1a3d30] ring-1 ring-[#1a3d30]'
                  : 'border-[#e2d9cc] hover:border-[#b8933f]'
              }`}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#f3ede4]">
                <img
                  src={resolveImageUrl(sample.photoUrl)}
                  alt={sample.titleEn}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/90 text-[#1a1815] border border-[#e2d9cc]">
                  {sample.type === 'fitting' ? 'Architectural Fitting' : 'Bespoke Sofa'}
                </span>
                <button
                  type="button"
                  onClick={() => setPreviewSample(sample)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/90 hover:bg-white text-[#1a1815] border border-[#e2d9cc] transition-colors cursor-pointer"
                  title="View details"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-3 flex-1">
                <div>
                  <p className="text-[10px] font-medium text-[#b8933f] flex items-center gap-1">
                    <Compass className="w-3 h-3" /> {sample.locationTag}
                  </p>
                  <h4 className="text-sm font-serif font-bold text-[#1a1815] mt-0.5 leading-snug">
                    {sample.titleEn}
                  </h4>
                  <p className="text-xs text-[#7a7166] mt-1 line-clamp-2 leading-relaxed">
                    {sample.tagline}
                  </p>
                </div>

                <ul className="space-y-1">
                  {sample.saudiFeatures.slice(0, 2).map((feat, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[11px] text-[#3d3833]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1a3d30] shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between text-xs border-t border-[#f3ede4] pt-3">
                  <span className="text-[#7a7166] truncate max-w-[140px]">{sample.specs.finishOrFabric}</span>
                  <span className="font-semibold text-[#1a1815]">{sample.specs.dimensions}</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <p className="text-[10px] text-[#7a7166]">Estimated</p>
                    <p className="text-base font-serif font-bold text-[#1a1815]">
                      {sample.priceSAR.toLocaleString()} <span className="text-xs font-sans">SAR</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectSample(sample)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#edf4f0] text-[#1a3d30] border border-[#1a3d30]/20'
                        : 'bg-[#1a3d30] text-white hover:bg-[#1f4e3f]'
                    }`}
                  >
                    {isSelected ? (
                      <><CheckCircle2 className="w-3.5 h-3.5" /> Loaded</>
                    ) : (
                      <>Customise <ArrowRight className="w-3 h-3" /></>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail modal */}
      {previewSample && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#e2d9cc] max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between p-5 sm:p-6 border-b border-[#f3ede4]">
              <div>
                <p className="text-[10px] font-semibold text-[#b8933f] uppercase tracking-wider">
                  📍 {previewSample.locationTag}
                </p>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#1a1815] mt-0.5">
                  {previewSample.titleEn}
                </h3>
                <p className="text-xs text-[#7a7166]">{previewSample.titleAr}</p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewSample(null)}
                className="p-1.5 text-[#7a7166] hover:text-[#1a1815] hover:bg-[#f3ede4] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl overflow-hidden bg-[#f3ede4] h-48">
                  <img src={resolveImageUrl(previewSample.photoUrl)} alt="Installed view" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden bg-[#f3ede4] h-48">
                  <img src={resolveImageUrl(previewSample.detailPhotoUrl || previewSample.photoUrl)} alt="Detail" className="w-full h-full object-cover" />
                </div>
              </div>

              <p className="text-sm text-[#3d3833] leading-relaxed">{previewSample.tagline}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {previewSample.saudiFeatures.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#3d3833] bg-[#f3ede4] rounded-lg px-3 py-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1a3d30] shrink-0" />
                    {feat}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {([
                  ['Dimensions', previewSample.specs.dimensions],
                  ['Finish', previewSample.specs.finishOrFabric],
                  ['Core', previewSample.specs.coreMaterial],
                  ['Hardware', previewSample.specs.hardware],
                ] as [string, string][]).map(([label, val]) => (
                  <div key={label} className="bg-[#f3ede4] rounded-xl p-3">
                    <p className="text-[10px] uppercase tracking-wider text-[#7a7166] font-semibold">{label}</p>
                    <p className="text-xs font-semibold text-[#1a1815] mt-0.5">{val}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#f3ede4]">
                <div>
                  <p className="text-xs text-[#7a7166]">Custom Build Estimate</p>
                  <p className="text-xl font-serif font-bold text-[#1a1815]">
                    {previewSample.priceSAR.toLocaleString()} SAR
                    <span className="text-xs font-sans font-medium text-[#7a7166] ml-2">
                      (40% deposit: {previewSample.advanceDepositSAR.toLocaleString()} SAR)
                    </span>
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setPreviewSample(null)}
                    className="px-4 py-2 bg-[#f3ede4] text-[#3d3833] text-xs font-semibold rounded-full hover:bg-[#e8ddd0] transition-colors cursor-pointer border border-[#e2d9cc]"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => { const s = previewSample; setPreviewSample(null); onSelectSample(s); }}
                    className="px-5 py-2 bg-[#1a3d30] text-white text-xs font-semibold rounded-full hover:bg-[#1f4e3f] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Sliders className="w-3.5 h-3.5" /> Load in Studio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
