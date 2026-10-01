import React from 'react';
import { BRANDS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { Sparkles } from 'lucide-react';

export const BrandsSection: React.FC = () => {
  const { setActiveTab, setSearchQuery } = useApp();

  const handleBrandClick = (brandName: string) => {
    setSearchQuery(brandName);
    setActiveTab('shop');
  };

  return (
    <section className="py-14 bg-[#FBCAD6]/80 border-b border-rose-300/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold tracking-wider uppercase text-rose-800">
            Heritage & Innovation
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Featured Beauty Houses
          </h2>
          <p className="text-xs text-stone-500 mt-2">
            Direct partnerships with globally celebrated clean beauty ateliers and Ayurvedic pioneers.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {BRANDS.map((brand) => (
            <div
              key={brand.name}
              onClick={() => handleBrandClick(brand.name)}
              className="bg-white/90 backdrop-blur-xs p-5 rounded-xl border border-rose-200/60 hover:border-rose-400 hover:shadow-xs transition-all cursor-pointer flex flex-col items-center justify-center text-center group"
            >
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 mb-2 group-hover:bg-rose-100 group-hover:text-rose-800 transition-colors">
                <Sparkles size={16} />
              </div>
              <h3 className="font-serif text-sm font-bold text-stone-900 group-hover:text-rose-950 transition-colors">
                {brand.name}
              </h3>
              <p className="text-[10px] text-stone-500 mt-1">{brand.tag}</p>
              <span className="text-[9px] text-stone-400 mt-0.5">{brand.origin}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
