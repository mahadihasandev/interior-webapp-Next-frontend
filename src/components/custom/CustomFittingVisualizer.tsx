'use client';

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Check,
  ArrowRight,
  CreditCard,
} from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { addToCart, setDrawerOpen } from '@/store/slices/cartSlice';

export interface AlloyFinish {
  id: string;
  name: string;
  hex: string;
  gradient: string;
  accentHex: string;
  description: string;
  multiplier: number;
}

export const ALLOY_FINISHES: AlloyFinish[] = [
  {
    id: 'champagne_gold',
    name: 'Champagne Gold Anodized',
    hex: '#d4af37',
    gradient: 'from-amber-200 via-amber-400 to-amber-600',
    accentHex: '#b38f20',
    description: 'Subtle metallic sheen with warm champagne luster and electro-sealed surface.',
    multiplier: 1.15,
  },
  {
    id: 'matte_black',
    name: 'Matte Architectural Black',
    hex: '#1c1917',
    gradient: 'from-stone-800 via-stone-900 to-black',
    accentHex: '#292524',
    description: 'Deep carbon velvet finish with zero glare, UV-stable anodization.',
    multiplier: 1.0,
  },
  {
    id: 'brushed_bronze',
    name: 'Brushed Statuary Bronze',
    hex: '#6e473b',
    gradient: 'from-[#8b5a4b] via-[#6e473b] to-[#4a2e26]',
    accentHex: '#4a2e26',
    description: 'Rich hand-brushed warm bronze with patinated undertones.',
    multiplier: 1.2,
  },
  {
    id: 'anodized_silver',
    name: 'Clear Anodized Silver',
    hex: '#c5c6c7',
    gradient: 'from-slate-200 via-stone-300 to-stone-400',
    accentHex: '#9ca3af',
    description: 'Raw high-purity architectural silver with satin directional brushed texture.',
    multiplier: 0.95,
  },
  {
    id: 'rose_copper',
    name: 'Rose Copper Brushed',
    hex: '#b87333',
    gradient: 'from-[#e09873] via-[#b87333] to-[#8c4d18]',
    accentHex: '#8c4d18',
    description: 'Warm architectural copper with subtle rose gold reflections.',
    multiplier: 1.25,
  },
];

export interface GlassType {
  id: string;
  name: string;
  description: string;
  surcharge: number;
  bgClass: string;
}

export const GLASS_TYPES: GlassType[] = [
  {
    id: 'fluted_ribbed',
    name: '10mm Fluted Ribbed Glass',
    description: 'Vertical architectural fluting for light diffusion and partial privacy.',
    surcharge: 220,
    bgClass: 'bg-amber-50/20',
  },
  {
    id: 'ultra_clear',
    name: 'Low-Iron Ultra-Clear Glass',
    description: 'Optically pure crystal clarity with zero greenish tint.',
    surcharge: 150,
    bgClass: 'bg-cyan-50/20',
  },
  {
    id: 'smoked_bronze',
    name: 'Smoked Bronze Privacy Glass',
    description: 'Warm moody bronze tint with acoustic sound-dampening laminate.',
    surcharge: 280,
    bgClass: 'bg-amber-950/20',
  },
  {
    id: 'frosted_satin',
    name: 'Acid-Etched Frosted Satin',
    description: 'Velvety translucent matte finish for complete visual privacy.',
    surcharge: 180,
    bgClass: 'bg-stone-200/40',
  },
];

