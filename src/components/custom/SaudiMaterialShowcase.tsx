'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Box,
  ArrowRight,
  Sun,
  VolumeX,
  Flame,
} from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { openConsultationModal } from '@/store/slices/uiSlice';

interface MaterialSpec {
  id: string;
  nameEn: string;
  nameAr: string;
  category: string;
  colorHex: string;
  imageUrl: string;
  description: string;
  saudiSuitability: string;
  thermalRating: string;
  acousticRating: string;
  origin: string;
  tactileFeel: string;
}

const SAUDI_VILLA_MATERIALS: MaterialSpec[] = [
  {
    id: 'travertine',
    nameEn: 'Roman Navona Travertine',
    nameAr: 'رخام الترافرتين الإيطالي النافونا',
    category: 'Natural Architectural Stone',
    colorHex: '#e8dcce',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
    description: 'Honed, cross-cut Italian travertine characterized by warm cream porous linear banding and earthy desert undertones.',
    saudiSuitability: 'Naturally cool underfoot during 50°C summer heatwaves with high thermal inertia.',
    thermalRating: 'High Thermal Mass (Cooling)',
    acousticRating: 'Reflective Clarity',
    origin: 'Tivoli, Italy',
    tactileFeel: 'Silky honed matte, soft organic micro-cavities',
  },
  {
    id: 'champagne_aluminum',
    nameEn: 'Champagne Anodized 6063 Alloy',
    nameAr: 'ألمنيوم الشمبانيا الذهبي المعالج 6063',
    category: 'Structural Metal Frame',
    colorHex: '#c5a059',
    imageUrl: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1000&q=85',
    description: 'Electrolytically deposited 25-micron anodic gold barrier that never flakes, peels, or fades under extreme UV exposure.',
    saudiSuitability: 'Zero corrosion in humid Jeddah coastal air and immune to abrasive desert sandstorms.',
    thermalRating: 'Polyamide Thermal Break Sealed',
    acousticRating: 'Hermetic Gasket Isolation',
    origin: 'Aviation-Grade Alloy Extrusion',
    tactileFeel: 'Satin micro-brushed metallic coolness',
  },
  {
    id: 'fluted_glass',
    nameEn: '10mm Fluted Ribbed Privacy Glass',
    nameAr: 'زجاج الخصوصية المضلع عالي العزل',
    category: 'Acoustic Partition Glazing',
    colorHex: '#d8dedb',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=85',
    description: 'Precision-extruded vertical reeded flutes that refract natural daylight while blurring interior silhouettes for privacy.',
    saudiSuitability: 'Separates Royal Majlis salons from private family dining with elegance and privacy.',
    thermalRating: 'Low-E Heat Reflective Solar Coating',
    acousticRating: '38dB Sound Isolation Rating',
    origin: 'European Architectural Float Glass',
    tactileFeel: 'Rhythmic crisp vertical fluting ridges',
  },
  {
    id: 'saddle_leather',
    nameEn: 'Cognac Tuscan Full-Grain Leather',
    nameAr: 'جلد توسكاني طبيعي بلون الكونياك الملكي',
    category: 'Majlis Upholstery',
    colorHex: '#8b4d24',
    imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=85',
    description: 'Vegetable-tanned 2.2mm hides with breathable porous grain that conditions and enriches its patina with age.',
    saudiSuitability: 'Supple in air-conditioned interiors; naturally breathable and resistant to sagging.',
    thermalRating: 'Breathable Natural Pore Structure',
    acousticRating: 'Soft Ambient Absorption',
    origin: 'Santa Croce sull’Arno, Tuscany',
    tactileFeel: 'Buttery smooth warmth with natural pebble texture',
  },
  {
    id: 'oasis_velvet',
    nameEn: 'Royal Oasis Emerald Velvet',
    nameAr: 'المخمل الزمردي الملكي المعالج للضيافة',
    category: 'Majlis & Salon Textiles',
    colorHex: '#163b2f',
    imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=85',
    description: 'Dense low-pile architectural velvet treated with invisible nanotech stain guard against Saudi coffee and oud oils.',
    saudiSuitability: 'Engineered specifically for heavy royal gatherings, resistant to beverage spills and friction.',
    thermalRating: 'Insulating Plush Softness',
    acousticRating: '42dB High Acoustic Dampening',
    origin: 'Flemish Textile Mills, Belgium',
    tactileFeel: 'Deep velvety stroke with lustrous emerald depth',
  },
  {
    id: 'desert_walnut',
    nameEn: 'Diriyah Smoked Desert Walnut',
    nameAr: 'خشب الجوز الصحراوي الداكن المعتق',
    category: 'Bespoke Architectural Millwork',
    colorHex: '#3d2b20',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85',
    description: 'Kiln-stabilized solid hardwood finished in organic micro-crystalline wax to highlight dark tobacco swirls.',
    saudiSuitability: 'Pre-conditioned for desert air moisture shifts (10% to 75% RH) without warping or cracking.',
    thermalRating: 'Natural Organic Insulation',
    acousticRating: 'Warm Harmonic Resonance',
    origin: 'Appalachian Certified Hardwoods',
    tactileFeel: 'Silky hand-planed grain with satin wax finish',
  },
];

