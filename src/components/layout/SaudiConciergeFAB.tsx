'use client';

import React, { useState } from 'react';
import { MessageCircle, Sparkles, X, ChevronUp, Box, PhoneCall } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { openConsultationModal } from '@/store/slices/uiSlice';

export function SaudiConciergeFAB() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      'مرحباً، أود الاستفسار عن تصاميم الفلل والمجالس واستشارة مهندس الديكور في لآتولييه (Hello, I would like to inquire about Saudi villa interior architecture & Majlis consultation).'
    );
    window.open(`https://wa.me/966501234567?text=${text}`, '_blank');
  };

  const handleRequestSampleBox = () => {
    dispatch(openConsultationModal('Physical Swatch Box Request · عينات الأقمشة والمعادن'));
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Menu */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-stone-900/95 backdrop-blur-md border border-stone-700/80 rounded-3xl p-4 shadow-2xl text-white space-y-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Saudi VIP Concierge · خدمة كبار الشخصيات
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-stone-300 leading-relaxed">
            Direct access to our Riyadh & Jeddah architectural studio. Inquire about custom villa millwork, thermal glass, or royal Majlis salons.
          </p>

          <div className="space-y-2 pt-1">
            {/* WhatsApp VIP Chat */}
            <button
              onClick={handleWhatsApp}
              className="w-full py-2.5 px-3.5 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-between transition-colors shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-200" />
                <span>WhatsApp VIP Concierge</span>
              </div>
              <span className="text-[10px] text-emerald-200 font-arabic">واتساب مباشر</span>
            </button>

            {/* Request Villa Swatch Box */}
            <button
              onClick={handleRequestSampleBox}
              className="w-full py-2.5 px-3.5 bg-stone-800 hover:bg-stone-700 active:bg-stone-850 border border-stone-700 text-stone-100 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 text-amber-400" />
                <span>Order Villa Swatch Box</span>
              </div>
              <span className="text-[10px] text-stone-400 font-arabic">صندوق العينات</span>
            </button>

            {/* Book Architect Session */}
            <button
              onClick={() => {
                dispatch(openConsultationModal('Full Villa Interior'));
                setIsOpen(false);
              }}
              className="w-full py-2.5 px-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-xl text-xs font-bold flex items-center justify-between transition-colors shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Book 3D Design Session</span>
              </div>
              <span className="text-[10px] text-amber-200 font-arabic">استشارة 3D</span>
            </button>
          </div>

          <div className="text-[10px] text-stone-400 text-center pt-1 border-t border-stone-800/80">
            <span>Serving Riyadh · Jeddah · Khobar · Diriyah · Neom</span>
          </div>
        </div>
      )}

      {/* Main Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white border border-stone-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Saudi VIP Concierge"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>

        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold tracking-wider uppercase text-amber-300">
              VIP Concierge
            </span>
            <span className="text-[10px] text-stone-300 font-arabic hidden sm:inline">
              · مهندس الديكور
            </span>
          </div>
        </div>

        <div className="w-6 h-6 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-stone-900 transition-colors">
          {isOpen ? <X className="w-3.5 h-3.5" /> : <MessageCircle className="w-3.5 h-3.5" />}
        </div>
      </button>
    </div>
  );
}
