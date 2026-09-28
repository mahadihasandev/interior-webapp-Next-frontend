'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Phone, MapPin, Mail, ArrowRight, Shield, Truck, Star } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { openConsultationModal, openTrackingModal } from '@/store/slices/uiSlice';

const DELIVERY_CITIES = [
  'الرياض · Riyadh',
  'جدة · Jeddah',
  'الدمام · Dammam',
  'الخبر · Al-Khobar',
  'الدرعية · Diriyah',
  'نيوم · NEOM',
  'المدينة المنورة · Madinah',
];

export function Footer() {
  const dispatch = useAppDispatch();

  return (
    <footer className="bg-[#0c0a09] text-stone-400 border-t border-[#c5a059]/20 relative overflow-hidden">
      {/* Background Mashrabiya Watermark */}
      <div className="absolute inset-0 bg-mashrabiya-dark opacity-20 pointer-events-none" />

      {/* Top trust bar */}
      <div className="border-b border-stone-800/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: <Shield className="w-4 h-4 text-[#dfca92]" />, title: 'Certified Saudi Craftsmanship', sub: 'Vision 2030 Quality Standards · معايير الجودة' },
            { icon: <Truck className="w-4 h-4 text-[#dfca92]" />, title: 'White-Glove KSA Delivery', sub: 'Riyadh · Jeddah · NEOM · Al-Khobar' },
            { icon: <Star className="w-4 h-4 text-[#dfca92]" />, title: 'Custom Orders: 40% Advance', sub: 'Secure escrow · SAR (ر.س) & USD accepted' },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-stone-900 border border-[#c5a059]/30 flex items-center justify-center shrink-0 mt-0.5">
                {item.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-stone-100">{item.title}</p>
                <p className="text-[11px] text-stone-400 mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand Info */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#163b2f] border border-[#c5a059]/40 flex items-center justify-center">
                <Compass className="w-5 h-5 text-[#dfca92]" />
              </div>
              <div>
                <span className="text-base font-serif font-bold tracking-tight text-white block">
                  L&apos;Atelier Studio
                </span>
                <span className="text-[10px] text-[#dfca92] tracking-widest uppercase font-bold">
                  ستوديو العمارة والتصميم
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Crafting bespoke villa interiors, royal Majlis sanctuaries, and custom architectural fittings engineered for the Saudi climate — from 50°C thermal-break windows to fluted privacy partitions.
            </p>
            <div className="text-xs text-stone-400 space-y-2">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                <span>King Fahd Road, Al Olaya District, Riyadh 12341, KSA</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <a href="tel:+966112345678" className="hover:text-stone-200 transition-colors">+966 11 234 5678</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <a href="mailto:studio@latelier.sa" className="hover:text-stone-200 transition-colors">studio@latelier.sa</a>
              </p>
            </div>
          </div>


          {/* Curated Collections */}
          <div>
            <h4 className="text-[11px] font-bold text-stone-100 uppercase tracking-widest mb-5">
              Curated Collections
            </h4>
            <ul className="space-y-3 text-xs">
              {[
                { label: 'Royal Majlis & Living Room', href: '/shop?category=living-room' },
                { label: 'Luxury Bedroom Suites', href: '/shop?category=bedroom' },
                { label: 'Architectural Lighting', href: '/shop?category=lighting' },
                { label: 'Dining & Entertaining', href: '/shop?category=dining' },
                { label: 'Artisanal Accent Decor', href: '/shop?category=decor' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-stone-400 hover:text-amber-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Services */}
          <div>
            <h4 className="text-[11px] font-bold text-stone-100 uppercase tracking-widest mb-5 whitespace-nowrap">
              Bespoke Services
            </h4>
            <ul className="space-y-3 text-xs">
              {[
                { label: 'Thermal-Break Architectural Windows', action: () => dispatch(openConsultationModal('Partition Glass & Windows')) },
                { label: 'Custom Partition Glass', action: () => dispatch(openConsultationModal('Partition Glass & Windows')) },
                { label: 'Fluted Majlis Privacy Screens', action: () => dispatch(openConsultationModal('Full Living Sanctuary')) },
                { label: 'Modular Majlis Sofa Sets', action: () => dispatch(openConsultationModal('Full Living Sanctuary')) },
                { label: 'Full Villa Interior Planning', action: () => dispatch(openConsultationModal('Full Living Sanctuary')) },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={item.action}
                    className="text-stone-400 hover:text-amber-400 transition-colors text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery Cities + Newsletter */}
          <div className="space-y-7">
            <div>
              <h4 className="text-[11px] font-bold text-stone-100 uppercase tracking-widest mb-4">
                KSA Delivery Coverage
              </h4>
              <div className="flex flex-wrap gap-2">
                {DELIVERY_CITIES.map((city) => (
                  <span
                    key={city}
                    className="inline-flex items-center px-2.5 py-1 bg-stone-800 border border-stone-700 rounded-full text-[10px] text-stone-300 font-medium"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-bold text-stone-100 uppercase tracking-widest mb-3">
                Design Gazette نشرتنا
              </h4>
              <p className="text-[11px] text-stone-500 mb-3 font-light">
                Seasonal lookbooks, Saudi villa reveals & architectural essays.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors flex items-center justify-center"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-stone-600">Zero spam. Curated monthly dispatch.</p>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-600 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center">
            <p>© {new Date().getFullYear()} L&apos;Atelier Interior & Architectural Studio.</p>
            <p className="text-stone-700">All rights reserved. المملكة العربية السعودية</p>
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={() => dispatch(openTrackingModal(undefined))}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              Track Order
            </button>
            <span>Privacy Policy</span>
            <span>VAT: SA123456789</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
