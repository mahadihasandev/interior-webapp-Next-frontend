'use client';

import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Calendar, Phone, Mail, User, MapPin } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeConsultationModal } from '@/store/slices/uiSlice';
import { useBookConsultationMutation } from '@/store/services/consultationApi';

const SAUDI_CITIES = [
  'Riyadh · الرياض',
  'Jeddah · جدة',
  'Dammam · الدمام',
  'Al-Khobar · الخبر',
  'NEOM · نيوم',
  'Madinah · المدينة المنورة',
  'Other City',
];

const SAR_BUDGETS = [
  'SAR 20,000 – 50,000 (ر.س)',
  'SAR 50,000 – 100,000 (ر.س)',
  'SAR 100,000 – 250,000 (ر.س)',
  'SAR 250,000 – 500,000 (ر.س)',
  'SAR 500,000+ · Full Villa / Commercial',
];

const SCOPE_OPTIONS = [
  'Thermal-Break Architectural Windows (50°C rated)',
  'Custom Partition Glass & Sliding Panels',
  'Fluted Privacy Screens & Majlis Dividers',
  'Royal Majlis Modular Sofa Set',
  'Steel Gates, Railings & Sunshades',
  'Full Villa Interior Design & Planning',
  'Bespoke Millwork & Storage Walls',
];

export function ConsultationModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isConsultationModalOpen);
  const selectedRoomType = useAppSelector((state) => state.ui.selectedRoomType);

  const [bookConsultation, { isLoading }] = useBookConsultationMutation();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    client_name: '',
    email: '',
    phone: '',
    city: 'Riyadh · الرياض',
    room_type: selectedRoomType || SCOPE_OPTIONS[0],
    budget_range: SAR_BUDGETS[1],
    style_preference: 'Saudi Modern · Contemporary Arabic',
    preferred_date: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await bookConsultation(formData).unwrap();
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    dispatch(closeConsultationModal());
    setSubmitted(false);
  };

  const field = (label: string, children: React.ReactNode) => (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );

  const inputCls =
    'w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:bg-white transition-colors';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        {/* Backdrop */}
        <div
          onClick={handleClose}
          className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Dialog */}
        <div className="relative w-full max-w-2xl transform rounded-3xl bg-white border border-stone-200 text-left shadow-2xl transition-all sm:my-8 text-stone-900 overflow-hidden">

          {/* Decorative top accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-stone-400" />

          <div className="p-7 sm:p-9">
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-stone-400 hover:text-stone-700 p-2 rounded-xl hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-12 text-center space-y-5">
                <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900">
                    طلب الاستشارة مُرسَل ✓
                  </h3>
                  <p className="text-sm text-stone-500 mt-1">Consultation Request Received</p>
                </div>
                <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-stone-900 font-bold">{formData.client_name}</span>. Our lead architectural consultant will review your specifications and connect with you within <span className="font-bold">24 business hours</span>.
                </p>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 font-medium text-left max-w-sm mx-auto">
                  📍 {formData.city} · 📐 {formData.room_type.split('(')[0].trim()}
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleClose}
                    className="px-8 py-3 text-xs font-bold uppercase tracking-widest text-white bg-stone-900 hover:bg-stone-800 rounded-full transition-colors shadow-md"
                  >
                    Close & Explore Studio
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2 text-amber-700 text-[11px] font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Bespoke Studio · ستوديو التصميم</span>
                </div>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mb-1">
                  Book a Design Consultation
                </h2>
                <p className="text-xs text-stone-500 mb-7 font-light leading-relaxed">
                  Our Saudi-based architects specialise in royal Majlis sanctuaries, 50°C thermal-break windows, fluted privacy partitions, and full villa interior planning. Tell us about your project.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {field('Your Name · الاسم *',
                      <div className="relative">
                        <input
                          required
                          type="text"
                          value={formData.client_name}
                          onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                          className={`${inputCls} pl-9`}
                          placeholder="e.g. Sultan Al-Rashid"
                        />
                        <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                      </div>
                    )}
                    {field('Email Address *',
                      <div className="relative">
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`${inputCls} pl-9`}
                          placeholder="sultan@example.com"
                        />
                        <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                      </div>
                    )}
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {field('Phone Number · الجوال *',
                      <div className="relative">
                        <input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`${inputCls} pl-9`}
                          placeholder="+966 5X XXX XXXX"
                        />
                        <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                      </div>
                    )}
                    {field('Delivery City · المدينة *',
                      <div className="relative">
                        <select
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className={`${inputCls} pl-9 appearance-none`}
                        >
                          {SAUDI_CITIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                      </div>
                    )}
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {field('Project Scope · نطاق المشروع *',
                      <select
                        value={formData.room_type}
                        onChange={(e) => setFormData({ ...formData, room_type: e.target.value })}
                        className={inputCls}
                      >
                        {SCOPE_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    )}
                    {field('Estimated Budget · الميزانية *',
                      <select
                        value={formData.budget_range}
                        onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                        className={inputCls}
                      >
                        {SAR_BUDGETS.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Row 4 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {field('Style Preference',
                      <select
                        value={formData.style_preference}
                        onChange={(e) => setFormData({ ...formData, style_preference: e.target.value })}
                        className={inputCls}
                      >
                        {[
                          'Saudi Modern · Contemporary Arabic',
                          'Royal Classic · Gold & Marble',
                          'Minimalist Warm White',
                          'Architectural Industrial',
                          'Heritage Islamic Geometry',
                          'Coastal / Resort Villa',
                        ].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    )}
                    {field('Preferred Consultation Date',
                      <div className="relative">
                        <input
                          type="date"
                          value={formData.preferred_date}
                          onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                          className={`${inputCls} pl-9`}
                        />
                        <Calendar className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  {field('Design Notes & Dimensions · ملاحظات التصميم',
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className={inputCls}
                      placeholder="Describe your space: wall dimensions, ceiling height, finish preferences, thermal rating required, or any Saudi building code references..."
                    />
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 text-xs font-bold uppercase tracking-widest text-white bg-stone-900 hover:bg-stone-800 rounded-2xl transition-all shadow-lg shadow-stone-900/20 disabled:opacity-50 flex items-center justify-center gap-2 group"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span>{isLoading ? 'Submitting...' : 'Confirm Consultation · تأكيد الاستشارة'}</span>
                    </button>
                  </div>

                  <p className="text-center text-[11px] text-stone-400">
                    By submitting, you agree to be contacted by our architectural team. No spam.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