export function SaudiMaterialShowcase() {
  const dispatch = useAppDispatch();
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialSpec>(SAUDI_VILLA_MATERIALS[0]);

  return (
    <section className="relative rounded-3xl overflow-hidden bg-stone-900 text-white border border-stone-800 shadow-xl">
      {/* Background Mashrabiya pattern overlay */}
      <div className="absolute inset-0 bg-mashrabiya-dark opacity-40 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#c5a059]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#163b2f]/30 blur-3xl pointer-events-none" />

      <div className="relative z-10 p-6 sm:p-10 lg:p-14 space-y-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-stone-800">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#dfca92] text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#dfca92]" />
              <span>Saudi Villa Material Library · خامات الفلل النجدية والمعاصرة</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Tactile Authenticity, Engineered for the Desert
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
              Every profile, textile, and stone in our collection is rigorously tested for the Kingdom’s climate — UV degradation, 50°C solar thermal barriers, and generational longevity.
            </p>
          </div>

          {/* Action button: Request Swatch Box */}
          <div className="shrink-0">
            <button
              onClick={() => dispatch(openConsultationModal('Physical Swatch Box Request · عينات الأقمشة والمعادن'))}
              className="px-6 py-3.5 rounded-full bg-[#c5a059] hover:bg-[#dfca92] active:bg-[#8f7033] text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md hover:scale-105 cursor-pointer"
            >
              <Box className="w-4 h-4 text-stone-950" />
              <span>Request Swatch Box to Your Villa</span>
              <ArrowRight className="w-4 h-4 text-stone-950" />
            </button>
            <p className="text-[10px] text-stone-400 text-center mt-2 font-arabic">
              توصيل عينات مجانية لفلل الرياض وجدة والخبر
            </p>
          </div>
        </div>

        {/* Material Selection Chips / Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SAUDI_VILLA_MATERIALS.map((mat) => {
            const isSelected = selectedMaterial.id === mat.id;
            return (
              <button
                key={mat.id}
                type="button"
                onClick={() => setSelectedMaterial(mat)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-28 ${
                  isSelected
                    ? 'border-[#c5a059] bg-stone-800/90 ring-1 ring-[#c5a059] shadow-lg'
                    : 'border-stone-800 bg-stone-900/60 hover:border-stone-700 hover:bg-stone-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-4 h-4 rounded-full border border-white/20 shadow-xs"
                    style={{ backgroundColor: mat.colorHex }}
                  />
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white truncate">{mat.nameEn}</h4>
                  <p className="text-[10px] text-[#dfca92] font-arabic truncate mt-0.5">{mat.nameAr}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Material Deep-Dive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          {/* Visual macro image card (5 Cols) */}
          <div className="lg:col-span-5 relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 rounded-3xl overflow-hidden border border-stone-700 shadow-2xl group">
            <Image
              src={selectedMaterial.imageUrl}
              alt={selectedMaterial.nameEn}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-900/80 backdrop-blur-md text-[#dfca92] border border-[#c5a059]/40">
                {selectedMaterial.category}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-tight">
                {selectedMaterial.nameEn}
              </h3>
              <p className="text-xs text-[#dfca92] font-arabic mt-0.5">
                {selectedMaterial.nameAr}
              </p>
            </div>
          </div>

          {/* Technical Specs & Climate Resilience Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#dfca92]">
                Architectural Specification & Origin: {selectedMaterial.origin}
              </span>
              <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-light">
                {selectedMaterial.description}
              </p>
            </div>

            {/* Saudi Climate Resilience Box */}
            <div className="p-4 rounded-2xl bg-[#163b2f]/40 border border-[#c5a059]/30 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#6ee7b7]">
                <Sun className="w-4 h-4 text-[#dfca92]" />
                <span>Saudi Climate Engineering Suitability (الملاءمة لمناخ المملكة)</span>
              </div>
              <p className="text-xs text-stone-200 leading-relaxed">
                {selectedMaterial.saudiSuitability}
              </p>
            </div>

            {/* Performance Metric Pill Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-1">
                <span className="text-[10px] uppercase font-bold text-stone-400 flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-[#dfca92]" />
                  <span>Thermal Response</span>
                </span>
                <p className="text-xs font-bold text-white">{selectedMaterial.thermalRating}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-1">
                <span className="text-[10px] uppercase font-bold text-stone-400 flex items-center gap-1">
                  <VolumeX className="w-3.5 h-3.5 text-[#6ee7b7]" />
                  <span>Majlis Acoustic</span>
                </span>
                <p className="text-xs font-bold text-white">{selectedMaterial.acousticRating}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-1">
                <span className="text-[10px] uppercase font-bold text-stone-400 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-[#dfca92]" />
                  <span>Tactile Hand-Feel</span>
                </span>
                <p className="text-xs font-bold text-white truncate" title={selectedMaterial.tactileFeel}>
                  {selectedMaterial.tactileFeel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
