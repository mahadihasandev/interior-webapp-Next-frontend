'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Star, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { openConsultationModal } from '@/store/slices/uiSlice';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const productHref = `/shop/${product.slug || product.id}`;

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden hover:border-stone-400 hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300">
      {/* Product Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
        <Link href={productHref} className="block w-full h-full">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-500 text-xs">
              No image available
            </div>
          )}
        </Link>

        {/* Featured Tag */}
        {product.is_featured && (
          <div className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-900 bg-white/95 backdrop-blur-md rounded-full border border-stone-200 shadow-sm">
            Curated Pick
          </div>
        )}

        {/* Quick Add to Bag on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
          <button
            onClick={() => dispatch(addToCart({ product, quantity: 1 }))}
            className="flex-1 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <span>Add to Bag</span>
          </button>
          <button
            onClick={() => dispatch(openConsultationModal(product.category?.name || 'Living Room'))}
            title="Request Architectural Advice"
            className="p-2.5 bg-white hover:bg-stone-100 text-stone-900 rounded-xl border border-stone-300 shadow-md backdrop-blur-md transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-stone-900" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-600 mb-1.5">
            <span className="uppercase tracking-widest text-[11px] text-stone-800 font-bold">
              {product.category?.name || 'Architectural Fitting'}
            </span>
            <div className="flex items-center gap-1 text-stone-900">
              <Star className="w-3.5 h-3.5 fill-stone-900 text-stone-900" />
              <span className="font-bold text-xs">{product.rating.toFixed(1)}</span>
              <span className="text-stone-500 font-normal">({product.reviews_count})</span>
            </div>
          </div>

          <Link href={productHref}>
            <h3 className="font-serif text-base font-bold text-stone-900 hover:text-stone-700 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="mt-1 text-xs text-stone-600 line-clamp-2 font-normal leading-relaxed">
            {product.tagline || product.description}
          </p>
        </div>

        {/* Price & Specs */}
        <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-stone-900 font-mono">
              ${product.price.toFixed(2)}
            </span>
            {product.compare_at_price && (
              <span className="text-xs text-stone-400 line-through font-mono">
                ${product.compare_at_price.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-[11px] text-stone-700 font-semibold font-mono">
            {product.materials?.split(',')[0] || '6063-T6 Alloy'}
          </span>
        </div>
      </div>
    </div>
  );
}