export function CustomFittingVisualizer() {
  const dispatch = useAppDispatch();

  // Selected State
  const [selectedFinish, setSelectedFinish] = useState<AlloyFinish>(ALLOY_FINISHES[0]);
  const [selectedGlass, setSelectedGlass] = useState<GlassType>(GLASS_TYPES[0]);
  const [heightInches, setHeightInches] = useState(96);
  const [widthInches, setWidthInches] = useState(72);
  const [gauge, setGauge] = useState<'1.5mm' | '2.0mm' | '2.5mm'>('2.0mm');
  const [mullionStyle, setMullionStyle] = useState<'minimal' | 'grid_3x2' | 'single_cross'>('grid_3x2');

  // Addons
  const [addons, setAddons] = useState<{ [key: string]: boolean }>({
    acoustic_seal: true,
    hydraulic_damper: true,
    thermal_barrier: false,
  });

  // Live Price Calculation
  const calculation = useMemo(() => {
    const sqft = (heightInches * widthInches) / 144;
    const baseRate = gauge === '2.5mm' ? 48 : gauge === '2.0mm' ? 38 : 32;
    const materialCost = sqft * baseRate * selectedFinish.multiplier;

    let addonTotal = selectedGlass.surcharge;
    if (addons.acoustic_seal) addonTotal += 160;
    if (addons.hydraulic_damper) addonTotal += 140;
    if (addons.thermal_barrier) addonTotal += 290;

    const baseFabrication = 450;
    const estimatedTotal = Math.round(materialCost + addonTotal + baseFabrication);
    const advanceRequired = Math.round(estimatedTotal * 0.4); // 40% advance

    return {
      sqft: sqft.toFixed(1),
      estimatedTotal,
      advanceRequired,
    };
  }, [heightInches, widthInches, gauge, selectedFinish, selectedGlass, addons]);

  const handleOrderCustom = () => {
    // Add custom configured product into cart
    dispatch(
      addToCart({
        product: {
          id: 99901,
          category_id: 1,
          name: `Custom Series 900 Fitting (${selectedFinish.name})`,
          slug: 'custom-series-900-fitting',
          description: `Custom ${heightInches}"H x ${widthInches}"W architectural partition in ${selectedFinish.name} with ${selectedGlass.name} and ${gauge} gauge profile.`,
          price: calculation.estimatedTotal,
          stock: 99,
          in_stock: true,
          image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          gallery: [],
          is_featured: true,
          rating: 5.0,
          reviews_count: 1,
          color: selectedFinish.name,
          dimensions: `${heightInches}"H x ${widthInches}"W`,
          materials: `6063-T6 Aluminum (${selectedFinish.name}), ${selectedGlass.name}`,
        },
        quantity: 1,
      })
    );
    dispatch(setDrawerOpen(true));
  };

  // Preset Loader for Saudi Villa Architectural Requirements
  const [activePresetTitle, setActivePresetTitle] = useState<string>('Custom Series 900 Specification');

  const applySaudiPreset = (presetName: string) => {
    setActivePresetTitle(presetName);
    if (presetName === 'riyadh_thermal') {
      setSelectedFinish(ALLOY_FINISHES[1]); // Matte Black
      setSelectedGlass(GLASS_TYPES[1]); // Low-Iron Ultra Clear
      setHeightInches(84);
      setWidthInches(60);
      setGauge('2.0mm');
      setMullionStyle('minimal');
      setAddons({ acoustic_seal: true, hydraulic_damper: false, thermal_barrier: true });
    } else if (presetName === 'majlis_fluted') {
      setSelectedFinish(ALLOY_FINISHES[0]); // Champagne Gold
      setSelectedGlass(GLASS_TYPES[0]); // Fluted Ribbed
      setHeightInches(96);
      setWidthInches(72);
      setGauge('2.0mm');
      setMullionStyle('grid_3x2');
      setAddons({ acoustic_seal: true, hydraulic_damper: true, thermal_barrier: false });
    } else if (presetName === 'smoked_bronze') {
      setSelectedFinish(ALLOY_FINISHES[2]); // Brushed Bronze
      setSelectedGlass(GLASS_TYPES[2]); // Smoked Bronze
      setHeightInches(108);
      setWidthInches(84);
      setGauge('2.5mm');
      setMullionStyle('minimal');
      setAddons({ acoustic_seal: true, hydraulic_damper: true, thermal_barrier: true });
    } else if (presetName === 'jeddah_frosted') {
      setSelectedFinish(ALLOY_FINISHES[3]); // Clear Anodized Silver
      setSelectedGlass(GLASS_TYPES[3]); // Frosted Satin
      setHeightInches(90);
      setWidthInches(64);
      setGauge('2.0mm');
      setMullionStyle('single_cross');
      setAddons({ acoustic_seal: true, hydraulic_damper: true, thermal_barrier: false });
    }
  };

  const sarTotal = Math.round(calculation.estimatedTotal * 3.75);
  const sarAdvance = Math.round(calculation.advanceRequired * 3.75);

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden text-stone-900">
      {/* Top Banner with Saudi Architecture Badge */}
      <div className="p-6 sm:p-8 border-b border-stone-200 bg-stone-50/70 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-white text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Saudi Villa Architectural & Window Studio · استوديو الفلل والمجالس</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Architectural Thermal Windows & Majlis Glass Partitions
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 font-normal mt-1 max-w-2xl leading-relaxed">
              Engineered for the Saudi climate: 50°C summer heat insulation, hermetic sandstorm seals, and acoustic privacy between Majlis and living quarters.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2 bg-white rounded-xl border border-stone-200 shadow-2xs text-right">
              <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold block">
                Calculated Area
              </span>
              <span className="text-base font-mono font-bold text-stone-900">
                {calculation.sqft} sq.ft ({((parseFloat(calculation.sqft) * 0.092903)).toFixed(1)} m²)
              </span>
            </div>
          </div>
        </div>

        {/* 1-CLICK SAUDI VILLA PRESET CHIPS */}
        <div className="pt-2 border-t border-stone-200/80">
          <div className="flex items-center gap-1.5 text-xs text-stone-600 font-bold mb-2">
            <span>⚡ Quick-Load Saudi Villa Presets (نماذج الفلل السعودية السريعة):</span>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              {activePresetTitle}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => applySaudiPreset('riyadh_thermal')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>☀️ Riyadh 50°C Thermal Break Window (عزل الرياض)</span>
            </button>
            <button
              type="button"
              onClick={() => applySaudiPreset('majlis_fluted')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>🕌 Royal Majlis Fluted Partition (خصوصية المجلس)</span>
            </button>
            <button
              type="button"
              onClick={() => applySaudiPreset('smoked_bronze')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>🏛️ Smoked Bronze Executive Divider (قواطع البرونز)</span>
            </button>
            <button
              type="button"
              onClick={() => applySaudiPreset('jeddah_frosted')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>🌸 Jeddah Courtyard Frosted Door (فناء جدة)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Interactive Visualizer, Right Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
        {/* LEFT COLUMN: Dynamic Visual CAD Frame Elevation (6 Cols) */}
        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col items-center justify-center bg-stone-100/50 min-h-[460px]">
          {/* Active Color Info Pill */}
          <div className="w-full max-w-sm flex items-center justify-between px-4 py-2.5 bg-white rounded-full border border-stone-200 shadow-2xs mb-6">
            <div className="flex items-center gap-2.5">
              <span
                className="w-4 h-4 rounded-full border border-black/20 shadow-xs"
                style={{ backgroundColor: selectedFinish.hex }}
              />
              <span className="text-xs font-bold text-stone-900">{selectedFinish.name}</span>
            </div>
            <span className="text-[11px] font-mono text-stone-600 font-semibold">
              {heightInches}&quot; × {widthInches}&quot;
            </span>
          </div>

          {/* DYNAMIC CAD ELEVATION SVG */}
          <div className="relative w-full max-w-md aspect-3/4 flex items-center justify-center p-6 bg-white rounded-2xl border border-stone-200/90 shadow-md">
            {/* Dimension indicators */}
            <div className="absolute top-2 inset-x-8 flex items-center justify-between text-[10px] font-mono text-stone-600 font-bold border-b border-dashed border-stone-300 pb-1">
              <span>◄ Width</span>
              <span>{widthInches} INCHES ({Math.round(widthInches * 25.4)} mm)</span>
              <span>►</span>
            </div>

            <div className="absolute left-2 inset-y-12 flex flex-col items-center justify-between text-[10px] font-mono text-stone-600 font-bold border-r border-dashed border-stone-300 pr-1">
              <span>▲</span>
              <span className="rotate-90 origin-center whitespace-nowrap">{heightInches} INCHES</span>
              <span>▼</span>
            </div>

            {/* Dynamic Frame SVG */}
            <svg
              className="w-full h-full max-h-[360px] filter drop-shadow-md transition-all duration-300"
              viewBox="0 0 400 480"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Dynamic Anodized Alloy Gradient */}
                <linearGradient id="alloyProfileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={selectedFinish.hex} stopOpacity="0.9" />
                  <stop offset="45%" stopColor="#ffffff" stopOpacity="0.45" />
                  <stop offset="55%" stopColor={selectedFinish.hex} stopOpacity="1" />
                  <stop offset="100%" stopColor={selectedFinish.accentHex} stopOpacity="1" />
                </linearGradient>

                {/* Glass Texture Pattern for Fluted Ribbed */}
                <pattern id="flutedPattern" width="12" height="12" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="12" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.35" />
                  <line x1="6" y1="0" x2="6" y2="12" stroke="#000000" strokeWidth="1" strokeOpacity="0.1" />
                </pattern>
              </defs>

              {/* Glass Panels */}
              {/* Top Glass Section */}
              <rect
                x="30"
                y="30"
                width="340"
                height="420"
                fill={
                  selectedGlass.id === 'smoked_bronze'
                    ? '#6e473b'
                    : selectedGlass.id === 'frosted_satin'
                    ? '#e5e7eb'
                    : '#bae6fd'
                }
                fillOpacity={
                  selectedGlass.id === 'smoked_bronze'
                    ? 0.45
                    : selectedGlass.id === 'frosted_satin'
                    ? 0.65
                    : 0.2
                }
              />

              {/* Fluted Glass Texture Overlay */}
              {selectedGlass.id === 'fluted_ribbed' && (
                <rect x="30" y="30" width="340" height="420" fill="url(#flutedPattern)" />
              )}

              {/* Glass Glare Highlights */}
              <polygon
                points="40,40 180,40 100,440 40,440"
                fill="#ffffff"
                fillOpacity="0.12"
              />

              {/* OUTER PERIMETER EXTRUSION (Visibly Changes Color!) */}
              <rect
                x="20"
                y="20"
                width="360"
                height="440"
                rx="6"
                stroke="url(#alloyProfileGradient)"
                strokeWidth="16"
              />

              {/* Mitered Corner Seam Accents */}
              <line x1="20" y1="20" x2="36" y2="36" stroke="#000000" strokeWidth="1.5" strokeOpacity="0.3" />
              <line x1="380" y1="20" x2="364" y2="36" stroke="#000000" strokeWidth="1.5" strokeOpacity="0.3" />
              <line x1="20" y1="460" x2="36" y2="444" stroke="#000000" strokeWidth="1.5" strokeOpacity="0.3" />
              <line x1="380" y1="460" x2="364" y2="444" stroke="#000000" strokeWidth="1.5" strokeOpacity="0.3" />

              {/* MULLIONS ARCHITECTURAL GRID */}
              {mullionStyle === 'grid_3x2' && (
                <>
                  {/* Horizontal Crossbars */}
                  <rect x="28" y="170" width="344" height="10" fill="url(#alloyProfileGradient)" />
                  <rect x="28" y="310" width="344" height="10" fill="url(#alloyProfileGradient)" />
                  {/* Vertical Dividing Mullion */}
                  <rect x="195" y="28" width="10" height="424" fill="url(#alloyProfileGradient)" />
                </>
              )}

              {mullionStyle === 'single_cross' && (
                <>
                  <rect x="28" y="240" width="344" height="12" fill="url(#alloyProfileGradient)" />
                  <rect x="194" y="28" width="12" height="424" fill="url(#alloyProfileGradient)" />
                </>
              )}

              {/* Top Sliding Carrier Track / Rollers */}
              <rect x="15" y="6" width="370" height="12" rx="3" fill="#1c1917" />
              <circle cx="90" cy="12" r="4" fill="#d4af37" />
              <circle cx="310" cy="12" r="4" fill="#d4af37" />
            </svg>
          </div>

          {/* Grid Layout Toggle */}
          <div className="flex items-center gap-2 mt-4 text-xs text-stone-600 font-medium">
            <span>Mullion Grid:</span>
            <button
              onClick={() => setMullionStyle('grid_3x2')}
              className={`px-2.5 py-1 rounded-lg border ${
                mullionStyle === 'grid_3x2'
                  ? 'bg-stone-900 text-white border-stone-900 font-bold'
                  : 'bg-white text-stone-700 border-stone-300'
              }`}
            >
              6-Lite Grid
            </button>
            <button
              onClick={() => setMullionStyle('single_cross')}
              className={`px-2.5 py-1 rounded-lg border ${
                mullionStyle === 'single_cross'
                  ? 'bg-stone-900 text-white border-stone-900 font-bold'
                  : 'bg-white text-stone-700 border-stone-300'
              }`}
            >
              4-Lite Cross
            </button>
            <button
              onClick={() => setMullionStyle('minimal')}
              className={`px-2.5 py-1 rounded-lg border ${
                mullionStyle === 'minimal'
                  ? 'bg-stone-900 text-white border-stone-900 font-bold'
                  : 'bg-white text-stone-700 border-stone-300'
              }`}
            >
              Single Lite
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Configuration Controls & Price (6 Cols) */}
        <div className="lg:col-span-6 p-6 sm:p-10 space-y-8">
          {/* 1. COLOR & ANODIZED ALLOY FINISH SELECTOR */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                <span>1. Select Extruded Alloy Finish</span>
                <span className="text-[10px] text-stone-700 font-bold">(Real-Time Visual)</span>
              </label>
              <span className="text-xs font-bold text-stone-900 font-mono">
                {selectedFinish.name}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ALLOY_FINISHES.map((finish) => {
                const isSelected = selectedFinish.id === finish.id;
                return (
                  <button
                    key={finish.id}
                    onClick={() => setSelectedFinish(finish)}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-stone-900 bg-stone-900 text-white shadow-md'
                        : 'border-stone-200 bg-stone-50 hover:bg-white hover:border-stone-400 text-stone-900'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2 border-white/80 shadow-xs shrink-0"
                      style={{ backgroundColor: finish.hex }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold truncate leading-tight">{finish.name}</p>
                      <p
                        className={`text-[10px] truncate mt-0.5 ${
                          isSelected ? 'text-stone-300' : 'text-stone-600 font-normal'
                        }`}
                      >
                        {finish.multiplier > 1.0 ? `+${Math.round((finish.multiplier - 1) * 100)}% premium` : 'Standard rate'}
                      </p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. GLASS SPECIFICATION */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-900">
                2. Select Architectural Glass Spec
              </label>
              <span className="text-xs font-bold text-stone-900">{selectedGlass.name}</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {GLASS_TYPES.map((glass) => {
                const isSelected = selectedGlass.id === glass.id;
                return (
                  <button
                    key={glass.id}
                    onClick={() => setSelectedGlass(glass)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                        : 'border-stone-200 bg-white text-stone-900 hover:border-stone-300'
                    }`}
                  >
                    <p className="text-xs font-bold truncate">{glass.name}</p>
                    <p
                      className={`text-[11px] font-mono mt-1 ${
                        isSelected ? 'text-white font-bold' : 'text-stone-700 font-semibold'
                      }`}
                    >
                      +${glass.surcharge}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. DIMENSIONS & WALL OPENING */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-900">
              3. Wall Opening Dimensions & Profile Gauge
            </label>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <span className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Height (Inches)
                </span>
                <input
                  type="number"
                  min="60"
                  max="144"
                  value={heightInches}
                  onChange={(e) => setHeightInches(Math.max(48, parseInt(e.target.value) || 48))}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono font-bold text-stone-900 focus:bg-white focus:border-stone-900"
                />
              </div>

              <div>
                <span className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Width (Inches)
                </span>
                <input
                  type="number"
                  min="36"
                  max="180"
                  value={widthInches}
                  onChange={(e) => setWidthInches(Math.max(24, parseInt(e.target.value) || 24))}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono font-bold text-stone-900 focus:bg-white focus:border-stone-900"
                />
              </div>

              <div>
                <span className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Profile Gauge
                </span>
                <select
                  value={gauge}
                  onChange={(e) => setGauge(e.target.value as '1.5mm' | '2.0mm' | '2.5mm')}
                  className="w-full px-2.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:bg-white focus:border-stone-900"
                >
                  <option value="1.5mm">1.5mm Standard</option>
                  <option value="2.0mm">2.0mm Heavy Duty</option>
                  <option value="2.5mm">2.5mm Extreme Spec</option>
                </select>
              </div>
            </div>
          </div>

          {/* 4. FINANCIAL SUMMARY & DEMO ORDER ACTION */}
          <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
            <div className="flex justify-between items-baseline pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold block">
                  Total Custom Quote (السعر التقديري)
                </span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-2xl font-serif font-bold text-stone-900">
                    {sarTotal.toLocaleString()} SAR
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    (${calculation.estimatedTotal.toLocaleString()} USD)
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
              Includes precision 6063-T6 aluminum extrusion in <span className="font-bold text-stone-900">{selectedFinish.name}</span>, <span className="font-bold text-stone-900">{selectedGlass.name}</span>, and hydraulic soft-close hardware.
            </p>

            {/* Gulf Engineering Assurance Chips */}
            <div className="p-3 bg-white rounded-xl border border-stone-200 text-[11px] space-y-1.5">
              <div className="flex items-center gap-1.5 text-stone-800 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Certified for Saudi Arabia Desert Climate (50°C Thermal Break)</span>
              </div>
              <div className="text-[10px] text-stone-500">
                White-glove delivery, crating & professional mounting available across Riyadh, Jeddah, Khobar, and Dammam.
              </div>
            </div>

            <button
              onClick={handleOrderCustom}
              className="w-full py-4 px-6 bg-[#163b2f] hover:bg-[#1f4e3f] active:bg-[#0e271f] text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-md border border-[#c5a059]/40 flex items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              <CreditCard className="w-4 h-4 text-[#dfca92] group-hover:scale-110 transition-transform" />
              <span>Add Custom Order (40% Deposit: {sarAdvance.toLocaleString()} SAR) · بدء التصنيع</span>
              <ArrowRight className="w-4 h-4 text-[#dfca92]" />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
