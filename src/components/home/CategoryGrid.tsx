import React from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import { CategoryType } from '../../types';
import { ArrowUpRight } from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const { setSelectedCategory, setActiveTab } = useApp();

  const handleSelect = (catId: CategoryType) => {
    setSelectedCategory(catId);
    setActiveTab('shop');
  };

  return (
    <section className="py-14 bg-[#FBCAD6]/80 border-b border-rose-300/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-rose-800">
              Curated Collections
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setActiveTab('shop');
            }}
            className="text-xs font-semibold text-stone-700 hover:text-stone-950 flex items-center gap-1 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* 8 Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className="group flex flex-col items-center p-4 rounded-xl bg-white/80 backdrop-blur-xs border border-rose-200/70 hover:border-rose-400 hover:bg-white transition-all duration-200 text-center shadow-2xs"
            >
              <div className="w-13 h-13 rounded-full bg-rose-50/80 border border-rose-200/80 flex items-center justify-center text-2xl shadow-2xs group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </div>
              <span className="text-xs font-semibold text-stone-900 mt-3 group-hover:text-rose-900 transition-colors">
                {cat.name}
              </span>
              <span className="text-[11px] text-stone-400 mt-0.5 tabular-nums">
                {cat.count} items
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
