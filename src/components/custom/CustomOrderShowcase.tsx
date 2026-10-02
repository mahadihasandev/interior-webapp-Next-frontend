'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Star,
  Clock,
  Sparkles,
  X,
  CheckCircle2,
  MapPin,
  ZoomIn,
} from 'lucide-react';
import { useGetVillaDesignsQuery } from '@/store/services/productsApi';
import { CustomSample } from '@/types';
import { SAUDI_CUSTOM_SAMPLES } from './CustomSampleGallery';

interface CustomOrderShowcaseProps {
  onStartOrder: (sample: CustomSample) => void;
}

const BACKEND_URL =
  (process.env.NEXT_PUBLIC_API_URL ?? 'https://interior-webapp-php-backend.onrender.com/api').replace('/api', '');

function resolveUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('/storage/')) return `${BACKEND_URL}${url}`;
  return url;
}

const WHATSAPP_NUMBER = '966501234567';
const PHONE_NUMBER = '+966501234567';

export function CustomOrderShowcase({ onStartOrder }: CustomOrderShowcaseProps) {
  const { data: apiResponse } = useGetVillaDesignsQuery();

  const samples: CustomSample[] = React.useMemo(() => {
    if (apiResponse?.data && apiResponse.data.length > 0) return apiResponse.data;
    return SAUDI_CUSTOM_SAMPLES;
  }, [apiResponse]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [previewSample, setPreviewSample] = useState<CustomSample | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIdx(idx);
        setIsTransitioning(false);
      }, 180);
    },
    [isTransitioning],
  );

  const prev = useCallback(() => goTo((activeIdx - 1 + samples.length) % samples.length), [activeIdx, goTo, samples.length]);
  const next = useCallback(() => goTo((activeIdx + 1) % samples.length), [activeIdx, goTo, samples.length]);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  const active = samples[activeIdx];

  function handleWhatsApp(sample: CustomSample) {
    const price = sample.priceSAR ?? (sample as unknown as { price_sar: number }).price_sar ?? 0;
    const msg = encodeURIComponent(
      `Hello! I'm interested in ordering this custom design:\n\n*${sample.titleEn}*\n${sample.tagline}\n\nEstimated price: ${price.toLocaleString()} SAR\n\nCould you please confirm availability and next steps?`,
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  }

  function handleCall() {
    window.location.href = `tel:${PHONE_NUMBER}`;
  }

  if (!samples.length) return null;

  return (
    <>
      {/* ─── MAIN SHOWCASE ─────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden rounded-3xl border border-[#e2d9cc] shadow-xl bg-[#1a1815]">

        {/* Hero image */}
        <div className="relative aspect-[21/9] min-h-[340px] max-h-[560px] overflow-hidden">
          <Image
            key={active.id}
            src={resolveUrl(active.photoUrl)}
            alt={active.titleEn}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className={`object-cover object-center transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

          {/* Top-right badge */}
          <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#b8933f] text-white text-[11px] font-bold uppercase tracking-wider shadow-lg">
              <Sparkles className="w-3 h-3" />
              Seller&apos;s Design
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-[10px] font-semibold border border-white/20">
              {active.type === 'fitting' ? 'Architectural Fitting' : 'Bespoke Sofa'}
            </span>
          </div>

          {/* Dot indicators */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5">
            {samples.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIdx
                    ? 'w-6 h-2 bg-[#b8933f]'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Main content overlay */}
          <div className="absolute inset-0 flex items-end">
            <div className={`p-6 sm:p-10 space-y-4 max-w-2xl transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>

              <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#d4b06a] uppercase tracking-widest">
                <MapPin className="w-3 h-3" />
                {active.locationTag}
              </p>

              <div>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
                  {active.titleEn}
                </h2>
                <p className="text-sm text-white/60 mt-1 font-medium" dir="rtl">
                  {active.titleAr}
                </p>
              </div>

              <p className="text-sm text-white/75 leading-relaxed line-clamp-2 max-w-lg">
                {active.tagline}
              </p>

              <div className="flex flex-col gap-1.5">
                {active.saudiFeatures.slice(0, 2).map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    {feat}
                  </div>
                ))}
              </div>

              {/* Price + CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/50 uppercase tracking-widest">Estimated From</span>
                  <span className="text-xl font-serif font-bold text-white">
                    {(active.priceSAR ?? (active as unknown as { price_sar: number }).price_sar ?? 0).toLocaleString()}
                    <span className="text-sm font-sans font-normal text-white/60 ml-1">SAR</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    id={`order-design-${active.id}`}
                    onClick={() => onStartOrder(active)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#b8933f] hover:bg-[#d4b06a] text-white text-xs font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
                  >
                    <Star className="w-3.5 h-3.5" />
                    Order This Design
                  </button>

                  <button
                    type="button"
                    id={`whatsapp-design-${active.id}`}
                    onClick={() => handleWhatsApp(active)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp Seller
                  </button>

                  <button
                    type="button"
                    id={`call-seller-${active.id}`}
                    onClick={handleCall}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-xs font-bold rounded-full transition-all border border-white/20 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreviewSample(active)}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-xs font-semibold rounded-full transition-all border border-white/20 cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Arrows */}
          <button
            type="button"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* ─── THUMBNAIL STRIP ─────────────────────────────────────────── */}
        <div className="flex gap-3 p-4 overflow-x-auto bg-[#1a1815]" style={{ scrollbarWidth: 'none' }}>
          {samples.map((s, i) => {
            const price = s.priceSAR ?? (s as unknown as { price_sar: number }).price_sar ?? 0;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(i)}
                className={`group relative shrink-0 w-36 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  i === activeIdx
                    ? 'border-[#b8933f] scale-105 shadow-lg shadow-[#b8933f]/30'
                    : 'border-white/10 hover:border-white/30 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="relative aspect-[4/3] bg-[#2a2520]">
                  <Image
                    src={resolveUrl(s.photoUrl)}
                    alt={s.titleEn}
                    fill
                    sizes="144px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-1.5 left-1.5 right-1.5">
                    <p className="text-[10px] font-bold text-white leading-tight truncate">{s.titleEn}</p>
                    <p className="text-[9px] text-[#d4b06a] font-semibold mt-0.5">{price.toLocaleString()} SAR</p>
                  </div>
                  {i === activeIdx && (
                    <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#b8933f] animate-pulse" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ─── QUICK ACTION STRIP ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
        <div
          onClick={() => onStartOrder(active)}
          className="group flex items-center gap-4 p-4 bg-white border border-[#e2d9cc] rounded-2xl hover:border-[#b8933f] hover:shadow-md transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#b8933f]/10 flex items-center justify-center text-[#b8933f] shrink-0 group-hover:bg-[#b8933f] group-hover:text-white transition-colors">
            <Star className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#1a1815] truncate">Order This Custom Design</p>
            <p className="text-[11px] text-[#7a7166] mt-0.5">Configure dimensions &amp; finish</p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#b8933f] shrink-0 group-hover:translate-x-1 transition-transform" />
        </div>

        <div
          onClick={() => handleWhatsApp(active)}
          className="group flex items-center gap-4 p-4 bg-white border border-[#e2d9cc] rounded-2xl hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#1a1815]">WhatsApp the Seller</p>
            <p className="text-[11px] text-[#7a7166] mt-0.5">Fast reply · Usually within 1 hour</p>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0 group-hover:translate-x-1 transition-transform" />
        </div>

        <div
          onClick={handleCall}
          className="group flex items-center gap-4 p-4 bg-white border border-[#e2d9cc] rounded-2xl hover:border-[#1a3d30] hover:shadow-md transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#1a3d30]/10 flex items-center justify-center text-[#1a3d30] shrink-0 group-hover:bg-[#1a3d30] group-hover:text-white transition-colors">
            <Phone className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#1a1815]">Call the Seller Directly</p>
            <p className="text-[11px] text-[#7a7166] mt-0.5">
              <Clock className="w-3 h-3 inline mr-1" />
              Sat–Thu · 9 AM – 8 PM AST
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#1a3d30] shrink-0 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* ─── DETAIL MODAL ───────────────────────────────────────────────── */}
      {previewSample && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setPreviewSample(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-[#e2d9cc] max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-3xl bg-[#1a1815]">
              <Image
                src={resolveUrl(previewSample.photoUrl)}
                alt={previewSample.titleEn}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <button
                type="button"
                onClick={() => setPreviewSample(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white border border-white/20 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-5 right-5">
                <p className="text-[11px] font-semibold text-[#d4b06a] uppercase tracking-widest flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {previewSample.locationTag}
                </p>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1 leading-snug">
                  {previewSample.titleEn}
                </h3>
                <p className="text-xs text-white/60 mt-0.5" dir="rtl">{previewSample.titleAr}</p>
              </div>
            </div>

            <div className="p-5 sm:p-7 space-y-5">
              <p className="text-sm text-[#3d3833] leading-relaxed">{previewSample.tagline}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {previewSample.saudiFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#3d3833] bg-[#f3ede4] rounded-xl px-3 py-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1a3d30] shrink-0 mt-0.5" />
                    {feat}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {([
                  ['Dimensions', previewSample.specs?.dimensions],
                  ['Finish / Fabric', previewSample.specs?.finishOrFabric],
                  ['Core Material', previewSample.specs?.coreMaterial],
                  ['Hardware', previewSample.specs?.hardware],
                ] as [string, string][]).map(([label, val]) => (
                  <div key={label} className="bg-[#f3ede4] rounded-xl p-3">
                    <p className="text-[10px] uppercase tracking-wider text-[#7a7166] font-semibold">{label}</p>
                    <p className="text-xs font-semibold text-[#1a1815] mt-0.5">{val || '—'}</p>
                  </div>
                ))}
              </div>

              {previewSample.detailPhotoUrl && previewSample.detailPhotoUrl !== previewSample.photoUrl && (
                <div className="relative rounded-xl overflow-hidden h-44 bg-[#f3ede4]">
                  <Image
                    src={resolveUrl(previewSample.detailPhotoUrl)}
                    alt="Detail view"
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#f3ede4]">
                <div>
                  <p className="text-xs text-[#7a7166]">Custom Build Estimate</p>
                  <p className="text-2xl font-serif font-bold text-[#1a1815]">
                    {(previewSample.priceSAR ?? (previewSample as unknown as { price_sar: number }).price_sar ?? 0).toLocaleString()} SAR
                  </p>
                  <p className="text-[11px] text-[#7a7166] mt-0.5">
                    40% deposit: {(previewSample.advanceDepositSAR ?? Math.round(((previewSample as unknown as { price_sar: number }).price_sar ?? 0) * 0.4)).toLocaleString()} SAR to start production
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleWhatsApp(previewSample)}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-full transition-all cursor-pointer shadow-md"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp Seller
                  </button>
                  <button
                    type="button"
                    onClick={handleCall}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1a3d30] hover:bg-[#1f4e3f] text-white text-xs font-bold rounded-full transition-all cursor-pointer shadow-md"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Seller
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPreviewSample(null); onStartOrder(previewSample); }}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-[#b8933f] hover:bg-[#d4b06a] text-white text-xs font-bold rounded-full transition-all cursor-pointer shadow-md"
                  >
                    <Star className="w-3.5 h-3.5" />
                    Order This Design
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
