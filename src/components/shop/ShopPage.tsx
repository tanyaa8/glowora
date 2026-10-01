import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import { CategoryType } from '../../types';
import { 
  Filter, 
  Search, 
  X, 
  SlidersHorizontal, 
  ChevronDown, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory,
    searchQuery,
    setSearchQuery 
  } = useApp();

  // Filter States
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>('all'); // 'under-500' | '500-1000' | '1000-2000' | 'above-2000' | 'all'
  const [minRating, setMinRating] = useState<number>(0);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('popularity'); // 'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'newest'
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Derive unique brands
  const availableBrands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand)));
  }, [products]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrands([]);
    setPriceRange('all');
    setMinRating(0);
    setMinDiscount(0);
    setSearchQuery('');
    setSortBy('popularity');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.ingredients.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    // Price range filter
    if (priceRange === 'under-500') {
      result = result.filter((p) => p.price < 500);
    } else if (priceRange === '500-1000') {
      result = result.filter((p) => p.price >= 500 && p.price <= 1000);
    } else if (priceRange === '1000-2000') {
      result = result.filter((p) => p.price > 1000 && p.price <= 2000);
    } else if (priceRange === 'above-2000') {
      result = result.filter((p) => p.price > 2000);
    }

    // Rating filter
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    // Discount filter
    if (minDiscount > 0) {
      result = result.filter((p) => p.discount >= minDiscount);
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      // popularity
      result.sort((a, b) => b.ratingCount - a.ratingCount);
    }

    return result;
  }, [products, searchQuery, selectedCategory, selectedBrands, priceRange, minRating, minDiscount, sortBy]);

  const activeFiltersCount = 
    (selectedCategory !== 'All' ? 1 : 0) +
    selectedBrands.length +
    (priceRange !== 'all' ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (minDiscount > 0 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const categoriesList: (CategoryType | 'All')[] = [
    'All',
    'Makeup',
    'Skincare',
    'Haircare',
    'Fragrance',
    'Bath & Body',
    'Wellness',
    'Men',
    'Nails',
  ];

  return (
    <div className="bg-[#FBCAD6] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Title */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span>Home</span>
              <span>/</span>
              <span className="text-stone-900 font-medium">Beauty Catalog</span>
              {selectedCategory !== 'All' && (
                <>
                  <span>/</span>
                  <span className="text-rose-900 font-semibold">{selectedCategory}</span>
                </>
              )}
            </div>
            <h1 className="font-serif text-3xl font-bold text-stone-900">
              {selectedCategory === 'All' ? 'Curated Beauty Collection' : selectedCategory}
            </h1>
          </div>

          {/* Top Search & Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, ingredients..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400 text-stone-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden p-2 bg-white border border-stone-200 rounded-lg text-stone-700 flex items-center gap-1.5 text-xs font-semibold"
            >
              <Filter size={16} />
              <span>Filters ({activeFiltersCount})</span>
            </button>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters + Products Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs space-y-6 sticky top-24">
            
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-stone-700" />
                <h3 className="font-serif text-base font-bold text-stone-900">Filters</h3>
                {activeFiltersCount > 0 && (
                  <span className="text-[10px] bg-stone-900 text-white font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-rose-700 hover:text-rose-900 flex items-center gap-1 font-medium"
                >
                  <RotateCcw size={12} /> Reset
                </button>
              )}
            </div>

            {/* 1. Category Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                Category
              </h4>
              <div className="space-y-1.5">
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      selectedCategory === cat
                        ? 'bg-stone-900 text-white font-semibold'
                        : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[11px] opacity-70 tabular-nums">
                      {cat === 'All' ? products.length : products.filter((p) => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Price Range Filter */}
            <div className="pt-4 border-t border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                Price (INR)
              </h4>
              <div className="space-y-1.5 text-xs text-stone-700">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-500', label: 'Under ₹500' },
                  { id: '500-1000', label: '₹500 – ₹1,000' },
                  { id: '1000-2000', label: '₹1,000 – ₹2,000' },
                  { id: 'above-2000', label: 'Above ₹2,000' },
                ].map((opt) => (
                  <label key={opt.id} className="flex items-center gap-2 cursor-pointer hover:text-stone-950">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={priceRange === opt.id}
                      onChange={() => setPriceRange(opt.id)}
                      className="text-stone-900 focus:ring-stone-900"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Brand Filter */}
            <div className="pt-4 border-t border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                Brand
              </h4>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {availableBrands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer hover:text-stone-950">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="rounded text-stone-900 focus:ring-stone-900"
                    />
                    <span className="truncate">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Rating Filter */}
            <div className="pt-4 border-t border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                Customer Rating
              </h4>
              <div className="space-y-1 text-xs text-stone-700">
                {[
                  { val: 0, label: 'All Ratings' },
                  { val: 4.8, label: '⭐⭐⭐⭐⭐ 4.8 & Above' },
                  { val: 4.5, label: '⭐⭐⭐⭐ 4.5 & Above' },
                  { val: 4.0, label: '⭐⭐⭐⭐ 4.0 & Above' },
                ].map((r) => (
                  <label key={r.val} className="flex items-center gap-2 cursor-pointer hover:text-stone-950">
                    <input
                      type="radio"
                      name="ratingFilter"
                      checked={minRating === r.val}
                      onChange={() => setMinRating(r.val)}
                      className="text-stone-900 focus:ring-stone-900"
                    />
                    <span>{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 5. Discount Filter */}
            <div className="pt-4 border-t border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                Discount
              </h4>
              <div className="space-y-1 text-xs text-stone-700">
                {[
                  { val: 0, label: 'All Items' },
                  { val: 10, label: '10% or more' },
                  { val: 20, label: '20% or more' },
                  { val: 30, label: '30% or more' },
                ].map((d) => (
                  <label key={d.val} className="flex items-center gap-2 cursor-pointer hover:text-stone-950">
                    <input
                      type="radio"
                      name="discountFilter"
                      checked={minDiscount === d.val}
                      onChange={() => setMinDiscount(d.val)}
                      className="text-stone-900 focus:ring-stone-900"
                    />
                    <span>{d.label}</span>
                  </label>
                ))}
              </div>
            </div>

          </aside>

          {/* Main Products Listing Area */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Control Bar: Count + Sorting */}
            <div className="bg-white px-4 py-3 rounded-xl border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <p className="text-xs font-medium text-stone-600">
                Showing <span className="font-bold text-stone-900 tabular-nums">{filteredProducts.length}</span> luxury products
                {searchQuery && <span> for "<span className="italic">{searchQuery}</span>"</span>}
              </p>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <label htmlFor="sortBySelect" className="text-xs text-stone-500 font-medium">Sort by:</label>
                <div className="relative">
                  <select
                    id="sortBySelect"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs font-semibold bg-rose-50/60 border border-rose-200 rounded-lg px-3 py-1.5 pr-8 text-stone-800 focus:outline-none cursor-pointer"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="newest">Newest Additions</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filter Chips */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-stone-400">Active Filters:</span>
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-stone-300 rounded-lg text-xs text-stone-800">
                    Category: {selectedCategory}
                    <button onClick={() => setSelectedCategory('All')}><X size={12} /></button>
                  </span>
                )}
                {selectedBrands.map((b) => (
                  <span key={b} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-stone-300 rounded-lg text-xs text-stone-800">
                    {b}
                    <button onClick={() => toggleBrand(b)}><X size={12} /></button>
                  </span>
                ))}
                {priceRange !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-stone-300 rounded-lg text-xs text-stone-800">
                    Price: {priceRange}
                    <button onClick={() => setPriceRange('all')}><X size={12} /></button>
                  </span>
                )}
                {minRating > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-stone-300 rounded-lg text-xs text-stone-800">
                    Rating: {minRating}★+
                    <button onClick={() => setMinRating(0)}><X size={12} /></button>
                  </span>
                )}
                {minDiscount > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-stone-300 rounded-lg text-xs text-stone-800">
                    Discount: {minDiscount}%+
                    <button onClick={() => setMinDiscount(0)}><X size={12} /></button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-stone-300 rounded-lg text-xs text-stone-800">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery('')}><X size={12} /></button>
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-rose-700 underline underline-offset-2 ml-1"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Product Grid or Empty State */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-stone-200/80 p-12 text-center max-w-lg mx-auto space-y-4">
                <div className="w-14 h-14 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-stone-400">
                  <Search size={24} />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  No matching beauty products
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  We couldn't find any products matching your active filter criteria. Try resetting filters or searching with different keywords.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </main>
        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <h3 className="font-serif text-base font-bold text-stone-900">Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-full text-stone-500 hover:text-stone-900"
              >
                <X size={18} />
              </button>
            </div>

            {/* Category */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Category</h4>
              <div className="space-y-1">
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs ${
                      selectedCategory === cat ? 'bg-stone-900 text-white font-semibold' : 'text-stone-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Price</h4>
              {['all', 'under-500', '500-1000', '1000-2000', 'above-2000'].map((p) => (
                <label key={p} className="flex items-center gap-2 text-xs py-1 text-stone-700">
                  <input
                    type="radio"
                    name="mobilePrice"
                    checked={priceRange === p}
                    onChange={() => setPriceRange(p)}
                  />
                  <span>{p === 'all' ? 'All' : p}</span>
                </label>
              ))}
            </div>

            <div className="pt-4 flex gap-2">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-2 text-xs border border-stone-300 rounded-lg text-stone-700 font-semibold"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2 text-xs bg-stone-900 text-white rounded-lg font-semibold"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
