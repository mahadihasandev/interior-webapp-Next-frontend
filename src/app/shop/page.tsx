'use client';

import React, { Suspense, useState, useMemo } from 'react';
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
    sort: 'latest',
    page: 1,
  });

  const activeFilters = useMemo<FilterState>(() => {
    return {
      ...filters,
      category: filters.category !== undefined ? filters.category : (categoryParam || undefined),
    };
  }, [filters, categoryParam]);

  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: productsData, isLoading } = useGetProductsQuery(activeFilters);

  const activeCategoryName = categories.find((c) => c.slug === activeFilters.category)?.name;


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5f0e6] border border-[#c5a059]/40 text-[#8f7033] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#8f7033]" />
          <span>Curated Architectural Catalogue · المعرض والكتالوج المعماري</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
          {activeCategoryName ? `${activeCategoryName} Collection` : 'All Interior Works & Architectural Furnishings'}
        </h1>
        <p className="text-sm sm:text-base text-stone-700 font-normal max-w-xl leading-relaxed">
          Handcrafted furniture pieces, architectural fittings, and luxury appointments tailored for modern living spaces across Saudi Arabia.
        </p>
      </div>


      {/* Filter Toolbar */}
      <ProductFilters
        categories={categories}
        filters={activeFilters}
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
