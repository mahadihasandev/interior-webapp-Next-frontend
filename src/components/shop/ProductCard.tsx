'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Star, Sparkles, Check } from 'lucide-react';
import { Product } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart, setDrawerOpen } from '@/store/slices/cartSlice';
import { openConsultationModal } from '@/store/slices/uiSlice';
import { resolveImageUrl, FALLBACK_PRODUCT_IMAGE } from '@/utils/imageUrl';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const currency = useAppSelector((state) => state.ui.currency);
  const [isAdded, setIsAdded] = useState(false);
  const productHref = `/shop/${product.slug || product.id}`;

  const priceSAR = Math.round(product.price * 3.75);
  const compareSAR = product.compare_at_price ? Math.round(product.compare_at_price * 3.75) : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdded) return;

    dispatch(addToCart({ product, quantity: 1 }));
    setIsAdded(true);

    setTimeout(() => {
      dispatch(setDrawerOpen(true));
    }, 250);

    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden hover:border-[#c5a059]/60 hover:shadow-xl hover:shadow-stone-300/40 transition-all duration-300">
      {/* Product Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
        <Link href={productHref} className="block w-full h-full">
          {product.image_url ? (
            <img
              src={resolveImageUrl(product.image_url)}
              alt={product.name}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = FALLBACK_PRODUCT_IMAGE;
              }}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-500 text-xs">
              No image available
            </div>
          )}
        </Link>

        {/* Featured Tag with Saudi Gold Accent */}
        {product.is_featured && (
          <div className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8f7033] bg-[#faf8f5]/95 backdrop-blur-md rounded-full border border-[#c5a059]/40 shadow-xs flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-[#c5a059]" />
            <span>Curated Edition</span>
          </div>
        )}

        {/* Quick Add to Bag on Hover (Desktop Overlay) */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 py-2.5 px-4 bg-[#163b2f] hover:bg-[#1f4e3f] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer border border-[#c5a059]/30"
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-[#dfca92]" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(openConsultationModal(product.category?.name || 'Living Room'));
            }}
            title="Request Architectural Advice"
            className="p-2.5 bg-white hover:bg-stone-100 text-stone-900 rounded-xl border border-stone-300 shadow-md backdrop-blur-md transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-600 mb-1.5">
            <span className="uppercase tracking-widest text-[11px] text-[#8f7033] font-bold">
              {product.category?.name || 'Architectural Fitting'}
            </span>
            <div className="flex items-center gap-1 text-stone-900">
              <Star className="w-3.5 h-3.5 fill-[#c5a059] text-[#c5a059]" />
              <span className="font-bold text-xs">{product.rating.toFixed(1)}</span>
              <span className="text-stone-500 font-normal">({product.reviews_count})</span>
            </div>
          </div>

          <Link href={productHref}>
            <h3 className="font-serif text-base font-bold text-stone-900 hover:text-[#8f7033] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="mt-1 text-xs text-stone-600 line-clamp-2 font-normal leading-relaxed">
            {product.tagline || product.description}
          </p>
        </div>

        <div>
          {/* Price & Specs with Dual SAR & USD */}
          <div className="mt-4 pt-3.5 border-t border-stone-100 flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              {currency === 'SAR' ? (
                <>
                  <span className="text-base font-bold text-stone-950 font-mono">
                    {priceSAR.toLocaleString()} SAR
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    (${product.price.toFixed(0)})
                  </span>
                  {compareSAR && (
                    <span className="text-xs text-stone-400 line-through font-mono ml-1">
                      {compareSAR.toLocaleString()} SAR
                    </span>
                  )}
                </>
              ) : (
                <>
                  <span className="text-base font-bold text-stone-950 font-mono">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    ({priceSAR.toLocaleString()} SAR)
                  </span>
                  {product.compare_at_price && (
                    <span className="text-xs text-stone-400 line-through font-mono ml-1">
                      ${product.compare_at_price.toFixed(2)}
                    </span>
                  )}
                </>
              )}
            </div>
            <span className="text-[11px] text-stone-600 font-semibold font-mono truncate max-w-[110px]" title={product.materials}>
              {product.materials?.split(',')[0] || '6063-T6 Alloy'}
            </span>
          </div>

          {/* Primary Always-Visible Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full mt-3.5 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-sm ${
              isAdded
                ? 'bg-emerald-700 text-white shadow-emerald-700/25 scale-[1.01]'
                : 'bg-[#1a1815] hover:bg-[#2e2a24] active:scale-[0.98] text-white hover:shadow-md'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Added to Cart ✓</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#d4b06a]" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

