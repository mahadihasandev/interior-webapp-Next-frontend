'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetProductsQuery, useGetCategoriesQuery } from '@/store/services/productsApi';
import { ProductFilters } from '@/components/shop/ProductFilters';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { ProductFilters as FilterState } from '@/types';
import { Sparkles } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [filters, setFilters] = useState<FilterState>({
    category: categoryParam || undefined,
    sort: 'latest',
    page: 1,
  });

  useEffect(() => {
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam, page: 1 }));
    }
  }, [categoryParam]);

  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: productsData, isLoading } = useGetProductsQuery(filters);

  const activeCategoryName = categories.find((c) => c.slug === filters.category)?.name;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-900">
          <Sparkles className="w-3.5 h-3.5 text-stone-900" />
          <span>Curated Architectural Catalogue</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
          {activeCategoryName ? `${activeCategoryName} Collection` : 'All Interior Works & Furniture'}
        </h1>
        <p className="text-sm sm:text-base text-stone-800 font-normal max-w-xl leading-relaxed">
          Browse our handcrafted furniture pieces, architectural fittings, and refined living appointments.
        </p>
      </div>

      {/* Filter Toolbar */}
      <ProductFilters
        categories={categories}
        filters={filters}
        onChange={(newFilters) => setFilters(newFilters)}
      />

      {/* Product Grid */}
      <ProductGrid
        products={productsData?.data}
        isLoading={isLoading}
        emptyMessage="No furniture pieces matched your current search filters."
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-stone-700">
          <div className="w-8 h-8 border-2 border-stone-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-semibold">Loading L’Atelier Collection...</p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
