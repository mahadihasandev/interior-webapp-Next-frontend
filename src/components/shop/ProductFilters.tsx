'use client';

import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Category, ProductFilters as FilterState } from '@/types';

interface ProductFiltersProps {
  categories: Category[];
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
}

export function ProductFilters({ categories, filters, onChange }: ProductFiltersProps) {
  return (
    <div className="space-y-6 pb-6 border-b border-stone-200">
      {/* Search and Sort row */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => onChange({ ...filters, search: e.target.value, page: 1 })}
            placeholder="Search chairs, lamps, oak tables..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-900 placeholder-stone-500 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 shadow-2xs transition-colors"
          />
          <Search className="w-4 h-4 text-stone-600 absolute left-3.5 top-3" />
        </div>

        {/* Sort and Featured Toggle */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-900">
            <input
              type="checkbox"
              checked={filters.featured || false}
              onChange={(e) =>
                onChange({ ...filters, featured: e.target.checked ? true : undefined, page: 1 })
              }
              className="rounded border-stone-300 text-stone-900 focus:ring-stone-900"
            />
            <span>Curated Picks Only</span>
          </label>

          <div className="flex items-center gap-2 text-xs text-stone-800 font-medium">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-700" />
            <select
              value={filters.sort || 'latest'}
              onChange={(e) =>
                onChange({
                  ...filters,
                  sort: e.target.value as FilterState['sort'],
                  page: 1,
                })
              }
              className="bg-white border border-stone-300 text-stone-900 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-stone-900 shadow-2xs"
            >
              <option value="latest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => onChange({ ...filters, category: undefined, page: 1 })}
          className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase whitespace-nowrap transition-all cursor-pointer ${
            !filters.category
              ? 'bg-stone-900 text-white shadow-sm'
              : 'bg-white text-stone-800 hover:text-stone-950 hover:bg-stone-100 border border-stone-300'
          }`}
        >
          All Departments
        </button>
        {categories.map((cat) => {
          const isSelected = filters.category === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onChange({ ...filters, category: cat.slug, page: 1 })}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-white text-stone-800 hover:text-stone-950 hover:bg-stone-100 border border-stone-300'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
