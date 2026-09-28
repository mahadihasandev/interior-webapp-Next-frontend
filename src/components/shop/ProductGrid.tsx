'use client';

import React from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { Sparkles } from 'lucide-react';

interface ProductGridProps {
  products?: Product[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function ProductGrid({
  products = [],
  isLoading = false,
  emptyMessage = 'No interior pieces matched your filter criteria.',
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse bg-stone-900/60 rounded-2xl border border-stone-800 p-4 space-y-4"
          >
            <div className="aspect-4/3 w-full bg-stone-800 rounded-xl" />
            <div className="space-y-2">
              <div className="h-4 bg-stone-800 rounded w-1/3" />
              <div className="h-5 bg-stone-800 rounded w-3/4" />
              <div className="h-3 bg-stone-800 rounded w-full" />
            </div>
            <div className="pt-2 flex justify-between items-center">
              <div className="h-5 bg-stone-800 rounded w-20" />
              <div className="h-4 bg-stone-800 rounded w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-stone-900/30 rounded-2xl border border-stone-800/80">
        <Sparkles className="w-10 h-10 text-stone-600 mx-auto mb-3" />
        <p className="text-stone-300 font-serif text-lg mb-1">{emptyMessage}</p>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">
          Try adjusting your search keywords, clear category selections, or book a custom bespoke order.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
