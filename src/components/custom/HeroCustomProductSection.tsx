'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Sparkles,
  Sliders,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Star,
  CheckCircle,
  Eye,
  Layers,
  Ruler,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { Product } from '@/types';
import { useGetCustomFitProductsQuery } from '@/store/services/productsApi';
import { resolveImageUrl, FALLBACK_PRODUCT_IMAGE } from '@/utils/imageUrl';
export { resolveImageUrl };

export const FALLBACK_CUSTOM_PRODUCTS: Product[] = [
  {
    id: 101,
    category_id: 1,
    name: 'Thermal Break 50°C Double-Glazed Window',
    slug: 'thermal-break-50c-double-glazed-window',
    tagline: 'SASO certified thermal break · 38dB acoustic barrier · Double sliding shutters',
    description:
      'Precision-engineered for Saudi Arabian climates. Features dual polyamide thermal isolators resisting external wall temperatures up to 50°C while maintaining cool interior comfort. Multi-chamber extruded aluminum profile with argon-filled acoustic glazing, dust-proof hermetic perimeter gaskets, and German heavy-duty roller bearings.',
    product_type: 'custom_fit',
    price: 800.0,
    compare_at_price: 1000.0,
    price_min: 800.0,
    price_max: 1000.0,
    price_range_formatted: '800 – 1,000 SAR',
    dimensions: '180cm H × 140cm W (Customizable)',
    materials: 'Alupco Architectural Aluminum 2.0mm, Low-E Double Glazing (6mm+12A+6mm)',
    color: 'Matte Architectural Black / Champagne Bronze / Sand White',
    stock: 100,
    in_stock: true,
    is_featured: true,
    rating: 4.95,
    reviews_count: 38,
    image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    ],
    customization_options: {
      min_price: 800.0,
      max_price: 1000.0,
      default_height: 180,
      default_width: 140,
      min_height: 60,
      max_height: 320,
      min_width: 60,
      max_width: 450,
      measurement_unit: 'cm',
      shutters_options: [
        { id: '1_fixed', name: '1 Fixed Pane', description: 'Seamless architectural picture view', price_delta: 0 },
        { id: '2_sliding', name: '2 Shutters (Double Sliding / Casement)', description: 'Dual glide track with smooth rollers', price_delta: 60 },
        { id: '3_sliding', name: '3 Shutters (Tri-Rail Panoramic)', description: 'Wide 66% clear opening space', price_delta: 120 },
        { id: '4_bifold', name: '4 Shutters (Quad Multi-Slide / Bi-Fold)', description: 'Full terrace & garden opening', price_delta: 190 },
      ],
      aluminum_options: [
        { id: 'alupco_2_0', name: 'Alupco Thermal Break 2.0mm', badge: 'SASO 50°C Certified', thickness: '2.0mm', price_delta: 0 },
        { id: 'royal_2_5', name: 'Royal Gulf Heavy Duty 2.5mm', badge: 'Desert Wind Resistant', thickness: '2.5mm', price_delta: 80 },
        { id: 'slim_1_8', name: 'Ultra-Slim Minimalist 1.8mm', badge: 'Max Glass Horizon Line', thickness: '1.8mm', price_delta: 50 },
        { id: 'std_1_5', name: 'Standard Structural Aluminum 1.5mm', badge: 'Courtyard / Interior', thickness: '1.5mm', price_delta: -40 },
      ],
      glass_options: [
        { id: 'bronze_refl', name: 'Double Glazed Reflective Bronze', tint: '#8c6239', specs: '24mm (6+12A+6) Sun Shield', price_delta: 0 },
        { id: 'low_e_clear', name: 'Clear Low-E Acoustic Double Glass', tint: '#d6eaf8', specs: '38dB soundproof insulation', price_delta: 40 },
        { id: 'tinted_grey', name: 'Smoky Tinted Grey Solar-Shield', tint: '#4a4a4a', specs: 'Anti-glare 85% heat rejection', price_delta: 30 },
        { id: 'frosted_privacy', name: 'Frosted Acid-Etched Privacy', tint: '#e5e7eb', specs: '100% privacy diffused light', price_delta: 20 },
        { id: 'triple_acoustic', name: 'Triple-Glazed Extreme Acoustic', tint: '#aed6f1', specs: '42dB Royal Majlis rating', price_delta: 110 },
      ],
      color_options: [
        { id: 'black', name: 'Matte Architectural Black', hex: '#1e1e1e' },
        { id: 'gold', name: 'Champagne Gold / Bronze', hex: '#c5a059' },
        { id: 'anthracite', name: 'Metallic Anthracite Charcoal', hex: '#3b3e40' },
        { id: 'sand_white', name: 'Desert Sand Warm White', hex: '#f4ede2' },
      ],
      addons: [
        { id: 'fly_screen', name: 'Stainless Steel Insect / Fly Screen', price: 120, selected: true },
        { id: 'german_lock', name: 'German Multi-Point Security Lock', price: 180, selected: false },
        { id: 'motorized', name: 'Motorized Smart Automation Ready', price: 450, selected: false },
        { id: 'dust_seal', name: 'Hermetic Sandstorm Dust Weatherseal', price: 0, selected: true },
      ],
    },
  },
  {
    id: 102,
    category_id: 1,
    name: 'Acoustic Triple-Glazed Shutter Window',
    slug: 'acoustic-triple-glazed-shutter-window',
    tagline: '42dB sound dampening · Heavy-duty multi-shutter · Riyadh villa grade',
    description:
      'Engineered for street-facing facades and master suites requiring complete acoustic silence. Triple-pane laminated security glazing with acoustic interlayers reduces traffic and ambient desert noise by 42 decibels. Reinforced structural sash accommodates high wind loads.',
    product_type: 'custom_fit',
    price: 950.0,
    compare_at_price: 1200.0,
    price_min: 950.0,
    price_max: 1200.0,
    price_range_formatted: '950 – 1,200 SAR',
    dimensions: '200cm H × 160cm W (Customizable)',
    materials: 'Heavy Structural Aluminum 2.2mm, Acoustic Laminate Glass',
    color: 'Anthracite Charcoal / Champagne Gold',
    stock: 80,
    in_stock: true,
    is_featured: true,
    rating: 4.92,
    reviews_count: 24,
    image_url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
    ],
    customization_options: {
      min_price: 950.0,
      max_price: 1200.0,
      default_height: 200,
      default_width: 160,
      min_height: 80,
      max_height: 300,
      min_width: 80,
      max_width: 400,
      measurement_unit: 'cm',
      shutters_options: [
        { id: '2_sliding', name: '2 Shutters (Double Sliding)', description: 'Heavy duty track', price_delta: 0 },
        { id: '3_sliding', name: '3 Shutters (Tri-Glide)', description: 'Wide opening clearance', price_delta: 110 },
        { id: '4_bifold', name: '4 Shutters (Quad Multi-Fold)', description: 'Full balcony opening', price_delta: 180 },
      ],
      aluminum_options: [
        { id: 'alupco_2_2', name: 'Alupco Structural Alloy 2.2mm', badge: 'Heavy Duty 42dB', thickness: '2.2mm', price_delta: 0 },
        { id: 'royal_2_5', name: 'Royal Gulf Extreme 2.5mm', badge: 'Commercial Grade', thickness: '2.5mm', price_delta: 70 },
      ],
      glass_options: [
        { id: 'triple_acoustic', name: 'Triple-Glazed Extreme Acoustic', tint: '#aed6f1', specs: '42dB Royal Majlis rating', price_delta: 0 },
        { id: 'bronze_refl', name: 'Double Glazed Reflective Bronze', tint: '#8c6239', specs: '24mm (6+12A+6)', price_delta: -40 },
        { id: 'tinted_grey', name: 'Smoky Tinted Grey Sun-Shield', tint: '#4a4a4a', specs: 'Anti-glare privacy', price_delta: 20 },
      ],
      color_options: [
        { id: 'anthracite', name: 'Metallic Anthracite Charcoal', hex: '#3b3e40' },
        { id: 'black', name: 'Matte Architectural Black', hex: '#1e1e1e' },
        { id: 'gold', name: 'Champagne Gold / Bronze', hex: '#c5a059' },
      ],
      addons: [
        { id: 'german_lock', name: 'German Multi-Point Security Lock', price: 180, selected: true },
        { id: 'fly_screen', name: 'Stainless Steel Insect / Fly Screen', price: 120, selected: true },
      ],
    },
  },
  {
    id: 103,
    category_id: 1,
    name: 'Minimalist Slim Aluminum Sliding Patio System',
    slug: 'minimalist-slim-aluminum-sliding-patio-system',
    tagline: 'Ultra-thin 18mm sightlines · Floor-to-ceiling panoramic glass · 2 to 4 shutters',
    description:
      'Ultra-contemporary minimalist sliding glass door and window system. Sightline interlock width of only 18mm maximizes natural desert daylight and courtyard views. Concealed sub-floor drainage and flush threshold transition.',
    product_type: 'custom_fit',
    price: 1100.0,
    compare_at_price: 1400.0,
    price_min: 1100.0,
    price_max: 1400.0,
    price_range_formatted: '1,100 – 1,400 SAR',
    dimensions: '240cm H × 200cm W (Custom height up to 3.5m)',
    materials: 'Thermally broken aviation grade aluminum, 28mm Low-E insulated glass',
    color: 'Matte Architectural Black / Desert Bronze',
    stock: 60,
    in_stock: true,
    is_featured: true,
    rating: 4.98,
    reviews_count: 19,
    image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
    ],
    customization_options: {
      min_price: 1100.0,
      max_price: 1400.0,
      default_height: 240,
      default_width: 200,
      min_height: 120,
      max_height: 350,
      min_width: 120,
      max_width: 600,
      measurement_unit: 'cm',
      shutters_options: [
        { id: '2_sliding', name: '2 Shutters (Double Slider)', description: 'Sleek minimalist glide', price_delta: 0 },
        { id: '3_sliding', name: '3 Shutters (Tri-Rail Panoramic)', description: 'Wide villa garden access', price_delta: 160 },
        { id: '4_bifold', name: '4 Shutters (Quad Pocket Slide)', description: 'Walls disappear into pocket', price_delta: 250 },
      ],
      aluminum_options: [
        { id: 'slim_1_8', name: 'Ultra-Slim Minimalist 1.8mm Profile', badge: '18mm Sightline', thickness: '1.8mm', price_delta: 0 },
        { id: 'alupco_2_0', name: 'Alupco Reinforced Slim 2.0mm', badge: 'High Wind Rating', thickness: '2.0mm', price_delta: 90 },
      ],
      glass_options: [
        { id: 'low_e_clear', name: 'Clear Low-E Acoustic Double Glass', tint: '#d6eaf8', specs: '38dB clarity', price_delta: 0 },
        { id: 'bronze_refl', name: 'Double Glazed Reflective Bronze', tint: '#8c6239', specs: 'Privacy sun shield', price_delta: 40 },
        { id: 'tinted_grey', name: 'Smoky Tinted Grey Sun-Shield', tint: '#4a4a4a', specs: 'Modern luxury tint', price_delta: 30 },
      ],
      color_options: [
        { id: 'black', name: 'Matte Architectural Black', hex: '#1e1e1e' },
        { id: 'gold', name: 'Champagne Gold / Bronze', hex: '#c5a059' },
      ],
      addons: [
        { id: 'motorized', name: 'Motorized Smart Automation Ready', price: 450, selected: true },
        { id: 'german_lock', name: 'German Multi-Point Security Lock', price: 180, selected: true },
      ],
    },
  },
  {
    id: 104,
    category_id: 1,
    name: 'Royal Saudi Villa Mashrabiya Glass Bay Window',
    slug: 'royal-saudi-villa-mashrabiya-glass-bay-window',
    tagline: 'Traditional Saudi geometric motif · Thermal double glazing · Majlis focal point',
    description:
      'A statement architectural feature connecting rich Saudi heritage with high-performance modern glazing. Laser-cut geometric Mashrabiya lattice integrated between double-glazed panels provides shade, privacy, and cooling shadow play.',
    product_type: 'custom_fit',
    price: 850.0,
    compare_at_price: 1150.0,
    price_min: 850.0,
    price_max: 1150.0,
    price_range_formatted: '850 – 1,150 SAR',
    dimensions: '190cm H × 150cm W (Customizable)',
    materials: 'Laser-cut Anodized Aluminum lattice, Double insulated safety glass',
    color: 'Champagne Gold / Matte Black / Warm Sand',
    stock: 45,
    in_stock: true,
    is_featured: true,
    rating: 4.96,
    reviews_count: 31,
    image_url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    ],
    customization_options: {
      min_price: 850.0,
      max_price: 1150.0,
      default_height: 190,
      default_width: 150,
      min_height: 80,
      max_height: 300,
      min_width: 80,
      max_width: 360,
      measurement_unit: 'cm',
      shutters_options: [
        { id: '1_fixed', name: '1 Fixed Mashrabiya Bay', description: 'Intricate heritage pattern', price_delta: 0 },
        { id: '2_sliding', name: '2 Shutters (Mashrabiya Sliding)', description: 'Dual operable lattice panels', price_delta: 70 },
        { id: '3_sliding', name: '3 Shutters (Tri-Panel Majlis Feature)', description: 'Grand reception hall installation', price_delta: 140 },
      ],
      aluminum_options: [
        { id: 'alupco_2_0', name: 'Alupco Architectural Thermal 2.0mm', badge: 'SASO Certified', thickness: '2.0mm', price_delta: 0 },
        { id: 'royal_2_5', name: 'Royal Gulf Heavy Duty 2.5mm', badge: 'Reinforced Framing', thickness: '2.5mm', price_delta: 80 },
      ],
      glass_options: [
        { id: 'bronze_refl', name: 'Double Glazed Reflective Bronze', tint: '#8c6239', specs: 'Golden sunlight tone', price_delta: 0 },
        { id: 'low_e_clear', name: 'Clear Low-E Acoustic Double Glass', tint: '#d6eaf8', specs: '38dB acoustic barrier', price_delta: 50 },
        { id: 'frosted_privacy', name: 'Frosted Acid-Etched Privacy', tint: '#e5e7eb', specs: 'Diffused soft glow', price_delta: 30 },
      ],
      color_options: [
        { id: 'gold', name: 'Champagne Gold / Bronze', hex: '#c5a059' },
        { id: 'black', name: 'Matte Architectural Black', hex: '#1e1e1e' },
        { id: 'sand_white', name: 'Desert Sand Warm White', hex: '#f4ede2' },
      ],
      addons: [
        { id: 'dust_seal', name: 'Hermetic Sandstorm Dust Weatherseal', price: 0, selected: true },
        { id: 'fly_screen', name: 'Stainless Steel Insect / Fly Screen', price: 120, selected: true },
      ],
    },
  },
  {
    id: 105,
    category_id: 1,
    name: 'Grand Pivoting Glass & Aluminum Villa Entrance Door',
    slug: 'grand-pivoting-glass-aluminum-villa-entrance-door',
    tagline: 'Concealed heavy-duty pivot hinge · 3m architectural height · Biometric smart access',
    description:
      'Monumental architectural pivot entrance door engineered for luxury Saudi villas. Features concealed floor pivot with 500kg load capacity, 3-point automatic biometric deadbolts, and insulated safety structural glass with thermal break profile.',
    product_type: 'custom_fit',
    price: 1400.0,
    compare_at_price: 1900.0,
    price_min: 1400.0,
    price_max: 1900.0,
    price_range_formatted: '1,400 – 1,900 SAR',
    dimensions: '280cm H × 180cm W (Customizable up to 3.5m height)',
    materials: 'Thermal Break Structural Alloy 2.5mm, 32mm Insulated Toughened Safety Glass',
    color: 'Matte Architectural Black / Champagne Bronze',
    stock: 30,
    in_stock: true,
    is_featured: true,
    rating: 4.97,
    reviews_count: 28,
    image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    ],
    customization_options: {
      min_price: 1400.0,
      max_price: 1900.0,
      default_height: 280,
      default_width: 180,
      min_height: 200,
      max_height: 360,
      min_width: 120,
      max_width: 250,
      measurement_unit: 'cm',
      shutters_options: [
        { id: '1_pivot', name: 'Single Grand Pivot Door', description: 'Offset concealed hydraulic pivot system', price_delta: 0 },
        { id: '2_pivot_sidelite', name: 'Pivot with Fixed Glass Sidelight', description: 'Panoramic natural entrance light', price_delta: 220 },
      ],
      aluminum_options: [
        { id: 'royal_2_5', name: 'Royal Gulf Heavy Duty 2.5mm', badge: 'High Wind Rating', thickness: '2.5mm', price_delta: 0 },
        { id: 'alupco_3_0', name: 'Alupco Monumental Profile 3.0mm', badge: 'Extreme Security', thickness: '3.0mm', price_delta: 140 },
      ],
      glass_options: [
        { id: 'tinted_grey', name: 'Smoky Charcoal Tinted Security Glass', tint: '#3a3a3a', specs: 'Double laminated privacy glass', price_delta: 0 },
        { id: 'bronze_refl', name: 'Reflective Bronze Privacy Glass', tint: '#8c6239', specs: 'Sunlight reflection & high privacy', price_delta: 40 },
        { id: 'frosted_acid', name: 'Acid-Etched Architectural Privacy', tint: '#e5e7eb', specs: 'Diffused elegant interior daylight', price_delta: 60 },
      ],
      color_options: [
        { id: 'black', name: 'Matte Architectural Black', hex: '#1e1e1e' },
        { id: 'gold', name: 'Champagne Gold / Bronze', hex: '#c5a059' },
        { id: 'anthracite', name: 'Metallic Anthracite Charcoal', hex: '#3b3e40' },
      ],
      addons: [
        { id: 'biometric_lock', name: 'German Biometric Fingerprint Smart Lock', price: 280, selected: true },
        { id: 'hydraulic_closer', name: 'Concealed Hydraulic Soft-Closer', price: 150, selected: true },
        { id: 'dust_seal', name: 'Heavy Hermetic Bottom Drop Dust Seal', price: 0, selected: true },
      ],
    },
  },
  {
    id: 106,
    category_id: 1,
    name: 'Frameless Acoustic Glass Partition & Majlis Sliding Wall',
    slug: 'frameless-acoustic-glass-majlis-partition',
    tagline: '40dB acoustic isolation · Flush recessed top track · Modular acoustic salon divider',
    description:
      'Concealed overhead track system with floor-free threshold. Designed for Saudi villa Majlis, prayer halls, and executive salons to partition large spaces effortlessly while retaining architectural daylight and acoustic quietness.',
    product_type: 'custom_fit',
    price: 750.0,
    compare_at_price: 1050.0,
    price_min: 750.0,
    price_max: 1050.0,
    price_range_formatted: '750 – 1,050 SAR',
    dimensions: '260cm H × 300cm W (Customizable up to 4m height)',
    materials: '12mm Acoustic Toughened Laminated Glass, Concealed Top Aluminum Track',
    color: 'Matte Black Hardware / Brushed Champagne Brass',
    stock: 50,
    in_stock: true,
    is_featured: true,
    rating: 4.93,
    reviews_count: 22,
    image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    ],
    customization_options: {
      min_price: 750.0,
      max_price: 1050.0,
      default_height: 260,
      default_width: 300,
      min_height: 180,
      max_height: 380,
      min_width: 150,
      max_width: 700,
      measurement_unit: 'cm',
      shutters_options: [
        { id: '2_panels', name: '2 Sliding Glass Panels', description: 'Dual glide overhead track', price_delta: 0 },
        { id: '3_panels', name: '3 Telescopic Stacking Panels', description: 'Wide Majlis clear entrance', price_delta: 120 },
        { id: '4_panels', name: '4 Bifold Stacking Glass Wall', description: 'Full opening wall partition', price_delta: 210 },
      ],
      aluminum_options: [
        { id: 'slim_top_track', name: 'Recessed Flush Ceiling Track', badge: 'Concealed Profile', thickness: '2.0mm', price_delta: 0 },
        { id: 'heavy_track', name: 'Heavy-Duty Bearing Track System', badge: 'High Cycle Durability', thickness: '2.5mm', price_delta: 60 },
      ],
      glass_options: [
        { id: 'ultra_clear', name: 'Low-Iron Ultra-Clear Acoustic Laminated', tint: '#ffffff', specs: '12mm sound dampening safety glass', price_delta: 0 },
        { id: 'frosted_fluted', name: 'Fluted / Moru Ribbed Privacy Glass', tint: '#f0ede6', specs: 'Trendy luxury privacy ribs', price_delta: 70 },
        { id: 'tinted_bronze', name: 'Warm Bronze Tinted Acoustic Glass', tint: '#8c6239', specs: 'Majlis warm ambiance', price_delta: 40 },
      ],
      color_options: [
        { id: 'black', name: 'Matte Architectural Black', hex: '#1e1e1e' },
        { id: 'gold', name: 'Champagne Gold / Bronze', hex: '#c5a059' },
      ],
      addons: [
        { id: 'soft_close', name: 'Dual Direction Hydraulic Soft-Stop', price: 110, selected: true },
        { id: 'acoustic_seals', name: 'Perimeter Acoustic Gasket Seals', price: 80, selected: true },
      ],
    },
  },
  {
    id: 107,
    category_id: 1,
    name: 'Motorized Thermal Roof Skylight & Ventilation Hatch',
    slug: 'motorized-thermal-roof-skylight-system',
    tagline: 'Rain & wind sensors · Solar-powered motorized open · Hermetic sandstorm weatherseal',
    description:
      'Automated architectural roof glass skylight providing natural atrium daylight and passive hot air extraction. Double laminated Low-E argon-filled glazing keeps 99% UV and radiant heat outside.',
    product_type: 'custom_fit',
    price: 1250.0,
    compare_at_price: 1650.0,
    price_min: 1250.0,
    price_max: 1650.0,
    price_range_formatted: '1,250 – 1,650 SAR',
    dimensions: '150cm H × 150cm W (Custom curb dimensions)',
    materials: 'Thermally Broken Cast Aluminum Curb, Low-E Solar Reflective Double Glazing',
    color: 'Matte Architectural Black / Pure White Interior',
    stock: 25,
    in_stock: true,
    is_featured: true,
    rating: 4.94,
    reviews_count: 16,
    image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    ],
    customization_options: {
      min_price: 1250.0,
      max_price: 1650.0,
      default_height: 150,
      default_width: 150,
      min_height: 80,
      max_height: 250,
      min_width: 80,
      max_width: 250,
      measurement_unit: 'cm',
      shutters_options: [
        { id: '1_fixed_sky', name: 'Fixed Non-Opening Skylight', description: 'Permanent sealed daylight opening', price_delta: -150 },
        { id: '1_motorized_sky', name: 'Motorized Ventilation Hatch', description: 'Remote controlled opening with auto rain shut', price_delta: 0 },
      ],
      aluminum_options: [
        { id: 'thermal_curb', name: 'SASO Thermal Break Insulated Curb', badge: 'Heat Shield', thickness: '2.5mm', price_delta: 0 },
      ],
      glass_options: [
        { id: 'solar_low_e', name: 'Triple Glazed Solar-Shield Low-E', tint: '#99ccee', specs: '88% radiant desert heat rejection', price_delta: 0 },
        { id: 'reflective_gold', name: 'Reflective Gold Mirrored Glazing', tint: '#c5a059', specs: 'High glare and heat barrier', price_delta: 60 },
      ],
      color_options: [
        { id: 'black', name: 'Matte Architectural Black', hex: '#1e1e1e' },
        { id: 'sand_white', name: 'Desert Sand Warm White', hex: '#f4ede2' },
      ],
      addons: [
        { id: 'rain_sensor', name: 'Automatic Rain & Sandstorm Sensor', price: 120, selected: true },
        { id: 'blackout_blind', name: 'Motorized Internal Blackout Blind', price: 250, selected: false },
      ],
    },
  },
  {
    id: 108,
    category_id: 1,
    name: 'Heavy-Duty Architectural Pergola Glass Louver System',
    slug: 'storm-proof-architectural-pergola-glass-louvers',
    tagline: 'Adjustable 0–90° motorized louvers · Alupco structural grade · Desert courtyard breeze',
    description:
      'Precision engineered adjustable tempered glass louver panels for luxury villa terraces, outdoor Majlis courtyards, and rooftop lounges. Offers full control over shading, ventilation, and privacy with high wind resistance.',
    product_type: 'custom_fit',
    price: 900.0,
    compare_at_price: 1300.0,
    price_min: 900.0,
    price_max: 1300.0,
    price_range_formatted: '900 – 1,300 SAR',
    dimensions: '220cm H × 120cm W (Custom bank width)',
    materials: '10mm Heat-Strengthened Glass Blades, Heavy Extruded Alupco Frame',
    color: 'Matte Architectural Black / Champagne Bronze',
    stock: 40,
    in_stock: true,
    is_featured: true,
    rating: 4.91,
    reviews_count: 14,
    image_url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
    ],
    customization_options: {
      min_price: 900.0,
      max_price: 1300.0,
      default_height: 220,
      default_width: 120,
      min_height: 100,
      max_height: 300,
      min_width: 60,
      max_width: 200,
      measurement_unit: 'cm',
      shutters_options: [
        { id: 'manual_louver', name: 'Smooth Manual Lever Control', description: 'Simple dual crank tilt', price_delta: 0 },
        { id: 'motorized_louver', name: 'Motorized Smart Remote Tilt', description: 'Push-button angle adjustment', price_delta: 190 },
      ],
      aluminum_options: [
        { id: 'alupco_2_0', name: 'Alupco Architectural Thermal 2.0mm', badge: 'SASO Certified', thickness: '2.0mm', price_delta: 0 },
        { id: 'royal_2_5', name: 'Royal Gulf Heavy Duty 2.5mm', badge: 'High Wind Load', thickness: '2.5mm', price_delta: 80 },
      ],
      glass_options: [
        { id: 'tinted_grey', name: 'Smoky Charcoal Anti-Glare Glass', tint: '#4a4a4a', specs: 'Cool shading and sun protection', price_delta: 0 },
        { id: 'frosted_diffuse', name: 'Frosted Translucent Privacy Glass', tint: '#e5e7eb', specs: 'Total privacy with diffused light', price_delta: 30 },
        { id: 'reflective_bronze', name: 'Reflective Bronze Privacy Glass', tint: '#8c6239', specs: 'Royal warm glow', price_delta: 40 },
      ],
      color_options: [
        { id: 'black', name: 'Matte Architectural Black', hex: '#1e1e1e' },
        { id: 'gold', name: 'Champagne Gold / Bronze', hex: '#c5a059' },
        { id: 'sand_white', name: 'Desert Sand Warm White', hex: '#f4ede2' },
      ],
      addons: [
        { id: 'integrated_flyscreen', name: 'Concealed Integrated Insect Screen', price: 110, selected: true },
        { id: 'acoustic_blade_seals', name: 'Silicone Gasket Blade Edge Seals', price: 50, selected: true },
      ],
    },
  },
];

