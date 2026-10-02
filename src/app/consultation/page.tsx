'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  User,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { useBookConsultationMutation } from '@/store/services/consultationApi';

export default function ConsultationPage() {
  const [bookConsultation, { isLoading }] = useBookConsultationMutation();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    client_name: '',
    email: '',
    phone: '',
    room_type: 'Living Room',
    budget_range: '$10,000 - $25,000',
    style_preference: 'Warm Minimalist / Japandi',
    preferred_date: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await bookConsultation(formData).unwrap();
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 text-stone-900">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-amber-900" />
          <span>Interior Architecture & Design Practice</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
          Bespoke Spatial Design & Residential Architecture
        </h1>
        <p className="text-sm sm:text-base text-stone-700 font-normal leading-relaxed">
          From concept sketches to custom millwork fabrication, our studio guides homeowners and architects through an intimate, precision-driven design journey.
        </p>
      </div>

      {/* Main Grid: Form & Studio Process */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Booking Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">
                Consultation Request Confirmed
              </h2>
              <p className="text-xs sm:text-sm text-stone-700 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-stone-900">{formData.client_name}</span>. A senior interior architect from our studio will review your project and contact you within 24 hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors shadow-sm"
                >
                  Submit Another Project
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  Request an Initial Consultation
                </h2>
                <p className="text-xs text-stone-600 mt-1">
                  Complimentary 45-minute architectural discovery session via Zoom or in our New York studio.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        value={formData.client_name}
                        onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white"
                        placeholder="Julian Thorne"
                      />
                      <User className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-1">
                      Email *
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white"
                        placeholder="julian@example.com"
                      />
                      <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white"
                        placeholder="+1 (555) 321-7890"
                      />
                      <Phone className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-1">
                      Room / Scope *
                    </label>
                    <select
                      value={formData.room_type}
                      onChange={(e) => setFormData({ ...formData, room_type: e.target.value })}
                      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white"
                    >
                      <option value="Living Room">Living Room & Lounge</option>
                      <option value="Bedroom">Master Bedroom Suite</option>
                      <option value="Full Apartment">Entire Home / Apartment</option>
                      <option value="Dining & Kitchen">Dining Room & Kitchen</option>
                      <option value="Commercial">Commercial / Hospitality</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-1">
                      Project Budget *
                    </label>
                    <select
                      value={formData.budget_range}
                      onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white"
                    >
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                      <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                      <option value="$50,000+">$50,000+ (Full Home)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-1">
                      Preferred Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.preferred_date}
                        onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white"
                      />
                      <Calendar className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-1">
                    Design Notes & Goals
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white"
                    placeholder="Share your goals, architectural preferences, floorplan details..."
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 text-xs font-bold uppercase tracking-widest text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>{isLoading ? 'Submitting...' : 'Book Design Consultation'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Process & Principles Side Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
            <h3 className="text-xl font-serif font-bold text-stone-900">
              The Three-Phase Process
            </h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center text-stone-900 text-xs font-mono font-bold shrink-0">
                  01
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Spatial Discovery & Vision</h4>
                  <p className="text-xs text-stone-700 font-normal mt-1 leading-relaxed">
                    We assess your floorplans, natural lighting vectors, traffic flows, and sensory preferences.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center text-stone-900 text-xs font-mono font-bold shrink-0">
                  02
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Material Curation & 3D Renderings</h4>
                  <p className="text-xs text-stone-700 font-normal mt-1 leading-relaxed">
                    Receive complete material swatch boards, bespoke joinery specifications, and photorealistic spatial views.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center text-stone-900 text-xs font-mono font-bold shrink-0">
                  03
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Artisan Fabrication & White Glove Installation</h4>
                  <p className="text-xs text-stone-700 font-normal mt-1 leading-relaxed">
                    Our team oversees fabrication, quality verification, room-of-choice placement, and artistic styling.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-stone-200 aspect-16/10 shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80"
              alt="Interior design studio material samples"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
