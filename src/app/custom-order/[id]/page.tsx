'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Star,
  Sparkles,
  Ruler,
  Layers,
  Sliders,
  CheckCircle2,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  ChevronRight,
  Info,
  Maximize2,
  Check,
  Building,
  FileText,
  Hammer,
} from 'lucide-react';
import { Product } from '@/types';
import {
  useGetCustomFitProductsQuery,
  useGetProductBySlugQuery,
  useSubmitCustomOrderMutation,
} from '@/store/services/productsApi';
import {
  FALLBACK_CUSTOM_PRODUCTS,
  resolveImageUrl,
} from '@/components/custom/HeroCustomProductSection';

const WHATSAPP_NUMBER = '966501234567';
const PHONE_NUMBER = '+966501234567';

export default function CustomProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const idOrSlug = (params?.id as string) || (params?.slug as string) || '';

  // Fetch product from API
  const { data: singleProduct, isLoading: isSingleLoading } = useGetProductBySlugQuery(idOrSlug, {
    skip: !idOrSlug,
  });
  const { data: customProducts, isLoading: isCustomLoading } = useGetCustomFitProductsQuery();
  const [submitCustomOrder, { isLoading: isMutationLoading }] = useSubmitCustomOrderMutation();

  // Find matching product
  const matchedProduct: Product | undefined = useMemo(() => {
    if (singleProduct) return singleProduct;
    if (customProducts && customProducts.length > 0) {
      const match = customProducts.find(
        (p) => p.slug === idOrSlug || p.id.toString() === idOrSlug
      );
      if (match) return match;
    }
    return undefined;
  }, [singleProduct, customProducts, idOrSlug]);

  const product: Product = matchedProduct || FALLBACK_CUSTOM_PRODUCTS[0];

  const customization = matchedProduct?.customization_options || product.customization_options || FALLBACK_CUSTOM_PRODUCTS[0].customization_options!;

  // Gallery state
  const images = useMemo(() => {
    if (product.gallery && product.gallery.length > 0) {
      return product.gallery;
    }
    return [product.image_url];
  }, [product]);

  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Custom specification form state
  const [unit, setUnit] = useState<'cm' | 'mm' | 'inch'>('cm');
  const [height, setHeight] = useState<number>(customization.default_height || 180);
  const [width, setWidth] = useState<number>(customization.default_width || 140);
  const [shuttersId, setShuttersId] = useState<string>(
    customization.shutters_options?.[1]?.id || '2_sliding'
  );
  const [aluminumId, setAluminumId] = useState<string>(
    customization.aluminum_options?.[0]?.id || 'alupco_2_0'
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    customization.color_options?.[0]?.name || 'Matte Architectural Black'
  );
  const [glassId, setGlassId] = useState<string>(
    customization.glass_options?.[0]?.id || 'bronze_refl'
  );
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({
    fly_screen: true,
    dust_seal: true,
    german_lock: false,
    motorized: false,
  });

  // Synchronize state defaults when the product loads or changes
  React.useEffect(() => {
    if (customization) {
      if (customization.default_height) setHeight(customization.default_height);
      if (customization.default_width) setWidth(customization.default_width);
      if (customization.measurement_unit && ['cm', 'mm', 'inch'].includes(customization.measurement_unit)) {
        setUnit(customization.measurement_unit as 'cm' | 'mm' | 'inch');
      }
      if (customization.shutters_options && customization.shutters_options.length > 0) {
        setShuttersId(customization.shutters_options[1]?.id || customization.shutters_options[0].id);
      }
      if (customization.aluminum_options && customization.aluminum_options.length > 0) {
        setAluminumId(customization.aluminum_options[0].id);
      }
      if (customization.color_options && customization.color_options.length > 0) {
        setSelectedColor(customization.color_options[0].name);
      }
      if (customization.glass_options && customization.glass_options.length > 0) {
        setGlassId(customization.glass_options[0].id);
      }
      setActiveImageIdx(0);
    }
  }, [product.id, customization]);

  // Customer Contact Fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerCity, setCustomerCity] = useState('Riyadh');
  const [customerNotes, setCustomerNotes] = useState('');

  // Order submission modal state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<{
    orderNumber: string;
    totalPrice: number;
    advancePrice: number;
  } | null>(null);

  // Real-time dynamic price calculation
  const calculatedSpecs = useMemo(() => {
    // Area in square meters
    const heightInMeters = unit === 'cm' ? height / 100 : unit === 'mm' ? height / 1000 : (height * 2.54) / 100;
    const widthInMeters = unit === 'cm' ? width / 100 : unit === 'mm' ? width / 1000 : (width * 2.54) / 100;
    const areaSqM = Math.max(0.5, heightInMeters * widthInMeters);

    const baseMin = customization.min_price || product.price || 800;
    const baseMax = customization.max_price || product.compare_at_price || 1000;

    // Normalizing around standard opening (1.8m x 1.4m = 2.52 sqm)
    const standardArea = 2.52;
    const areaRatio = areaSqM / standardArea;

    // Addons & option deltas
    const selectedShutters = customization.shutters_options?.find((s) => s.id === shuttersId);
    const selectedAluminum = customization.aluminum_options?.find((a) => a.id === aluminumId);
    const selectedGlass = customization.glass_options?.find((g) => g.id === glassId);

    const shuttersDelta = selectedShutters?.price_delta || 0;
    const aluminumDelta = selectedAluminum?.price_delta || 0;
    const glassDelta = selectedGlass?.price_delta || 0;

    let addonsTotal = 0;
    customization.addons?.forEach((ad) => {
      if (selectedAddons[ad.id]) {
        addonsTotal += ad.price;
      }
    });

    const scaledBase = baseMin * (0.6 + 0.4 * areaRatio);
    const totalPrice = Math.round(scaledBase + shuttersDelta + aluminumDelta + glassDelta + addonsTotal);
    const suggestedAdvance = Math.round(totalPrice * 0.4);

    return {
      areaSqM: Math.round(areaSqM * 100) / 100,
      areaSqFt: Math.round(areaSqM * 10.7639 * 10) / 10,
      baseMin,
      baseMax,
      selectedShutters,
      selectedAluminum,
      selectedGlass,
      totalPrice,
      suggestedAdvance,
    };
  }, [
    unit,
    height,
    width,
    shuttersId,
    aluminumId,
    glassId,
    selectedAddons,
    customization,
    product.price,
    product.compare_at_price,
  ]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Form submission handler
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        title: `Custom ${product.name} (${calculatedSpecs.areaSqM} m²)`,
        product_id: product.id,
        vendor_id: product.vendor_id,
        quoted_total_price: calculatedSpecs.totalPrice,
        advance_amount_required: calculatedSpecs.suggestedAdvance,
        dimensions: {
          height,
          width,
          unit,
          area_sqm: calculatedSpecs.areaSqM,
        },
        material_specs: {
          shutters: calculatedSpecs.selectedShutters?.name,
          aluminum_profile: calculatedSpecs.selectedAluminum?.name,
          glass_type: calculatedSpecs.selectedGlass?.name,
          color_finish: selectedColor,
        },
        color_finish: selectedColor,
        addon_features: Object.keys(selectedAddons).filter((k) => selectedAddons[k]),
        customer_notes: `Customer: ${customerName}, Phone: ${customerPhone}, Email: ${customerEmail}, City: ${customerCity}. Notes: ${customerNotes}`,
      };

      const res = await submitCustomOrder(payload).unwrap();
      let orderNumber = `CUST-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      if (res?.data?.order_number) {
        orderNumber = res.data.order_number;
      }

      setSubmittedOrder({
        orderNumber,
        totalPrice: calculatedSpecs.totalPrice,
        advancePrice: calculatedSpecs.suggestedAdvance,
      });
    } catch (err: unknown) {
      const msg =
        (err as { data?: { message?: string } })?.data?.message ||
        'Unable to submit custom order to workshop. Please verify your details or contact us directly on WhatsApp.';
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello L'Atelier Studio! I want to place a custom order for:\n\n*${product.name}*\n` +
        `• Dimensions: ${height} × ${width} ${unit} (${calculatedSpecs.areaSqM} m²)\n` +
        `• Shutters: ${calculatedSpecs.selectedShutters?.name}\n` +
        `• Aluminum Profile: ${calculatedSpecs.selectedAluminum?.name}\n` +
        `• Glass Choice: ${calculatedSpecs.selectedGlass?.name}\n` +
        `• Frame Color: ${selectedColor}\n` +
        `• Estimated Quote: ${calculatedSpecs.totalPrice.toLocaleString()} SAR\n` +
        `• City: ${customerCity || 'Riyadh'}\n\n` +
        `Please confirm factory fabrication schedule and engineer site measurement.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  if (isSingleLoading || isCustomLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16 bg-[#faf8f5]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-[#b8933f] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold uppercase tracking-wider text-[#7a7166]">
            Loading Architectural Specification...
          </p>
        </div>
      </div>
    );
  }

  if (!matchedProduct) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16 bg-[#faf8f5]">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-[#e2d9cc] text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-[#b8933f] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold text-[#1a1815]">Product Not Found</h2>
          <p className="text-xs text-[#7a7166] leading-relaxed">
            This made-to-measure architectural product has been removed from the catalog or does not exist.
          </p>
          <div className="pt-2">
            <Link
              href="/custom-products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1a1815] text-[#d4b06a] hover:bg-[#b8933f] hover:text-[#1a1815] text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>Browse All Custom Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 bg-[#faf8f5] text-[#1a1815]">
      {/* ─── BREADCRUMB & TOP BAR ────────────────────────────────────── */}
      <div className="border-b border-[#e2d9cc] bg-white sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#7a7166]">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 hover:text-[#1a1815] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-[#e2d9cc]" />
            <Link href="/#custom-designs" className="hover:text-[#1a1815] transition-colors">
              Custom Architectural Products
            </Link>
            <ChevronRight className="w-3 h-3 text-[#e2d9cc]" />
            <span className="text-[#1a1815] font-bold truncate max-w-[200px] sm:max-w-xs">
              {product.name}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf4f0] text-[#1a3d30] text-xs font-semibold border border-[#1a3d30]/20">
              <span className="w-2 h-2 rounded-full bg-[#1a3d30] animate-pulse" />
              Workshop Capacity: Active
            </span>
            <button
              onClick={handleWhatsAppDirect}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Specialist
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* ═══════════════════════════════════════════════════════════
               LEFT COLUMN: PRODUCT DETAILS & MULTIPLE IMAGE GALLERY (7 Cols)
          ════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Main Large Image Viewer */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-black/5 border border-[#e2d9cc] shadow-md group">
                <Image
                  src={resolveImageUrl(images[activeImageIdx] || product.image_url)}
                  alt={`${product.name} - View ${activeImageIdx + 1}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Floating Cert Badges */}
                <div className="absolute top-4 left-4 flex flex-col items-start gap-2">
                  <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#1a1815] text-xs font-bold uppercase tracking-wider shadow">
                    <Sparkles className="w-3.5 h-3.5 text-[#b8933f]" />
                    Bespoke Made-to-Measure
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#1a3d30] text-white text-[11px] font-semibold shadow">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    SASO 50°C Thermal Break
                  </span>
                </div>

                {/* Photo index indicator */}
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-mono">
                  {activeImageIdx + 1} / {images.length}
                </div>
              </div>

              {/* 2. Multiple Thumbnails Strip (Click to switch image) */}
              {images.length > 1 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#7a7166]">
                    Photo Gallery · صور وتفاصيل المنتج ({images.length} angles)
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                    {images.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIdx(idx)}
                        className={`relative aspect-square rounded-xl overflow-hidden bg-[#f3ede4] transition-all cursor-pointer border-2 ${
                          idx === activeImageIdx
                            ? 'border-[#b8933f] ring-2 ring-[#b8933f]/30 scale-95 shadow-md'
                            : 'border-[#e2d9cc] hover:border-[#b8933f]/60 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={resolveImageUrl(imgUrl)}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          sizes="120px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Product Header & Price Range Callout */}
            <div className="bg-white rounded-3xl border border-[#e2d9cc] p-6 sm:p-8 shadow-sm space-y-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#f3ede4] text-[#b8933f] text-xs font-bold uppercase tracking-wider">
                    Architectural Window &amp; Shutter System
                  </span>
                  <div className="flex items-center text-amber-500 text-xs font-bold gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{product.rating || 4.95}</span>
                    <span className="text-[#7a7166] font-normal">
                      ({product.reviews_count || 38} verified Saudi villa reviews)
                    </span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#1a1815] leading-tight">
                  {product.name}
                </h1>
                <p className="text-xs font-semibold text-[#b8933f] tracking-wide">
                  تصميم مخصص حسب المقاس · نوافذ عزل حراري ومقاومة للحرارة
                </p>
              </div>

              {/* Ecommerce Price Range Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#faf8f5] border border-[#e2d9cc] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-[#7a7166] uppercase tracking-wider font-semibold block">
                    Product Price Range
                  </span>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1a3d30] mt-0.5">
                    {product.price_range_formatted ||
                      `${Math.round(calculatedSpecs.baseMin).toLocaleString()} – ${Math.round(
                        calculatedSpecs.baseMax
                      ).toLocaleString()} SAR`}
                  </div>
                </div>

                <div className="text-xs text-[#7a7166] sm:text-right max-w-xs">
                  <span className="font-semibold text-[#1a1815] block">
                    Exact price dynamically adapts
                  </span>
                  to your specified height, width, aluminum alloy, and glass choice in the order form.
                </div>
              </div>

              {/* Full Description */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1a1815]">
                  Architectural Description &amp; Engineering
                </h3>
                <p className="text-sm text-[#3d3833] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Engineering Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#e2d9cc]">
                <div className="p-3 bg-[#faf8f5] rounded-xl border border-[#e2d9cc]">
                  <span className="text-[10px] text-[#7a7166] uppercase font-bold block">Thermal Break</span>
                  <span className="text-xs font-bold text-[#1a1815] mt-0.5 block">50°C SASO Rated</span>
                </div>
                <div className="p-3 bg-[#faf8f5] rounded-xl border border-[#e2d9cc]">
                  <span className="text-[10px] text-[#7a7166] uppercase font-bold block">Acoustic STC</span>
                  <span className="text-xs font-bold text-[#1a1815] mt-0.5 block">38dB Isolation</span>
                </div>
                <div className="p-3 bg-[#faf8f5] rounded-xl border border-[#e2d9cc]">
                  <span className="text-[10px] text-[#7a7166] uppercase font-bold block">Lead Time</span>
                  <span className="text-xs font-bold text-[#1a1815] mt-0.5 block">7–12 Business Days</span>
                </div>
                <div className="p-3 bg-[#faf8f5] rounded-xl border border-[#e2d9cc]">
                  <span className="text-[10px] text-[#7a7166] uppercase font-bold block">Warranty</span>
                  <span className="text-xs font-bold text-[#1a1815] mt-0.5 block">10-Year Factory</span>
                </div>
              </div>
            </div>

            {/* 4. Factory & White-Glove Installation Assurance */}
            <div className="bg-[#1a1815] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-bold text-[#d4b06a] uppercase tracking-wider">
                <Building className="w-4 h-4" />
                <span>Saudi Architectural Fabrication Hub</span>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                Turnkey Precision Engineering in Riyadh &amp; Jeddah
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Every bespoke window is cut, welded, powder-coated, and hermetically glazed in our Saudi facility. Upon completion, certified master technicians handle white-glove delivery, masonry fit-out, and acoustic siliconization.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-[#d4b06a] shrink-0" />
                  <span>On-site laser survey</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-[#d4b06a] shrink-0" />
                  <span>Dust-proof weatherstrip</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-[#d4b06a] shrink-0" />
                  <span>German hardware warranty</span>
                </div>
              </div>
            </div>

          </div>

          {/* ═══════════════════════════════════════════════════════════
               RIGHT COLUMN: CUSTOM ORDER SPECIFICATION FORM (5 Cols)
          ════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 sticky top-20">
            <div className="bg-white rounded-3xl border-2 border-[#b8933f]/40 p-6 sm:p-8 shadow-xl space-y-6">
              
              {/* Form Title */}
              <div className="border-b border-[#e2d9cc] pb-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3ede4] text-[#b8933f] text-[11px] font-bold uppercase tracking-wider">
                    <Sliders className="w-3.5 h-3.5" />
                    Custom Order Form
                  </span>
                  <span className="text-xs text-[#7a7166] font-medium">Made to measure</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1a1815] mt-2">
                  Configure Your Specifications
                </h2>
                <p className="text-xs text-[#7a7166] mt-0.5">
                  Enter your window dimensions, select shutters, aluminum profile &amp; glass color.
                </p>
              </div>

              <form onSubmit={handleSubmitOrder} className="space-y-6">

                {/* ── STEP 1: HEIGHT & WIDTH ── */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1a1815] flex items-center gap-1.5">
                      <Ruler className="w-3.5 h-3.5 text-[#b8933f]" />
                      1. Dimensions (Height &amp; Width)
                    </label>

                    {/* Unit Switcher */}
                    <div className="flex items-center p-0.5 rounded-lg bg-[#f3ede4] border border-[#e2d9cc] text-[11px] font-bold">
                      {(['cm', 'mm', 'inch'] as const).map((u) => (
                        <button
                          key={u}
                          type="button"
                          onClick={() => setUnit(u)}
                          className={`px-2 py-0.5 rounded-md cursor-pointer transition-colors ${
                            unit === u ? 'bg-white text-[#1a1815] shadow-xs' : 'text-[#7a7166]'
                          }`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Height */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#7a7166]">
                        Height ({unit})
                      </label>
                      <input
                        type="number"
                        value={height}
                        min={unit === 'cm' ? 50 : unit === 'mm' ? 500 : 20}
                        max={unit === 'cm' ? 400 : unit === 'mm' ? 4000 : 160}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2d9cc] bg-[#faf8f5] focus:bg-white focus:ring-2 focus:ring-[#b8933f] focus:outline-none text-sm font-bold text-[#1a1815]"
                      />
                    </div>

                    {/* Width */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#7a7166]">
                        Width ({unit})
                      </label>
                      <input
                        type="number"
                        value={width}
                        min={unit === 'cm' ? 50 : unit === 'mm' ? 500 : 20}
                        max={unit === 'cm' ? 500 : unit === 'mm' ? 5000 : 200}
                        onChange={(e) => setWidth(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2d9cc] bg-[#faf8f5] focus:bg-white focus:ring-2 focus:ring-[#b8933f] focus:outline-none text-sm font-bold text-[#1a1815]"
                      />
                    </div>
                  </div>

                  {/* Dimension Quick Presets & Computed Area */}
                  <div className="flex items-center justify-between text-[11px] text-[#7a7166] pt-1">
                    <div className="flex items-center gap-1.5 overflow-x-auto">
                      <span className="font-semibold text-[10px] uppercase">Presets:</span>
                      {[150, 180, 210, 240].map((hPreset) => (
                        <button
                          key={hPreset}
                          type="button"
                          onClick={() => {
                            setHeight(hPreset);
                            setWidth(Math.round(hPreset * 0.8));
                          }}
                          className="px-2 py-0.5 rounded bg-[#f3ede4] hover:bg-[#e8ddd0] text-[#1a1815] text-[10px] font-medium transition-colors"
                        >
                          {hPreset}×{Math.round(hPreset * 0.8)}
                        </button>
                      ))}
                    </div>

                    <span className="font-bold text-[#1a3d30] shrink-0">
                      Area: {calculatedSpecs.areaSqM} m²
                    </span>
                  </div>
                </div>

                {/* ── STEP 2: HOW MANY SHUTTERS ── */}
                <div className="space-y-2 pt-2 border-t border-[#e2d9cc]">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1a1815] flex items-center justify-between">
                    <span>2. Number of Shutters / Panels</span>
                    <span className="text-[11px] font-normal text-[#b8933f]">
                      {calculatedSpecs.selectedShutters?.name}
                    </span>
                  </label>

                  <div className="grid grid-cols-2 gap-2">
                    {customization.shutters_options?.map((shutter) => {
                      const isSelected = shutter.id === shuttersId;
                      return (
                        <button
                          key={shutter.id}
                          type="button"
                          onClick={() => setShuttersId(shutter.id)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#b8933f] bg-[#fbf8f2] shadow-xs'
                              : 'border-[#e2d9cc] bg-white hover:border-[#b8933f]/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#1a1815]">
                              {shutter.name.split('(')[0].trim()}
                            </span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#b8933f]" />}
                          </div>
                          <p className="text-[10px] text-[#7a7166] mt-0.5 line-clamp-1">
                            {shutter.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ── STEP 3: ALUMINUM PROFILE & BRAND ── */}
                <div className="space-y-2 pt-2 border-t border-[#e2d9cc]">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1a1815] flex items-center justify-between">
                    <span>3. Aluminum Profile &amp; Brand</span>
                    <span className="text-[11px] font-normal text-[#b8933f]">
                      {calculatedSpecs.selectedAluminum?.thickness}
                    </span>
                  </label>

                  <div className="space-y-2">
                    {customization.aluminum_options?.map((alloy) => {
                      const isSelected = alloy.id === aluminumId;
                      return (
                        <button
                          key={alloy.id}
                          type="button"
                          onClick={() => setAluminumId(alloy.id)}
                          className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'border-[#b8933f] bg-[#fbf8f2] shadow-xs'
                              : 'border-[#e2d9cc] bg-white hover:border-[#b8933f]/50'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-[#1a1815]">
                                {alloy.name}
                              </span>
                              {alloy.badge && (
                                <span className="text-[9px] px-1.5 py-0.2 bg-[#edf4f0] text-[#1a3d30] font-bold rounded">
                                  {alloy.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-[#7a7166]">
                              Profile gauge: {alloy.thickness}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {alloy.price_delta !== 0 && (
                              <span className="text-[10px] text-[#7a7166]">
                                {alloy.price_delta > 0 ? `+${alloy.price_delta} SAR` : `${alloy.price_delta} SAR`}
                              </span>
                            )}
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected ? 'border-[#b8933f] bg-[#b8933f]' : 'border-[#e2d9cc]'
                              }`}
                            >
                              {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Frame Color Swatches */}
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-[#7a7166] block mb-1.5">
                      Aluminum Frame Color: <span className="text-[#1a1815] font-bold">{selectedColor}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      {customization.color_options?.map((col) => (
                        <button
                          key={col.id}
                          type="button"
                          onClick={() => setSelectedColor(col.name)}
                          title={col.name}
                          className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer flex items-center justify-center ${
                            selectedColor === col.name ? 'border-[#b8933f] scale-110 shadow-sm' : 'border-white'
                          }`}
                          style={{ backgroundColor: col.hex }}
                        >
                          {selectedColor === col.name && (
                            <Check className="w-3 h-3 text-white drop-shadow" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── STEP 4: GLASS COLOR & TYPE ── */}
                <div className="space-y-2 pt-2 border-t border-[#e2d9cc]">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1a1815] flex items-center justify-between">
                    <span>4. Glass Color &amp; Glazing Type</span>
                  </label>

                  <div className="space-y-2">
                    {customization.glass_options?.map((glass) => {
                      const isSelected = glass.id === glassId;
                      return (
                        <button
                          key={glass.id}
                          type="button"
                          onClick={() => setGlassId(glass.id)}
                          className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                            isSelected
                              ? 'border-[#b8933f] bg-[#fbf8f2] shadow-xs'
                              : 'border-[#e2d9cc] bg-white hover:border-[#b8933f]/50'
                          }`}
                        >
                          {/* Tint Swatch */}
                          <div
                            className="w-6 h-6 rounded-lg border border-black/20 shrink-0 shadow-xs"
                            style={{ backgroundColor: glass.tint || '#8c6239' }}
                          />

                          <div className="flex-1">
                            <span className="text-xs font-bold text-[#1a1815] block">
                              {glass.name}
                            </span>
                            <span className="text-[10px] text-[#7a7166]">
                              {glass.specs}
                            </span>
                          </div>

                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-[#b8933f] bg-[#b8933f]' : 'border-[#e2d9cc]'
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ── STEP 5: ADDONS & HARDWARE ── */}
                <div className="space-y-2 pt-2 border-t border-[#e2d9cc]">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1a1815] block">
                    5. Security &amp; Hardware Addons
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {customization.addons?.map((addon) => {
                      const isChecked = !!selectedAddons[addon.id];
                      return (
                        <label
                          key={addon.id}
                          className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                            isChecked ? 'bg-[#faf8f5] border-[#b8933f]' : 'bg-white border-[#e2d9cc]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleAddon(addon.id)}
                              className="rounded text-[#1a3d30] focus:ring-[#1a3d30]"
                            />
                            <span className="text-[11px] font-semibold text-[#1a1815]">
                              {addon.name}
                            </span>
                          </div>
                          {addon.price > 0 ? (
                            <span className="text-[10px] text-[#7a7166] shrink-0 font-medium">
                              +{addon.price} SAR
                            </span>
                          ) : (
                            <span className="text-[9px] px-1 bg-emerald-100 text-emerald-900 font-bold rounded">
                              Free
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* ── STEP 6: CONTACT INFORMATION ── */}
                <div className="space-y-3 pt-2 border-t border-[#e2d9cc]">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1a1815] block">
                    6. Delivery &amp; Contact Information
                  </label>

                  <div className="space-y-2.5">
                    <div>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Your Full Name (e.g. Faisal Al-Otaibi)"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e2d9cc] bg-[#faf8f5] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b8933f]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="Phone / WhatsApp (+966)"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e2d9cc] bg-[#faf8f5] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b8933f]"
                      />
                      <select
                        value={customerCity}
                        onChange={(e) => setCustomerCity(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#e2d9cc] bg-[#faf8f5] focus:bg-white font-medium"
                      >
                        <option value="Riyadh">Riyadh · الرياض</option>
                        <option value="Jeddah">Jeddah · جدة</option>
                        <option value="Dammam">Dammam · الدمام</option>
                        <option value="Khobar">Al Khobar · الخبر</option>
                        <option value="Mecca">Mecca · مكة المكرمة</option>
                        <option value="Medina">Medina · المدينة المنورة</option>
                      </select>
                    </div>
                    <div>
                      <textarea
                        rows={2}
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                        placeholder="Special architectural notes or installation requirements (optional)..."
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e2d9cc] bg-[#faf8f5] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* ── PRICE ESTIMATE SUMMARY BAR ── */}
                <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e2d9cc] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#7a7166]">Surface Area:</span>
                    <span className="font-semibold text-[#1a1815]">
                      {calculatedSpecs.areaSqM} m² ({calculatedSpecs.areaSqFt} sq.ft)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#7a7166]">Calculated Custom Price:</span>
                    <span className="font-bold text-[#1a3d30] text-lg">
                      {calculatedSpecs.totalPrice.toLocaleString()} SAR
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#7a7166] pt-1 border-t border-[#e2d9cc]">
                    <span>Suggested 40% Advance Deposit:</span>
                    <span className="font-semibold text-[#1a1815]">
                      {calculatedSpecs.suggestedAdvance.toLocaleString()} SAR
                    </span>
                  </div>
                </div>

                {/* ── SUBMISSION BUTTONS ── */}
                <div className="space-y-2.5 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting || isMutationLoading}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#1a1815] hover:bg-[#1a3d30] active:scale-[0.99] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isSubmitting || isMutationLoading ? (
                      <span>Sending to Workshop...</span>
                    ) : (
                      <>
                        <span>Submit Custom Order Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="w-full py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order Directly via WhatsApp</span>
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>
      </main>

      {/* ─── ORDER CONFIRMATION MODAL ─────────────────────────────────── */}
      {submittedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#e2d9cc] space-y-5 animate-scale-up">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-emerald-700" />
            </div>

            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#b8933f]">
                Order Inquiry Registered
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#1a1815]">
                Custom Order Submitted Successfully!
              </h3>
              <p className="text-xs text-[#7a7166] max-w-sm mx-auto">
                Our structural engineering team at the Riyadh workshop is reviewing your custom window specifications.
              </p>
            </div>

            {/* Order Summary Receipt Box */}
            <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e2d9cc] space-y-2 text-xs">
              <div className="flex justify-between font-mono">
                <span className="text-[#7a7166]">Reference Number:</span>
                <span className="font-bold text-[#1a1815]">{submittedOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7a7166]">Product:</span>
                <span className="font-semibold text-[#1a1815]">{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7a7166]">Dimensions:</span>
                <span className="font-semibold text-[#1a1815]">
                  {height} × {width} {unit} ({calculatedSpecs.areaSqM} m²)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7a7166]">Shutters &amp; Profile:</span>
                <span className="font-semibold text-[#1a1815]">
                  {calculatedSpecs.selectedShutters?.name} · {calculatedSpecs.selectedAluminum?.thickness}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#e2d9cc]">
                <span className="font-bold text-[#1a1815]">Estimated Total:</span>
                <span className="font-bold text-[#1a3d30] text-sm">
                  {submittedOrder.totalPrice.toLocaleString()} SAR
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSubmittedOrder(null);
                  router.push('/');
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#1a1815] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3d3833] transition-colors"
              >
                Back to Homepage
              </button>
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