export function HeroCustomProductSection() {
  const router = useRouter();
  const { data: apiProducts } = useGetCustomFitProductsQuery(8);

  const products: Product[] = React.useMemo(() => {
    if (apiProducts && apiProducts.length > 0) return apiProducts;
    return FALLBACK_CUSTOM_PRODUCTS;
  }, [apiProducts]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const activeProduct = products[activeIdx] || products[0];

  const handleNext = useCallback(() => {
    if (isAnimating || products.length <= 1) return;
    setIsAnimating(true);
    setActiveIdx((prev) => (prev + 1) % products.length);
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating, products.length]);

  const handlePrev = useCallback(() => {
    if (isAnimating || products.length <= 1) return;
    setIsAnimating(true);
    setActiveIdx((prev) => (prev - 1 + products.length) % products.length);
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating, products.length]);

  // Auto-advance banner every 6s
  useEffect(() => {
    if (products.length <= 1) return;
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [handleNext, products.length]);

  const getPriceRange = (product: Product) => {
    const min = product.price_min ?? product.price ?? 800;
    const max = product.price_max ?? product.compare_at_price ?? (min * 1.25);
    if (max > min) {
      return `${Math.round(min).toLocaleString()} – ${Math.round(max).toLocaleString()} SAR`;
    }
    return `${Math.round(min).toLocaleString()} SAR`;
  };

  const navigateToCustomPage = (product: Product) => {
    router.push(`/custom-order/${product.slug || product.id}`);
  };

  return (
    <div className="w-full">
      {/* ─── IN-HERO INTERACTIVE CARDS DECK ───────────────────────────── */}
      <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
        {/* Subtle decorative glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#d4b06a]/20 via-[#1a3d30]/20 to-[#d4b06a]/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000" />

        <div className="relative rounded-3xl bg-[#161412]/90 backdrop-blur-xl border border-white/15 p-5 sm:p-7 shadow-2xl text-white overflow-hidden">
          
          {/* Header pill & pagination */}
          <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b8933f] text-[#1a1815] text-[11px] font-bold uppercase tracking-wider shadow">
                <Sparkles className="w-3.5 h-3.5" />
                Custom Made-to-Measure
              </span>
              <span className="hidden sm:inline-block text-[11px] text-white/60 font-medium">
                SASO 50°C Certified
              </span>
            </div>

            {/* Slider arrows */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous custom product"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-colors text-white cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono text-white/60 px-1">
                {activeIdx + 1}/{products.length}
              </span>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next custom product"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-colors text-white cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Interactive Product Card */}
          <div
            onClick={() => navigateToCustomPage(activeProduct)}
            className="group cursor-pointer block transition-all"
          >
            {/* Image Frame with Aspect Ratio */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/40 border border-white/10 mb-4">
              <img
                src={resolveImageUrl(activeProduct.image_url)}
                alt={activeProduct.name}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = FALLBACK_PRODUCT_IMAGE;
                }}
                className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out ${
                  isAnimating ? 'opacity-40 scale-95' : 'opacity-100 scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Multiple Thumbnails Mini-Bar Overlay */}
              {activeProduct.gallery && activeProduct.gallery.length > 1 && (
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                    {activeProduct.gallery.slice(0, 4).map((imgUrl, i) => (
                      <span
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === 0 ? 'bg-[#d4b06a] w-5' : 'bg-white/50'
                        }`}
                      />
                    ))}
                    <span className="text-[10px] text-white/70 px-1 font-mono">
                      +{activeProduct.gallery.length} photos
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/15">
                    <Ruler className="w-3 h-3 text-[#d4b06a]" />
                    Custom Fit Form
                  </span>
                </div>
              )}

              {/* Hover quick hint */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-wider border border-white/30">
                  <Eye className="w-3 h-3" />
                  Click to Customize
                </span>
              </div>
            </div>

            {/* Product Meta & Pricing */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#d4b06a] font-semibold">
                      <Star className="w-3.5 h-3.5 fill-[#d4b06a]" />
                      {activeProduct.rating || 4.9} ({activeProduct.reviews_count || 32} reviews)
                    </span>
                    <span className="text-white/30">·</span>
                    <span className="text-[11px] text-white/60">
                      7–10 Days Fabrication
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-[#d4b06a] transition-colors line-clamp-1">
                    {activeProduct.name}
                  </h3>
                </div>

                {/* Ecommerce Price Range Badge */}
                <div className="text-right shrink-0 bg-white/5 px-3.5 py-2 rounded-2xl border border-white/10">
                  <span className="text-[10px] uppercase tracking-wider text-white/50 block font-semibold">
                    Price Range
                  </span>
                  <span className="text-base sm:text-lg font-serif font-bold text-[#d4b06a] whitespace-nowrap">
                    {getPriceRange(activeProduct)}
                  </span>
                </div>
              </div>

              {/* Tagline / Subtitle */}
              <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
                {activeProduct.tagline || activeProduct.description}
              </p>

              {/* Custom specs highlights */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/10 text-[11px]">
                <div className="flex items-center gap-1.5 text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4b06a]" />
                  <span>Height &amp; Width</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4b06a]" />
                  <span>1–4 Shutters</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4b06a]" />
                  <span>Glass &amp; Alloy</span>
                </div>
              </div>

              {/* Primary Call to Action: "Order Now" Button */}
              <div className="flex items-center gap-3 pt-1">
                <Link
                  href={`/custom-order/${activeProduct.slug || activeProduct.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-[#d4b06a] to-[#b8933f] hover:from-[#e0c283] hover:to-[#c8a14b] active:scale-[0.99] text-[#1a1815] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
                >
                  <span>Order Now · اطلب الآن</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={`/custom-order/${activeProduct.slug || activeProduct.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/20 transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Custom Specs</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick thumbnails switcher beneath */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2 overflow-x-auto">
            <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold shrink-0">
              Quick Pick:
            </span>
            <div className="flex items-center gap-2">
              {products.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    idx === activeIdx
                      ? 'bg-white text-[#1a1815] font-bold shadow'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {p.name.split(' ')[0]} {p.name.split(' ')[1] || ''}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/**
 * ── FEATURED E-COMMERCE PRODUCT CARDS GRID ─────────────────────────────
 * Placed immediately below the hero / at the fold so customers see
 * ecommerce-style cards with images, titles, 800 - 1000 SAR price ranges,
 * and "Order Now" buttons leading directly to the custom details page!
 */
export function HeroCustomProductCardsGrid() {
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);
  const { data: apiProducts } = useGetCustomFitProductsQuery(20);

  const products: Product[] = React.useMemo(() => {
    if (apiProducts && apiProducts.length > 0) return apiProducts;
    return FALLBACK_CUSTOM_PRODUCTS;
  }, [apiProducts]);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScroll = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    const maxScroll = scrollWidth - clientWidth;
    setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, products]);

  const scrollSlider = (direction: 'prev' | 'next') => {
    const el = sliderRef.current;
    if (!el) return;
    const cardEl = el.querySelector<HTMLElement>('[data-slider-item]');
    const cardWidth = cardEl ? cardEl.offsetWidth + 24 : 320;
    el.scrollBy({
      left: direction === 'next' ? cardWidth : -cardWidth,
      behavior: 'smooth',
    });
  };

  const getPriceRange = (product: Product) => {
    const min = product.price_min ?? product.price ?? 800;
    const max = product.price_max ?? product.compare_at_price ?? (min * 1.25);
    if (max > min) {
      return `${Math.round(min).toLocaleString()} – ${Math.round(max).toLocaleString()} SAR`;
    }
    return `${Math.round(min).toLocaleString()} SAR`;
  };

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10">
      <div className="bg-white rounded-3xl border border-[#e2d9cc] p-6 sm:p-10 shadow-sm space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[#e2d9cc]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#b8933f] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Made-to-Measure Editions · تصنيع حسب المقاس</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1a1815]">
              Custom Architectural Products
            </h2>
            <p className="text-xs sm:text-sm text-[#7a7166] mt-1 max-w-2xl leading-relaxed">
              Slide through our architectural profiles. Specify height, width, number of shutters, aluminum brand, and glass color in the custom order builder.
            </p>
          </div>

          {/* Action Header: See More Button & Slider Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f3ede4] text-[#1a3d30] text-xs font-semibold border border-[#e2d9cc]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1a3d30]" />
              50°C Thermal Break Certified
            </span>

            {/* Prominent "See More" Button */}
            <Link
              href="/custom-products"
              id="see-more-custom-products-btn"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1a1815] text-[#d4b06a] hover:bg-[#b8933f] hover:text-[#1a1815] text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm shrink-0 group cursor-pointer"
            >
              <span>See More · عرض الكل</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-1.5 bg-[#f3ede4] p-1 rounded-full border border-[#e2d9cc] shrink-0">
              <button
                type="button"
                onClick={() => scrollSlider('prev')}
                disabled={!canScrollLeft}
                aria-label="Previous custom products"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  canScrollLeft
                    ? 'bg-white text-[#1a1815] shadow-xs hover:bg-[#1a1815] hover:text-white'
                    : 'text-[#a89f91] opacity-40 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollSlider('next')}
                disabled={!canScrollRight}
                aria-label="Next custom products"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  canScrollRight
                    ? 'bg-white text-[#1a1815] shadow-xs hover:bg-[#1a1815] hover:text-white'
                    : 'text-[#a89f91] opacity-40 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Horizontal Slider Container */}
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-1 px-1 -mx-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map((product) => {
              const priceRange = getPriceRange(product);
              const targetUrl = `/custom-order/${product.slug || product.id}`;

              return (
                <div
                  key={product.id}
                  data-slider-item
                  onClick={() => router.push(targetUrl)}
                  className="w-[280px] sm:w-[320px] lg:w-[calc(25%-18px)] shrink-0 snap-start group cursor-pointer rounded-2xl bg-[#faf8f5] hover:bg-white border border-[#e2d9cc] hover:border-[#b8933f]/70 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Product Image Frame */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e8ddd0]">
                    <img
                      src={resolveImageUrl(product.image_url)}
                      alt={product.name}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = FALLBACK_PRODUCT_IMAGE;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[#1a1815] text-[10px] font-bold uppercase tracking-wider shadow">
                        Made to Order
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium border border-white/20">
                        ★ {product.rating || 4.9}
                      </span>
                    </div>

                    {/* Multiple Gallery Photos Pill */}
                    {product.gallery && product.gallery.length > 0 && (
                      <div className="absolute bottom-2.5 left-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white/90 text-[10px] font-mono">
                          <Layers className="w-2.5 h-2.5 text-[#d4b06a]" />
                          {product.gallery.length} Images
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      {/* Category / Dimension Note */}
                      <p className="text-[10px] uppercase font-bold tracking-wider text-[#b8933f]">
                        Architectural Glass &amp; Aluminum
                      </p>

                      {/* Product Title */}
                      <h3 className="text-sm font-serif font-bold text-[#1a1815] group-hover:text-[#b8933f] transition-colors line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Description preview */}
                      <p className="text-[11px] text-[#7a7166] line-clamp-2 leading-relaxed">
                        {product.tagline || product.description}
                      </p>
                    </div>

                    {/* Spec Quick Chips */}
                    <div className="pt-2 border-t border-[#e2d9cc]/60 flex flex-wrap gap-1 text-[10px] text-[#3d3833]">
                      <span className="px-2 py-0.5 rounded bg-white border border-[#e2d9cc]">
                        Custom Height &amp; Width
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white border border-[#e2d9cc]">
                        {product.customization_options?.shutters_options
                          ? `${product.customization_options.shutters_options.length} Styles`
                          : '1–4 Shutters'}
                      </span>
                    </div>

                    {/* Price Range & Order Now Button */}
                    <div className="pt-2">
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="text-[10px] text-[#7a7166] uppercase font-semibold">
                          Price Range:
                        </span>
                        <span className="text-sm font-serif font-bold text-[#1a3d30]">
                          {priceRange}
                        </span>
                      </div>

                      <Link
                        href={targetUrl}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1a1815] group-hover:bg-[#1a3d30] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm group-hover:shadow"
                      >
                        <span>Order Now</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Special Final Slide: "See All Custom Products" */}
            <div
              data-slider-item
              onClick={() => router.push('/custom-products')}
              className="w-[280px] sm:w-[320px] lg:w-[calc(25%-18px)] shrink-0 snap-start group cursor-pointer rounded-2xl bg-linear-to-br from-[#1a1815] to-[#26201b] p-6 text-white flex flex-col justify-between border border-[#d4b06a]/30 hover:border-[#d4b06a] hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#d4b06a]/20 border border-[#d4b06a]/40 flex items-center justify-center text-[#d4b06a] group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-[#d4b06a]">
                    Full Bespoke Collection
                  </span>
                  <h3 className="text-lg font-serif font-bold text-white">
                    Explore All Custom Editions
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Discover our full portfolio of SASO thermal windows, acoustic partitions, motorized skylights, and monumental pivot doors.
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <div className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-linear-to-r from-[#d4b06a] to-[#b8933f] text-[#1a1815] font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all group-hover:brightness-110">
                  <span>View All Custom Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Progress Bar & Quick Footer Link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-[#7a7166]">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="h-1.5 w-36 bg-[#e2d9cc] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#b8933f] rounded-full transition-all duration-300"
                style={{ width: `${Math.max(15, scrollProgress)}%` }}
              />
            </div>
            <span className="font-mono text-[11px] text-[#7a7166]">
              {products.length} Custom Models Available
            </span>
          </div>

          <Link
            href="/custom-products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a1815] hover:text-[#b8933f] transition-colors"
          >
            <span>Browse All Made-to-Measure Architectural Works</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
