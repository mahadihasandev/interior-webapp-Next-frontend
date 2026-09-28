'use client';

import React, { useState, useMemo } from 'react';
import {
  Armchair,
  ArrowRight,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';

import { useAppDispatch } from '@/store/hooks';
import { addToCart, setDrawerOpen } from '@/store/slices/cartSlice';
import { Product } from '@/types';

interface SofaColor {
  id: string;
  name: string;
  hex: string;
  material: string;
  multiplier: number;
}

interface SofaLayout {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  widthInches: number;
}

interface LegFinish {
  id: string;
  name: string;
  hex: string;
}

const SOFA_LAYOUTS: SofaLayout[] = [
  {
    id: 'linear_3_seat',
    name: '3-Seater Linear Studio',
    description: 'Classic architectural silhouette with deep lounge proportions',
    basePrice: 1850,
    widthInches: 88,
  },
  {
    id: 'l_shape_chaise',
    name: 'L-Shape Lounge with Chaise',
    description: 'Extended floating chaise module for relaxed spatial comfort',
    basePrice: 2650,
    widthInches: 112,
  },
  {
    id: 'curved_crescent',
    name: 'Curved Bouclé Salon Sofa',
    description: 'Sculptural crescent geometry inspired by Parisian mid-century modernism',
    basePrice: 2350,
    widthInches: 96,
  },
  {
    id: 'grand_modular',
    name: 'Grand 4-Piece Modular Salon',
    description: 'Reconfigurable modular blocks with freestanding ottoman',
    basePrice: 3450,
    widthInches: 136,
  },
];

const UPHOLSTERY_OPTIONS: SofaColor[] = [
  { id: 'cream_boucle', name: 'Alabaster Bouclé', hex: '#F3EFEA', material: 'Tactile Italian Bouclé', multiplier: 1.0 },
  { id: 'oat_linen', name: 'Natural Oatmeal', hex: '#D7C7B0', material: 'Belgian Washed Linen', multiplier: 1.05 },
  { id: 'cognac_leather', name: 'Cognac Saddle', hex: '#A2592B', material: 'Full-Grain Tuscan Leather', multiplier: 1.35 },
  { id: 'obsidian_leather', name: 'Obsidian Black', hex: '#222222', material: 'Full-Grain Tuscan Leather', multiplier: 1.35 },
  { id: 'emerald_velvet', name: 'Forest Emerald', hex: '#1C3E30', material: 'Low-Pile Architectural Velvet', multiplier: 1.15 },
  { id: 'midnight_navy', name: 'Midnight Navy', hex: '#192841', material: 'Low-Pile Architectural Velvet', multiplier: 1.15 },
  { id: 'terracotta_wool', name: 'Terracotta Earth', hex: '#B2583F', material: 'Brushed Wool Blend', multiplier: 1.2 },
  { id: 'charcoal_felt', name: 'Deep Charcoal', hex: '#34312F', material: 'Heavy Performance Weave', multiplier: 1.1 },
];

const LEG_FINISHES: LegFinish[] = [
  { id: 'brass', name: 'Brushed Champagne Brass', hex: '#C5A059' },
  { id: 'black', name: 'Matte Architectural Black', hex: '#1C1917' },
  { id: 'walnut', name: 'Honed American Walnut', hex: '#4E3524' },
  { id: 'chrome', name: 'Polished Stainless Chrome', hex: '#D6D3D1' },
];

export function CustomSofaVisualizer() {
  const dispatch = useAppDispatch();

  const [selectedLayout, setSelectedLayout] = useState<SofaLayout>(SOFA_LAYOUTS[0]);
  const [selectedFabric, setSelectedFabric] = useState<SofaColor>(UPHOLSTERY_OPTIONS[0]);
  const [selectedLegs, setSelectedLegs] = useState<LegFinish>(LEG_FINISHES[0]);
  const [cushionCore, setCushionCore] = useState<'cloud_plush' | 'down_blend' | 'firm_foam'>('down_blend');
  const [seatDepth, setSeatDepth] = useState<'standard' | 'deep_lounge'>('deep_lounge');

  // Calculated Pricing
  const calculation = useMemo(() => {
    let total = selectedLayout.basePrice * selectedFabric.multiplier;
    if (seatDepth === 'deep_lounge') total += 220;
    if (cushionCore === 'down_blend') total += 180;

    const finalTotal = Math.round(total);
    const advanceRequired = Math.round(finalTotal * 0.4);

    return {
      finalTotal,
      advanceRequired,
    };
  }, [selectedLayout, selectedFabric, seatDepth, cushionCore]);

  const handleOrderSofa = () => {
    const customProduct: Product = {
      id: 9991,
      category_id: 1,
      name: `Custom ${selectedLayout.name} (${selectedFabric.name})`,
      slug: `custom-sofa-${selectedLayout.id}`,
      description: `Bespoke ${selectedLayout.name} upholstered in ${selectedFabric.name} (${selectedFabric.material}).`,
      price: calculation.finalTotal,
      image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
      stock: 10,
      in_stock: true,
      gallery: [],
      is_featured: false,
      rating: 5.0,
      reviews_count: 1,
      category: { id: 1, name: 'Custom Sofa Studio', slug: 'living-room' },
      custom_specs: {
        layout: selectedLayout.name,
        fabric: selectedFabric.name,
        fabric_material: selectedFabric.material,
        fabric_hex: selectedFabric.hex,
        legs: selectedLegs.name,
        depth: seatDepth === 'deep_lounge' ? '42" Deep Lounge' : '36" Standard',
        cushion: cushionCore === 'down_blend' ? 'Down-Feather Blend' : cushionCore === 'cloud_plush' ? 'Cloud Resilience Foam' : 'Ergonomic High Density',
        width_inches: selectedLayout.widthInches,
        is_custom_sofa: true,
        advance_required: calculation.advanceRequired,
      },
    };

    dispatch(
      addToCart({
        product: customProduct,
        quantity: 1,
      })
    );
    dispatch(setDrawerOpen(true));
  };


  const isDarkFabric = ['#222222', '#1C3E30', '#192841', '#34312F'].includes(selectedFabric.hex);

  // Saudi Majlis & Living Presets
  const applySaudiSofaPreset = (presetName: string) => {
    if (presetName === 'royal_majlis') {
      setSelectedLayout(SOFA_LAYOUTS[3]); // Grand Modular
      setSelectedFabric(UPHOLSTERY_OPTIONS[2]); // Cognac Saddle Leather
      setSelectedLegs(LEG_FINISHES[1]); // Matte Black
      setSeatDepth('deep_lounge');
      setCushionCore('down_blend');
    } else if (presetName === 'family_chaise') {
      setSelectedLayout(SOFA_LAYOUTS[1]); // L-Shape Chaise
      setSelectedFabric(UPHOLSTERY_OPTIONS[1]); // Natural Oatmeal Linen
      setSelectedLegs(LEG_FINISHES[0]); // Champagne Brass
      setSeatDepth('deep_lounge');
      setCushionCore('cloud_plush');
    } else if (presetName === 'emerald_salon') {
      setSelectedLayout(SOFA_LAYOUTS[2]); // Curved Crescent
      setSelectedFabric(UPHOLSTERY_OPTIONS[4]); // Forest Emerald Velvet
      setSelectedLegs(LEG_FINISHES[0]); // Champagne Brass
      setSeatDepth('standard');
      setCushionCore('cloud_plush');
    } else if (presetName === 'alabaster_cloud') {
      setSelectedLayout(SOFA_LAYOUTS[0]); // 3-Seater Linear
      setSelectedFabric(UPHOLSTERY_OPTIONS[0]); // Alabaster Bouclé
      setSelectedLegs(LEG_FINISHES[2]); // Honed Walnut
      setSeatDepth('deep_lounge');
      setCushionCore('down_blend');
    }
  };

  const sarTotal = Math.round(calculation.finalTotal * 3.75);
  const sarAdvance = Math.round(calculation.advanceRequired * 3.75);

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden text-stone-900">
      {/* Top Banner with Saudi Majlis Studio Badge */}
      <div className="p-6 sm:p-8 border-b border-stone-200 bg-stone-50 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-white text-xs font-bold uppercase tracking-wider mb-2">
              <Armchair className="w-3.5 h-3.5 text-amber-400" />
              <span>Saudi Majlis & Living Studio · استوديو تفصيل كنب المجالس والفلل</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Bespoke Majlis Modular Salon & Lounge Configurator
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 font-normal mt-1 max-w-2xl leading-relaxed">
              Designed for Saudi hospitality: 42&quot; deep lounge seating, stain-resistant Italian fabrics, and handcrafted modular sections tailored for royal Majlis gatherings and family villas.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2 bg-white rounded-xl border border-stone-200 shadow-2xs text-right">
              <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold block">
                Configured Span
              </span>
              <span className="text-base font-mono font-bold text-stone-900">
                {selectedLayout.widthInches}&quot; Wide ({(selectedLayout.widthInches * 0.0254).toFixed(2)}m)
              </span>
            </div>
          </div>
        </div>

        {/* 1-CLICK SAUDI MAJLIS PRESETS */}
        <div className="pt-2 border-t border-stone-200">
          <div className="flex items-center gap-1.5 text-xs text-stone-600 font-bold mb-2">
            <span>⚡ Quick-Load Saudi Majlis & Living Presets (نماذج المجالس والكنب الفاخر):</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => applySaudiSofaPreset('royal_majlis')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>👑 Royal Majlis Leather Modular (المجلس الملكي الفاخر)</span>
            </button>
            <button
              type="button"
              onClick={() => applySaudiSofaPreset('family_chaise')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>🛋️ Riyadh Villa Family Chaise (صالة العائلة بالكتان)</span>
            </button>
            <button
              type="button"
              onClick={() => applySaudiSofaPreset('emerald_salon')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>✨ Emerald Velvet Crescent (الصالون الزمردي الدائري)</span>
            </button>
            <button
              type="button"
              onClick={() => applySaudiSofaPreset('alabaster_cloud')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>☁️ Alabaster Bouclé Cloud 3-Seater (البوكليه العاجي)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Dynamic Visual Sofa CAD, Right Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
        {/* LEFT COLUMN: Real-Time Dynamic Visual Sofa Elevation (6 Cols) */}
        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col items-center justify-center bg-stone-100/60 min-h-[460px]">
          {/* Active Color Info Pill */}
          <div className="mb-4 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-2xs flex items-center gap-2.5">
            <span
              className="w-3.5 h-3.5 rounded-full border border-stone-300 shrink-0"
              style={{ backgroundColor: selectedFabric.hex }}
            />
            <span className="text-xs font-bold text-stone-900">
              {selectedFabric.name} · {selectedFabric.material}
            </span>
          </div>

          {/* DYNAMIC SVG SOFA ELEVATION ILLUSTRATION */}
          <div className="relative w-full max-w-md aspect-16/10 flex items-center justify-center p-4">
            <svg
              viewBox="0 0 400 240"
              className="w-full h-full drop-shadow-xl transition-all duration-300"
            >
              <defs>
                {/* Fabric gradient shading */}
                <linearGradient id="sofaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={selectedFabric.hex} stopOpacity="1" />
                  <stop
                    offset="100%"
                    stopColor={isDarkFabric ? '#0f0f0f' : '#333333'}
                    stopOpacity="0.25"
                  />
                </linearGradient>

                {/* Cushion top highlight */}
                <linearGradient id="cushionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity={isDarkFabric ? '0.1' : '0.35'} />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
                </linearGradient>

                {/* Ambient Floor Shadow */}
                <filter id="floorShadow" x="-10%" y="-10%" width="120%" height="140%">
                  <feDropShadow dx="0" dy="12" stdDeviation="8" floodColor="#000000" floodOpacity="0.22" />
                </filter>
              </defs>

              {/* Floor Shadow */}
              <ellipse cx="200" cy="215" rx="160" ry="14" fill="#000000" opacity="0.18" />

              {/* LEGS (4 Cylindrical Architectural Legs) */}
              <g id="sofa-legs">
                <rect x="55" y="190" width="12" height="24" rx="3" fill={selectedLegs.hex} stroke="#000000" strokeWidth="0.5" />
                <rect x="135" y="190" width="12" height="24" rx="3" fill={selectedLegs.hex} stroke="#000000" strokeWidth="0.5" />
                <rect x="250" y="190" width="12" height="24" rx="3" fill={selectedLegs.hex} stroke="#000000" strokeWidth="0.5" />
                <rect x="330" y="190" width="12" height="24" rx="3" fill={selectedLegs.hex} stroke="#000000" strokeWidth="0.5" />
              </g>

              {/* SOFA BODY & CUSHIONS (Depends on layout) */}
              {selectedLayout.id === 'curved_crescent' ? (
                /* CURVED CRESCENT BOUCLE SOFA */
                <g id="curved-sofa" filter="url(#floorShadow)">
                  {/* Backrest curved arc */}
                  <path
                    d="M 40 145 C 50 60, 350 60, 360 145 C 350 165, 340 170, 320 170 C 270 175, 130 175, 80 170 C 60 170, 50 165, 40 145 Z"
                    fill={selectedFabric.hex}
                    stroke="#1c1917"
                    strokeWidth="1.5"
                  />
                  {/* Vertical fluted stitching lines */}
                  <path d="M 100 80 Q 105 130 110 168" stroke="#000000" strokeOpacity="0.2" strokeWidth="1.5" />
                  <path d="M 160 65 Q 162 125 165 172" stroke="#000000" strokeOpacity="0.2" strokeWidth="1.5" />
                  <path d="M 240 65 Q 238 125 235 172" stroke="#000000" strokeOpacity="0.2" strokeWidth="1.5" />
                  <path d="M 300 80 Q 295 130 290 168" stroke="#000000" strokeOpacity="0.2" strokeWidth="1.5" />

                  {/* Main Curved Cushion Seat */}
                  <path
                    d="M 55 140 C 70 110, 330 110, 345 140 C 350 175, 335 192, 310 192 L 90 192 C 65 192, 50 175, 55 140 Z"
                    fill={selectedFabric.hex}
                    stroke="#1c1917"
                    strokeWidth="1.5"
                  />
                  {/* Cushion top highlight */}
                  <path
                    d="M 55 140 C 70 110, 330 110, 345 140 C 350 175, 335 192, 310 192 L 90 192 C 65 192, 50 175, 55 140 Z"
                    fill="url(#cushionGrad)"
                  />
                </g>
              ) : selectedLayout.id === 'l_shape_chaise' ? (
                /* L-SHAPE WITH EXTENDED CHAISE */
                <g id="l-shape-sofa" filter="url(#floorShadow)">
                  {/* Backrest across main run */}
                  <rect x="45" y="80" width="310" height="70" rx="14" fill={selectedFabric.hex} stroke="#1c1917" strokeWidth="1.5" />
                  <rect x="45" y="80" width="310" height="70" rx="14" fill="url(#cushionGrad)" />

                  {/* Left Armrest */}
                  <rect x="40" y="105" width="32" height="85" rx="10" fill={selectedFabric.hex} stroke="#1c1917" strokeWidth="1.5" />
                  {/* Right Armrest */}
                  <rect x="328" y="105" width="32" height="85" rx="10" fill={selectedFabric.hex} stroke="#1c1917" strokeWidth="1.5" />

                  {/* Main Seat Base */}
                  <rect x="68" y="145" width="160" height="48" rx="8" fill={selectedFabric.hex} stroke="#1c1917" strokeWidth="1.5" />
                  <rect x="68" y="145" width="160" height="48" rx="8" fill="url(#cushionGrad)" />

                  {/* Extended Chaise Lounge on Right */}
                  <rect x="228" y="130" width="104" height="65" rx="10" fill={selectedFabric.hex} stroke="#1c1917" strokeWidth="1.5" />
                  <rect x="228" y="130" width="104" height="65" rx="10" fill="url(#cushionGrad)" />
                  {/* Chaise cushion seam */}
                  <line x1="228" y1="130" x2="228" y2="195" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.5" />
                </g>
              ) : (
                /* STANDARD 3-SEATER LINEAR STUDIO & MODULAR */
                <g id="linear-sofa" filter="url(#floorShadow)">
                  {/* Main High Architectural Backrest */}
                  <rect x="45" y="75" width="310" height="75" rx="14" fill={selectedFabric.hex} stroke="#1c1917" strokeWidth="1.5" />
                  <rect x="45" y="75" width="310" height="75" rx="14" fill="url(#cushionGrad)" />

                  {/* 3 Back Cushion Pillows */}
                  <rect x="75" y="85" width="76" height="60" rx="10" fill={selectedFabric.hex} stroke="#000000" strokeOpacity="0.2" strokeWidth="1.5" />
                  <rect x="162" y="85" width="76" height="60" rx="10" fill={selectedFabric.hex} stroke="#000000" strokeOpacity="0.2" strokeWidth="1.5" />
                  <rect x="249" y="85" width="76" height="60" rx="10" fill={selectedFabric.hex} stroke="#000000" strokeOpacity="0.2" strokeWidth="1.5" />

                  {/* Left Pillowed Armrest */}
                  <rect x="40" y="105" width="32" height="85" rx="12" fill={selectedFabric.hex} stroke="#1c1917" strokeWidth="1.5" />
                  <rect x="40" y="105" width="32" height="85" rx="12" fill="url(#cushionGrad)" />

                  {/* Right Pillowed Armrest */}
                  <rect x="328" y="105" width="32" height="85" rx="12" fill={selectedFabric.hex} stroke="#1c1917" strokeWidth="1.5" />
                  <rect x="328" y="105" width="32" height="85" rx="12" fill="url(#cushionGrad)" />

                  {/* Deep Seat Base Plinth */}
                  <rect x="68" y="145" width="264" height="48" rx="8" fill={selectedFabric.hex} stroke="#1c1917" strokeWidth="1.5" />
                  <rect x="68" y="145" width="264" height="48" rx="8" fill="url(#cushionGrad)" />

                  {/* 3 Bench Cushion Seams */}
                  <line x1="156" y1="145" x2="156" y2="193" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.5" />
                  <line x1="244" y1="145" x2="244" y2="193" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.5" />
                </g>
              )}

              {/* Dimension Callout Annotation */}
              <text x="200" y="32" textAnchor="middle" fill="#57534e" fontSize="10" fontFamily="monospace" fontWeight="bold">
                {selectedLayout.widthInches}&quot; OVERALL SPAN · {seatDepth === 'deep_lounge' ? '42" DEEP' : '36" STANDARD'}
              </text>
            </svg>
          </div>

          {/* Quick Specifications Pill */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] text-stone-700">
            <span className="px-2.5 py-1 bg-white border border-stone-200 rounded-lg font-mono">
              Legs: <strong className="text-stone-900">{selectedLegs.name}</strong>
            </span>
            <span className="px-2.5 py-1 bg-white border border-stone-200 rounded-lg">
              Core: <strong className="text-stone-900">{cushionCore.replace('_', ' ')}</strong>
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Configuration Selectors & Checkout (6 Cols) */}
        <div className="lg:col-span-6 p-6 sm:p-10 space-y-8">
          {/* 1. SELECT SOFA LAYOUT */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                <span>1. Select Sofa Architecture</span>
              </label>
              <span className="text-xs font-bold text-stone-900">
                {selectedLayout.name}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SOFA_LAYOUTS.map((layout) => {
                const isSelected = selectedLayout.id === layout.id;
                return (
                  <button
                    key={layout.id}
                    type="button"
                    onClick={() => setSelectedLayout(layout)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-stone-900 bg-stone-900 text-white shadow-md'
                        : 'border-stone-200 bg-stone-50 hover:bg-white hover:border-stone-400 text-stone-900'
                    }`}
                  >
                    <p className="text-xs font-bold truncate">{layout.name}</p>
                    <p className={`text-[11px] mt-0.5 line-clamp-1 ${isSelected ? 'text-stone-300' : 'text-stone-600'}`}>
                      {layout.description}
                    </p>
                    <p className={`text-[11px] font-mono mt-1 font-bold ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                      From ${layout.basePrice}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. SELECT UPHOLSTERY FABRIC & COLOR (Real-Time Visual Tint) */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                <span>2. Select Fabric & Color</span>
                <span className="text-[10px] text-stone-700 font-bold">(Live Visual Swatch)</span>
              </label>
              <span className="text-xs font-bold text-stone-900 font-mono">
                {selectedFabric.name}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {UPHOLSTERY_OPTIONS.map((fabric) => {
                const isSelected = selectedFabric.id === fabric.id;
                return (
                  <button
                    key={fabric.id}
                    type="button"
                    onClick={() => setSelectedFabric(fabric)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col items-center text-center ${
                      isSelected
                        ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                        : 'border-stone-200 bg-white text-stone-900 hover:border-stone-400'
                    }`}
                  >
                    <span
                      className="w-8 h-8 rounded-full border-2 border-white/80 shadow-xs mb-1.5 shrink-0"
                      style={{ backgroundColor: fabric.hex }}
                    />
                    <span className="text-[11px] font-bold truncate max-w-full leading-tight">{fabric.name}</span>
                    <span className={`text-[9px] mt-0.5 truncate max-w-full ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                      {fabric.material.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. SELECT BASE & LEG FINISH */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-900 block">
              3. Base & Architectural Leg Finish
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {LEG_FINISHES.map((leg) => {
                const isSelected = selectedLegs.id === leg.id;
                return (
                  <button
                    key={leg.id}
                    type="button"
                    onClick={() => setSelectedLegs(leg)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-stone-50 hover:bg-white text-stone-800'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full border border-stone-400" style={{ backgroundColor: leg.hex }} />
                    <span className="text-[11px] font-bold truncate">{leg.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. CUSHION DEPTH & CORE FIRMNESS */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-bold uppercase text-stone-800 mb-1">
                Seat Depth Profile
              </label>
              <select
                value={seatDepth}
                onChange={(e) => setSeatDepth(e.target.value as 'standard' | 'deep_lounge')}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:bg-white focus:border-stone-900"
              >
                <option value="standard">36&quot; Standard Depth</option>
                <option value="deep_lounge">42&quot; Deep Lounge (+ $220)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-stone-800 mb-1">
                Cushion Core Filling
              </label>
              <select
                value={cushionCore}
                onChange={(e) => setCushionCore(e.target.value as 'cloud_plush' | 'down_blend' | 'firm_foam')}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:bg-white focus:border-stone-900"
              >
                <option value="down_blend">Down Feather Blend (+ $180)</option>
                <option value="cloud_plush">Cloud High-Resilience</option>
                <option value="firm_foam">Ergonomic Firm Core</option>
              </select>
            </div>
          </div>

          {/* 5. FINANCIAL QUOTE & DEMO ORDER BUTTON */}
          <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
            <div className="flex justify-between items-baseline pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold block">
                  Total Custom Majlis Quote (السعر التقديري)
                </span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-2xl font-serif font-bold text-stone-900">
                    {sarTotal.toLocaleString()} SAR
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    (${calculation.finalTotal.toLocaleString()} USD)
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-amber-900 uppercase tracking-widest font-bold block">
                  Required 40% Advance (دفعة التصنيع)
                </span>
                <span className="text-lg font-mono font-bold text-stone-900">
                  {sarAdvance.toLocaleString()} SAR
                </span>
                <span className="text-[10px] text-stone-500 block">
                  (${calculation.advanceRequired.toLocaleString()} USD)
                </span>
              </div>
            </div>

            <p className="text-[11px] text-stone-600 leading-relaxed font-normal">
              Includes kiln-dried European hardwood internal framing, pocket-sprung base, <span className="font-bold text-stone-900">{selectedFabric.name}</span> ({selectedFabric.material}), and white-glove living room placement.
            </p>

            {/* Saudi Hospitality & Craft Assurance */}
            <div className="p-3 bg-white rounded-xl border border-stone-200 text-[11px] space-y-1.5">
              <div className="flex items-center gap-1.5 text-stone-800 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Saudi Hospitality Specification (42&quot; Deep Lounge Seating &amp; Stain Resistance)</span>
              </div>

              <div className="text-[10px] text-stone-500">
                White-glove in-room assembly and packaging removal across Riyadh, Jeddah, Khobar, Dammam, and Neom.
              </div>
            </div>

            <button
              onClick={handleOrderSofa}
              className="w-full py-4 px-6 bg-[#163b2f] hover:bg-[#1f4e3f] active:bg-[#0e271f] text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-md border border-[#c5a059]/40 flex items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              <CreditCard className="w-4 h-4 text-[#dfca92] group-hover:scale-110 transition-transform" />
              <span>Add Custom Majlis Sofa (40% Deposit: {sarAdvance.toLocaleString()} SAR) · بدء التصنيع</span>
              <ArrowRight className="w-4 h-4 text-[#dfca92]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

