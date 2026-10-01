import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import { ArrowRight, Flame, Trophy } from 'lucide-react';

export const TrendingProducts: React.FC = () => {
  const { products, setActiveTab, setSelectedCategory } = useApp();
  const [filterType, setFilterType] = useState<'trending' | 'bestseller'>('trending');

  const displayedProducts = products
    .filter((p) => (filterType === 'trending' ? p.isTrending : p.isBestSeller))
    .slice(0, 4);

  return (
    <section className="py-16 bg-gradient-to-b from-[#FBCAD6] via-[#FDCFE0] to-[#FBBECF] border-b border-rose-300/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Segmented Filter Control */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-rose-800 mb-1">
              {filterType === 'trending' ? <Flame size={14} /> : <Trophy size={14} />}
              <span>{filterType === 'trending' ? 'Most Loved Right Now' : 'Iconic Beauty Essentials'}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {filterType === 'trending' ? 'Trending Products' : 'Best Sellers'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Functional segmented control */}
            <div className="flex items-center p-1 bg-stone-200/70 rounded-xl">
              <button
                onClick={() => setFilterType('trending')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filterType === 'trending'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Trending Now
              </button>
              <button
                onClick={() => setFilterType('bestseller')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filterType === 'bestseller'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Best Sellers
              </button>
            </div>

            <button
              onClick={() => {
                setSelectedCategory('All');
                setActiveTab('shop');
              }}
              className="hidden sm:flex items-center gap-1 text-xs font-semibold text-stone-800 hover:text-stone-950 transition-colors ml-2"
            >
              Explore All <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
