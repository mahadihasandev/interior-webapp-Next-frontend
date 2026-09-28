'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShoppingBag,
  Star,
  Sparkles,
  Truck,
  ShieldCheck,
  ArrowLeft,
  Check,
  Layers,
  Ruler,
  Compass,
  Heart,
  Share2,
} from 'lucide-react';
import { useGetProductBySlugQuery, useGetFeaturedProductsQuery } from '@/store/services/productsApi';
import { useAppDispatch } from '@/store/hooks';
import { addToCart, setDrawerOpen } from '@/store/slices/cartSlice';
import { openConsultationModal } from '@/store/slices/uiSlice';
import { ProductCard } from '@/components/shop/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const slug = params?.slug as string;

  const { data: product, isLoading, isError } = useGetProductBySlugQuery(slug, {
    skip: !slug,
  });

  const { data: featuredProducts } = useGetFeaturedProductsQuery(4);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'shipping' | 'care'>('specs');
  const [isAdded, setIsAdded] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-8">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-stone-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold uppercase tracking-wider text-stone-700">
            Loading Architectural Specification...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-8">
        <div className="text-center space-y-4 max-w-md bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
          <p className="text-lg font-serif font-bold text-stone-900">Product Not Found</p>
          <p className="text-xs text-stone-600">
            The piece you are looking for may have been archived or is temporarily out of production.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Full Collection</span>
          </Link>
        </div>
      </div>
    );
  }

  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image_url];
  const currentImage = gallery[selectedImageIndex] || product.image_url;

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      dispatch(setDrawerOpen(true));
    }, 400);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 antialiased font-sans pb-24">
      {/* Breadcrumbs Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center gap-2 text-xs font-medium text-stone-600">
          <Link href="/" className="hover:text-stone-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-stone-900 transition-colors">
            Collection
          </Link>
          {product.category && (
            <>
              <span>/</span>
              <Link
                href={`/shop?category=${product.category.slug}`}
                className="hover:text-stone-900 transition-colors"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="font-bold text-stone-900 truncate max-w-xs">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-sm">
          {/* LEFT: Image Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary High-Res View */}
            <div className="relative aspect-4/3 sm:aspect-16/11 w-full bg-stone-100 rounded-2xl overflow-hidden border border-stone-200">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {product.is_featured && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                  Curated Architectural Pick
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-stone-900 shadow-sm'
                        : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Details & Purchase Actions (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-stone-600">
                  {product.category?.name || 'Architectural Fitting'}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-stone-900 font-bold bg-stone-100 px-2.5 py-1 rounded-full border border-stone-200">
                  <Star className="w-3.5 h-3.5 fill-stone-900 text-stone-900" />
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-stone-500 font-normal">({product.reviews_count} reviews)</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
                  {product.name}
                </h1>
                {product.tagline && (
                  <p className="mt-1 text-sm text-stone-600 font-medium">
                    {product.tagline}
                  </p>
                )}
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-3xl font-bold font-mono text-stone-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.compare_at_price && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-stone-400 line-through font-mono">
                      ${product.compare_at_price.toFixed(2)}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded uppercase">
                      Save ${(product.compare_at_price - product.price).toFixed(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Material Highlights Badges */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-stone-500 mb-1">
                    <Layers className="w-3.5 h-3.5 text-stone-700" />
                    <span>Material Spec</span>
                  </div>
                  <p className="text-xs font-bold text-stone-900">
                    {product.materials || 'Extruded Aluminum & Solid Brass'}
                  </p>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-stone-500 mb-1">
                    <Ruler className="w-3.5 h-3.5 text-stone-700" />
                    <span>Dimensions</span>
                  </div>
                  <p className="text-xs font-bold text-stone-900">
                    {product.dimensions || 'Custom Sizing Available'}
                  </p>
                </div>
              </div>

              {/* Quantity Picker & Add to Cart */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2.5 text-sm font-bold text-stone-700 hover:bg-stone-200 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2.5 text-xs font-bold text-stone-900 font-mono">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-2.5 text-sm font-bold text-stone-700 hover:bg-stone-200 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-6 bg-stone-900 hover:bg-stone-800 active:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-white" />
                        <span>Add to Bag — ${(product.price * quantity).toFixed(2)}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Custom Order CTA Button */}
                <div className="pt-2">
                  <Link
                    href="/#custom-fitting-studio"
                    className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl flex items-center justify-between text-xs font-bold text-stone-900 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-stone-900" />
                      <span>Need Custom Sizing or Color Alloy?</span>
                    </div>
                    <span className="text-[11px] font-mono text-stone-600">Open Studio →</span>
                  </Link>
                </div>
              </div>

              {/* Guarantees */}
              <div className="pt-4 border-t border-stone-200 grid grid-cols-2 gap-3 text-[11px] text-stone-700 font-medium">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-stone-900 shrink-0" />
                  <span>White-glove courier delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-stone-900 shrink-0" />
                  <span>5-Year structural warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Specs, Shipping & Care */}
        <div className="mt-12 bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
          <div className="flex border-b border-stone-200 bg-stone-50/70">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'specs'
                  ? 'bg-white text-stone-900 border-b-2 border-stone-900'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Architectural Specifications
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'shipping'
                  ? 'bg-white text-stone-900 border-b-2 border-stone-900'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              White-Glove Delivery
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'care'
                  ? 'bg-white text-stone-900 border-b-2 border-stone-900'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Material Care & Maintenance
            </button>
          </div>

          <div className="p-6 sm:p-8 text-xs sm:text-sm text-stone-700 leading-relaxed">
            {activeTab === 'specs' && (
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-base text-stone-900">Engineering Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <p className="font-bold text-stone-900">Extrusion Grade</p>
                    <p className="text-stone-600 mt-1">6063-T6 architectural grade aluminum with precision mitering joints.</p>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <p className="font-bold text-stone-900">Hardware & Movement</p>
                    <p className="text-stone-600 mt-1">Heavy-duty hydraulic pivots, ball-bearing soft-close runners, and concealed fastenings.</p>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <p className="font-bold text-stone-900">Surface Finish</p>
                    <p className="text-stone-600 mt-1">{product.color || 'Electrostatic matte architectural powder coat'}.</p>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <p className="font-bold text-stone-900">Dimensions & Weight</p>
                    <p className="text-stone-600 mt-1">{product.dimensions || 'Custom per blueprint'}. Net weight ~32 kg.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-base text-stone-900">Complimentary Logistics</h4>
                <p>
                  Every order is handled by our dedicated white-glove logistics team. Your items will be transported in temperature-controlled vehicles, delivered into the room of your choice, unpacked, inspected, and placed per your instruction.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <p className="font-bold text-stone-900">Dispatch SLA</p>
                    <p className="text-[11px] text-stone-600 mt-1">Within 24 to 48 hours for in-stock catalog pieces.</p>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <p className="font-bold text-stone-900">Appointment Scheduling</p>
                    <p className="text-[11px] text-stone-600 mt-1">Direct call from courier 24 hours prior to confirm arrival window.</p>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <p className="font-bold text-stone-900">Packaging Recycling</p>
                    <p className="text-[11px] text-stone-600 mt-1">Full removal and eco-friendly recycling of all wooden crates and wrapping.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-base text-stone-900">Longevity Guide</h4>
                <p>
                  To preserve the refined finish and tactile luxury of your piece, wipe periodically with a clean microfiber cloth slightly dampened with warm water. Avoid acidic, chlorine-based, or abrasive solvents that could compromise the electrostatic anodized seal.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Similar Curated Pieces */}
        {featuredProducts && featuredProducts.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                  Complementary Pieces
                </h2>
                <p className="text-xs text-stone-600">Curated to harmonize with your architectural vision</p>
              </div>
              <Link
                href="/shop"
                className="text-xs font-bold uppercase tracking-wider text-stone-900 hover:underline"
              >
                View Collection →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts
                .filter((p) => p.slug !== product.slug)
                .slice(0, 4)
                .map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
